#!/bin/bash

# UniBridge Ghana - GitHub Pages Setup Script
echo "🚀 Setting up UniBridge Ghana for GitHub Pages deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build static site
echo "🏗️ Building static site..."
npm run build:static

# Create .nojekyll file to bypass Jekyll processing
echo "🔧 Creating .nojekyll file..."
touch ../docs/.nojekyll

echo "✅ Setup complete!"
echo ""
echo "🌐 Your site is ready for GitHub Pages deployment"
echo "📁 Static files are in: docs/"
echo "🔗 Once deployed, your site will be available at:"
echo "   https://tmarhguy.github.io/unibridgeGhana/"
echo ""
echo "📋 Next steps:"
echo "1. Push your changes to GitHub"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Set source to 'GitHub Actions'"
echo "4. Your site will be automatically deployed!"
