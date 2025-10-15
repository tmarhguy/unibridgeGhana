"""Institutions router - placeholder."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_institutions():
    """List available institutions - placeholder."""
    return {"message": "Institutions endpoint - coming soon"}
