#!/usr/bin/env python3
"""
Live Email Delivery Verification Test
Tests the Resend domain temitayocharles.online with verified sender contact@temitayocharles.online
"""
import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend/.env
BACKEND_URL = "https://cloud-platform-eng.preview.emergentagent.com/api"

def print_section(title):
    print(f"\n{'='*80}")
    print(f"  {title}")
    print(f"{'='*80}\n")

def print_result(test_name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} - {test_name}")
    if details:
        print(f"  Details: {details}")
    print()

def test_health_endpoint():
    """Test 1: GET /api/health → 200, resend_configured=true, recipients=2"""
    print_section("TEST 1: GET /api/health")
    
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 200:
            print_result("Health endpoint status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check resend_configured
        if not data.get("resend_configured"):
            print_result("resend_configured", False, f"Expected true, got {data.get('resend_configured')}")
            return False
        
        # Check recipients count
        if data.get("recipients") != 2:
            print_result("recipients count", False, f"Expected 2, got {data.get('recipients')}")
            return False
        
        print_result("GET /api/health", True, "resend_configured=true, recipients=2")
        return True
        
    except Exception as e:
        print_result("GET /api/health", False, f"Exception: {str(e)}")
        return False

def test_contact_submission():
    """Test 2: POST /api/contact with realistic payload"""
    print_section("TEST 2: POST /api/contact (Live Email Delivery)")
    
    payload = {
        "name": "Portfolio Live Test",
        "email": "qa-livetest@example.com",
        "subject": "Live Resend domain test",
        "message": "This is a live verification email confirming the Resend domain temitayocharles.online is sending correctly to both recipient inboxes."
    }
    
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response Body: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 200:
            print_result("Contact submission status code", False, f"Expected 200, got {response.status_code}")
            return None
        
        data = response.json()
        
        # CRITICAL: Check email_status == "sent"
        email_status = data.get("email_status")
        if email_status != "sent":
            print_result(
                "email_status", 
                False, 
                f"Expected 'sent', got '{email_status}'. email_error: {data.get('email_error')}"
            )
            print("\n⚠️  CRITICAL FAILURE: Email was not sent successfully!")
            print(f"    email_status: {email_status}")
            print(f"    email_error: {data.get('email_error')}")
            return data.get("id")
        
        # Check email_error is null
        if data.get("email_error") is not None:
            print_result(
                "email_error", 
                False, 
                f"Expected null, got '{data.get('email_error')}'"
            )
            return data.get("id")
        
        # Check id is a UUID string
        message_id = data.get("id")
        if not message_id or not isinstance(message_id, str):
            print_result("id field", False, f"Expected UUID string, got {message_id}")
            return None
        
        print_result(
            "POST /api/contact", 
            True, 
            f"email_status='sent', email_error=null, id={message_id}"
        )
        return message_id
        
    except Exception as e:
        print_result("POST /api/contact", False, f"Exception: {str(e)}")
        return None

def test_contact_list(expected_id):
    """Test 3: GET /api/contact?limit=5 and confirm message exists with email_status='sent'"""
    print_section("TEST 3: GET /api/contact?limit=5 (Verify Persistence)")
    
    if not expected_id:
        print("⚠️  Skipping test - no message ID from previous test")
        return False
    
    try:
        response = requests.get(f"{BACKEND_URL}/contact?limit=5", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result("Contact list status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        messages = response.json()
        print(f"Retrieved {len(messages)} messages")
        
        # Find the message we just created
        found_message = None
        for msg in messages:
            if msg.get("id") == expected_id:
                found_message = msg
                break
        
        if not found_message:
            print_result(
                "Message persistence", 
                False, 
                f"Message with id={expected_id} not found in recent messages"
            )
            return False
        
        print(f"\nFound message: {json.dumps(found_message, indent=2)}")
        
        # Verify email_status is 'sent'
        if found_message.get("email_status") != "sent":
            print_result(
                "Persisted email_status", 
                False, 
                f"Expected 'sent', got '{found_message.get('email_status')}'"
            )
            return False
        
        print_result(
            "GET /api/contact", 
            True, 
            f"Message found with email_status='sent'"
        )
        return True
        
    except Exception as e:
        print_result("GET /api/contact", False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("  LIVE EMAIL DELIVERY VERIFICATION TEST")
    print("  Resend Domain: temitayocharles.online")
    print("  Sender: contact@temitayocharles.online")
    print("  Recipients: tayocharlesaki@gmail.com, temitayo_charles@yahoo.com")
    print("="*80)
    
    results = {
        "health": False,
        "contact_submission": False,
        "contact_list": False
    }
    
    # Test 1: Health check
    results["health"] = test_health_endpoint()
    
    # Test 2: Contact submission
    message_id = test_contact_submission()
    results["contact_submission"] = (message_id is not None)
    
    # Test 3: Contact list verification
    if message_id:
        results["contact_list"] = test_contact_list(message_id)
    
    # Summary
    print_section("TEST SUMMARY")
    total_tests = len(results)
    passed_tests = sum(1 for v in results.values() if v)
    
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    print()
    
    for test_name, passed in results.items():
        status = "✅" if passed else "❌"
        print(f"{status} {test_name}")
    
    print("\n" + "="*80)
    
    if passed_tests == total_tests:
        print("🎉 ALL TESTS PASSED - Live email delivery verified!")
        print("="*80 + "\n")
        return 0
    else:
        print("⚠️  SOME TESTS FAILED - See details above")
        print("="*80 + "\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
