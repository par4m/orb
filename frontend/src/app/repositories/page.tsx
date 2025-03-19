"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define types
interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  campus: string;
  topics: string[];
  last_updated: string;
}

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [campuses, setCampuses] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Fetch repositories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // You can replace with your actual API URL
        const API_URL = 'http://localhost:8000';
        
        // Fetch repositories
        const reposResponse = await fetch(`${API_URL}/api/repositories/`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        setRepositories(reposData);
        setFilteredRepos(reposData);
        
        // Fetch filter options
        const campusesResponse = await fetch(`${API_URL}/api/repositories/campuses`);
        if (!campusesResponse.ok) throw new Error('Failed to fetch campuses');
        const campusesData = await campusesResponse.json();
        setCampuses(campusesData);
        
        const languagesResponse = await fetch(`${API_URL}/api/repositories/languages`);
        if (!languagesResponse.ok) throw new Error('Failed to fetch languages');
        const languagesData = await languagesResponse.json();
        setLanguages(languagesData);
        
        const topicsResponse = await fetch(`${API_URL}/api/repositories/topics`);
        if (!topicsResponse.ok) throw new Error('Failed to fetch topics');
        const topicsData = await topicsResponse.json();
        setTopics(topicsData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load repositories. Please try again later.');
        
        // For demo, load mock data if API fails
        // In the real app, you'd have better error handling
        const mockData = [
          {
            "id": 1,
            "name": "TidyX",
            "description": "A toolkit for data cleaning and preparation in R",
            "url": "https://github.com/UCBerkeley/tidyx",
            "stars": 245,
            "forks": 67,
            "language": "R",
            "campus": "UC Berkeley",
            "topics": ["data-science", "statistics", "data-cleaning"],
            "last_updated": "2023-10-15"
          },
          {
            "id": 2,
            "name": "DeepLearn",
            "description": "Deep learning framework for computer vision applications",
            "url": "https://github.com/UCSD/deeplearn",
            "stars": 1290,
            "forks": 321,
            "language": "Python",
            "campus": "UC San Diego",
            "topics": ["deep-learning", "computer-vision", "machine-learning"],
            "last_updated": "2023-11-20"
          }
        ];
        setRepositories(mockData);
        setFilteredRepos(mockData);
        setCampuses(['UC Berkeley', 'UC San Diego']);
        setLanguages(['R', 'Python']);
        setTopics(['data-science', 'statistics', 'data-cleaning', 'deep-learning', 'computer-vision', 'machine-learning']);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter repositories based on search and filters
  useEffect(() => {
    let filtered = [...repositories];
    
    // Apply text search
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        repo =>
          repo.name.toLowerCase().includes(query) ||
          repo.description.toLowerCase().includes(query)
      );
    }
    
    // Apply campus filter
    if (selectedCampus) {
      filtered = filtered.filter(repo => repo.campus === selectedCampus);
    }
    
    // Apply language filter
    if (selectedLanguage) {
      filtered = filtered.filter(repo => repo.language === selectedLanguage);
    }
    
    // Apply topic filter
    if (selectedTopic) {
      filtered = filtered.filter(repo => repo.topics.includes(selectedTopic));
    }
    
    setFilteredRepos(filtered);
  }, [repositories, searchQuery, selectedCampus, selectedLanguage, selectedTopic]);

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCampus('');
    setSelectedLanguage('');
    setSelectedTopic('');
  };

  // Get language badge color
  const getLanguageColor = (language: string) => {
    const colors: {[key: string]: string} = {
      'Python': 'bg-blue-100 text-blue-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'R': 'bg-green-100 text-green-800',
      'C++': 'bg-purple-100 text-purple-800',
      'Julia': 'bg-pink-100 text-pink-800'
    };
    
    return colors[language] || 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-ucblue">UC ORB</h1>
          <nav className="space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-ucblue transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/repositories" 
              className="text-ucblue font-medium"
            >
              Repositories
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-ucblue transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-ucblue">UC Open Source Repositories</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="space-y-4">
            {/* Search input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search repositories..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ucblue focus:border-ucblue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Campus filter */}
              <div>
                <label htmlFor="campus" className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                <select
                  id="campus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ucblue focus:border-ucblue"
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                >
                  <option value="">All Campuses</option>
                  {campuses.map(campus => (
                    <option key={campus} value={campus}>{campus}</option>
                  ))}
                </select>
              </div>
              
              {/* Language filter */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  id="language"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ucblue focus:border-ucblue"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="">All Languages</option>
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
              
              {/* Topic filter */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <select
                  id="topic"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ucblue focus:border-ucblue"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option value="">All Topics</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ucblue"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Results</h2>
          <p className="text-gray-600">{filteredRepos.length} repositories found</p>
        </div>
        
        {/* Repository Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading repositories...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map(repo => (
              <Link href={`/repositories/${repo.id}`} key={repo.id} className="group">
                <div className="uc-card h-full p-6 group-hover:border-ucblue flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-ucblue mb-2 group-hover:underline">{repo.name}</h3>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{repo.campus}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{repo.description}</p>
                  </div>
                  
                  <div className="mt-auto">
                    {/* Topics */}
                    <div className="mb-3 flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span key={topic} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-500 border border-gray-200">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded ${getLanguageColor(repo.language)}`}>
                        {repo.language}
                      </span>
                      <div className="flex items-center space-x-3 text-gray-600 text-sm">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {repo.stars}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No repositories found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UC ORB</h3>
              <p className="text-gray-300">
                University of California Open Source Repository Browser is a discovery tool designed to map and classify open source projects across the UC system.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/repositories" className="text-gray-300 hover:text-white">Repositories</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com" className="text-gray-300 hover:text-white">GitHub</a></li>
                <li><a href="https://opensource.org" className="text-gray-300 hover:text-white">Open Source Initiative</a></li>
                <li><a href="https://www.universityofcalifornia.edu/" className="text-gray-300 hover:text-white">UC System</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <p className="text-gray-300 mb-2">
                Have questions or feedback? Get in touch with the UC ORB team.
              </p>
              <a href="mailto:contact@ucorb.example.edu" className="text-ucgold hover:underline">
                contact@ucorb.example.edu
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} UC ORB Demo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 