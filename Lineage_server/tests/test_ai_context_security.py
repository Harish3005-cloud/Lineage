import unittest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db.models.ai_action import SensitivityLevel
from app.services.ai_context_security import check_context_security

class TestAIContextSecurity(unittest.TestCase):
    def test_clean_text(self):
        text = "This is a clean text with no secrets. Just a normal conversation."
        res = check_context_security(text, SensitivityLevel.PUBLIC, "default")
        self.assertFalse(res.blocked)
        self.assertEqual(res.redaction_count, 0)
        self.assertEqual(res.sanitized_text, text)

    def test_api_key(self):
        text = "Here is my config: API_KEY=abc123def456 plz don't share."
        res = check_context_security(text, SensitivityLevel.INTERNAL, "default")
        self.assertFalse(res.blocked)
        self.assertEqual(res.redaction_count, 1)
        self.assertIn("API_KEY=[REDACTED]", res.sanitized_text)
        self.assertNotIn("abc123def456", res.sanitized_text)
        self.assertEqual(res.detected_secrets[0].category, "API_KEY")

    def test_password(self):
        text = "My db credentials are DB_PASSWORD=secret_pass123 for the prod db."
        res = check_context_security(text, SensitivityLevel.INTERNAL, "default")
        self.assertFalse(res.blocked)
        self.assertEqual(res.redaction_count, 1)
        self.assertIn("DB_PASSWORD=[REDACTED]", res.sanitized_text)
        self.assertNotIn("secret_pass123", res.sanitized_text)

    def test_database_url(self):
        text = "Connecting to postgres://admin:super_secret@localhost:5432/mydb"
        res = check_context_security(text, SensitivityLevel.INTERNAL, "default")
        self.assertFalse(res.blocked)
        self.assertEqual(res.redaction_count, 1)
        self.assertIn("postgres://admin:[REDACTED]@localhost:5432/mydb", res.sanitized_text)
        self.assertNotIn("super_secret", res.sanitized_text)

    def test_bearer_token(self):
        text = "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
        res = check_context_security(text, SensitivityLevel.INTERNAL, "default")
        self.assertFalse(res.blocked)
        self.assertEqual(res.redaction_count, 1)
        self.assertIn("Bearer [REDACTED]", res.sanitized_text)
        self.assertNotIn("eyJhbG", res.sanitized_text)

    def test_multiple_secrets(self):
        text = "API_KEY=12345 and JWT_SECRET=abcd. Also DB_PASSWORD=pass"
        res = check_context_security(text, SensitivityLevel.INTERNAL, "default")
        self.assertFalse(res.blocked)
        self.assertEqual(res.redaction_count, 3)
        self.assertIn("API_KEY=[REDACTED]", res.sanitized_text)
        self.assertIn("JWT_SECRET=[REDACTED]", res.sanitized_text)
        self.assertIn("DB_PASSWORD=[REDACTED]", res.sanitized_text)
        self.assertNotIn("12345", res.sanitized_text)
        self.assertNotIn("abcd", res.sanitized_text)
        self.assertNotIn("pass", res.sanitized_text)

    def test_restricted_content(self):
        text = "This is clean text but it's restricted."
        res = check_context_security(text, SensitivityLevel.RESTRICTED, "default")
        self.assertTrue(res.blocked)
        self.assertEqual(res.reasons[0], "RESTRICTED context is blocked from all external AI processing.")

    def test_confidential_content_model_policy(self):
        text = "Confidential data"
        # Default model is not allowed
        res1 = check_context_security(text, SensitivityLevel.CONFIDENTIAL, "default")
        self.assertTrue(res1.blocked)
        self.assertIn("not approved", res1.reasons[0])
        
        # gemini-3.1 is allowed
        res2 = check_context_security(text, SensitivityLevel.CONFIDENTIAL, "gemini-3.1")
        self.assertFalse(res2.blocked)

    def test_mixed_safe_and_sensitive_content(self):
        text = "Dear AI, please fix this code:\n\nconst API_KEY='fake';\n\nIt is broken."
        res = check_context_security(text, SensitivityLevel.PUBLIC, "default")
        self.assertEqual(res.redaction_count, 1)
        self.assertIn("API_KEY=[REDACTED]", res.sanitized_text)
        self.assertIn("Dear AI, please fix this code:", res.sanitized_text)
        self.assertIn("It is broken.", res.sanitized_text)
        self.assertNotIn("fake", res.sanitized_text)

if __name__ == "__main__":
    unittest.main()
