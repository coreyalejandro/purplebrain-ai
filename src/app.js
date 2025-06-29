// PurpleBrain Desktop Environment - Main Application
// Where AI agents dance like Purple Rain

class PurpleBrainDesktop {
    constructor() {
        this.agents = new Map();
        this.activeWorkflows = new Map();
        this.mirrorMode = true;
        this.init();
    }

    init() {
        console.log('🎵 Initializing Purple Rain Desktop...');
        this.setupAgentStore();
        this.initializeMirrorEffects();
        this.startPaisleyAnimation();
        this.bindEventListeners();
        
        // Theatrical entrance
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 2000);
    }

    setupAgentStore() {
        // Initialize agent cards
        const agentCards = document.querySelectorAll('.agent-card');
        
        agentCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.activateAgent(card.id);
            });
            
            // Add hover mirror effect
            card.addEventListener('mouseenter', (e) => {
                this.createMirrorEffect(card);
            });
        });
    }

    activateAgent(agentId) {
        console.log(`🎭 Activating ${agentId}...`);
        
        // Create mirror reflection of agent activation
        const canvas = document.querySelector('.workspace-canvas');
        const reflection = document.createElement('div');
        
        reflection.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 40px;
            background: rgba(128, 0, 128, 0.2);
            border-radius: 20px;
            backdrop-filter: blur(15px);
            border: 2px solid var(--purple-light);
            text-align: center;
            color: var(--white-stage);
            font-size: 18px;
            animation: mirror-pulse 1s ease-in-out;
        `;
        
        switch(agentId) {
            case 'research-agent':
                reflection.innerHTML = `
                    <div>🔍 Research Agent Activated</div>
                    <div style="font-size: 14px; margin-top: 10px; color: var(--purple-light);">
                        Nobel laureate-level research depth<br>
                        Powered by Exa.ai APIs<br>
                        Leave no stone unturned
                    </div>
                `;
                break;
                
            case 'factcheck-agent':
                reflection.innerHTML = `
                    <div>✅ Fact-Check Agent Activated</div>
                    <div style="font-size: 14px; margin-top: 10px; color: var(--purple-light);">
                        Combat AI hallucinations<br>
                        Cross-verify with authoritative sources<br>
                        Truth is the foundation
                    </div>
                `;
                break;
                
            case 'writing-agent':
                reflection.innerHTML = `
                    <div>📝 Writing Agent Activated</div>
                    <div style="font-size: 14px; margin-top: 10px; color: var(--purple-light);">
                        Gifted code-switcher<br>
                        NYT & New Yorker caliber<br>
                        Linguistic virtuosity
                    </div>
                `;
                break;
                
            case 'visionary-agent':
                reflection.innerHTML = `
                    <div>🎨 Visionary Agent Activated</div>
                    <div style="font-size: 14px; margin-top: 10px; color: var(--purple-light);">
                        Frida Kahlo × Kadir Nelson × Banksy × Basquiat<br>
                        Visualizations with soul<br>
                        Images that stare back
                    </div>
                `;
                break;
                
            case 'conductor-agent':
                reflection.innerHTML = `
                    <div>🎼 Conductor Agent Activated</div>
                    <div style="font-size: 14px; margin-top: 10px; color: var(--purple-light);">
                        Orchestrating AI symphonies<br>
                        Multi-agent harmony<br>
                        Creating beautiful performances
                    </div>
                `;
                break;
        }
        
        canvas.innerHTML = '';
        canvas.appendChild(reflection);
        
        // Remove after animation
        setTimeout(() => {
            if (reflection.parentNode) {
                reflection.remove();
            }
        }, 3000);
    }

    createMirrorEffect(element) {
        // Create a mirror reflection effect
        const rect = element.getBoundingClientRect();
        const mirror = document.createElement('div');
        
        mirror.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.right + 20}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            background: rgba(128, 0, 128, 0.1);
            border: 1px solid rgba(128, 0, 128, 0.3);
            border-radius: 15px;
            transform: scaleX(-1);
            opacity: 0.6;
            pointer-events: none;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(mirror);
        
        // Remove mirror after delay
        setTimeout(() => {
            mirror.remove();
        }, 1000);
    }

    initializeMirrorEffects() {
        // Add subtle mirror reflections to all mirror surfaces
        const mirrorSurfaces = document.querySelectorAll('.mirror-surface');
        
        mirrorSurfaces.forEach(surface => {
            // Add reflection gradient
            const reflection = document.createElement('div');
            reflection.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    45deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.05) 50%,
                    transparent 100%
                );
                border-radius: inherit;
                pointer-events: none;
                animation: mirror-shimmer 8s infinite ease-in-out;
            `;
            
            surface.appendChild(reflection);
        });
    }

    startPaisleyAnimation() {
        // Animate paisley patterns to represent neural flow
        const paisleyPattern = document.querySelector('.paisley-pattern');
        
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            paisleyPattern.style.transform = `rotate(${rotation}deg) scale(${1 + Math.sin(rotation * 0.1) * 0.1})`;
        }, 100);
    }

    bindEventListeners() {
        // Keyboard shortcuts for Prince-style interactions
        document.addEventListener('keydown', (e) => {
            if (e.key === 'p' && e.metaKey) { // Cmd+P for Prince mode
                this.togglePrinceMode();
            }
            
            if (e.key === 'm' && e.metaKey) { // Cmd+M for Mirror mode
                this.toggleMirrorMode();
            }
        });
        
        // Mouse movement creates mirror cursor
        document.addEventListener('mousemove', (e) => {
            this.createMirrorCursor(e.clientX, e.clientY);
        });
    }

    createMirrorCursor(x, y) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${window.innerWidth - x}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, var(--purple-light) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.3;
            transition: opacity 0.1s ease;
        `;
        
        document.body.appendChild(cursor);
        
        setTimeout(() => {
            cursor.remove();
        }, 200);
    }

    showWelcomeMessage() {
        const canvas = document.querySelector('.workspace-canvas');
        canvas.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: var(--purple-light);
                font-size: 28px;
                animation: mirror-pulse 3s infinite;
            ">
                <div style="font-size: 36px; margin-bottom: 20px;">💜</div>
                <div>Welcome to PurpleBrain</div>
                <div style="font-size: 18px; margin-top: 15px; color: var(--gold-rich);">
                    Your Purple Rain Desktop Environment
                </div>
                <div style="font-size: 14px; margin-top: 20px; color: var(--purple-soft);">
                    Where neurodivergent brilliance meets AI agent orchestration<br>
                    Click an agent to begin your creative journey
                </div>
            </div>
        `;
    }

    togglePrinceMode() {
        console.log('🎵 Prince Mode Activated!');
        document.body.style.filter = 'hue-rotate(15deg) saturate(1.2)';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }

    toggleMirrorMode() {
        this.mirrorMode = !this.mirrorMode;
        console.log(`🪞 Mirror Mode: ${this.mirrorMode ? 'ON' : 'OFF'}`);
    }
}

// Add dynamic mirror shimmer animation
const style = document.createElement('style');
style.textContent = `
    @keyframes mirror-shimmer {
        0% { opacity: 0.1; transform: translateX(-100%); }
        50% { opacity: 0.3; transform: translateX(0%); }
        100% { opacity: 0.1; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Initialize PurpleBrain Desktop
document.addEventListener('DOMContentLoaded', () => {
    window.purpleBrain = new PurpleBrainDesktop();
    console.log('🎭 PurpleBrain Desktop Environment Ready!');
    console.log('💜 "Life is just a party, and parties weren\'t meant to last" - Prince');
});