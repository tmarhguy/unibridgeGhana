#!/bin/bash

echo "🎨 Setting up UniBridge Ghana Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "⚙️ Creating frontend environment configuration..."
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NODE_ENV=development
EOF

echo "🚀 Starting frontend development server..."
echo "📍 Frontend will be available at: http://localhost:3000"
echo ""
echo "🔑 Test Credentials:"
echo "   Email: test@unibridge.gh"
echo "   Password: password123"
echo ""
echo "Press Ctrl+C to stop the server"

# Start the development server
npm run dev 