"""Applications router - placeholder."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_applications():
    """List user applications - placeholder."""
    return {"message": "Applications endpoint - coming soon"}
