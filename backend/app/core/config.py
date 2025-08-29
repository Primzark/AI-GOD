from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List
import os


class Settings(BaseSettings):
    ENV: str = "dev"
    DEBUG: bool = True
    SECRET_KEY: str = "change_me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30

    SQLALCHEMY_DATABASE_URI: str = (
        "postgresql+psycopg://postgres:postgres@localhost:5432/joyfulvibe"
    )

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] | List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    RATE_LIMIT_DEFAULT: str = "60/minute"
    RATE_LIMIT_AUTH: str = "10/minute"

    ADMIN_EMAIL: str = "admin@example.com"
    ADMIN_PASSWORD: str = "admin1234"

    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", ".env")
        env_file_encoding = "utf-8"


settings = Settings()  # type: ignore[call-arg]
