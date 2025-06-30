import React from 'react'
import { motion } from 'framer-motion'
import { Database, Plus, Search, Upload } from 'lucide-react'

const KnowledgeBase = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-3">
            Knowledge Base
          </h1>
          <p className="text-xl text-cream-muted">
            AI-Powered Knowledge Hub - Coming Soon! 💜
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-12 text-center"
        >
          <Database className="w-16 h-16 text-purple-rain-accent mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-cream-soft mb-4">
            Knowledge Base System
          </h2>
          <p className="text-cream-muted/80 max-w-2xl mx-auto mb-8">
            Your single source of truth for all organizational knowledge. Upload documents, 
            create knowledge bases, and enable your AI agents to access and reason over your data.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Upload className="w-8 h-8 text-paisley-gold mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Upload & Index</h3>
              <p className="text-sm text-cream-muted/70">
                Upload documents and automatically index for AI retrieval
              </p>
            </div>
            
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Search className="w-8 h-8 text-purple-rain-accent mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Intelligent Search</h3>
              <p className="text-sm text-cream-muted/70">
                Semantic search across all your knowledge with AI understanding
              </p>
            </div>
            
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Plus className="w-8 h-8 text-purple-soft mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Agent Integration</h3>
              <p className="text-sm text-cream-muted/70">
                Connect knowledge to agents for context-aware responses
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default KnowledgeBase