import json
import os
from typing import List, Optional
from ..models.repository import Repository

class RepositoryService:
    def __init__(self):
        # Define the path to the JSON file
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.data_file = os.path.join(current_dir, "..", "data", "repositories.json")
        
    def get_all_repositories(self) -> List[Repository]:
        """Get all repositories from the data source."""
        with open(self.data_file, "r") as f:
            data = json.load(f)
        return [Repository(**repo) for repo in data]
    
    def get_repository_by_id(self, repo_id: int) -> Optional[Repository]:
        """Get a repository by its ID."""
        repos = self.get_all_repositories()
        for repo in repos:
            if repo.id == repo_id:
                return repo
        return None
    
    def search_repositories(self, query: str = None, campus: str = None, 
                           language: str = None, topic: str = None) -> List[Repository]:
        """Search repositories based on multiple criteria."""
        repos = self.get_all_repositories()
        filtered_repos = repos
        
        if query:
            query = query.lower()
            filtered_repos = [
                repo for repo in filtered_repos 
                if query in repo.name.lower() or query in repo.description.lower()
            ]
            
        if campus:
            filtered_repos = [
                repo for repo in filtered_repos 
                if campus.lower() in repo.campus.lower()
            ]
            
        if language:
            filtered_repos = [
                repo for repo in filtered_repos 
                if language.lower() == repo.language.lower()
            ]
            
        if topic:
            filtered_repos = [
                repo for repo in filtered_repos 
                if any(topic.lower() in t.lower() for t in repo.topics)
            ]
            
        return filtered_repos
    
    def get_unique_campuses(self) -> List[str]:
        """Get a list of unique campuses."""
        repos = self.get_all_repositories()
        return sorted(list(set(repo.campus for repo in repos)))
    
    def get_unique_languages(self) -> List[str]:
        """Get a list of unique programming languages."""
        repos = self.get_all_repositories()
        return sorted(list(set(repo.language for repo in repos)))
    
    def get_unique_topics(self) -> List[str]:
        """Get a list of unique topics."""
        repos = self.get_all_repositories()
        all_topics = []
        for repo in repos:
            all_topics.extend(repo.topics)
        return sorted(list(set(all_topics)))

repository_service = RepositoryService() 