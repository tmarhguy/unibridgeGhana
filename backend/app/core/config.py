"""Application configuration using Pydantic Settings."""

from functools import lru_cache
from typing import List, Literal

from pydantic import Field, validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""
    
    model_config = SettingsConfigDict(
        # env_file=".env",  # Temporarily disabled
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )
    
    # Application
    PROJECT_NAME: str = "UniBridge GH"
    PROJECT_VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: Literal["development", "staging", "production"] = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = Field(
        default="postgresql://unibridge:password@localhost:5432/unibridge_dev",
        description="Database connection URL"
    )
    TEST_DATABASE_URL: str = Field(
        default="postgresql://unibridge:password@localhost:5432/unibridge_test",
        description="Test database connection URL"
    )
    
    # JWT
    JWT_SECRET_KEY: str = Field(
        default="your-super-secret-jwt-key-change-this-in-production",
        description="Secret key for JWT tokens"
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    ALLOWED_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        description="List of allowed CORS origins"
    )
    
    @validator("ALLOWED_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v):
        """Parse CORS origins from string or list."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # File Storage
    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin"
    S3_BUCKET_NAME: str = "unibridge-documents"
    S3_REGION: str = "us-east-1"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Email (for future use)
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    
    # Logging
    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"
    LOG_FORMAT: Literal["json", "text"] = "json"
    
    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_REQUESTS_PER_MINUTE: int = 60
    
    # File Upload
    MAX_FILE_SIZE_MB: int = 10
    ALLOWED_FILE_TYPES: List[str] = Field(default=["pdf", "jpg", "jpeg", "png"])
    
    @validator("ALLOWED_FILE_TYPES", pre=True)
    def assemble_file_types(cls, v):
        """Parse file types from string or list."""
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v
    
    # University Admin
    DEFAULT_UNIVERSITY_ADMIN_PASSWORD: str = "change-this-password"
    
    @property
    def max_file_size_bytes(self) -> int:
        """Convert max file size to bytes."""
        return self.MAX_FILE_SIZE_MB * 1024 * 1024


@lru_cache()
def get_settings() -> Settings:
    """Get cached application settings."""
    return Settings()
