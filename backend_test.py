#!/usr/bin/env python3
"""
Portfolio API verification script.

Environment variables:
  PORTFOLIO_API_BASE_URL: Full API base URL, for example:
    http://localhost:8001/api
  ADMIN_API_KEY: Optional. Required to verify authorized GET /api/contact.
"""

import json
import os
import sys
from datetime import datetime, timezone
from typing import Any, Dict, Optional

import requests


BASE_URL = os.environ.get(
    "PORTFOLIO_API_BASE_URL",
    "http://localhost:8001/api",
).rstrip("/")
ADMIN_API_KEY = os.environ.get("ADMIN_API_KEY", "").strip()


def print_section(title: str) -> None:
    print(f"\n{'=' * 80}")
    print(f"  {title}")
    print(f"{'=' * 80}\n")


def print_result(test_name: str, passed: bool, details: str = "") -> None:
    status = "PASS" if passed else "FAIL"
    print(f"{status} - {test_name}")
    if details:
        print(f"  Details: {details}")
    print()


def request_json(
    method: str,
    path: str,
    *,
    headers: Optional[Dict[str, str]] = None,
    json_body: Optional[Dict[str, Any]] = None,
    timeout: int = 15,
) -> requests.Response:
    return requests.request(
        method,
        f"{BASE_URL}{path}",
        headers=headers,
        json=json_body,
        timeout=timeout,
    )


def pretty_response(response: requests.Response) -> str:
    try:
        return json.dumps(response.json(), indent=2)
    except Exception:
        return response.text


def test_health_endpoint() -> bool:
    print_section("TEST 1: GET /api/health")

    try:
        response = request_json("GET", "/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {pretty_response(response)}")

        if response.status_code != 200:
            print_result("Health endpoint status code", False, f"Expected 200, got {response.status_code}")
            return False

        data = response.json()
        required_keys = {
            "status",
            "resend_configured",
            "recipients",
            "admin_contact_listing_configured",
            "contact_rate_limit",
        }
        missing_keys = required_keys - set(data.keys())
        if missing_keys:
            print_result("Health endpoint response shape", False, f"Missing keys: {sorted(missing_keys)}")
            return False

        if data.get("status") != "ok":
            print_result("Health status", False, f"Expected 'ok', got {data.get('status')}")
            return False

        print_result("GET /api/health", True, "Health endpoint returned expected hardened configuration fields")
        return True

    except Exception as exc:
        print_result("GET /api/health", False, f"Exception: {exc}")
        return False


def test_contact_submission() -> Optional[str]:
    print_section("TEST 2: POST /api/contact")

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    payload = {
        "name": "Portfolio API Verification",
        "email": f"qa-{timestamp}@example.com",
        "subject": "Automated contact API verification",
        "message": "This is an automated verification of the hardened portfolio contact endpoint.",
    }

    try:
        response = request_json(
            "POST",
            "/contact",
            json_body=payload,
            headers={"Content-Type": "application/json"},
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {pretty_response(response)}")

        if response.status_code != 200:
            print_result("Contact submission status code", False, f"Expected 200, got {response.status_code}")
            return None

        data = response.json()
        if data.get("email") != payload["email"]:
            print_result("Contact response email", False, "Response email does not match submitted payload")
            return None

        if data.get("email_status") not in {"sent", "skipped", "failed"}:
            print_result("Contact email_status", False, f"Unexpected email_status: {data.get('email_status')}")
            return None

        if not data.get("id"):
            print_result("Contact id", False, "Response did not include message id")
            return None

        print_result("POST /api/contact", True, f"Message accepted with email_status={data.get('email_status')}")
        return data["id"]

    except Exception as exc:
        print_result("POST /api/contact", False, f"Exception: {exc}")
        return None


def test_contact_validation() -> bool:
    print_section("TEST 3: POST /api/contact validation")

    invalid_payloads = [
        (
            "missing message",
            {
                "name": "Validation Test",
                "email": "validation@example.com",
                "subject": "Invalid payload",
            },
        ),
        (
            "invalid email",
            {
                "name": "Validation Test",
                "email": "not-an-email",
                "subject": "Invalid payload",
                "message": "Hello",
            },
        ),
        (
            "short message",
            {
                "name": "Validation Test",
                "email": "validation@example.com",
                "subject": "Invalid payload",
                "message": "Hi",
            },
        ),
    ]

    all_passed = True
    for name, payload in invalid_payloads:
        try:
            response = request_json(
                "POST",
                "/contact",
                json_body=payload,
                headers={"Content-Type": "application/json"},
            )
            passed = response.status_code == 422
            print_result(
                f"Validation: {name}",
                passed,
                f"Expected 422, got {response.status_code}",
            )
            all_passed = all_passed and passed
        except Exception as exc:
            print_result(f"Validation: {name}", False, f"Exception: {exc}")
            all_passed = False

    return all_passed


def test_contact_admin_protection(expected_id: Optional[str]) -> bool:
    print_section("TEST 4: GET /api/contact admin protection")

    try:
        response = request_json("GET", "/contact?limit=5", timeout=10)
        print(f"Unauthenticated Status Code: {response.status_code}")
        print(f"Unauthenticated Response Body: {pretty_response(response)}")

        if response.status_code not in {401, 503}:
            print_result(
                "Unauthenticated contact listing is blocked",
                False,
                f"Expected 401 or 503, got {response.status_code}",
            )
            return False

        if not ADMIN_API_KEY:
            print_result(
                "Admin contact listing",
                response.status_code in {401, 503},
                "ADMIN_API_KEY was not provided locally; authorized listing test skipped",
            )
            return True

        authed_response = request_json(
            "GET",
            "/contact?limit=5",
            headers={"X-Admin-API-Key": ADMIN_API_KEY},
            timeout=10,
        )
        print(f"Authenticated Status Code: {authed_response.status_code}")
        print(f"Authenticated Response Body: {pretty_response(authed_response)}")

        if authed_response.status_code != 200:
            print_result(
                "Authenticated contact listing",
                False,
                f"Expected 200, got {authed_response.status_code}",
            )
            return False

        messages = authed_response.json()
        if not isinstance(messages, list):
            print_result("Authenticated contact listing shape", False, "Expected a JSON array")
            return False

        if expected_id and not any(message.get("id") == expected_id for message in messages):
            print_result(
                "Created message visible to admin listing",
                False,
                f"Message id {expected_id} was not found in recent messages",
            )
            return False

        print_result("GET /api/contact admin protection", True, "Public access blocked and authorized access verified")
        return True

    except Exception as exc:
        print_result("GET /api/contact admin protection", False, f"Exception: {exc}")
        return False


def test_status_endpoints() -> bool:
    print_section("TEST 5: Legacy /api/status endpoints")

    payload = {"client_name": "portfolio-api-verification"}

    try:
        post_response = request_json(
            "POST",
            "/status",
            json_body=payload,
            headers={"Content-Type": "application/json"},
            timeout=10,
        )
        print(f"POST Status Code: {post_response.status_code}")
        print(f"POST Response Body: {pretty_response(post_response)}")

        if post_response.status_code != 200:
            print_result("POST /api/status", False, f"Expected 200, got {post_response.status_code}")
            return False

        get_response = request_json("GET", "/status", timeout=10)
        print(f"GET Status Code: {get_response.status_code}")

        if get_response.status_code != 200:
            print_result("GET /api/status", False, f"Expected 200, got {get_response.status_code}")
            return False

        print_result("Legacy status endpoints", True, "POST and GET /api/status are operational")
        return True

    except Exception as exc:
        print_result("Legacy status endpoints", False, f"Exception: {exc}")
        return False


def main() -> int:
    print("\n" + "=" * 80)
    print("  PORTFOLIO API VERIFICATION")
    print(f"  Base URL: {BASE_URL}")
    print(f"  Admin key supplied: {bool(ADMIN_API_KEY)}")
    print("=" * 80)

    results = {
        "health": test_health_endpoint(),
        "contact_submission": False,
        "contact_validation": False,
        "contact_admin_protection": False,
        "status_endpoints": False,
    }

    message_id = test_contact_submission()
    results["contact_submission"] = message_id is not None
    results["contact_validation"] = test_contact_validation()
    results["contact_admin_protection"] = test_contact_admin_protection(message_id)
    results["status_endpoints"] = test_status_endpoints()

    print_section("TEST SUMMARY")
    total_tests = len(results)
    passed_tests = sum(1 for passed in results.values() if passed)

    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}\n")

    for test_name, passed in results.items():
        status = "PASS" if passed else "FAIL"
        print(f"{status}: {test_name}")

    return 0 if passed_tests == total_tests else 1


if __name__ == "__main__":
    sys.exit(main())
