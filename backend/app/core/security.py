from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from jose import jwt
from app.core.config import settings


def create_token(data: dict[str, Any], expires_delta: timedelta, token_type: str) -> str:
    to_encode = data.copy()
    now = datetime.now(timezone.utc)
    expire = now + expires_delta
    to_encode.update({"exp": expire, "iat": now, "type": token_type})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_access_token(subject: str, extra: Optional[dict[str, Any]] = None) -> str:
    return create_token(
        {"sub": str(subject), **(extra or {})},
        timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        token_type="access",
    )


def create_refresh_token(subject: str, token_id: Optional[str] = None) -> str:
    payload: dict[str, Any] = {"sub": str(subject)}
    if token_id:
        payload["jti"] = token_id
    return create_token(
        payload, timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES), token_type="refresh"
    )
