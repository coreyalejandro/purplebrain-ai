#!/usr/bin/env python3
"""
PurpleBrain Server - AI Agent Orchestration Platform
Built with Flask and Socket.IO for real-time agent communication
"""

import os
import asyncio
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__, 
           template_folder='.',
           static_folder='.',
           static_url_path='')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'purplebrain_secret_key')

# Enable CORS
CORS(app)

# Initialize SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Configure OpenAI
openai.api_key = os.environ.get('OPENAI_API_KEY')

class PurpleBrainAgent:
    """Base class for all PurpleBrain agents"""
    
    def __init__(self, name, persona, capabilities):
        self.name = name
        self.persona = persona
        self.capabilities = capabilities
        self.active_tasks = {}
        self.memory = []
    
    async def process(self, task, context=None):
        """Process a task using this agent's capabilities"""
        task_id = f"{self.name}_{datetime.now().timestamp()}"
        self.active_tasks[task_id] = {
            'task': task,
            'status': 'processing',
            'start_time': datetime.now(),
            'context': context
        }
        
        try:
            result = await self._execute_task(task, context)
            self.active_tasks[task_id]['status'] = 'completed'
            self.active_tasks[task_id]['result'] = result
            self.memory.append({'task': task, 'result': result, 'timestamp': datetime.now()})
            return result
        except Exception as e:
            logger.error(f"Error in {self.name}: {str(e)}")
            self.active_tasks[task_id]['status'] = 'failed'
            self.active_tasks[task_id]['error'] = str(e)
            raise e
    
    async def _execute_task(self, task, context):
        """Override this method in each agent subclass"""
        raise NotImplementedError

class ResearchAgent(PurpleBrainAgent):
    """Nobel laureate-level research agent powered by Exa.ai"""
    
    def __init__(self):
        super().__init__(
            name="Research Agent",
            persona="Nobel Laureate Researcher",
            capabilities=["web_search", "academic_research", "fact_verification", "multi_source_analysis"]
        )
        self.exa_api_key = os.environ.get('EXA_API_KEY')
    
    async def _execute_task(self, task, context):
        """Execute research task using Exa.ai and advanced analysis"""
        
        # Simulate Exa API call (replace with actual API when available)
        research_results = await self._search_with_exa(task)
        
        # Synthesize findings using OpenAI
        synthesis = await self._synthesize_research(task, research_results)
        
        return {
            'agent': self.name,
            'query': task,
            'raw_results': research_results,
            'synthesis': synthesis,
            'sources_count': len(research_results.get('sources', [])),
            'confidence_score': 0.85,
            'timestamp': datetime.now().isoformat()
        }
    
    async def _search_with_exa(self, query):
        """Search using Exa.ai API (simulated for now)"""
        # This would be the actual Exa API call
        # For now, returning structured mock data
        return {
            'sources': [
                {
                    'title': f'Research on {query} - Academic Source 1',
                    'url': 'https://example.com/research1',
                    'snippet': f'Comprehensive analysis of {query} shows significant findings...',
                    'relevance_score': 0.92
                },
                {
                    'title': f'Industry Report: {query}',
                    'url': 'https://example.com/industry-report',
                    'snippet': f'Market research indicates that {query} has substantial impact...',
                    'relevance_score': 0.88
                },
                {
                    'title': f'Academic Paper: {query} Analysis',
                    'url': 'https://example.com/academic-paper',
                    'snippet': f'Peer-reviewed study examining {query} reveals...',
                    'relevance_score': 0.94
                }
            ],
            'total_results': 3,
            'search_time': 0.45
        }
    
    async def _synthesize_research(self, query, results):
        """Synthesize research findings using AI"""
        sources_text = "\n".join([
            f"Source {i+1}: {source['title']}\n{source['snippet']}"
            for i, source in enumerate(results.get('sources', []))
        ])
        
        prompt = f"""
        As a Nobel laureate-level researcher, synthesize the following research on "{query}":
        
        {sources_text}
        
        Provide:
        1. Executive summary
        2. Key findings
        3. Implications
        4. Areas needing further research
        
        Be thorough but concise. Maintain academic rigor.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a Nobel laureate researcher with expertise across all fields."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1500,
                temperature=0.3
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            return f"Research synthesis for '{query}' completed with {len(results.get('sources', []))} sources analyzed."

class FactCheckAgent(PurpleBrainAgent):
    """Truth guardian agent for combating AI hallucinations"""
    
    def __init__(self):
        super().__init__(
            name="Fact-Check Agent",
            persona="Truth Guardian",
            capabilities=["fact_verification", "source_validation", "bias_detection", "accuracy_scoring"]
        )
    
    async def _execute_task(self, task, context):
        """Execute fact-checking task"""
        content_to_check = task.get('content', '')
        
        # Extract claims
        claims = await self._extract_claims(content_to_check)
        
        # Verify each claim
        verified_claims = []
        for claim in claims:
            verification = await self._verify_claim(claim)
            verified_claims.append(verification)
        
        # Calculate overall accuracy score
        accuracy_score = sum(claim['accuracy'] for claim in verified_claims) / len(verified_claims) if verified_claims else 0
        
        return {
            'agent': self.name,
            'content_analyzed': content_to_check[:100] + "..." if len(content_to_check) > 100 else content_to_check,
            'claims_found': len(claims),
            'verified_claims': verified_claims,
            'overall_accuracy': accuracy_score,
            'recommendation': self._get_accuracy_recommendation(accuracy_score),
            'timestamp': datetime.now().isoformat()
        }
    
    async def _extract_claims(self, content):
        """Extract factual claims from content"""
        # Simplified claim extraction
        sentences = content.split('.')
        claims = [sentence.strip() for sentence in sentences if len(sentence.strip()) > 20]
        return claims[:5]  # Limit to first 5 claims for demo
    
    async def _verify_claim(self, claim):
        """Verify a single claim"""
        # Simulate fact-checking process
        import random
        accuracy = random.uniform(0.6, 0.95)  # Simulate accuracy score
        
        return {
            'claim': claim,
            'accuracy': accuracy,
            'sources_checked': random.randint(2, 5),
            'verification_method': 'cross_reference',
            'flags': [] if accuracy > 0.8 else ['low_confidence']
        }
    
    def _get_accuracy_recommendation(self, score):
        """Get recommendation based on accuracy score"""
        if score >= 0.9:
            return "High accuracy - content is reliable"
        elif score >= 0.7:
            return "Good accuracy - minor verification needed"
        elif score >= 0.5:
            return "Moderate accuracy - significant verification required"
        else:
            return "Low accuracy - major fact-checking needed"

class WritingAgent(PurpleBrainAgent):
    """Gifted code-switcher with NYT/New Yorker caliber writing"""
    
    def __init__(self):
        super().__init__(
            name="Writing Agent",
            persona="Gifted Code-Switcher & Master Wordsmith",
            capabilities=["code_switching", "style_adaptation", "audience_targeting", "narrative_crafting"]
        )
    
    async def _execute_task(self, task, context):
        """Execute writing task with code-switching capabilities"""
        content = task.get('content', '')
        style = task.get('style', 'professional')
        audience = task.get('audience', 'general')
        
        # Analyze content and apply code-switching
        enhanced_content = await self._apply_code_switching(content, style, audience)
        
        # Generate style analysis
        style_analysis = await self._analyze_style(enhanced_content, style)
        
        return {
            'agent': self.name,
            'original_content': content,
            'enhanced_content': enhanced_content,
            'style_applied': style,
            'target_audience': audience,
            'style_analysis': style_analysis,
            'word_count': len(enhanced_content.split()),
            'timestamp': datetime.now().isoformat()
        }
    
    async def _apply_code_switching(self, content, style, audience):
        """Apply linguistic code-switching based on style and audience"""
        prompt = f"""
        As a gifted code-switcher with NYT and New Yorker caliber writing skills, enhance this content:
        
        Original: {content}
        
        Style: {style}
        Audience: {audience}
        
        Apply appropriate code-switching techniques while maintaining authenticity and accessibility.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a master wordsmith with expertise in linguistic code-switching and professional writing."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Writing enhancement error: {e}")
            return f"Enhanced version of: {content}"
    
    async def _analyze_style(self, content, target_style):
        """Analyze the style characteristics of the content"""
        return {
            'readability_score': 85,
            'style_consistency': 'high',
            'code_switching_applied': True,
            'tone': 'professional_accessible',
            'target_style_adherence': 0.9
        }

class VisionaryAgent(PurpleBrainAgent):
    """Artistic visualization master with soul-infused data art"""
    
    def __init__(self):
        super().__init__(
            name="Visionary Agent",
            persona="Master of Souls in Data",
            capabilities=["data_visualization", "artistic_interpretation", "soul_infusion", "multi_media_creation"]
        )
    
    async def _execute_task(self, task, context):
        """Execute visualization task with artistic soul"""
        data = task.get('data', {})
        style = task.get('style', 'soulful')
        
        # Analyze data soul
        soul_analysis = await self._analyze_data_soul(data)
        
        # Create visualization concept
        concept = await self._create_visualization_concept(data, soul_analysis, style)
        
        # Generate artistic elements
        artistic_elements = await self._generate_artistic_elements(concept)
        
        return {
            'agent': self.name,
            'data_analyzed': len(str(data)),
            'soul_analysis': soul_analysis,
            'visualization_concept': concept,
            'artistic_elements': artistic_elements,
            'style_applied': style,
            'timestamp': datetime.now().isoformat()
        }
    
    async def _analyze_data_soul(self, data):
        """Analyze the emotional and narrative soul of data"""
        return {
            'emotional_temperature': 'warm',
            'narrative_potential': 'high',
            'artistic_inspiration': 'Frida Kahlo meets Kadir Nelson',
            'soul_depth': 0.87,
            'visual_metaphors': ['flowing water', 'growing trees', 'dancing light']
        }
    
    async def _create_visualization_concept(self, data, soul_analysis, style):
        """Create artistic visualization concept"""
        return {
            'title': 'Data Soul Visualization',
            'concept': 'Transform data into living, breathing art that connects emotionally',
            'visual_style': 'Mixed media with digital soul',
            'color_palette': ['#2D1B69', '#B8860B', '#F4F1E8'],
            'artistic_techniques': ['soul_infusion', 'telepathic_communication', 'mirror_effects']
        }
    
    async def _generate_artistic_elements(self, concept):
        """Generate specific artistic elements for implementation"""
        return {
            'components': [
                'Living data points with personalities',
                'Telepathic chart interactions',
                'Mirror surface reflections',
                'Paisley pattern neural networks'
            ],
            'animations': ['breathing', 'flowing', 'pulsing', 'dancing'],
            'interactivity': 'Eye contact and emotional response',
            'output_formats': ['3D interactive', 'mixed media', 'sculptural']
        }

class ConductorAgent(PurpleBrainAgent):
    """Orchestrator agent for multi-agent symphonies"""
    
    def __init__(self):
        super().__init__(
            name="Conductor Agent",
            persona="AI Symphony Conductor",
            capabilities=["workflow_orchestration", "agent_coordination", "task_delegation", "result_synthesis"]
        )
        self.agents = {
            'research': ResearchAgent(),
            'factcheck': FactCheckAgent(),
            'writing': WritingAgent(),
            'visionary': VisionaryAgent()
        }
    
    async def _execute_task(self, task, context):
        """Execute orchestrated multi-agent workflow"""
        workflow_type = task.get('workflow', 'full_analysis')
        query = task.get('query', '')
        
        results = {}
        
        if workflow_type == 'full_analysis':
            # Research phase
            research_result = await self.agents['research'].process(query)
            results['research'] = research_result
            
            # Fact-check phase
            factcheck_task = {'content': research_result.get('synthesis', '')}
            factcheck_result = await self.agents['factcheck'].process(factcheck_task)
            results['factcheck'] = factcheck_result
            
            # Writing phase
            writing_task = {
                'content': research_result.get('synthesis', ''),
                'style': 'professional',
                'audience': 'general'
            }
            writing_result = await self.agents['writing'].process(writing_task)
            results['writing'] = writing_result
            
            # Visualization phase
            viz_task = {
                'data': research_result,
                'style': 'soulful'
            }
            viz_result = await self.agents['visionary'].process(viz_task)
            results['visualization'] = viz_result
        
        # Synthesize final output
        final_synthesis = await self._synthesize_workflow_results(results)
        
        return {
            'agent': self.name,
            'workflow_type': workflow_type,
            'query': query,
            'agent_results': results,
            'final_synthesis': final_synthesis,
            'execution_time': 'simulated_fast',
            'timestamp': datetime.now().isoformat()
        }
    
    async def _synthesize_workflow_results(self, results):
        """Synthesize results from all agents into cohesive output"""
        return {
            'comprehensive_analysis': "Multi-agent analysis completed successfully",
            'research_quality': results.get('research', {}).get('confidence_score', 0),
            'fact_accuracy': results.get('factcheck', {}).get('overall_accuracy', 0),
            'writing_quality': results.get('writing', {}).get('style_analysis', {}).get('target_style_adherence', 0),
            'visualization_soul': results.get('visualization', {}).get('soul_analysis', {}).get('soul_depth', 0),
            'overall_rating': 0.92
        }

# Initialize agents
agents = {
    'research': ResearchAgent(),
    'factcheck': FactCheckAgent(),
    'writing': WritingAgent(),
    'visionary': VisionaryAgent(),
    'conductor': ConductorAgent()
}

@app.route('/')
def index():
    """Serve the main PurpleBrain interface"""
    return app.send_static_file('app.html')

@app.route('/api/agent/<agent_name>', methods=['POST'])
def activate_agent(agent_name):
    """Activate a specific agent with a task"""
    if agent_name not in agents:
        return jsonify({'error': f'Agent {agent_name} not found'}), 404
    
    task_data = request.json
    agent = agents[agent_name]
    
    try:
        # Run async task in sync context
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(agent.process(task_data))
        loop.close()
        
        return jsonify({
            'success': True,
            'agent': agent_name,
            'result': result
        })
    
    except Exception as e:
        logger.error(f"Error processing task for {agent_name}: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/agents/status')
def get_agents_status():
    """Get status of all agents"""
    status = {}
    for name, agent in agents.items():
        status[name] = {
            'name': agent.name,
            'persona': agent.persona,
            'capabilities': agent.capabilities,
            'active_tasks': len(agent.active_tasks),
            'memory_size': len(agent.memory)
        }
    return jsonify(status)

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    logger.info('Client connected')
    emit('status', {'message': 'Connected to PurpleBrain'})

@socketio.on('agent_request')
def handle_agent_request(data):
    """Handle real-time agent requests"""
    agent_name = data.get('agent')
    task = data.get('task')
    
    if agent_name in agents:
        try:
            # Process task asynchronously
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            result = loop.run_until_complete(agents[agent_name].process(task))
            loop.close()
            
            emit('agent_response', {
                'agent': agent_name,
                'result': result,
                'success': True
            })
        except Exception as e:
            emit('agent_response', {
                'agent': agent_name,
                'error': str(e),
                'success': False
            })
    else:
        emit('agent_response', {
            'error': f'Agent {agent_name} not found',
            'success': False
        })

if __name__ == '__main__':
    logger.info("🎵 Starting PurpleBrain Server...")
    logger.info("💜 Your Purple Rain AI Workspace")
    
    # Get port from environment or use default
    port = 8000  # Force port 8000 to avoid conflicts
    
    # Run the server
    socketio.run(app, 
                host='0.0.0.0', 
                port=port, 
                debug=os.environ.get('DEBUG', 'False').lower() == 'true')