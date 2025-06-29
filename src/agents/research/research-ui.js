// Research Agent UI - Purple Rain Style Interface
// Nobel Laureate Research Experience with Prince Aesthetics

class ResearchAgentUI {
    constructor(researchAgent) {
        this.agent = researchAgent;
        this.activeResearchSessions = new Map();
        this.isVisible = false;
    }

    createInterface() {
        const researchInterface = document.createElement('div');
        researchInterface.className = 'research-agent-interface';
        
        researchInterface.innerHTML = `
            <div class="research-header mirror-surface">
                <div class="agent-title">
                    <span class="agent-icon">🔍</span>
                    <span class="agent-name">Research Agent</span>
                    <span class="agent-subtitle">Nobel Laureate-Level Deep Research</span>
                </div>
                <div class="research-philosophy">
                    "Leave no stone unturned, regardless of the lens"
                </div>
            </div>

            <div class="research-input-section mirror-surface">
                <div class="research-query-container">
                    <label for="research-query">What would you like to research?</label>
                    <textarea 
                        id="research-query" 
                        placeholder="Enter your research question... The deeper, the better."
                        rows="3"
                    ></textarea>
                </div>

                <div class="research-lens-selector">
                    <label>Research Lenses (Select multiple for comprehensive analysis)</label>
                    <div class="lens-grid">
                        <div class="lens-option" data-lens="academic">
                            <input type="checkbox" id="lens-academic" checked>
                            <label for="lens-academic">
                                <span class="lens-icon">🎓</span>
                                <span class="lens-name">Academic</span>
                                <span class="lens-desc">Peer-reviewed, scholarly</span>
                            </label>
                        </div>
                        
                        <div class="lens-option" data-lens="investigative">
                            <input type="checkbox" id="lens-investigative" checked>
                            <label for="lens-investigative">
                                <span class="lens-icon">🕵️</span>
                                <span class="lens-name">Investigative</span>
                                <span class="lens-desc">Primary sources, documents</span>
                            </label>
                        </div>
                        
                        <div class="lens-option" data-lens="contrarian">
                            <input type="checkbox" id="lens-contrarian">
                            <label for="lens-contrarian">
                                <span class="lens-icon">🤔</span>
                                <span class="lens-name">Contrarian</span>
                                <span class="lens-desc">Alternative perspectives</span>
                            </label>
                        </div>
                        
                        <div class="lens-option" data-lens="historical">
                            <input type="checkbox" id="lens-historical">
                            <label for="lens-historical">
                                <span class="lens-icon">📜</span>
                                <span class="lens-name">Historical</span>
                                <span class="lens-desc">Timeline, context</span>
                            </label>
                        </div>
                        
                        <div class="lens-option" data-lens="interdisciplinary">
                            <input type="checkbox" id="lens-interdisciplinary">
                            <label for="lens-interdisciplinary">
                                <span class="lens-icon">🌐</span>
                                <span class="lens-name">Interdisciplinary</span>
                                <span class="lens-desc">Cross-field connections</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="research-controls">
                    <button id="quick-research-btn" class="research-btn primary">
                        ⚡ Quick Research
                    </button>
                    <button id="deep-research-btn" class="research-btn secondary">
                        🧠 Deep Research (Nobel Level)
                    </button>
                </div>
            </div>

            <div class="research-progress" id="research-progress" style="display: none;">
                <div class="progress-header">
                    <span class="progress-title">🔍 Research in Progress...</span>
                    <span class="progress-subtitle">Channeling Nobel laureate thoroughness</span>
                </div>
                <div class="progress-lenses" id="progress-lenses"></div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
            </div>

            <div class="research-results" id="research-results" style="display: none;">
                <div class="results-header mirror-surface">
                    <h3>Research Findings</h3>
                    <div class="results-metadata" id="results-metadata"></div>
                </div>
                <div class="results-content" id="results-content"></div>
            </div>
        `;

        // Add Prince-inspired styles
        const style = document.createElement('style');
        style.textContent = `
            .research-agent-interface {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, 
                    var(--black-theatrical) 0%, 
                    var(--smoke-dark) 50%, 
                    var(--purple-royal) 100%);
                color: var(--white-stage);
                padding: 40px;
                overflow-y: auto;
                font-family: 'SF Pro Display', -apple-system, sans-serif;
            }

            .research-header {
                text-align: center;
                padding: 30px;
                margin-bottom: 30px;
                border-radius: 20px;
                background: rgba(128, 0, 128, 0.1);
                border: 2px solid var(--purple-soft);
            }

            .agent-title {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .agent-icon {
                font-size: 48px;
                text-shadow: 0 0 20px var(--purple-light);
            }

            .agent-name {
                font-size: 28px;
                font-weight: bold;
                color: var(--purple-light);
            }

            .agent-subtitle {
                font-size: 16px;
                color: var(--gold-rich);
                font-style: italic;
            }

            .research-philosophy {
                margin-top: 20px;
                font-size: 14px;
                color: var(--purple-soft);
                font-style: italic;
            }

            .research-input-section {
                padding: 30px;
                border-radius: 20px;
                margin-bottom: 30px;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                border: 1px solid var(--purple-soft);
            }

            .research-query-container {
                margin-bottom: 30px;
            }

            .research-query-container label {
                display: block;
                margin-bottom: 10px;
                color: var(--purple-light);
                font-weight: 500;
            }

            #research-query {
                width: 100%;
                padding: 15px;
                border-radius: 10px;
                border: 2px solid var(--purple-soft);
                background: rgba(0, 0, 0, 0.5);
                color: var(--white-stage);
                font-size: 16px;
                font-family: inherit;
                resize: vertical;
                transition: all 0.3s ease;
            }

            #research-query:focus {
                outline: none;
                border-color: var(--purple-royal);
                box-shadow: 0 0 20px rgba(128, 0, 128, 0.3);
            }

            .research-lens-selector label {
                display: block;
                margin-bottom: 15px;
                color: var(--purple-light);
                font-weight: 500;
            }

            .lens-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
            }

            .lens-option {
                position: relative;
            }

            .lens-option input[type="checkbox"] {
                display: none;
            }

            .lens-option label {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                border: 2px solid var(--smoke-medium);
                border-radius: 15px;
                background: rgba(0, 0, 0, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                margin-bottom: 0;
            }

            .lens-option input:checked + label {
                border-color: var(--purple-royal);
                background: rgba(128, 0, 128, 0.2);
                box-shadow: 0 0 20px rgba(128, 0, 128, 0.3);
            }

            .lens-icon {
                font-size: 24px;
                margin-bottom: 8px;
            }

            .lens-name {
                font-weight: bold;
                color: var(--purple-light);
                margin-bottom: 5px;
            }

            .lens-desc {
                font-size: 12px;
                color: var(--smoke-light);
                font-style: italic;
            }

            .research-controls {
                display: flex;
                gap: 20px;
                justify-content: center;
            }

            .research-btn {
                padding: 15px 30px;
                border: none;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .research-btn.primary {
                background: linear-gradient(45deg, var(--purple-royal), var(--purple-soft));
                color: var(--white-stage);
                box-shadow: 0 10px 30px rgba(128, 0, 128, 0.3);
            }

            .research-btn.secondary {
                background: linear-gradient(45deg, var(--gold-rich), var(--gold-warm));
                color: var(--black-theatrical);
                box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
            }

            .research-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(128, 0, 128, 0.5);
            }

            .research-progress {
                padding: 30px;
                border-radius: 20px;
                background: rgba(0, 0, 0, 0.5);
                border: 2px solid var(--purple-soft);
                margin-bottom: 30px;
                text-align: center;
            }

            .progress-header {
                margin-bottom: 20px;
            }

            .progress-title {
                display: block;
                font-size: 20px;
                color: var(--purple-light);
                margin-bottom: 5px;
            }

            .progress-subtitle {
                font-size: 14px;
                color: var(--gold-rich);
                font-style: italic;
            }

            .progress-lenses {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }

            .progress-lens {
                padding: 8px 15px;
                background: rgba(128, 0, 128, 0.2);
                border-radius: 20px;
                border: 1px solid var(--purple-soft);
                font-size: 12px;
                color: var(--purple-light);
            }

            .progress-lens.active {
                background: var(--purple-royal);
                color: var(--white-stage);
                animation: pulse 1s infinite;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: var(--smoke-dark);
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--purple-royal), var(--purple-light));
                width: 0%;
                transition: width 0.5s ease;
                animation: shimmer 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: 200px 0; }
            }

            .research-results {
                padding: 30px;
                border-radius: 20px;
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid var(--gold-rich);
            }

            .results-header h3 {
                color: var(--gold-rich);
                font-size: 24px;
                margin-bottom: 15px;
            }

            .results-metadata {
                display: flex;
                gap: 20px;
                font-size: 14px;
                color: var(--purple-soft);
                margin-bottom: 20px;
                flex-wrap: wrap;
            }

            .metadata-item {
                padding: 5px 10px;
                background: rgba(128, 0, 128, 0.1);
                border-radius: 10px;
                border: 1px solid var(--purple-soft);
            }
        `;

        document.head.appendChild(style);
        this.bindEvents(researchInterface);
        
        return researchInterface;
    }

    bindEvents(interface) {
        const quickBtn = interface.querySelector('#quick-research-btn');
        const deepBtn = interface.querySelector('#deep-research-btn');
        const queryInput = interface.querySelector('#research-query');

        quickBtn.addEventListener('click', () => this.startQuickResearch(interface));
        deepBtn.addEventListener('click', () => this.startDeepResearch(interface));
        
        // Enter key to start quick research
        queryInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.metaKey) {
                this.startQuickResearch(interface);
            }
        });
    }

    async startQuickResearch(interface) {
        const query = interface.querySelector('#research-query').value.trim();
        if (!query) return;

        const selectedLenses = this.getSelectedLenses(interface);
        await this.conductResearch(interface, query, selectedLenses, 'quick');
    }

    async startDeepResearch(interface) {
        const query = interface.querySelector('#research-query').value.trim();
        if (!query) return;

        const selectedLenses = this.getSelectedLenses(interface);
        await this.conductResearch(interface, query, selectedLenses, 'deep');
    }

    getSelectedLenses(interface) {
        const checkboxes = interface.querySelectorAll('.lens-option input:checked');
        return Array.from(checkboxes).map(cb => cb.id.replace('lens-', ''));
    }

    async conductResearch(interface, query, lenses, type) {
        // Show progress
        this.showProgress(interface, lenses);
        
        try {
            let result;
            if (type === 'quick') {
                result = await this.agent.quickResearch(query);
            } else {
                result = await this.agent.deepResearch(query, lenses);
            }

            this.showResults(interface, result);
        } catch (error) {
            this.showError(interface, error);
        }
    }

    showProgress(interface, lenses) {
        const progressSection = interface.querySelector('#research-progress');
        const resultsSection = interface.querySelector('#research-results');
        const progressLenses = interface.querySelector('#progress-lenses');

        // Hide results, show progress
        resultsSection.style.display = 'none';
        progressSection.style.display = 'block';

        // Show active lenses
        progressLenses.innerHTML = lenses.map(lens => 
            `<div class="progress-lens" id="progress-${lens}">${lens}</div>`
        ).join('');

        // Simulate progress
        this.animateProgress(interface, lenses);
    }

    animateProgress(interface, lenses) {
        const progressFill = interface.querySelector('#progress-fill');
        let progress = 0;
        let currentLens = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            progressFill.style.width = `${progress}%`;

            // Activate current lens
            if (currentLens < lenses.length) {
                const lensEl = interface.querySelector(`#progress-${lenses[currentLens]}`);
                if (lensEl) lensEl.classList.add('active');
                
                if (progress > (currentLens + 1) * (100 / lenses.length)) {
                    currentLens++;
                }
            }

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);
    }

    showResults(interface, result) {
        const progressSection = interface.querySelector('#research-progress');
        const resultsSection = interface.querySelector('#research-results');
        const metadataEl = interface.querySelector('#results-metadata');
        const contentEl = interface.querySelector('#results-content');

        // Hide progress, show results
        progressSection.style.display = 'none';
        resultsSection.style.display = 'block';

        // Show metadata
        if (result.metadata) {
            metadataEl.innerHTML = `
                <div class="metadata-item">📊 ${result.metadata.totalSources} sources</div>
                <div class="metadata-item">🔍 ${result.metadata.lensesUsed.join(', ')}</div>
                <div class="metadata-item">⚡ ${Math.round(result.metadata.researchTime / 1000)}s</div>
                <div class="metadata-item">🎯 ${(result.metadata.confidenceScore * 100).toFixed(0)}% confidence</div>
            `;
        }

        // Show results content
        contentEl.innerHTML = `
            <div class="research-report">
                <h4>Executive Summary</h4>
                <p>Comprehensive research findings will appear here...</p>
                
                <h4>Key Findings</h4>
                <ul>
                    <li>Research completed using ${result.metadata?.lensesUsed.length || 0} analytical lenses</li>
                    <li>Analyzed ${result.metadata?.totalSources || 0} sources for comprehensive coverage</li>
                    <li>Applied Nobel laureate-level research methodology</li>
                </ul>
                
                <div class="prince-quote" style="
                    text-align: center;
                    font-style: italic;
                    color: var(--purple-light);
                    margin: 30px 0;
                    padding: 20px;
                    border: 1px solid var(--purple-soft);
                    border-radius: 10px;
                ">
                    "Knowledge is power, but knowledge shared is power multiplied" 💜
                </div>
            </div>
        `;
    }

    showError(interface, error) {
        const progressSection = interface.querySelector('#research-progress');
        const resultsSection = interface.querySelector('#research-results');
        const contentEl = interface.querySelector('#results-content');

        progressSection.style.display = 'none';
        resultsSection.style.display = 'block';

        contentEl.innerHTML = `
            <div class="error-message" style="
                text-align: center;
                color: var(--gold-rich);
                padding: 40px;
            ">
                <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                <div style="font-size: 20px; margin-bottom: 10px;">Research Error</div>
                <div style="font-size: 14px; color: var(--smoke-light);">${error.message}</div>
            </div>
        `;
    }

    show() {
        this.isVisible = true;
        return this.createInterface();
    }

    hide() {
        this.isVisible = false;
    }
}

export default ResearchAgentUI;