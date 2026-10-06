from abc import ABC, abstractmethod
from typing import Dict, Any
from pydantic import BaseModel
from app.core.config import settings

class AIProviderResponse(BaseModel):
    output: str
    model: str
    provider: str
    usage_metadata: Dict[str, Any]

class BaseAIProvider(ABC):
    @abstractmethod
    def generate(self, sanitized_prompt: str, sanitized_context: Dict[str, Any]) -> AIProviderResponse:
        """
        Generates an AI response based ONLY on sanitized inputs.
        The AI Provider must never have direct DB, shell, or filesystem access.
        """
        pass

class MockAIProvider(BaseAIProvider):
    def __init__(self, model_name: str = "mock-model"):
        self.model_name = model_name

    def generate(self, sanitized_prompt: str, sanitized_context: Dict[str, Any]) -> AIProviderResponse:
        prompt_lower = sanitized_prompt.lower()
        output = "Mock response generated for your query."

        if "summarize milestone" in prompt_lower:
            output = "Here is the milestone summary: The team has completed the data collection phase and is moving to model training."
        elif "suggest experiments" in prompt_lower:
            output = "Experiment suggestions:\n1. Try a larger batch size.\n2. Implement gradient clipping.\n3. Augment the dataset with rotations."
        elif "review research section" in prompt_lower:
            output = "Research review: The methodology is sound, but consider citing more recent papers on transformer architectures."
        elif "generate test plan" in prompt_lower:
            output = "Test Plan:\n- Unit tests for data preprocessing\n- Integration tests for the API\n- Load testing for inference latency"

        return AIProviderResponse(
            output=output,
            model=self.model_name,
            provider="mock",
            usage_metadata={"prompt_tokens": 15, "completion_tokens": 25, "total_tokens": 40}
        )

class ExternalAIProvider(BaseAIProvider):
    def __init__(self, model_name: str, api_key: str | None):
        self.model_name = model_name
        self.api_key = api_key

    def generate(self, sanitized_prompt: str, sanitized_context: Dict[str, Any]) -> AIProviderResponse:
        if not self.api_key:
            raise ValueError("API key is required for ExternalAIProvider")
        
        # Placeholder for real external LLM call.
        # This layer operates strictly on sanitized strings and dictionaries.
        # It has ZERO autonomous capabilities.
        return AIProviderResponse(
            output=f"External AI response from model {self.model_name} (Placeholder)",
            model=self.model_name,
            provider="external",
            usage_metadata={"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
        )

def get_ai_provider() -> BaseAIProvider:
    """
    Factory function to retrieve the configured AI provider.
    """
    provider_name = settings.AI_PROVIDER.lower()
    model_name = settings.AI_MODEL
    api_key = settings.AI_API_KEY
    
    if provider_name == "mock":
        return MockAIProvider(model_name=model_name)
    elif provider_name == "external":
        return ExternalAIProvider(model_name=model_name, api_key=api_key)
    else:
        raise ValueError(f"Unknown AI_PROVIDER configuration: {provider_name}")
