#!/bin/bash

# Green Gramam Setup Script
# This script helps you set up the complete authentication system

echo "🌱 Green Gramam Setup Assistant 🌱"
echo "=================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please create a .env file with your Supabase credentials:"
    echo ""
    echo "VITE_SUPABASE_URL=https://your-project.supabase.co"
    echo "VITE_SUPABASE_ANON_KEY=your-anon-key-here"
    echo ""
    exit 1
fi

echo "✅ .env file found"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies ready"

# Start development server
echo "🚀 Starting development server..."
echo ""
echo "Next steps:"
echo "1. Set up your Supabase database using setup_database.sql"
echo "2. Follow the TESTING_GUIDE.md for complete testing"
echo "3. Visit http://localhost:5174/ to test the app"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev