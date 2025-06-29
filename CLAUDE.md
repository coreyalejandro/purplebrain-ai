# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend (Python Flask)
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python server.py

# Quick start (automated setup)
./start.sh
```

### Frontend (Vue.js + Electron)
```bash
# Install Node.js dependencies
npm install

# Run development server (Vite)
npm run dev

# Run Electron desktop app
npm run electron
npm run electron-dev  # With hot reload

# Build for production
npm run build
npm run dist  # Build Electron app
```

### Environment Setup
- Copy `.env.example` to `.env`
- Configure required API keys:
  - `OPENAI_API_KEY` - For AI processing
  - `EXA_API_KEY` - For research capabilities
  - `SECRET_KEY` - Flask session security

## Architecture Overview

### Multi-Agent System
PurpleBrain is a hybrid desktop/web application featuring 5 specialized AI agents:

**Backend Agents (Python - server.py)**:
- `ResearchAgent` - Nobel laureate-level research using Exa.ai API
- `FactCheckAgent` - Truth verification and hallucination detection
- `WritingAgent` - Linguistic code-switching with NYT/New Yorker caliber
- `VisionaryAgent` - Artistic data visualization inspired by famous artists
- `ConductorAgent` - Multi-agent orchestration and workflow management

**Frontend Interfaces (JavaScript - src/agents/)**:
- Mirror the backend agents with rich UI interactions
- Handle user input and display formatted results
- Integrate with desktop environment styling

### Communication Patterns
- **HTTP REST API**: `/api/agent/<agent_name>` for direct agent activation
- **WebSocket (Socket.IO)**: Real-time bidirectional communication
- **Conductor Workflows**: Sequential agent coordination (research → fact-check → writing → visualization)

### Technology Stack
- **Backend**: Flask + Socket.IO + asyncio for concurrent processing
- **Frontend**: Vue.js 3 + Electron for desktop experience
- **Build System**: Vite for fast development and building
- **Styling**: SCSS with Prince-inspired purple palette
- **Visualization**: Three.js for 3D, D3.js for data visualization

## Project Structure

```
purplebrain/
├── server.py              # Main Flask server with all agent classes
├── src/
│   ├── app.js            # Desktop environment main class
│   ├── main.js           # Electron main process
│   ├── agents/           # Frontend agent interfaces
│   │   ├── research/     # Research agent UI and logic
│   │   ├── factcheck/    # Fact-checking agent
│   │   ├── writing/      # Writing agent
│   │   └── visionary/    # Visualization agent
│   └── styles/           # Prince-themed SCSS styling
├── public/               # Static assets and HTML entry points
├── requirements.txt      # Python dependencies
├── package.json         # Node.js dependencies and scripts
└── vite.config.js       # Vite build configuration
```

## Development Workflow

### Adding New Agents
1. **Backend**: Create new agent class inheriting from `PurpleBrainAgent` in `server.py`
2. **Frontend**: Create corresponding UI component in `src/agents/`
3. **Registration**: Add to agents dictionary and update API endpoints
4. **UI Integration**: Add agent card to desktop environment

### API Integration
- All agents use async/await pattern for non-blocking operations
- OpenAI integration for AI processing (currently using older API format)
- Exa.ai API for advanced research capabilities (with mock fallback)
- Error handling with comprehensive logging

### Styling and Theming
- Prince-inspired purple color palette with gold accents
- Neurodivergent-friendly design with mirror effects and paisley patterns
- Animated transitions and visual feedback systems
- Desktop environment with theatrical agent activation

## Key Features

### Cultural Authenticity
- WritingAgent incorporates linguistic code-switching capabilities
- VisionaryAgent draws inspiration from diverse artistic traditions
- Interface celebrates neurodivergent thinking patterns

### Technical Innovation
- Hybrid architecture supporting both web and desktop interfaces
- Real-time agent communication with WebSocket support
- Sophisticated workflow orchestration via ConductorAgent
- Memory systems for agent learning and context retention

### User Experience
- Mirror cursor effects and shimmer animations
- Keyboard shortcuts (Cmd+P for Prince mode, Cmd+M for Mirror mode)
- Theatrical agent activation with personalized messages
- Rich visual feedback for all user interactions