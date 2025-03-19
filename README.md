# UC ORB - University of California Open Repository Browser

UC ORB (University of California Open Repository Browser) is a discovery tool designed to map and classify open source projects across the University of California system. The application provides a unified interface for users to search, browse, and explore repositories developed across the ten UC campuses.

![UC ORB](/screenshots/uc-orb-preview.png)

## Project Overview

UC ORB aims to increase the visibility and accessibility of open source research software developed by UC faculty, researchers, and students. By bringing these repositories together in one searchable platform, UC ORB facilitates collaboration between researchers, showcases innovative work, and promotes open science practices.

## Features

- **Repository Browsing**: View all repositories in a responsive grid layout
- **Advanced Search & Filtering**: Search repositories by keywords and filter by campus, programming language, and topics
- **Detailed Repository Views**: Access comprehensive information about each repository including description, stars, forks, languages, and topics
- **Campus Information**: Learn about repositories from specific UC campuses
- **Responsive Design**: Optimized for both desktop and mobile experiences

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: TailwindCSS with custom UC color theme
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Fetch API**: Native browser fetch for API requests

### Backend
- **Framework**: FastAPI (Python)
- **ASGI Server**: Uvicorn
- **Data Validation**: Pydantic
- **Configuration**: python-dotenv for environment variable management

## Project Structure

```
uc-orb/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/        # Next.js app directory
│   │   │   ├── about/              # About page
│   │   │   ├── repositories/       # Repositories listing page
│   │   │   │   └── [id]/           # Repository detail page
│   │   │   ├── globals.css         # Global styles
│   │   │   ├── layout.tsx          # Root layout component
│   │   │   └── page.tsx            # Home page component
│   │   └── styles/     # CSS styles
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── next.config.js              # Next.js configuration
│   ├── package.json                # Frontend dependencies
│   └── tsconfig.json               # TypeScript configuration
│
└── backend/            # FastAPI backend application
    ├── app/
    │   ├── routers/    # API route handlers
    │   │   └── repositories.py     # Repository API endpoints
    │   ├── data/       # Data sources
    │   │   └── repositories.py     # Sample repository data
    │   ├── models/     # Data models
    │   │   └── repository.py       # Repository model
    │   └── main.py     # FastAPI application entry point
    └── requirements.txt            # Backend dependencies
```

## Installation and Setup

### Prerequisites
- Python 3.8+ (backend)
- Node.js 18+ (frontend)
- npm or yarn (frontend package management)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd uc-orb/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   Note: If you encounter any issues with the virtual environment, you can also run:
   ```bash
   python -m pip install --user fastapi uvicorn pydantic python-dotenv
   /Users/<username>/Library/Python/<version>/bin/uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd uc-orb/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:3000`

## API Documentation

The backend provides the following API endpoints:

### Repositories

- **GET /api/repositories/**
  - Retrieves a list of repositories
  - Query Parameters:
    - `search`: Filter repositories by name or description
    - `campus`: Filter by campus name
    - `language`: Filter by programming language
    - `topic`: Filter by topic
  - Response: Array of Repository objects

- **GET /api/repositories/campuses**
  - Retrieves a list of unique campus names
  - Response: Array of strings

- **GET /api/repositories/languages**
  - Retrieves a list of unique programming languages
  - Response: Array of strings

- **GET /api/repositories/topics**
  - Retrieves a list of unique repository topics
  - Response: Array of strings

- **GET /api/repositories/{repo_id}**
  - Retrieves details for a specific repository
  - Path Parameters:
    - `repo_id`: The unique identifier of the repository
  - Response: Repository object
  - Error: 404 if repository not found

### Repository Data Model

```typescript
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
```

## User Interface

### Pages

1. **Home Page**: Introduction to UC ORB with overview and featured repositories
2. **Repositories Page**: Main browsing interface with search and filtering capabilities
3. **Repository Detail Page**: Comprehensive view of a single repository with all metadata
4. **About Page**: Information about the UC ORB project, mission, and team

### UI Components

- **Header**: Navigation and branding
- **Footer**: Links to resources and contact information
- **Repository Card**: Card display for repository preview
- **Search Bar**: Full-text search for repositories
- **Filter Controls**: Dropdowns for campus, language, and topic filtering
- **Breadcrumb Navigation**: Contextual navigation path

## Customization

### UC Theme Colors

The application uses the University of California color palette:
- Primary blue: `#1e6b9e`
- Primary gold: `#ffc72c`

These colors can be customized in the TailwindCSS configuration and global CSS.

### Adding Real Data

Currently, the application uses sample data. To integrate with real repositories:

1. Update the data source in `backend/app/data/repositories.py`
2. Alternatively, implement a database connection (PostgreSQL recommended)
3. Create environment variables for API keys if connecting to GitHub API

## Future Enhancements

Potential improvements for the project:

1. **Authentication**: Add user accounts for saving favorite repositories
2. **Database Integration**: Replace mock data with a PostgreSQL database
3. **GitHub API Integration**: Fetch real-time data from UC GitHub organizations
4. **Advanced Analytics**: Provide insights on repository activity and trends
5. **Contribution Workflow**: Allow users to contribute or suggest repositories

## Development Guidelines

### Code Style

- Frontend: Follow ESLint and Prettier configurations
- Backend: Follow PEP 8 guidelines for Python code

### Testing

- Frontend: Jest and React Testing Library for component tests
- Backend: Pytest for API endpoint testing

### Deployment

The application can be deployed using:
- Frontend: Vercel, Netlify, or Docker
- Backend: Docker container deployed to any cloud provider

## Troubleshooting

### Backend Issues

If you encounter issues with Python virtual environments:

1. Make sure you have the correct Python version installed
2. Try installing packages directly with the `--user` flag:
   ```bash
   python -m pip install --user --break-system-packages fastapi uvicorn pydantic python-dotenv
   ```
3. Use the full path to the uvicorn executable:
   ```bash
   /Users/<username>/Library/Python/<version>/bin/uvicorn app.main:app --reload --port 8000
   ```

### Frontend Issues

If you encounter issues with the frontend:

1. Clear your node_modules and reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Make sure you have the correct Node.js version
3. Check if all required Tailwind plugins are installed:
   ```bash
   npm install @tailwindcss/typography @tailwindcss/forms tailwindcss-animate --save-dev
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- University of California system for inspiration
- Open Source community for tools and libraries
- Contributors and maintainers

---

This README provides a comprehensive overview of the UC ORB project. For detailed documentation, refer to the source code comments and implementation details. 