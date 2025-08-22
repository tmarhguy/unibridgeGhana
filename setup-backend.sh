#!/bin/bash

echo "🚀 Setting up UniBridge Ghana Backend..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "📦 Starting database services..."
docker-compose up -d postgres redis minio

echo "⏳ Waiting for services to initialize..."
sleep 10

echo "🐍 Setting up Python environment..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file
echo "⚙️ Creating environment configuration..."
cat > .env << EOF
DATABASE_URL=postgresql://unibridge:password@localhost:5432/unibridge_dev
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=true
ENVIRONMENT=development
ALLOWED_ORIGINS=["http://localhost:3000","http://127.0.0.1:3000"]
EOF

# Run database migrations
echo "🗄️ Setting up database..."
alembic upgrade head

# Create a test user
echo "👤 Creating test user..."
python3 -c "
import asyncio
import sys
sys.path.append('.')
from app.db.session import get_session
from app.services.user import UserService
from app.schemas.auth import UserCreate

async def create_test_user():
    async for session in get_session():
        try:
            user_data = UserCreate(
                email='test@unibridge.gh',
                password='password123',
                first_name='Test',
                last_name='User',
                phone='+233 24 123 4567',
                role='STUDENT'
            )
            user = await UserService.create_user(session, user_data)
            print(f'✅ Created test user: {user.email}')
        except Exception as e:
            print(f'⚠️ User might already exist: {e}')

asyncio.run(create_test_user())
"

echo "🚀 Starting backend server..."
echo "📍 Backend will be available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/api/v1/docs"
echo ""
echo "🔑 Test Credentials:"
echo "   Email: test@unibridge.gh"
echo "   Password: password123"
echo ""
echo "Press Ctrl+C to stop the server"

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 