#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Contact API
Tests all endpoints against the public backend URL
"""

import requests
import json
from datetime import datetime
from typing import Dict, Any, List

# Backend URL from frontend/.env
BASE_URL = "https://cloud-platform-eng.preview.emergentagent.com/api"

# Test results tracking
test_results = []


def log_test(test_name: str, passed: bool, details: str):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    result = {
        "test": test_name,
        "passed": passed,
        "details": details,
        "timestamp": datetime.now().isoformat()
    }
    test_results.append(result)
    print(f"\n{status}: {test_name}")
    print(f"Details: {details}")


def test_health_endpoint():
    """Test GET /api/health"""
    print("\n" + "="*80)
    print("TEST 1: GET /api/health")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            log_test(
                "GET /api/health - Status Code",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return False
        
        data = response.json()
        print(f"Parsed JSON: {json.dumps(data, indent=2)}")
        
        # Check required fields
        checks = []
        
        if "status" not in data:
            checks.append("Missing 'status' field")
        elif data["status"] != "ok":
            checks.append(f"status is '{data['status']}', expected 'ok'")
        
        if "resend_configured" not in data:
            checks.append("Missing 'resend_configured' field")
        elif data["resend_configured"] != True:
            checks.append(f"resend_configured is {data['resend_configured']}, expected true")
        
        if "recipients" not in data:
            checks.append("Missing 'recipients' field")
        elif data["recipients"] < 1:
            checks.append(f"recipients is {data['recipients']}, expected >= 1")
        
        if checks:
            log_test("GET /api/health", False, "; ".join(checks))
            return False
        
        log_test(
            "GET /api/health",
            True,
            f"status={data['status']}, resend_configured={data['resend_configured']}, recipients={data['recipients']}"
        )
        return True
        
    except Exception as e:
        log_test("GET /api/health", False, f"Exception: {str(e)}")
        return False


def test_contact_valid_submission():
    """Test POST /api/contact with valid payload - NEW BEHAVIOR: Always returns 200"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/contact - Valid Submission")
    print("="*80)
    
    payload = {
        "name": "QA Verify",
        "email": "qa-verify@example.com",
        "subject": "Post-fix smoke",
        "message": "Verifying the 200 response even when email fails in sandbox."
    }
    
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            timeout=15
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # NEW BEHAVIOR: Must always return 200 (not 502), even when email fails
        if response.status_code != 200:
            log_test(
                "POST /api/contact - Valid payload",
                False,
                f"Expected 200 (new behavior), got {response.status_code}"
            )
            return None
        
        # Parse response
        data = response.json()
        print(f"Parsed JSON: {json.dumps(data, indent=2)}")
        
        # Validate response structure
        required_fields = ["id", "name", "email", "subject", "message", "email_status", "created_at"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            log_test(
                "POST /api/contact - Valid payload",
                False,
                f"Missing fields: {', '.join(missing_fields)}"
            )
            return None
        
        # Validate email_status
        valid_statuses = ["sent", "skipped", "failed"]
        if data["email_status"] not in valid_statuses:
            log_test(
                "POST /api/contact - Valid payload",
                False,
                f"email_status '{data['email_status']}' not in {valid_statuses}"
            )
            return None
        
        # NEW: If email_status is 'failed', email_error must be present and non-empty
        if data["email_status"] == "failed":
            if "email_error" not in data or not data["email_error"]:
                log_test(
                    "POST /api/contact - Valid payload",
                    False,
                    "email_status is 'failed' but email_error is missing or empty"
                )
                return None
            print(f"⚠️  Email delivery failed (sandbox restriction): {data['email_error']}")
            print("✓ Message persisted with email_status='failed' and error details")
        
        # Validate data matches payload
        checks = []
        if data["name"] != payload["name"]:
            checks.append(f"name mismatch: {data['name']} != {payload['name']}")
        if data["email"] != payload["email"]:
            checks.append(f"email mismatch: {data['email']} != {payload['email']}")
        if data["subject"] != payload["subject"]:
            checks.append(f"subject mismatch: {data['subject']} != {payload['subject']}")
        if data["message"] != payload["message"]:
            checks.append(f"message mismatch")
        
        if checks:
            log_test("POST /api/contact - Valid payload", False, "; ".join(checks))
            return None
        
        log_test(
            "POST /api/contact - Valid payload",
            True,
            f"Created message with id={data['id']}, email_status={data['email_status']} (200 response as expected)"
        )
        return data["id"]
        
    except Exception as e:
        log_test("POST /api/contact - Valid payload", False, f"Exception: {str(e)}")
        return None


def test_contact_invalid_payloads():
    """Test POST /api/contact with invalid payloads"""
    print("\n" + "="*80)
    print("TEST 3: POST /api/contact - Invalid Payloads")
    print("="*80)
    
    test_cases = [
        {
            "name": "Missing message field",
            "payload": {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "Test"
            },
            "expected_status": 422
        },
        {
            "name": "Invalid email format",
            "payload": {
                "name": "Test User",
                "email": "not-an-email",
                "subject": "Test",
                "message": "This is a valid message with enough length."
            },
            "expected_status": 422
        },
        {
            "name": "Message too short",
            "payload": {
                "name": "Test User",
                "email": "test@example.com",
                "subject": "Test",
                "message": "hi"
            },
            "expected_status": 422
        },
        {
            "name": "Empty name",
            "payload": {
                "name": "",
                "email": "test@example.com",
                "subject": "Test",
                "message": "This is a valid message with enough length."
            },
            "expected_status": 422
        }
    ]
    
    all_passed = True
    
    for test_case in test_cases:
        print(f"\n--- {test_case['name']} ---")
        print(f"Payload: {json.dumps(test_case['payload'], indent=2)}")
        
        try:
            response = requests.post(
                f"{BASE_URL}/contact",
                json=test_case["payload"],
                timeout=10
            )
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text[:200]}")
            
            if response.status_code == test_case["expected_status"]:
                log_test(
                    f"POST /api/contact - {test_case['name']}",
                    True,
                    f"Correctly returned {response.status_code}"
                )
            else:
                log_test(
                    f"POST /api/contact - {test_case['name']}",
                    False,
                    f"Expected {test_case['expected_status']}, got {response.status_code}"
                )
                all_passed = False
                
        except Exception as e:
            log_test(
                f"POST /api/contact - {test_case['name']}",
                False,
                f"Exception: {str(e)}"
            )
            all_passed = False
    
    return all_passed


def test_contact_list(expected_message_id=None, expected_email=None):
    """Test GET /api/contact - verify persistence"""
    print("\n" + "="*80)
    print("TEST 4: GET /api/contact?limit=20")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/contact?limit=20", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            log_test(
                "GET /api/contact",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return False
        
        data = response.json()
        print(f"Response: Received {len(data)} messages")
        
        if not isinstance(data, list):
            log_test(
                "GET /api/contact",
                False,
                f"Expected list, got {type(data)}"
            )
            return False
        
        if len(data) == 0:
            log_test(
                "GET /api/contact",
                False,
                "Expected at least one message, got empty list"
            )
            return False
        
        # Check if messages are sorted by created_at descending
        if len(data) > 1:
            for i in range(len(data) - 1):
                current = datetime.fromisoformat(data[i]["created_at"].replace("Z", "+00:00"))
                next_msg = datetime.fromisoformat(data[i+1]["created_at"].replace("Z", "+00:00"))
                if current < next_msg:
                    log_test(
                        "GET /api/contact",
                        False,
                        f"Messages not sorted desc by created_at: {data[i]['created_at']} < {data[i+1]['created_at']}"
                    )
                    return False
        
        # If we have an expected message ID, verify it exists
        if expected_message_id:
            found = any(msg.get("id") == expected_message_id for msg in data)
            if not found:
                log_test(
                    "GET /api/contact",
                    False,
                    f"Expected message with id={expected_message_id} not found in list"
                )
                return False
            print(f"✓ Found expected message with id={expected_message_id}")
        
        # NEW: If we have an expected email, verify it exists (for persistence check)
        if expected_email:
            found = any(msg.get("email") == expected_email for msg in data)
            if not found:
                log_test(
                    "GET /api/contact",
                    False,
                    f"Expected message with email={expected_email} not found in list (persistence check failed)"
                )
                return False
            print(f"✓ Found expected message with email={expected_email} (persistence verified)")
        
        # Show first message as sample
        if data:
            print(f"\nFirst message (sample):")
            print(json.dumps(data[0], indent=2))
        
        log_test(
            "GET /api/contact",
            True,
            f"Retrieved {len(data)} messages, sorted desc by created_at"
        )
        return True
        
    except Exception as e:
        log_test("GET /api/contact", False, f"Exception: {str(e)}")
        return False


def test_legacy_status_endpoints():
    """Test legacy POST and GET /api/status"""
    print("\n" + "="*80)
    print("TEST 5: Legacy /api/status endpoints")
    print("="*80)
    
    # Test POST /api/status
    print("\n--- POST /api/status ---")
    payload = {"client_name": "qa"}
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/status",
            json=payload,
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            log_test(
                "POST /api/status",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return False
        
        data = response.json()
        print(f"Parsed JSON: {json.dumps(data, indent=2)}")
        
        if "id" not in data or "timestamp" not in data:
            log_test(
                "POST /api/status",
                False,
                f"Missing required fields (id or timestamp)"
            )
            return False
        
        status_id = data["id"]
        log_test(
            "POST /api/status",
            True,
            f"Created status check with id={status_id}"
        )
        
    except Exception as e:
        log_test("POST /api/status", False, f"Exception: {str(e)}")
        return False
    
    # Test GET /api/status
    print("\n--- GET /api/status ---")
    
    try:
        response = requests.get(f"{BASE_URL}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            log_test(
                "GET /api/status",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return False
        
        data = response.json()
        print(f"Response: Received {len(data)} status checks")
        
        if not isinstance(data, list):
            log_test(
                "GET /api/status",
                False,
                f"Expected list, got {type(data)}"
            )
            return False
        
        # Verify the status we just created exists
        found = any(s.get("id") == status_id for s in data)
        if not found:
            log_test(
                "GET /api/status",
                False,
                f"Status check with id={status_id} not found in list"
            )
            return False
        
        log_test(
            "GET /api/status",
            True,
            f"Retrieved {len(data)} status checks, including newly created one"
        )
        return True
        
    except Exception as e:
        log_test("GET /api/status", False, f"Exception: {str(e)}")
        return False


def print_summary():
    """Print test summary"""
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for r in test_results if r["passed"])
    failed = sum(1 for r in test_results if not r["passed"])
    total = len(test_results)
    
    print(f"\nTotal Tests: {total}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    print(f"Success Rate: {(passed/total*100):.1f}%\n")
    
    if failed > 0:
        print("Failed Tests:")
        for r in test_results:
            if not r["passed"]:
                print(f"  ❌ {r['test']}")
                print(f"     {r['details']}")
    
    print("\n" + "="*80)


def main():
    """Run all tests"""
    print("="*80)
    print("PORTFOLIO BACKEND API TEST SUITE")
    print("="*80)
    print(f"Backend URL: {BASE_URL}")
    print(f"Test Started: {datetime.now().isoformat()}")
    
    # Run tests in priority order
    test_health_endpoint()
    
    message_id = test_contact_valid_submission()
    
    test_contact_invalid_payloads()
    
    # Verify persistence by email (as per new test requirements)
    test_contact_list(expected_message_id=message_id, expected_email="qa-verify@example.com")
    
    test_legacy_status_endpoints()
    
    # Print summary
    print_summary()
    
    # Exit with appropriate code
    failed = sum(1 for r in test_results if not r["passed"])
    exit(0 if failed == 0 else 1)


if __name__ == "__main__":
    main()
