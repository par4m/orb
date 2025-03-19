from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import repositories

app = FastAPI(
    title="UC ORB API",
    description="API for the University of California Open Source Repository Browser",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(repositories.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the UC ORB API",
        "docs": "/docs",
        "openapi": "/openapi.json"
    } 