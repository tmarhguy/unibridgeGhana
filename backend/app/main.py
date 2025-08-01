"""
UniBridge GH Backend - Main FastAPI Application

This is the main application entry point for the UniBridge GH backend API.
It provides a unified application platform for Ghanaian tertiary admissions.
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

import structlog
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.config import get_settings
from app.core.logging import setup_logging
from app.db.session import create_db_and_tables
from app.routers import api_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan events."""
    # Startup
    logger = structlog.get_logger()
    logger.info("Starting UniBridge GH Backend")
    
    # Initialize database
    await create_db_and_tables()
    logger.info("Database initialized")
    
    yield
    
    # Shutdown
    logger.info("Shutting down UniBridge GH Backend")


def create_application() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()
    
    # Setup logging
    setup_logging(settings.LOG_LEVEL, settings.LOG_FORMAT)
    
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION,
        description="Unified application platform for Ghanaian tertiary admissions",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url=f"{settings.API_V1_STR}/docs",
        redoc_url=f"{settings.API_V1_STR}/redoc",
        lifespan=lifespan,
    )
    
    # Set all CORS enabled origins
    if settings.ALLOWED_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.ALLOWED_ORIGINS,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    
    # Add trusted host middleware for security
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["localhost", "127.0.0.1", "*.unibridge.gh"]
    )
    
    # Include API router
    app.include_router(api_router, prefix=settings.API_V1_STR)
    
    return app


app = create_application()


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "UniBridge GH Backend API",
        "version": get_settings().PROJECT_VERSION,
        "docs": f"{get_settings().API_V1_STR}/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


def main() -> None:
    """Run the application."""
    settings = get_settings()
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )


if __name__ == "__main__":
    main()
