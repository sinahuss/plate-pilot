"""
Configuration module for FastAPI application.
Loads environment variables and provides application settings.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    
    # Application settings
    app_name: str = "Plate Pilot AI Service"
    app_version: str = "0.1.0"
    
    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS settings
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:19006",  # Expo default port
    ]
    
    # Database settings (optional for this version)
    database_url: Optional[str] = None
    
    # OpenAI settings (will be used in v0.4.0)
    openai_api_key: Optional[str] = None
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )


# Global settings instance
settings = Settings()

