// Writing Agent - Gifted Code-Switcher & Master Wordsmith
// "NYT & New Yorker caliber writing with linguistic code-switching mastery"
// Inspired by African-American linguistic traditions and journalistic excellence

class WritingAgent {
    constructor() {
        this.name = "Writing Agent";
        this.persona = "Gifted Code-Switcher & Master Wordsmith";
        this.philosophy = "Language is power - master all registers, connect with all hearts";
        this.writingStyles = new Map();
        this.linguisticRegisters = new Map();
        this.audiences = new Map();
        this.activeWriting = new Map();
        this.codeSwitchingPatterns = new Map();
        
        this.initializeWritingStyles();
        this.initializeLinguisticRegisters();
        this.initializeAudiences();
        this.initializeCodeSwitchingPatterns();
    }

    initializeWritingStyles() {
        this.writingStyles.set('nyt_news', {
            name: 'New York Times News',
            characteristics: [
                'Inverted pyramid structure',
                'Objective tone with subtle analysis',
                'Active voice preference',
                'Clear, concise sentences',
                'Attribution for all claims'
            ],
            sample_opening: 'In a development that could reshape...',
            tone: 'authoritative, balanced, accessible'
        });

        this.writingStyles.set('new_yorker_feature', {
            name: 'New Yorker Feature',
            characteristics: [
                'Literary narrative approach',
                'Sophisticated vocabulary',
                'Complex sentence structures',
                'Character-driven storytelling',
                'Cultural context weaving'
            ],
            sample_opening: 'The morning sun cast long shadows across...',
            tone: 'literary, sophisticated, contemplative'
        });

        this.writingStyles.set('atlantic_essay', {
            name: 'Atlantic Long-form Essay',
            characteristics: [
                'Argument-driven structure',
                'Historical context integration',
                'Philosophical depth',
                'Evidence-based reasoning',
                'Cultural criticism elements'
            ],
            sample_opening: 'To understand the implications of...',
            tone: 'intellectual, persuasive, nuanced'
        });

        this.writingStyles.set('conversational_blog', {
            name: 'Conversational Blog Post',
            characteristics: [
                'Direct address to reader',
                'Personal anecdotes',
                'Accessible language',
                'Question-based engagement',
                'Relatable examples'
            ],
            sample_opening: 'Here\'s something that\'s been on my mind...',
            tone: 'friendly, approachable, authentic'
        });

        this.writingStyles.set('academic_paper', {
            name: 'Academic Paper',
            characteristics: [
                'Formal structure (Abstract, Introduction, etc.)',
                'Citation-heavy',
                'Passive voice common',
                'Technical terminology',
                'Objective analysis'
            ],
            sample_opening: 'This study examines the relationship between...',
            tone: 'formal, objective, scholarly'
        });
    }

    initializeLinguisticRegisters() {
        // Code-switching registers inspired by African-American linguistic traditions
        this.linguisticRegisters.set('aave_conversational', {
            name: 'African American Vernacular English (Conversational)',
            features: [
                'Habitual "be" usage',
                'Zero copula structures',
                'Double modals',
                'Aspectual markers',
                'Call-and-response patterns'
            ],
            appropriate_contexts: ['community discourse', 'personal narratives', 'cultural commentary'],
            code_switch_triggers: ['emotional intensity', 'cultural identity', 'community solidarity']
        });

        this.linguisticRegisters.set('standard_academic', {
            name: 'Standard Academic English',
            features: [
                'Complex syntax',
                'Formal vocabulary',
                'Passive constructions',
                'Abstract nominalizations',
                'Hedging language'
            ],
            appropriate_contexts: ['academic papers', 'formal presentations', 'policy documents'],
            code_switch_triggers: ['credibility establishment', 'institutional contexts']
        });

        this.linguisticRegisters.set('professional_hybrid', {
            name: 'Professional Hybrid Register',
            features: [
                'Code-meshing strategies',
                'Cultural authenticity with professional polish',
                'Strategic vernacular use',
                'Bidialectal flexibility',
                'Audience-aware switching'
            ],
            appropriate_contexts: ['diverse professional settings', 'inclusive communications'],
            code_switch_triggers: ['audience diversity', 'authenticity needs', 'relationship building']
        });

        this.linguisticRegisters.set('storytelling_vernacular', {
            name: 'Storytelling Vernacular',
            features: [
                'Narrative markers',
                'Rhythmic speech patterns',
                'Oral tradition elements',
                'Metaphorical language',
                'Community knowledge references'
            ],
            appropriate_contexts: ['personal narratives', 'cultural stories', 'community histories'],
            code_switch_triggers: ['emotional connection', 'cultural preservation', 'identity expression']
        });
    }

    initializeAudiences() {
        this.audiences.set('general_public', {
            name: 'General Public',
            characteristics: ['diverse educational backgrounds', 'varied cultural contexts'],
            preferred_register: 'professional_hybrid',
            complexity_level: 'moderate',
            cultural_sensitivity: 'high'
        });

        this.audiences.set('academic_community', {
            name: 'Academic Community',
            characteristics: ['specialized knowledge', 'formal expectations'],
            preferred_register: 'standard_academic',
            complexity_level: 'high',
            cultural_sensitivity: 'moderate'
        });

        this.audiences.set('community_members', {
            name: 'Community Members',
            characteristics: ['shared cultural background', 'informal communication norms'],
            preferred_register: 'aave_conversational',
            complexity_level: 'accessible',
            cultural_sensitivity: 'very_high'
        });

        this.audiences.set('professional_peers', {
            name: 'Professional Peers',
            characteristics: ['industry expertise', 'efficiency valued'],
            preferred_register: 'professional_hybrid',
            complexity_level: 'high',
            cultural_sensitivity: 'moderate'
        });
    }

    initializeCodeSwitchingPatterns() {
        this.codeSwitchingPatterns.set('emotional_intensity', {
            trigger: 'Emotional content or personal investment',
            switch_direction: 'formal → vernacular',
            linguistic_markers: ['increased use of AAVE features', 'more direct address', 'personal pronouns'],
            purpose: 'authenticity and emotional connection'
        });

        this.codeSwitchingPatterns.set('credibility_establishment', {
            trigger: 'Need to establish expertise or authority',
            switch_direction: 'vernacular → formal',
            linguistic_markers: ['academic vocabulary', 'complex syntax', 'hedging language'],
            purpose: 'professional credibility and institutional acceptance'
        });

        this.codeSwitchingPatterns.set('audience_accommodation', {
            trigger: 'Diverse audience with mixed expectations',
            switch_direction: 'strategic mixing',
            linguistic_markers: ['code-meshing', 'bidialectal bridges', 'cultural translating'],
            purpose: 'inclusive communication and broad accessibility'
        });

        this.codeSwitchingPatterns.set('cultural_preservation', {
            trigger: 'Discussing cultural topics or community issues',
            switch_direction: 'formal → vernacular',
            linguistic_markers: ['community-specific terminology', 'oral tradition patterns'],
            purpose: 'cultural authenticity and identity preservation'
        });
    }

    async write(content, options = {}) {
        const writingId = this.generateWritingId();
        const {
            style = 'nyt_news',
            audience = 'general_public',
            tone_guidance = 'balanced',
            length_target = 'medium', // short, medium, long, comprehensive
            code_switching_level = 'moderate', // minimal, moderate, extensive
            cultural_context = 'inclusive'
        } = options;

        console.log(`📝 Writing Agent: Crafting ${style} piece for ${audience}`);
        console.log(`🎭 Code-switching level: ${code_switching_level}`);

        try {
            // Initialize writing session
            const writingSession = {
                id: writingId,
                originalContent: content,
                style,
                audience,
                startTime: new Date(),
                drafts: [],
                revisions: [],
                final_output: null,
                linguistic_analysis: null
            };

            this.activeWriting.set(writingId, writingSession);

            // Analyze content and context
            const analysis = await this.analyzeContent(content, audience, cultural_context);
            writingSession.linguistic_analysis = analysis;

            // Plan code-switching strategy
            const codeSwitchStrategy = await this.planCodeSwitching(
                analysis, audience, code_switching_level
            );

            // Generate initial draft
            const initialDraft = await this.generateDraft(
                content, style, audience, codeSwitchStrategy
            );
            writingSession.drafts.push(initialDraft);

            // Apply code-switching refinements
            const refinedDraft = await this.applyCodeSwitching(
                initialDraft, codeSwitchStrategy, analysis
            );
            writingSession.drafts.push(refinedDraft);

            // Final polish and style consistency
            const finalOutput = await this.finalPolish(
                refinedDraft, style, audience, tone_guidance
            );
            writingSession.final_output = finalOutput;

            // Generate writing report
            const report = await this.generateWritingReport(writingId);

            return {
                success: true,
                writingId,
                output: finalOutput,
                report,
                metadata: {
                    style_used: style,
                    audience_targeted: audience,
                    code_switching_applied: code_switching_level,
                    word_count: finalOutput.content.split(' ').length,
                    writing_time: new Date() - writingSession.startTime
                }
            };

        } catch (error) {
            console.error('🚨 Writing Agent Error:', error);
            return {
                success: false,
                error: error.message,
                writingId
            };
        }
    }

    async analyzeContent(content, audience, culturalContext) {
        console.log('🔍 Analyzing content for linguistic and cultural markers...');

        const analysis = {
            content_type: this.identifyContentType(content),
            emotional_intensity: this.assessEmotionalIntensity(content),
            cultural_markers: this.identifyCulturalMarkers(content),
            technical_complexity: this.assessTechnicalComplexity(content),
            audience_alignment: this.assessAudienceAlignment(content, audience),
            code_switch_opportunities: []
        };

        // Identify opportunities for strategic code-switching
        analysis.code_switch_opportunities = await this.identifyCodeSwitchOpportunities(
            content, analysis
        );

        return analysis;
    }

    identifyContentType(content) {
        const types = {
            'news_article': ['breaking:', 'reported', 'according to', 'sources say'],
            'personal_narrative': ['I', 'my', 'personal', 'experience', 'story'],
            'analytical_essay': ['analysis', 'examine', 'consider', 'implications'],
            'opinion_piece': ['believe', 'argue', 'opinion', 'perspective', 'think'],
            'instructional': ['how to', 'steps', 'process', 'guide', 'tutorial']
        };

        const contentLower = content.toLowerCase();
        let highestScore = 0;
        let identifiedType = 'general';

        for (const [type, markers] of Object.entries(types)) {
            const score = markers.reduce((count, marker) => {
                return count + (contentLower.includes(marker) ? 1 : 0);
            }, 0);

            if (score > highestScore) {
                highestScore = score;
                identifiedType = type;
            }
        }

        return identifiedType;
    }

    assessEmotionalIntensity(content) {
        const emotionalMarkers = [
            'amazing', 'incredible', 'devastating', 'heartbreaking', 'inspiring',
            'outrageous', 'brilliant', 'terrible', 'wonderful', 'shocking'
        ];

        const contentLower = content.toLowerCase();
        const emotionalCount = emotionalMarkers.reduce((count, marker) => {
            return count + (contentLower.includes(marker) ? 1 : 0);
        }, 0);

        const sentences = content.split(/[.!?]+/).length;
        const intensity = emotionalCount / sentences;

        if (intensity > 0.3) return 'high';
        if (intensity > 0.1) return 'moderate';
        return 'low';
    }

    identifyCulturalMarkers(content) {
        const culturalMarkers = {
            'african_american': ['community', 'culture', 'heritage', 'tradition', 'identity'],
            'academic': ['research', 'study', 'analysis', 'methodology', 'literature'],
            'professional': ['business', 'corporate', 'industry', 'market', 'strategy'],
            'social_justice': ['equality', 'justice', 'rights', 'activism', 'systemic']
        };

        const identified = [];
        const contentLower = content.toLowerCase();

        for (const [culture, markers] of Object.entries(culturalMarkers)) {
            const markerCount = markers.reduce((count, marker) => {
                return count + (contentLower.includes(marker) ? 1 : 0);
            }, 0);

            if (markerCount > 0) {
                identified.push({ culture, strength: markerCount / markers.length });
            }
        }

        return identified.sort((a, b) => b.strength - a.strength);
    }

    assessTechnicalComplexity(content) {
        const technicalMarkers = [
            'algorithm', 'methodology', 'framework', 'implementation', 'analysis',
            'systematic', 'empirical', 'theoretical', 'paradigm', 'conceptual'
        ];

        const contentLower = content.toLowerCase();
        const technicalCount = technicalMarkers.reduce((count, marker) => {
            return count + (contentLower.includes(marker) ? 1 : 0);
        }, 0);

        const words = content.split(' ').length;
        const complexity = technicalCount / words * 100;

        if (complexity > 2) return 'high';
        if (complexity > 0.5) return 'moderate';
        return 'low';
    }

    assessAudienceAlignment(content, audience) {
        const audienceProfile = this.audiences.get(audience);
        if (!audienceProfile) return 'unknown';

        // Simple alignment check based on complexity and register
        const complexity = this.assessTechnicalComplexity(content);
        const expectedComplexity = audienceProfile.complexity_level;

        if (complexity === expectedComplexity) return 'well_aligned';
        if (Math.abs(['low', 'moderate', 'high'].indexOf(complexity) - 
                    ['accessible', 'moderate', 'high'].indexOf(expectedComplexity)) <= 1) {
            return 'moderately_aligned';
        }
        return 'poorly_aligned';
    }

    async identifyCodeSwitchOpportunities(content, analysis) {
        const opportunities = [];

        // High emotional intensity → vernacular opportunity
        if (analysis.emotional_intensity === 'high') {
            opportunities.push({
                type: 'emotional_intensity',
                location: 'throughout',
                strategy: 'increase vernacular elements for authenticity',
                confidence: 0.8
            });
        }

        // Cultural markers → code-switching opportunities
        if (analysis.cultural_markers.some(m => m.culture === 'african_american' && m.strength > 0.3)) {
            opportunities.push({
                type: 'cultural_preservation',
                location: 'cultural_topics',
                strategy: 'strategic AAVE integration for authenticity',
                confidence: 0.9
            });
        }

        // Technical complexity → register switching
        if (analysis.technical_complexity === 'high') {
            opportunities.push({
                type: 'credibility_establishment',
                location: 'technical_sections',
                strategy: 'formal academic register for credibility',
                confidence: 0.7
            });
        }

        return opportunities;
    }

    async planCodeSwitching(analysis, audience, level) {
        const audienceProfile = this.audiences.get(audience);
        const preferredRegister = audienceProfile?.preferred_register || 'professional_hybrid';

        const strategy = {
            primary_register: preferredRegister,
            switching_points: [],
            cultural_adaptations: [],
            tone_modulations: []
        };

        // Plan switching points based on analysis
        for (const opportunity of analysis.code_switch_opportunities) {
            const pattern = this.codeSwitchingPatterns.get(opportunity.type);
            if (pattern) {
                strategy.switching_points.push({
                    trigger: opportunity.type,
                    location: opportunity.location,
                    linguistic_changes: pattern.linguistic_markers,
                    purpose: pattern.purpose
                });
            }
        }

        return strategy;
    }

    async generateDraft(content, style, audience, codeSwitchStrategy) {
        const styleProfile = this.writingStyles.get(style);
        const audienceProfile = this.audiences.get(audience);

        console.log(`✍️ Generating ${style} draft for ${audience}...`);

        // This is a simplified draft generation
        // In a real implementation, this would use advanced language models
        const draft = {
            title: this.generateTitle(content, style),
            content: await this.transformContent(content, styleProfile, audienceProfile),
            style_applied: style,
            register_used: codeSwitchStrategy.primary_register,
            word_count: 0
        };

        draft.word_count = draft.content.split(' ').length;
        return draft;
    }

    generateTitle(content, style) {
        const titleStyles = {
            'nyt_news': 'Direct, informative headline',
            'new_yorker_feature': 'Literary, evocative title',
            'atlantic_essay': 'Thought-provoking question or statement',
            'conversational_blog': 'Engaging, personal hook',
            'academic_paper': 'Descriptive, formal title'
        };

        // Simplified title generation based on content and style
        const firstSentence = content.split('.')[0];
        return `${titleStyles[style]}: ${firstSentence.substring(0, 50)}...`;
    }

    async transformContent(content, styleProfile, audienceProfile) {
        // Transform content according to style and audience
        // This is a simplified transformation
        let transformed = content;

        // Apply style characteristics
        if (styleProfile.name === 'New York Times News') {
            transformed = this.applyNewsStyle(transformed);
        } else if (styleProfile.name === 'New Yorker Feature') {
            transformed = this.applyLiteraryStyle(transformed);
        } else if (styleProfile.name === 'Conversational Blog Post') {
            transformed = this.applyConversationalStyle(transformed);
        }

        return transformed;
    }

    applyNewsStyle(content) {
        // Apply news writing principles
        const sentences = content.split('. ');
        const transformed = sentences.map(sentence => {
            // Make more direct and active
            return sentence.replace(/It is believed that/g, 'Experts believe')
                          .replace(/There is/g, 'A')
                          .replace(/It was reported/g, 'Reports indicate');
        }).join('. ');

        return transformed;
    }

    applyLiteraryStyle(content) {
        // Apply literary writing elements
        return content.replace(/\./g, ', weaving together themes that...')
                     .replace(/However,/g, 'Yet, in a turn that reveals...');
    }

    applyConversationalStyle(content) {
        // Make more conversational
        return content.replace(/One might consider/g, 'Think about this:')
                     .replace(/It is important to note/g, 'Here\'s the thing:')
                     .replace(/Therefore,/g, 'So,');
    }

    async applyCodeSwitching(draft, strategy, analysis) {
        console.log('🎭 Applying code-switching refinements...');

        let refined = { ...draft };
        
        // Apply switching points
        for (const switchPoint of strategy.switching_points) {
            refined.content = await this.applySwitchingPoint(
                refined.content, switchPoint, analysis
            );
        }

        refined.register_switches_applied = strategy.switching_points.length;
        return refined;
    }

    async applySwitchingPoint(content, switchPoint, analysis) {
        // Apply specific linguistic changes based on switching point
        let modified = content;

        switch (switchPoint.trigger) {
            case 'emotional_intensity':
                modified = this.applyEmotionalVernacular(modified);
                break;
            case 'cultural_preservation':
                modified = this.applyCulturalAuthenticity(modified);
                break;
            case 'credibility_establishment':
                modified = this.applyFormalRegister(modified);
                break;
        }

        return modified;
    }

    applyEmotionalVernacular(content) {
        // Add vernacular elements for emotional connection
        return content.replace(/I am very/g, 'I\'m so')
                     .replace(/That is really/g, 'That\'s real')
                     .replace(/It is quite/g, 'It\'s straight up');
    }

    applyCulturalAuthenticity(content) {
        // Integrate culturally authentic language
        return content.replace(/community/g, 'our community')
                     .replace(/people/g, 'folks')
                     .replace(/important/g, 'real important');
    }

    applyFormalRegister(content) {
        // Increase formality and academic language
        return content.replace(/really/g, 'significantly')
                     .replace(/a lot of/g, 'numerous')
                     .replace(/shows/g, 'demonstrates');
    }

    async finalPolish(draft, style, audience, toneGuidance) {
        console.log('✨ Final polish and style consistency...');

        const polished = {
            ...draft,
            content: await this.applyFinalEdits(draft.content, style, toneGuidance),
            polish_applied: true,
            final_word_count: 0,
            readability_score: 0
        };

        polished.final_word_count = polished.content.split(' ').length;
        polished.readability_score = this.calculateReadability(polished.content);

        return polished;
    }

    async applyFinalEdits(content, style, toneGuidance) {
        // Apply final edits for consistency and polish
        let edited = content;

        // Remove redundancies
        edited = edited.replace(/\b(\w+)\s+\1\b/gi, '$1'); // Remove repeated words

        // Fix common issues
        edited = edited.replace(/\s+/g, ' '); // Multiple spaces to single
        edited = edited.replace(/\s+\./g, '.'); // Space before period
        edited = edited.trim();

        return edited;
    }

    calculateReadability(content) {
        // Simplified readability calculation
        const sentences = content.split(/[.!?]+/).length;
        const words = content.split(' ').length;
        const avgWordsPerSentence = words / sentences;

        // Flesch-Kincaid approximation
        const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence);
        return Math.max(0, Math.min(100, readabilityScore));
    }

    async generateWritingReport(writingId) {
        const session = this.activeWriting.get(writingId);

        return {
            title: `Writing Analysis Report - ${session.id}`,
            style_analysis: {
                target_style: session.style,
                style_adherence: 'high',
                tone_consistency: 'maintained'
            },
            linguistic_analysis: session.linguistic_analysis,
            code_switching_report: {
                opportunities_identified: session.linguistic_analysis.code_switch_opportunities.length,
                switches_applied: session.final_output.register_switches_applied || 0,
                effectiveness: 'high'
            },
            quality_metrics: {
                word_count: session.final_output.final_word_count,
                readability_score: session.final_output.readability_score,
                audience_alignment: session.linguistic_analysis.audience_alignment
            },
            recommendations: this.generateWritingRecommendations(session),
            timestamp: new Date(),
            agent_signature: "PurpleBrain Writing Agent - Gifted Code-Switcher"
        };
    }

    generateWritingRecommendations(session) {
        const recommendations = [];
        
        if (session.final_output.readability_score < 60) {
            recommendations.push('Consider simplifying sentence structure for broader accessibility');
        }
        
        if (session.linguistic_analysis.audience_alignment === 'poorly_aligned') {
            recommendations.push('Adjust register and complexity for target audience');
        }
        
        if (session.linguistic_analysis.code_switch_opportunities.length > 0 && 
            (session.final_output.register_switches_applied || 0) === 0) {
            recommendations.push('Consider strategic code-switching for enhanced authenticity');
        }

        return recommendations;
    }

    generateWritingId() {
        return `writing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Public API methods
    async quickWrite(content, style = 'nyt_news') {
        return await this.write(content, {
            style,
            audience: 'general_public',
            code_switching_level: 'minimal'
        });
    }

    async craftPiece(content, style, audience, codeSwitchingLevel = 'moderate') {
        return await this.write(content, {
            style,
            audience,
            code_switching_level: codeSwitchingLevel,
            cultural_context: 'inclusive'
        });
    }

    async masterPiece(content, options = {}) {
        return await this.write(content, {
            style: 'new_yorker_feature',
            audience: 'general_public',
            code_switching_level: 'extensive',
            cultural_context: 'deep',
            tone_guidance: 'sophisticated',
            ...options
        });
    }

    getAvailableStyles() {
        return Array.from(this.writingStyles.keys());
    }

    getStyleDescription(styleName) {
        return this.writingStyles.get(styleName);
    }

    getAvailableAudiences() {
        return Array.from(this.audiences.keys());
    }

    getAudienceProfile(audienceName) {
        return this.audiences.get(audienceName);
    }

    getLinguisticRegisters() {
        return Array.from(this.linguisticRegisters.keys());
    }

    getRegisterDescription(registerName) {
        return this.linguisticRegisters.get(registerName);
    }
}

export default WritingAgent;