from datetime import datetime, timezone
from typing import Any, Optional
from jose import jwt, JWTError
from app.core.config import settings


def decode_token(token: str) -> Optional[dict[str, Any]]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("exp") and datetime.now(timezone.utc).timestamp() > payload["exp"]:
            return None
        return payload
    except JWTError:
        return None
