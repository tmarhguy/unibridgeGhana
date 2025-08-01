#!/bin/bash

# UniBridge GH - Development Setup Script
# This script sets up the complete development environment

set -e

echo "🚀 Setting up UniBridge GH Development Environment"
echo "=================================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.11+ first."
    exit 1
fi

echo "✅ All prerequisites are installed"

# Set up environment files
echo "⚙️  Setting up environment files..."

# Backend environment
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "ℹ️  backend/.env already exists"
fi

# Frontend environment
if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local 2>/dev/null || echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > frontend/.env.local
    echo "✅ Created frontend/.env.local"
else
    echo "ℹ️  frontend/.env.local already exists"
fi

# Start infrastructure services
echo "🐳 Starting infrastructure services..."
docker-compose up -d postgres redis minio

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Backend setup
echo "🐍 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -e .[dev]

# Run database migrations
echo "🗄️  Running database migrations..."
alembic upgrade head || echo "⚠️  Database migrations skipped (will be created when backend starts)"

cd ..

# Frontend setup
echo "⚛️  Setting up frontend..."
cd frontend

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

cd ..

# Start all services
echo "🚀 Starting all services..."
docker-compose up -d

echo ""
echo "🎉 Setup complete! UniBridge GH is now running:"
echo ""
echo "🌐 Frontend:        http://localhost:3000"
echo "🔧 Backend API:     http://localhost:8000"
echo "📚 API Docs:        http://localhost:8000/api/v1/docs"
echo "🗄️  Database:       postgresql://unibridge:password@localhost:5432/unibridge_dev"
echo "📁 MinIO Console:   http://localhost:9001 (admin/admin)"
echo "🔑 Redis:           redis://localhost:6379/0"
echo ""
echo "💡 Useful commands:"
echo "   docker-compose logs -f          # View all logs"
echo "   docker-compose logs -f backend  # View backend logs only"
echo "   docker-compose stop             # Stop all services"
echo "   docker-compose down             # Stop and remove containers"
echo ""
echo "📖 Next steps:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Check the API documentation at http://localhost:8000/api/v1/docs"
echo "   3. Review the literature.md file for the development roadmap"
echo ""
echo "Happy coding! 🚀"
