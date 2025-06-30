#!/usr/bin/env python3
import requests
import json
import sys
import time
from datetime import datetime

class PurpleBrainAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        
        if headers:
            default_headers.update(headers)
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers)
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"📄 Response: {json.dumps(response_data, indent=2)[:500]}...")
                except:
                    print(f"📄 Response: {response.text[:500]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"📄 Response: {response.text[:500]}...")
            
            self.test_results.append({
                "name": name,
                "success": success,
                "status_code": response.status_code,
                "expected_status": expected_status,
                "url": url,
                "method": method
            })
            
            return success, response
        
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "success": False,
                "error": str(e),
                "url": url,
                "method": method
            })
            return False, None

    def test_root_endpoint(self):
        """Test the root endpoint"""
        return self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )

    def test_agents_status(self):
        """Test the agents status endpoint"""
        return self.run_test(
            "Agents Status",
            "GET",
            "api/agents/status",
            200
        )

    def test_visualization_agent(self):
        """Test the visualization agent endpoint"""
        data = {
            "query": "Create a dashboard for sales performance",
            "options": {
                "style": "professional",
                "format": "json",
                "includeMetrics": True
            },
            "data": {
                "timestamp": datetime.now().isoformat()
            }
        }
        
        return self.run_test(
            "Visualization Agent",
            "POST",
            "api/agent/visualization",
            200,
            data=data
        )

    def test_research_agent(self):
        """Test the research agent endpoint"""
        data = {
            "query": "Research market trends in AI platforms",
            "options": {
                "type": "comprehensive",
                "format": "json"
            },
            "data": {
                "timestamp": datetime.now().isoformat()
            }
        }
        
        return self.run_test(
            "Research Agent",
            "POST",
            "api/agent/research",
            200,
            data=data
        )

    def test_code_agent(self):
        """Test the code agent endpoint"""
        data = {
            "query": "Create a React component for a dashboard",
            "options": {
                "type": "full_stack",
                "format": "json"
            },
            "data": {
                "timestamp": datetime.now().isoformat()
            }
        }
        
        return self.run_test(
            "Code Agent",
            "POST",
            "api/agent/code",
            200,
            data=data
        )

    def test_nonexistent_agent(self):
        """Test a nonexistent agent endpoint"""
        data = {
            "query": "This should fail",
            "options": {},
            "data": {}
        }
        
        return self.run_test(
            "Nonexistent Agent",
            "POST",
            "api/agent/nonexistent",
            404,
            data=data
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting PurpleBrain API Tests...")
        
        # Basic endpoint tests
        self.test_root_endpoint()
        self.test_agents_status()
        
        # Agent tests
        self.test_visualization_agent()
        self.test_research_agent()
        self.test_code_agent()
        self.test_nonexistent_agent()
        
        # Print summary
        print("\n📊 Test Summary:")
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        
        success_rate = (self.tests_passed / self.tests_run) * 100 if self.tests_run > 0 else 0
        print(f"Success Rate: {success_rate:.2f}%")
        
        return self.tests_passed == self.tests_run

if __name__ == "__main__":
    # Get the backend URL from environment or use default
    import os
    backend_url = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    print(f"Using backend URL: {backend_url}")
    
    tester = PurpleBrainAPITester(backend_url)
    success = tester.run_all_tests()
    
    sys.exit(0 if success else 1)