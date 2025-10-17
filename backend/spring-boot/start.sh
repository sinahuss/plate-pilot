#!/bin/bash

# Plate Pilot API - Startup Script
# This script loads environment variables from .env and starts the Spring Boot application

set -e  # Exit on error

echo "🚀 Starting Plate Pilot API..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo ""
    echo "Please create a .env file from .env.example:"
    echo "  cp .env.example .env"
    echo ""
    echo "Then configure your environment variables (DATABASE_URL, JWT_SECRET, etc.)"
    exit 1
fi

echo "📦 Loading environment variables from .env..."
# Load environment variables using set -a and source
# This method properly handles values with spaces and special characters
# Alternative methods like 'export $(cat .env | xargs)' can fail with complex values
set -a
source .env
set +a

echo "✅ Environment variables loaded"
echo ""

# Verify critical environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Warning: DATABASE_URL is not set!"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  Warning: JWT_SECRET is not set!"
fi

echo "🔨 Starting Spring Boot application..."
echo "📍 API will be available at: http://localhost:${SERVER_PORT:-8080}/api"
echo "📖 Swagger UI: http://localhost:${SERVER_PORT:-8080}/api/swagger-ui.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the application
./gradlew bootRun

