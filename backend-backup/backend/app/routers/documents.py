"""Documents router - placeholder."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_documents():
    """List user documents - placeholder."""
    return {"message": "Documents endpoint - coming soon"}
