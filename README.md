# 🎵 PurpleBrain - Your Purple Rain AI Workspace 💜

A multi-agent AI orchestration platform inspired by Prince's Purple Rain album, designed for neurodivergent brilliance and advanced visualization workflows.

## 🎭 Features

- **5 Specialized AI Agents**: Research, Fact-Check, Writing, Visionary, and Conductor agents
- **ZBrain Architecture**: Professional sidebar navigation with hierarchical organization  
- **Prince Purple Rain Aesthetics**: Deep purple color palette with paisley patterns and mirror effects
- **Real-time Communication**: Socket.IO powered agent interaction
- **Neurodivergent-Friendly Design**: Mirror surfaces, flowing animations, and telepathic UI elements

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up Environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI and Exa.ai API keys
   ```

3. **Run PurpleBrain**:
   ```bash
   python server.py
   ```

4. **Open Your Workspace**:
   Navigate to `http://localhost:5000`

## 🤖 AI Agents

### Research Agent
- **Persona**: Nobel Laureate Researcher
- **Powered by**: Exa.ai API
- **Capabilities**: Web search, academic research, fact verification, multi-source analysis

### Fact-Check Agent  
- **Persona**: Truth Guardian
- **Purpose**: Combat AI hallucinations
- **Capabilities**: Fact verification, source validation, bias detection, accuracy scoring

### Writing Agent
- **Persona**: Gifted Code-Switcher & Master Wordsmith
- **Quality**: NYT/New Yorker caliber
- **Capabilities**: Code-switching, style adaptation, audience targeting, narrative crafting

### Visionary Agent
- **Persona**: Master of Souls in Data
- **Inspiration**: Frida Kahlo × Kadir Nelson × Banksy × Basquiat
- **Capabilities**: Data visualization, artistic interpretation, soul infusion, mixed media creation

### Conductor Agent
- **Persona**: AI Symphony Conductor  
- **Purpose**: Multi-agent orchestration
- **Capabilities**: Workflow coordination, task delegation, result synthesis

## 🎨 Design Philosophy

"Dearly beloved, we are gathered here today to get through this thing called life" - Prince 💜

This platform celebrates neurodivergent thinking patterns through:
- **Mirror Effects**: Reflecting different perspectives and cognitive styles
- **Paisley Patterns**: Representing the complex, beautiful patterns of neurodivergent minds
- **Purple Rain Aesthetics**: Deep, sophisticated colors that honor Prince's artistic vision
- **Code-Switching Capabilities**: Adapting communication styles for different audiences

## 🔧 API Usage

### Activate Individual Agents
```bash
curl -X POST http://localhost:5000/api/agent/research \
  -H "Content-Type: application/json" \
  -d '{"query": "artificial intelligence trends 2024"}'
```

### Real-time Agent Communication
Connect via Socket.IO for live agent interactions and status updates.

## 🌟 Contributing

Built with love for the neurodivergent community and in honor of Prince's artistic legacy.

---

*"Where AI Agents Dance Like Purple Rain"* 🎵✨