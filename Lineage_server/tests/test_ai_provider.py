import os
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.config import settings
from app.services.ai_provider import MockAIProvider, ExternalAIProvider, get_ai_provider

class TestAIProvider(unittest.TestCase):
    def test_mock_provider_responses(self):
        provider = MockAIProvider(model_name="mock-gpt")
        
        # Test summarization
        res1 = provider.generate("Can you summarize milestone 1?", {})
        self.assertIn("completed the data collection", res1.output)
        self.assertEqual(res1.model, "mock-gpt")
        self.assertEqual(res1.provider, "mock")
        
        # Test experiments
        res2 = provider.generate("Suggest experiments to improve accuracy", {})
        self.assertIn("larger batch size", res2.output)
        
        # Test research review
        res3 = provider.generate("Please review research section", {})
        self.assertIn("methodology is sound", res3.output)
        
        # Test test plan
        res4 = provider.generate("generate test plan for the API", {})
        self.assertIn("Integration tests", res4.output)
        
        # Test fallback
        res5 = provider.generate("hello world", {})
        self.assertEqual(res5.output, "Mock response generated for your query.")

    def test_external_provider_missing_key(self):
        provider = ExternalAIProvider(model_name="ext-model", api_key=None)
        with self.assertRaises(ValueError):
            provider.generate("hello", {})

    def test_factory_mock(self):
        # By default config uses mock
        provider = get_ai_provider()
        self.assertIsInstance(provider, MockAIProvider)

if __name__ == "__main__":
    unittest.main()
