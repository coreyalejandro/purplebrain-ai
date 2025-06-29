#!/bin/bash

# PurpleBrain Startup Script
# 🎵 Your Purple Rain AI Workspace 💜

echo "🎵 Starting PurpleBrain - Your Purple Rain AI Workspace 💜"
echo "🧠 Celebrating Neurodivergent Brilliance"
echo "🎭 Where AI Agents Dance Like Purple Rain"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env and add your API keys before continuing."
    echo "   - OpenAI API Key"
    echo "   - Exa.ai API Key"
    echo ""
    read -p "Press Enter when you've configured your .env file..."
fi

echo ""
echo "🚀 Launching PurpleBrain Server..."
echo "🌐 Open http://localhost:8000 in your browser"
echo ""

# Start the server
python server.py