from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Repository(BaseModel):
    id: int
    name: str
    description: str
    url: str
    stars: int
    forks: int
    language: str
    campus: str
    topics: List[str]
    last_updated: str
    
class RepositoryFilter(BaseModel):
    query: Optional[str] = None
    campus: Optional[str] = None
    language: Optional[str] = None
    topic: Optional[str] = None 