import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Eye, 
  BarChart3, 
  Code, 
  Brain, 
  Zap,
  Play,
  Settings,
  Activity,
  Clock,
  TrendingUp
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { agentAPI } from '../services/api'
import { useAgentStore } from '../store/agentStore'
import AgentModal from './AgentModal'

const AgentStore = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  
  const { agents, setAgents, executionHistory } = useAgentStore()

  // Fetch agents status
  const { data: agentsData, isLoading, refetch } = useQuery({
    queryKey: ['agents'],
    queryFn: agentAPI.getAgentsStatus,
    refetchInterval: 10000, // Refresh every 10 seconds
  })

  useEffect(() => {
    if (agentsData) {
      setAgents(agentsData)
    }
  }, [agentsData, setAgents])

  // Enhanced agent definitions with more details
  const agentDefinitions = {
    visualization: {
      name: 'Visualization Agent',
      icon: BarChart3,
      color: 'purple-rain-accent',
      persona: 'Master Data Storyteller & Visual Intelligence',
      description: 'Next-level visualization powerhouse that transforms data into compelling visual stories with AI-powered insights and interactive dashboards.',
      capabilities: [
        'Intelligent Chart Recommendation',
        'Interactive Dashboards', 
        'Data Analysis & Insights',
        'Infographic Generation',
        'Business Visualization',
        'Real-time Data Streaming',
        'Multi-format Export',
        'Brand Styling'
      ],
      useCases: [
        'Executive dashboards for decision making',
        'Marketing presentations and infographics',
        'Data analysis and pattern discovery',
        'Business intelligence reporting'
      ],
      pricing: 'Enhanced',
      category: 'Data & Analytics'
    },
    research: {
      name: 'Research Agent',
      icon: Search,
      color: 'purple-soft',
      persona: 'Elite Intelligence Analyst & Information Strategist',
      description: 'Deep intelligence gathering agent with comprehensive web research, competitive analysis, and market intelligence capabilities.',
      capabilities: [
        'Deep Web Research',
        'Competitive Intelligence',
        'Market Analysis',
        'Trend Identification',
        'Source Verification',
        'Data Synthesis',
        'Real-time Monitoring',
        'Expert Source Identification'
      ],
      useCases: [
        'Market research and competitive analysis',
        'Investment due diligence',
        'Academic research and fact-checking',
        'Trend analysis and forecasting'
      ],
      pricing: 'Enhanced',
      category: 'Research & Intelligence'
    },
    code: {
      name: 'Code Agent',
      icon: Code,
      color: 'paisley-gold',
      persona: 'Elite Software Architect & Development Strategist',
      description: 'Full-stack development intelligence with architecture design, code optimization, security analysis, and deployment automation.',
      capabilities: [
        'Full-stack Development',
        'Architecture Design',
        'Code Optimization',
        'Security Analysis',
        'Performance Tuning',
        'Deployment Automation',
        'Code Review',
        'Technical Documentation'
      ],
      useCases: [
        'Rapid prototype development',
        'Code review and optimization',
        'Architecture planning and design',
        'Technical documentation generation'
      ],
      pricing: 'Enhanced',
      category: 'Development & Engineering'
    }
  }

  const openAgentModal = (agentKey) => {
    setSelectedAgent(agentKey)
    setModalOpen(true)
  }

  const filteredAgents = Object.entries(agentDefinitions).filter(([key, agent]) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="loading-spinner w-12 h-12 mb-4"></div>
          <p className="text-cream-muted">Loading AI agents...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-3">
            AI Agent Store
          </h1>
          <p className="text-xl text-cream-muted mb-6">
            Your collection of next-level AI agents for comprehensive workflows
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream-muted/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-6 h-6 text-purple-rain-accent" />
              <span className="text-cream-muted/80">Active Agents</span>
            </div>
            <div className="text-2xl font-bold text-paisley-gold">
              {Object.keys(agents).length}
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-green-400" />
              <span className="text-cream-muted/80">Total Executions</span>
            </div>
            <div className="text-2xl font-bold text-paisley-gold">
              {Object.values(agents).reduce((sum, agent) => sum + (agent.execution_count || 0), 0)}
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-cream-muted/80">Recent History</span>
            </div>
            <div className="text-2xl font-bold text-paisley-gold">
              {executionHistory.length}
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-light" />
              <span className="text-cream-muted/80">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-paisley-gold">
              95%
            </div>
          </div>
        </motion.div>

        {/* Agent Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredAgents.map(([agentKey, agent], index) => {
              const Icon = agent.icon
              const agentData = agents[agentKey]
              const isOnline = agentData?.execution_count !== undefined
              
              return (
                <motion.div
                  key={agentKey}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="agent-card group"
                  onClick={() => openAgentModal(agentKey)}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`status-${isOnline ? 'online' : 'error'}`}></div>
                  </div>
                  
                  {/* Agent Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-xl bg-${agent.color}/10 border border-${agent.color}/20`}
                    >
                      <Icon className={`w-8 h-8 text-${agent.color} neural-glow`} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-cream-soft mb-1">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-paisley-gold/80 font-medium">
                        {agent.persona}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-purple-rain-accent/20 text-purple-rain-accent rounded-full">
                          {agent.category}
                        </span>
                        <span className="text-xs px-2 py-1 bg-paisley-gold/20 text-paisley-gold rounded-full">
                          {agent.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-cream-muted/90 text-sm leading-relaxed mb-4">
                    {agent.description}
                  </p>
                  
                  {/* Key Capabilities */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-cream-muted/60 uppercase mb-2">
                      Key Capabilities
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 3).map((capability, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-album-midnight text-cream-soft rounded border border-cream-soft/10"
                        >
                          {capability}
                        </span>
                      ))}
                      {agent.capabilities.length > 3 && (
                        <span className="text-xs px-2 py-1 text-cream-muted/60">
                          +{agent.capabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-cream-muted/60 mb-4">
                    <span>Executions: {agentData?.execution_count || 0}</span>
                    <span>Avg Time: {agentData?.avg_execution_time || 0}ms</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        openAgentModal(agentKey)
                      }}
                    >
                      <Play className="w-4 h-4" />
                      Execute
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-secondary p-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Open settings/config modal
                        toast.success('Agent configuration coming soon!')
                      }}
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {/* Hover Preview */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-purple-rain-deep/20 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="text-center text-cream-soft">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Click to execute</p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredAgents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-cream-muted/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-cream-muted mb-2">
              No agents found
            </h3>
            <p className="text-cream-muted/60">
              Try adjusting your search terms
            </p>
          </motion.div>
        )}
      </div>

      {/* Agent Modal */}
      <AgentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        agentKey={selectedAgent}
        agentDefinition={selectedAgent ? agentDefinitions[selectedAgent] : null}
        agentData={selectedAgent ? agents[selectedAgent] : null}
      />
    </div>
  )
}

export default AgentStore