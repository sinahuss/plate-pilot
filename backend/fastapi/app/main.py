"""
FastAPI application entry point for Plate Pilot AI Service.
Handles AI-powered exercise recommendations and swapping (to be implemented in v0.4.0).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.config import settings

# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI/LLM microservice for intelligent exercise recommendations and personalization",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """
    Root endpoint - API information.
    """
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "message": "Plate Pilot AI Service is operational. Visit /docs for API documentation.",
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    Used by load balancers and monitoring systems.
    """
    return {
        "status": "ok",
        "service": settings.app_name,
        "version": settings.app_version,
        "timestamp": datetime.utcnow().isoformat(),
    }


# Startup event
@app.on_event("startup")
async def startup_event():
    """
    Actions to perform on application startup.
    """
    print(f"🚀 {settings.app_name} v{settings.app_version} starting up...")
    print(f"📍 Running on http://{settings.host}:{settings.port}")
    print(f"📚 API documentation available at http://{settings.host}:{settings.port}/docs")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """
    Actions to perform on application shutdown.
    """
    print(f"🛑 {settings.app_name} shutting down...")

