"""Configuration management for UniBridge GH."""

import os
from functools import lru_cache
from typing import List, Optional

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings."""
    
    # Application
    PROJECT_NAME: str = "UniBridge GH"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = Field(default=False, env="DEBUG")
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    
    # Security
    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    
    # Database
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    TEST_DATABASE_URL: Optional[str] = Field(default=None, env="TEST_DATABASE_URL")
    
    # Redis
    REDIS_URL: str = Field(default="redis://localhost:6379/0", env="REDIS_URL")
    
    # Storage
    S3_ENDPOINT: str = Field(default="http://localhost:9000", env="S3_ENDPOINT")
    S3_ACCESS_KEY: str = Field(default="minioadmin", env="S3_ACCESS_KEY")
    S3_SECRET_KEY: str = Field(default="minioadmin", env="S3_SECRET_KEY")
    S3_BUCKET_NAME: str = Field(default="unibridge-documents", env="S3_BUCKET_NAME")
    S3_REGION: str = Field(default="us-east-1", env="S3_REGION")
    
    # Email
    SMTP_HOST: Optional[str] = Field(default=None, env="SMTP_HOST")
    SMTP_PORT: int = Field(default=587, env="SMTP_PORT")
    SMTP_USER: Optional[str] = Field(default=None, env="SMTP_USER")
    SMTP_PASSWORD: Optional[str] = Field(default=None, env="SMTP_PASSWORD")
    EMAIL_FROM: str = Field(default="noreply@unibridge.gh", env="EMAIL_FROM")
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = Field(default=24, env="EMAIL_RESET_TOKEN_EXPIRE_HOURS")
    
    # CORS
    ALLOWED_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        env="ALLOWED_ORIGINS"
    )
    
    # Logging
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    LOG_FORMAT: str = Field(default="json", env="LOG_FORMAT")
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=60, env="RATE_LIMIT_PER_MINUTE")
    
    # File Upload
    MAX_FILE_SIZE: int = Field(default=10 * 1024 * 1024, env="MAX_FILE_SIZE")  # 10MB
    ALLOWED_FILE_TYPES: List[str] = Field(
        default=["application/pdf", "image/jpeg", "image/png", "image/jpg"],
        env="ALLOWED_FILE_TYPES"
    )
    
    # Payment
    PAYMENT_GATEWAY_URL: Optional[str] = Field(default=None, env="PAYMENT_GATEWAY_URL")
    PAYMENT_GATEWAY_KEY: Optional[str] = Field(default=None, env="PAYMENT_GATEWAY_KEY")
    PAYMENT_GATEWAY_SECRET: Optional[str] = Field(default=None, env="PAYMENT_GATEWAY_SECRET")
    
    # Monitoring
    SENTRY_DSN: Optional[str] = Field(default=None, env="SENTRY_DSN")
    ENABLE_METRICS: bool = Field(default=True, env="ENABLE_METRICS")
    
    # Cache
    CACHE_TTL: int = Field(default=3600, env="CACHE_TTL")  # 1 hour
    
    # Application Limits
    MAX_APPLICATIONS_PER_USER: int = Field(default=10, env="MAX_APPLICATIONS_PER_USER")
    MAX_DOCUMENTS_PER_APPLICATION: int = Field(default=5, env="MAX_DOCUMENTS_PER_APPLICATION")
    
    # Security Headers
    ENABLE_SECURITY_HEADERS: bool = Field(default=True, env="ENABLE_SECURITY_HEADERS")
    CONTENT_SECURITY_POLICY: str = Field(
        default="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
        env="CONTENT_SECURITY_POLICY"
    )
    
    # Database Pool
    DB_POOL_SIZE: int = Field(default=20, env="DB_POOL_SIZE")
    DB_MAX_OVERFLOW: int = Field(default=30, env="DB_MAX_OVERFLOW")
    DB_POOL_TIMEOUT: int = Field(default=30, env="DB_POOL_TIMEOUT")
    
    # Background Tasks
    CELERY_BROKER_URL: str = Field(default="redis://localhost:6379/1", env="CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND: str = Field(default="redis://localhost:6379/2", env="CELERY_RESULT_BACKEND")
    
    # WebSocket
    ENABLE_WEBSOCKET: bool = Field(default=False, env="ENABLE_WEBSOCKET")
    WEBSOCKET_URL: str = Field(default="ws://localhost:8000/ws", env="WEBSOCKET_URL")
    
    # Feature Flags
    ENABLE_NOTIFICATIONS: bool = Field(default=True, env="ENABLE_NOTIFICATIONS")
    ENABLE_AUTO_SAVE: bool = Field(default=True, env="ENABLE_AUTO_SAVE")
    ENABLE_REAL_TIME_UPDATES: bool = Field(default=False, env="ENABLE_REAL_TIME_UPDATES")
    
    # Ghana-specific Settings
    DEFAULT_CURRENCY: str = Field(default="GHS", env="DEFAULT_CURRENCY")
    DEFAULT_TIMEZONE: str = Field(default="Africa/Accra", env="DEFAULT_TIMEZONE")
    SUPPORTED_LANGUAGES: List[str] = Field(
        default=["en", "tw"],  # English and Twi
        env="SUPPORTED_LANGUAGES"
    )
    
    # University Integration
    ENABLE_UNIVERSITY_API: bool = Field(default=False, env="ENABLE_UNIVERSITY_API")
    UNIVERSITY_API_TIMEOUT: int = Field(default=30, env="UNIVERSITY_API_TIMEOUT")
    
    # Analytics
    ENABLE_ANALYTICS: bool = Field(default=True, env="ENABLE_ANALYTICS")
    ANALYTICS_RETENTION_DAYS: int = Field(default=365, env="ANALYTICS_RETENTION_DAYS")
    
    # Backup
    ENABLE_AUTO_BACKUP: bool = Field(default=False, env="ENABLE_AUTO_BACKUP")
    BACKUP_SCHEDULE: str = Field(default="0 2 * * *", env="BACKUP_SCHEDULE")  # Daily at 2 AM
    
    # Development
    ENABLE_DEBUG_TOOLBAR: bool = Field(default=False, env="ENABLE_DEBUG_TOOLBAR")
    ENABLE_SWAGGER_UI: bool = Field(default=True, env="ENABLE_SWAGGER_UI")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


# Environment-specific configurations
def get_database_url() -> str:
    """Get database URL based on environment."""
    settings = get_settings()
    if settings.ENVIRONMENT == "test" and settings.TEST_DATABASE_URL:
        return settings.TEST_DATABASE_URL
    return settings.DATABASE_URL


def get_cors_origins() -> List[str]:
    """Get CORS origins based on environment."""
    settings = get_settings()
    if settings.ENVIRONMENT == "development":
        return settings.ALLOWED_ORIGINS + ["http://localhost:3000", "http://127.0.0.1:3000"]
    return settings.ALLOWED_ORIGINS


def get_security_headers() -> dict:
    """Get security headers configuration."""
    settings = get_settings()
    if not settings.ENABLE_SECURITY_HEADERS:
        return {}
    
    return {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Content-Security-Policy": settings.CONTENT_SECURITY_POLICY,
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    }


def is_production() -> bool:
    """Check if running in production environment."""
    return get_settings().ENVIRONMENT == "production"


def is_development() -> bool:
    """Check if running in development environment."""
    return get_settings().ENVIRONMENT == "development"


def is_testing() -> bool:
    """Check if running in testing environment."""
    return get_settings().ENVIRONMENT == "test"
