import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// Components
import Sidebar from './components/Sidebar'
import AgentStore from './components/AgentStore'
import Dashboard from './components/Dashboard'
import KnowledgeBase from './components/KnowledgeBase'
import PromptLab from './components/PromptLab'
import Monitor from './components/Monitor'
import Settings from './components/Settings'
import NeuralBackground from './components/NeuralBackground'
import StatusIndicator from './components/StatusIndicator'

// Hooks and utilities
import { useAgentStore } from './store/agentStore'
import { useWebSocket } from './hooks/useWebSocket'
import { checkBackendHealth } from './services/api'

function App() {
  const [currentSection, setCurrentSection] = useState('agent-store')
  const [isLoading, setIsLoading] = useState(true)
  const [backendStatus, setBackendStatus] = useState('connecting')
  
  // Global state
  const { agents, setAgents } = useAgentStore()
  
  // WebSocket connection
  const { isConnected, sendMessage } = useWebSocket()

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check backend health
        const health = await checkBackendHealth()
        setBackendStatus(health ? 'connected' : 'error')
        
        // Load agent status
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agents/status`)
        if (response.ok) {
          const agentData = await response.json()
          setAgents(agentData)
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setBackendStatus('error')
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [setAgents])

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-album-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="loading-spinner w-16 h-16 mb-6"></div>
          <h2 className="text-2xl font-semibold text-paisley-gold mb-2">
            🎵 PurpleBrain Initializing...
          </h2>
          <p className="text-cream-muted">Your Purple Rain AI Workspace</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-album-black text-cream-soft overflow-hidden">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Status Indicator */}
      <StatusIndicator 
        backendStatus={backendStatus}
        wsConnected={isConnected}
      />
      
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar Navigation */}
        <Sidebar 
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentSection === 'dashboard' && <Dashboard />}
              {currentSection === 'agent-store' && <AgentStore />}
              {currentSection === 'knowledge-base' && <KnowledgeBase />}
              {currentSection === 'prompt-lab' && <PromptLab />}
              {currentSection === 'monitor' && <Monitor />}
              {currentSection === 'settings' && <Settings />}
              
              {/* Default placeholder for other sections */}
              {!['dashboard', 'agent-store', 'knowledge-base', 'prompt-lab', 'monitor', 'settings'].includes(currentSection) && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-paisley-gold mb-4">
                      {currentSection.replace('-', ' ').toUpperCase()}
                    </h2>
                    <p className="text-cream-muted">Coming soon! 💜</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Prince Signature */}
      <div className="prince-quote">
        "Dearly beloved, we are gathered here today to get through this thing called life" - Prince 💜
      </div>
    </div>
  )
}

export default App