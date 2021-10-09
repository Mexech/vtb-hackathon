try:
    import unittest
    from server import app
except Exception as e:
    print(f"Some packages are missing! {e}")


class ServerTest(unittest.TestCase):

    def test_index(self):
        tester = app.test_client(self)
        params = {
            "uid": "McHQwYsaFKbmFPHnPOpE3oebfIt2",
            "data": {
                "code": 'import json\nimport pandas as pd\ndef run(queue):\n    data = queue.get()\n    month_Year = data["month_Year"]    queue.put(month_Year)',
                "filename": "Valve_Player_Data.csv"
            }
        }
        resp = tester.get(f"/api/{params}")
        st_code = resp.status_code
        self.assertEqual(st_code, 200)


if __name__ == "__main__":
    unittest.main()
