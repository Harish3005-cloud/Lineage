"""
LINEAGE AI Gateway Context Security Layer
This module provides PoC sensitivity classification and secret scanning for AI contexts.
"""
import re
from typing import List, Tuple
from pydantic import BaseModel
from app.db.models.ai_action import SensitivityLevel

class RedactionItem(BaseModel):
    category: str
    count: int

class ScanResult(BaseModel):
    original_text: str
    sanitized_text: str
    detected_secrets: List[RedactionItem]
    redaction_count: int
    blocked: bool
    reasons: List[str]

# Simple PoC configurable policy for model access
MODEL_POLICY = {
    "gemini-3.1": {
        SensitivityLevel.PUBLIC: True,
        SensitivityLevel.INTERNAL: True,
        SensitivityLevel.CONFIDENTIAL: True,
        SensitivityLevel.RESTRICTED: False,
    },
    "default": {
        SensitivityLevel.PUBLIC: True,
        SensitivityLevel.INTERNAL: True,
        SensitivityLevel.CONFIDENTIAL: False,
        SensitivityLevel.RESTRICTED: False,
    }
}

def is_model_allowed(model_name: str, sensitivity: SensitivityLevel) -> Tuple[bool, str]:
    """
    Determines if the given model is permitted to process data at the given sensitivity level.
    """
    if sensitivity == SensitivityLevel.RESTRICTED:
         return False, "RESTRICTED context is blocked from all external AI processing."
    
    policy = MODEL_POLICY.get(model_name, MODEL_POLICY["default"])
    allowed = policy.get(sensitivity, False)
    
    if not allowed:
        return False, f"Model '{model_name}' is not approved for {sensitivity.value} data."
    return True, ""

# Basic regex patterns for PoC secret scanning
SECRET_PATTERNS = {
    "BEARER_TOKEN": (re.compile(r"(?i)(Bearer\s+)([A-Za-z0-9\-\._~\+\/]+)"), r"\g<1>[REDACTED]"),
    "DATABASE_URL": (re.compile(r"((?:postgres|postgresql|mysql|sqlite|mongodb)://[^:]+:)([^@\s]+)(@[a-zA-Z0-9.-]+:[0-9]+/[a-zA-Z0-9_]+)"), r"\g<1>[REDACTED]\g<3>"),
    "PASSWORD_ENV": (re.compile(r"(?i)(\b(?:DB_PASSWORD|DB_PASSWD|PASSWORD|PASSWD|PWD)\s*[:=]\s*)([^\s]+)"), r"\g<1>[REDACTED]"),
    "JWT_SECRET": (re.compile(r"(?i)(\b(?:JWT_SECRET|SECRET_KEY)\s*[:=]\s*)([^\s]+)"), r"\g<1>[REDACTED]"),
    "API_KEY": (re.compile(r"(?i)(\b(?:API_KEY|APIKEY)\s*[:=]\s*)([^\s]+)"), r"\g<1>[REDACTED]"),
    "PRIVATE_KEY": (re.compile(r"(-----BEGIN.*PRIVATE KEY-----)([\s\S]*?)(-----END.*PRIVATE KEY-----)"), r"\g<1>\n[REDACTED]\n\g<3>")
}

def check_context_security(text: str, sensitivity: SensitivityLevel, model_name: str) -> ScanResult:
    """
    PoC context security layer.
    Classifies sensitivity against model policy and applies basic regex secret scanning.
    Note: This is NOT a perfect security solution.
    """
    allowed, reason = is_model_allowed(model_name, sensitivity)
    
    sanitized_text = text
    detected_secrets_map = {}
    total_redactions = 0
    
    for category, (pattern, replacement) in SECRET_PATTERNS.items():
        matches = pattern.findall(sanitized_text)
        if matches:
            count = len(matches)
            detected_secrets_map[category] = count
            total_redactions += count
            sanitized_text = pattern.sub(replacement, sanitized_text)
            
    redaction_items = [
        RedactionItem(category=cat, count=cnt)
        for cat, cnt in detected_secrets_map.items()
    ]
    
    blocked = not allowed
    reasons = [reason] if not allowed else []
    
    return ScanResult(
        original_text=text,
        sanitized_text=sanitized_text,
        detected_secrets=redaction_items,
        redaction_count=total_redactions,
        blocked=blocked,
        reasons=reasons
    )
