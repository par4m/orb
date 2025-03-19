"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define Repository type
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

export default function RepositoryDetailPage() {
  const params = useParams();
  const repoId = params.id as string;
  
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositoryData = async () => {
      try {
        setIsLoading(true);
        // You can replace with your actual API URL
        const API_URL = 'http://localhost:8000';
        
        const response = await fetch(`${API_URL}/api/repositories/${repoId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Repository not found');
          }
          throw new Error('Failed to fetch repository details');
        }
        
        const data = await response.json();
        setRepository(data);
      } catch (err) {
        console.error('Error fetching repository:', err);
        setError((err as Error).message || 'An error occurred');
        
        // For demo, load mock data if API fails
        if (repoId === '1') {
          setRepository({
            "id": 1,
            "name": "TidyX",
            "description": "A toolkit for data cleaning and preparation in R. This library simplifies the process of working with messy data through a collection of functions designed to handle common data cleaning tasks. It includes tools for handling missing values, detecting and fixing inconsistencies, normalizing text data, and reshaping datasets for analysis.",
            "url": "https://github.com/UCBerkeley/tidyx",
            "stars": 245,
            "forks": 67,
            "language": "R",
            "campus": "UC Berkeley",
            "topics": ["data-science", "statistics", "data-cleaning", "r-library", "data-analysis", "data-transformation"],
            "last_updated": "2023-10-15"
          });
        } else if (repoId === '2') {
          setRepository({
            "id": 2,
            "name": "DeepLearn",
            "description": "Deep learning framework for computer vision applications. This framework provides high-level APIs for building and training deep neural networks, with a focus on image recognition, object detection, and image segmentation tasks. It includes pre-trained models, data augmentation tools, and utilities for model evaluation and visualization.",
            "url": "https://github.com/UCSD/deeplearn",
            "stars": 1290,
            "forks": 321,
            "language": "Python",
            "campus": "UC San Diego",
            "topics": ["deep-learning", "computer-vision", "machine-learning", "neural-networks", "pytorch", "object-detection"],
            "last_updated": "2023-11-20"
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    if (repoId) {
      fetchRepositoryData();
    }
  }, [repoId]);

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

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-600 hover:text-ucblue">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link href="/repositories" className="text-gray-600 hover:text-ucblue ml-1 md:ml-2">
                  Repositories
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-gray-500 ml-1 md:ml-2 truncate max-w-[200px]">
                  {repository?.name || 'Repository Details'}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        {isLoading ? (
          <div className="text-center py-20">
            <p>Loading repository information...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Error</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <Link 
              href="/repositories" 
              className="inline-block bg-ucblue hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Back to Repositories
            </Link>
          </div>
        ) : repository ? (
          <div>
            {/* Repository Header */}
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-ucblue mb-2">{repository.name}</h1>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repository.stars} stars
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {repository.forks} forks
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Updated {formatDate(repository.last_updated)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {repository.campus}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getLanguageColor(repository.language)}`}>
                    {repository.language}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{repository.description}</p>
              
              <div className="flex items-center space-x-4">
                <a 
                  href={repository.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-ucblue text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
            
            {/* Topics Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {repository.topics.map(topic => (
                  <span 
                    key={topic} 
                    className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Related Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Campus Information</h2>
                <p className="text-gray-700 mb-4">
                  This repository is maintained by {repository.campus}, one of the ten campuses in the University of California system.
                </p>
                <a 
                  href="#" 
                  className="text-ucblue hover:underline font-medium flex items-center"
                >
                  View more repositories from {repository.campus}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Similar Repositories</h2>
                <p className="text-gray-700 mb-4">
                  Explore other repositories with similar topics or from the same campus.
                </p>
                <div className="space-y-2">
                  {repository.topics.slice(0, 3).map(topic => (
                    <a 
                      key={topic}
                      href={`/repositories?topic=${encodeURIComponent(topic)}`} 
                      className="text-ucblue hover:underline font-medium flex items-center"
                    >
                      Find repositories about {topic}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <div className="mb-12">
              <Link 
                href="/repositories" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Repositories
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p>Repository not found</p>
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