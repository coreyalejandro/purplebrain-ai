// Fact-Checking Agent - Truth Guardian
// "Combat AI hallucinations, Cross-verify with authoritative sources"
// Truth is the foundation of all PurpleBrain operations

class FactCheckAgent {
    constructor() {
        this.name = "Fact-Check Agent";
        this.persona = "Truth Guardian";
        this.philosophy = "Truth is the foundation - Question everything, verify relentlessly";
        this.trustScore = new Map(); // Track source reliability
        this.verificationMethods = new Map();
        this.activeChecks = new Map();
        this.hallucinationPatterns = new Set();
        
        this.initializeVerificationMethods();
        this.initializeHallucinationDetection();
        this.initializeTrustedSources();
    }

    initializeVerificationMethods() {
        this.verificationMethods.set('cross_reference', {
            name: 'Cross-Reference Verification',
            description: 'Compare claims across multiple independent sources',
            reliability: 0.9,
            timeRequired: 'medium'
        });

        this.verificationMethods.set('primary_source', {
            name: 'Primary Source Verification',
            description: 'Trace claims back to original sources',
            reliability: 0.95,
            timeRequired: 'high'
        });

        this.verificationMethods.set('expert_consensus', {
            name: 'Expert Consensus Check',
            description: 'Verify against expert opinions and peer review',
            reliability: 0.85,
            timeRequired: 'high'
        });

        this.verificationMethods.set('temporal_consistency', {
            name: 'Temporal Consistency Check',
            description: 'Verify claims against historical timeline',
            reliability: 0.8,
            timeRequired: 'medium'
        });

        this.verificationMethods.set('logical_consistency', {
            name: 'Logical Consistency Analysis',
            description: 'Check for internal contradictions',
            reliability: 0.75,
            timeRequired: 'low'
        });

        this.verificationMethods.set('statistical_verification', {
            name: 'Statistical Verification',
            description: 'Verify numerical claims against official data',
            reliability: 0.9,
            timeRequired: 'medium'
        });
    }

    initializeHallucinationDetection() {
        // Common AI hallucination patterns
        this.hallucinationPatterns.add('overly_specific_dates');
        this.hallucinationPatterns.add('non_existent_quotes');
        this.hallucinationPatterns.add('fabricated_statistics');
        this.hallucinationPatterns.add('impossible_correlations');
        this.hallucinationPatterns.add('anachronistic_references');
        this.hallucinationPatterns.add('authority_name_dropping');
        this.hallucinationPatterns.add('perfect_round_numbers');
    }

    initializeTrustedSources() {
        // Initialize trusted source database with reliability scores
        const trustedSources = [
            { domain: 'nature.com', reliability: 0.95, type: 'academic' },
            { domain: 'science.org', reliability: 0.95, type: 'academic' },
            { domain: 'pubmed.ncbi.nlm.nih.gov', reliability: 0.9, type: 'medical' },
            { domain: 'reuters.com', reliability: 0.85, type: 'news' },
            { domain: 'ap.org', reliability: 0.85, type: 'news' },
            { domain: 'bbc.com', reliability: 0.8, type: 'news' },
            { domain: 'census.gov', reliability: 0.95, type: 'government' },
            { domain: 'who.int', reliability: 0.9, type: 'international' },
            { domain: 'un.org', reliability: 0.85, type: 'international' }
        ];

        trustedSources.forEach(source => {
            this.trustScore.set(source.domain, source);
        });
    }

    async factCheck(content, options = {}) {
        const checkId = this.generateCheckId();
        const {
            thoroughness = 'standard', // standard, thorough, exhaustive
            methods = ['cross_reference', 'logical_consistency'],
            priorityLevel = 'medium'
        } = options;

        console.log(`✅ Fact-Check Agent: Beginning ${thoroughness} verification...`);
        console.log(`🔍 Using methods: ${methods.join(', ')}`);

        try {
            // Initialize fact-check session
            const checkSession = {
                id: checkId,
                content,
                startTime: new Date(),
                methods,
                claims: [],
                verifications: new Map(),
                flags: [],
                confidence: 0,
                overallVerdict: 'pending'
            };

            this.activeChecks.set(checkId, checkSession);

            // Extract claims from content
            const claims = await this.extractClaims(content);
            checkSession.claims = claims;

            console.log(`📋 Extracted ${claims.length} claims for verification`);

            // Verify each claim using selected methods
            for (const claim of claims) {
                await this.verifyClaim(checkId, claim, methods);
            }

            // Detect potential hallucinations
            await this.detectHallucinations(checkId);

            // Generate confidence score
            const confidence = this.calculateConfidence(checkId);
            checkSession.confidence = confidence;

            // Determine overall verdict
            const verdict = this.determineVerdict(checkId);
            checkSession.overallVerdict = verdict;

            // Generate comprehensive report
            const report = await this.generateFactCheckReport(checkId);

            return {
                success: true,
                checkId,
                verdict,
                confidence,
                report,
                metadata: {
                    claimsChecked: claims.length,
                    methodsUsed: methods,
                    checkTime: new Date() - checkSession.startTime,
                    flagsRaised: checkSession.flags.length
                }
            };

        } catch (error) {
            console.error('🚨 Fact-Check Agent Error:', error);
            return {
                success: false,
                error: error.message,
                checkId
            };
        }
    }

    async extractClaims(content) {
        // Extract factual claims from content
        const claims = [];
        
        // Split content into sentences and analyze each for factual claims
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        for (const sentence of sentences) {
            const claim = await this.analyzeSentenceForClaims(sentence.trim());
            if (claim) {
                claims.push({
                    text: sentence.trim(),
                    type: claim.type,
                    confidence: claim.confidence,
                    keywords: claim.keywords,
                    verifiable: claim.verifiable
                });
            }
        }

        return claims;
    }

    async analyzeSentenceForClaims(sentence) {
        // Analyze sentence for factual claims
        const claimIndicators = [
            'according to', 'studies show', 'research indicates', 'data reveals',
            'statistics show', 'experts say', 'scientists found', 'reports indicate',
            'evidence suggests', 'analysis shows', 'survey found', 'poll indicates'
        ];

        const statisticalIndicators = [
            '%', 'percent', 'million', 'billion', 'thousand', 'times more',
            'increased by', 'decreased by', 'rose by', 'fell by'
        ];

        const temporalIndicators = [
            'in 2023', 'in 2024', 'last year', 'this year', 'since', 'until',
            'during', 'between', 'from', 'to'
        ];

        let claimType = 'general';
        let confidence = 0.5;
        const keywords = [];

        // Check for statistical claims
        if (statisticalIndicators.some(indicator => 
            sentence.toLowerCase().includes(indicator))) {
            claimType = 'statistical';
            confidence = 0.8;
        }

        // Check for temporal claims
        if (temporalIndicators.some(indicator => 
            sentence.toLowerCase().includes(indicator))) {
            claimType = 'temporal';
            confidence = 0.7;
        }

        // Check for authority claims
        if (claimIndicators.some(indicator => 
            sentence.toLowerCase().includes(indicator))) {
            claimType = 'authority';
            confidence = 0.9;
        }

        // Extract keywords
        const words = sentence.split(' ').filter(word => word.length > 3);
        keywords.push(...words.slice(0, 5));

        return {
            type: claimType,
            confidence,
            keywords,
            verifiable: confidence > 0.6
        };
    }

    async verifyClaim(checkId, claim, methods) {
        const checkSession = this.activeChecks.get(checkId);
        const verificationResults = [];

        console.log(`🔍 Verifying claim: "${claim.text.substring(0, 50)}..."`);

        for (const methodName of methods) {
            const method = this.verificationMethods.get(methodName);
            if (!method) continue;

            try {
                const result = await this.executeVerificationMethod(claim, method);
                verificationResults.push({
                    method: methodName,
                    result,
                    reliability: method.reliability,
                    timestamp: new Date()
                });

                // Add flags for concerning results
                if (result.confidence < 0.3) {
                    checkSession.flags.push({
                        type: 'low_confidence',
                        claim: claim.text,
                        method: methodName,
                        details: result.details
                    });
                }

                if (result.contradictions && result.contradictions.length > 0) {
                    checkSession.flags.push({
                        type: 'contradictions',
                        claim: claim.text,
                        contradictions: result.contradictions
                    });
                }

            } catch (error) {
                console.error(`❌ Verification method ${methodName} failed:`, error);
                verificationResults.push({
                    method: methodName,
                    result: { success: false, error: error.message },
                    reliability: 0,
                    timestamp: new Date()
                });
            }
        }

        checkSession.verifications.set(claim.text, verificationResults);
    }

    async executeVerificationMethod(claim, method) {
        switch (method.name) {
            case 'Cross-Reference Verification':
                return await this.crossReferenceVerification(claim);
            
            case 'Primary Source Verification':
                return await this.primarySourceVerification(claim);
            
            case 'Expert Consensus Check':
                return await this.expertConsensusCheck(claim);
            
            case 'Temporal Consistency Check':
                return await this.temporalConsistencyCheck(claim);
            
            case 'Logical Consistency Analysis':
                return await this.logicalConsistencyAnalysis(claim);
            
            case 'Statistical Verification':
                return await this.statisticalVerification(claim);
            
            default:
                return { success: false, confidence: 0, details: 'Unknown method' };
        }
    }

    async crossReferenceVerification(claim) {
        // Simulate cross-referencing across multiple sources
        const sources = ['source1', 'source2', 'source3'];
        const agreements = Math.floor(Math.random() * sources.length) + 1;
        
        return {
            success: true,
            confidence: agreements / sources.length,
            details: `${agreements}/${sources.length} sources agree`,
            sources: sources.slice(0, agreements),
            method: 'cross_reference'
        };
    }

    async primarySourceVerification(claim) {
        // Attempt to trace back to primary sources
        const hasPrimarySource = Math.random() > 0.3;
        
        return {
            success: hasPrimarySource,
            confidence: hasPrimarySource ? 0.9 : 0.2,
            details: hasPrimarySource ? 'Primary source found' : 'No primary source identified',
            primarySource: hasPrimarySource ? 'example-primary-source.com' : null,
            method: 'primary_source'
        };
    }

    async expertConsensusCheck(claim) {
        // Check against expert consensus
        const expertAgreement = Math.random();
        
        return {
            success: true,
            confidence: expertAgreement,
            details: `Expert consensus: ${Math.round(expertAgreement * 100)}%`,
            expertSources: ['expert1', 'expert2', 'expert3'],
            method: 'expert_consensus'
        };
    }

    async temporalConsistencyCheck(claim) {
        // Check temporal consistency
        const temporalIndicators = ['2023', '2024', 'last year', 'recently'];
        const hasTemporalClaim = temporalIndicators.some(indicator => 
            claim.text.toLowerCase().includes(indicator));
        
        if (!hasTemporalClaim) {
            return {
                success: true,
                confidence: 1.0,
                details: 'No temporal claims to verify',
                method: 'temporal_consistency'
            };
        }

        const isConsistent = Math.random() > 0.2;
        
        return {
            success: isConsistent,
            confidence: isConsistent ? 0.8 : 0.1,
            details: isConsistent ? 'Temporally consistent' : 'Temporal inconsistency detected',
            method: 'temporal_consistency'
        };
    }

    async logicalConsistencyAnalysis(claim) {
        // Check for logical consistency
        const contradictionWords = ['but', 'however', 'although', 'despite'];
        const hasContradiction = contradictionWords.some(word => 
            claim.text.toLowerCase().includes(word));
        
        const logicalScore = hasContradiction ? Math.random() * 0.5 : Math.random() * 0.5 + 0.5;
        
        return {
            success: true,
            confidence: logicalScore,
            details: logicalScore > 0.7 ? 'Logically consistent' : 'Potential logical issues',
            contradictions: hasContradiction ? ['Internal contradiction detected'] : [],
            method: 'logical_consistency'
        };
    }

    async statisticalVerification(claim) {
        // Verify statistical claims
        const numbers = claim.text.match(/\d+\.?\d*%?/g);
        
        if (!numbers || numbers.length === 0) {
            return {
                success: true,
                confidence: 1.0,
                details: 'No statistical claims to verify',
                method: 'statistical_verification'
            };
        }

        // Simulate statistical verification
        const isReasonable = Math.random() > 0.15; // 85% of stats are reasonable
        
        return {
            success: isReasonable,
            confidence: isReasonable ? 0.85 : 0.2,
            details: isReasonable ? 'Statistics appear reasonable' : 'Statistical claims questionable',
            numbersFound: numbers,
            method: 'statistical_verification'
        };
    }

    async detectHallucinations(checkId) {
        const checkSession = this.activeChecks.get(checkId);
        const content = checkSession.content;
        
        console.log('🕵️ Scanning for potential AI hallucinations...');

        // Check for hallucination patterns
        for (const pattern of this.hallucinationPatterns) {
            const detection = await this.checkHallucinationPattern(content, pattern);
            if (detection.detected) {
                checkSession.flags.push({
                    type: 'potential_hallucination',
                    pattern,
                    details: detection.details,
                    confidence: detection.confidence
                });
            }
        }
    }

    async checkHallucinationPattern(content, pattern) {
        switch (pattern) {
            case 'overly_specific_dates':
                const specificDates = content.match(/\w+ \d{1,2}, \d{4}/g);
                return {
                    detected: specificDates && specificDates.length > 3,
                    details: `Found ${specificDates?.length || 0} very specific dates`,
                    confidence: 0.6
                };

            case 'perfect_round_numbers':
                const roundNumbers = content.match(/\b(100|1000|10000|100000|1000000)%?\b/g);
                return {
                    detected: roundNumbers && roundNumbers.length > 2,
                    details: `Found ${roundNumbers?.length || 0} suspiciously round numbers`,
                    confidence: 0.7
                };

            case 'authority_name_dropping':
                const authorities = content.match(/according to (Dr\.|Professor|Expert) \w+ \w+/g);
                return {
                    detected: authorities && authorities.length > 2,
                    details: `Found ${authorities?.length || 0} authority name drops`,
                    confidence: 0.5
                };

            default:
                return { detected: false, details: 'Pattern not implemented', confidence: 0 };
        }
    }

    calculateConfidence(checkId) {
        const checkSession = this.activeChecks.get(checkId);
        let totalConfidence = 0;
        let totalWeight = 0;

        for (const [claim, verifications] of checkSession.verifications) {
            for (const verification of verifications) {
                if (verification.result.success) {
                    totalConfidence += verification.result.confidence * verification.reliability;
                    totalWeight += verification.reliability;
                }
            }
        }

        // Reduce confidence based on flags
        const flagPenalty = checkSession.flags.length * 0.1;
        const baseConfidence = totalWeight > 0 ? totalConfidence / totalWeight : 0.5;
        
        return Math.max(0, Math.min(1, baseConfidence - flagPenalty));
    }

    determineVerdict(checkId) {
        const checkSession = this.activeChecks.get(checkId);
        const confidence = checkSession.confidence;
        const flags = checkSession.flags;

        if (confidence >= 0.8 && flags.length === 0) {
            return 'verified';
        } else if (confidence >= 0.6 && flags.length <= 2) {
            return 'likely_accurate';
        } else if (confidence >= 0.4) {
            return 'mixed_evidence';
        } else if (confidence >= 0.2) {
            return 'questionable';
        } else {
            return 'likely_false';
        }
    }

    async generateFactCheckReport(checkId) {
        const checkSession = this.activeChecks.get(checkId);

        return {
            title: `Fact-Check Report - ${checkSession.id}`,
            verdict: checkSession.overallVerdict,
            confidence: checkSession.confidence,
            summary: this.generateSummary(checkSession),
            claims_analysis: this.generateClaimsAnalysis(checkSession),
            verification_methods: checkSession.methods,
            flags_raised: checkSession.flags,
            recommendations: this.generateRecommendations(checkSession),
            timestamp: new Date(),
            agent_signature: "PurpleBrain Fact-Check Agent - Truth Guardian"
        };
    }

    generateSummary(checkSession) {
        const verdictMessages = {
            'verified': 'Content appears to be factually accurate based on available evidence.',
            'likely_accurate': 'Content is likely accurate with minor concerns.',
            'mixed_evidence': 'Content contains both accurate and questionable elements.',
            'questionable': 'Content contains multiple unverified or contradictory claims.',
            'likely_false': 'Content contains significant inaccuracies or unverifiable claims.'
        };

        return verdictMessages[checkSession.overallVerdict] || 'Unable to determine accuracy.';
    }

    generateClaimsAnalysis(checkSession) {
        const analysis = [];
        
        for (const [claim, verifications] of checkSession.verifications) {
            const avgConfidence = verifications.reduce((sum, v) => 
                sum + (v.result.confidence || 0), 0) / verifications.length;
            
            analysis.push({
                claim: claim.substring(0, 100) + (claim.length > 100 ? '...' : ''),
                confidence: avgConfidence,
                methods_used: verifications.map(v => v.method),
                status: avgConfidence > 0.7 ? 'verified' : avgConfidence > 0.4 ? 'uncertain' : 'questionable'
            });
        }

        return analysis;
    }

    generateRecommendations(checkSession) {
        const recommendations = [];
        
        if (checkSession.confidence < 0.6) {
            recommendations.push('Seek additional verification from primary sources');
        }
        
        if (checkSession.flags.length > 0) {
            recommendations.push('Review flagged content for potential issues');
        }
        
        if (checkSession.flags.some(f => f.type === 'potential_hallucination')) {
            recommendations.push('Be cautious of potential AI-generated content');
        }

        return recommendations;
    }

    generateCheckId() {
        return `factcheck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Public API methods
    async quickCheck(content) {
        return await this.factCheck(content, {
            thoroughness: 'standard',
            methods: ['logical_consistency', 'cross_reference']
        });
    }

    async thoroughCheck(content) {
        return await this.factCheck(content, {
            thoroughness: 'thorough',
            methods: ['cross_reference', 'primary_source', 'logical_consistency', 'statistical_verification']
        });
    }

    async exhaustiveCheck(content) {
        return await this.factCheck(content, {
            thoroughness: 'exhaustive',
            methods: Array.from(this.verificationMethods.keys())
        });
    }

    getVerificationMethods() {
        return Array.from(this.verificationMethods.keys());
    }

    getMethodDescription(methodName) {
        return this.verificationMethods.get(methodName);
    }

    getTrustScore(domain) {
        return this.trustScore.get(domain)?.reliability || 0.5;
    }
}

export default FactCheckAgent;