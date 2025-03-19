from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.repository import Repository
from ..services.repository_service import repository_service

router = APIRouter(prefix="/api/repositories", tags=["Repositories"])

@router.get("/", response_model=List[Repository])
async def get_repositories(
    query: Optional[str] = Query(None, description="Search term for name or description"),
    campus: Optional[str] = Query(None, description="Filter by campus"),
    language: Optional[str] = Query(None, description="Filter by programming language"),
    topic: Optional[str] = Query(None, description="Filter by topic")
):
    """Get repositories with optional filtering."""
    return repository_service.search_repositories(query, campus, language, topic)

@router.get("/campuses", response_model=List[str])
async def get_campuses():
    """Get a list of unique campuses."""
    return repository_service.get_unique_campuses()

@router.get("/languages", response_model=List[str])
async def get_languages():
    """Get a list of unique programming languages."""
    return repository_service.get_unique_languages()

@router.get("/topics", response_model=List[str])
async def get_topics():
    """Get a list of unique topics."""
    return repository_service.get_unique_topics()

@router.get("/{repo_id}", response_model=Repository)
async def get_repository(repo_id: int):
    """Get a repository by its ID."""
    repo = repository_service.get_repository_by_id(repo_id)
    if repo is None:
        raise HTTPException(status_code=404, detail="Repository not found")
    return repo 