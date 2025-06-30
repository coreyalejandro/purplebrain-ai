import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Play, 
  Zap, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  BarChart3,
  Download,
  Copy
} from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { agentAPI } from '../services/api'
import { useAgentStore } from '../store/agentStore'

const AgentModal = ({ isOpen, onClose, agentKey, agentDefinition, agentData }) => {
  const [task, setTask] = useState('')
  const [options, setOptions] = useState({
    style: 'professional',
    format: 'json',
    includeMetrics: true
  })
  const [result, setResult] = useState(null)
  
  const { addExecutionResult, updateAgentStats } = useAgentStore()

  // Execute agent mutation
  const executeMutation = useMutation({
    mutationFn: (data) => agentAPI.executeAgent(agentKey, data),
    onSuccess: (data) => {
      setResult(data.result)
      addExecutionResult({
        ...data,
        agentKey,
        timestamp: new Date().toISOString()
      })
      updateAgentStats(agentKey, data.result.execution_time)
      toast.success(`${agentDefinition?.name} executed successfully!`)
    },
    onError: (error) => {
      toast.error(`Execution failed: ${error.message}`)
    }
  })

  const handleExecute = () => {
    if (!task.trim()) {
      toast.error('Please enter a task or query')
      return
    }

    const taskData = {
      query: task,
      options,
      data: { timestamp: new Date().toISOString() }
    }

    executeMutation.mutate(taskData)
  }

  const handleWorkflow = () => {
    toast.success('Full workflow execution coming soon!')
  }

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2))
      toast.success('Result copied to clipboard')
    }
  }

  if (!isOpen || !agentDefinition) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-cream-soft/10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${agentDefinition.color}/10 border border-${agentDefinition.color}/20`}>
                  <agentDefinition.icon className={`w-8 h-8 text-${agentDefinition.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-cream-soft mb-1">
                    {agentDefinition.name}
                  </h2>
                  <p className="text-paisley-gold font-medium">
                    {agentDefinition.persona}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-cream-muted/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Executions: {agentData?.execution_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      Avg Time: {agentData?.avg_execution_time || 0}ms
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream-soft/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-cream-muted" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Description & Capabilities */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-cream-soft mb-3">
                  About This Agent
                </h3>
                <p className="text-cream-muted/90 leading-relaxed mb-4">
                  {agentDefinition.description}
                </p>
                
                <h4 className="font-medium text-cream-soft mb-2">Use Cases:</h4>
                <ul className="space-y-1 text-sm text-cream-muted/80">
                  {agentDefinition.useCases?.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cream-soft mb-3">
                  Capabilities
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {agentDefinition.capabilities.map((capability, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 bg-album-midnight/50 rounded-lg"
                    >
                      <Zap className="w-4 h-4 text-paisley-gold" />
                      <span className="text-sm text-cream-soft">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Input */}
            <div>
              <h3 className="text-lg font-semibold text-cream-soft mb-3">
                Task Input
              </h3>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder={`Enter your task or query for ${agentDefinition.name}...`}
                className="input-field w-full min-h-[120px] resize-y"
                disabled={executeMutation.isPending}
              />
              
              {/* Options */}
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-cream-muted/80 mb-2">
                    Style
                  </label>
                  <select
                    value={options.style}
                    onChange={(e) => setOptions(prev => ({ ...prev, style: e.target.value }))}
                    className="input-field w-full"
                    disabled={executeMutation.isPending}
                  >
                    <option value="professional">Professional</option>
                    <option value="creative">Creative</option>
                    <option value="executive">Executive</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cream-muted/80 mb-2">
                    Output Format
                  </label>
                  <select
                    value={options.format}
                    onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value }))}
                    className="input-field w-full"
                    disabled={executeMutation.isPending}
                  >
                    <option value="json">JSON</option>
                    <option value="markdown">Markdown</option>
                    <option value="html">HTML</option>
                    <option value="text">Plain Text</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={options.includeMetrics}
                      onChange={(e) => setOptions(prev => ({ ...prev, includeMetrics: e.target.checked }))}
                      className="w-4 h-4 text-paisley-gold bg-album-charcoal border-cream-soft/20 rounded focus:ring-paisley-gold"
                      disabled={executeMutation.isPending}
                    />
                    <span className="text-sm text-cream-muted/80">Include Metrics</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExecute}
                disabled={executeMutation.isPending}
                className="btn-primary flex items-center gap-2 flex-1"
              >
                {executeMutation.isPending ? (
                  <>
                    <div className="loading-spinner w-4 h-4"></div>
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Execute Agent
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWorkflow}
                disabled={executeMutation.isPending}
                className="btn-secondary flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Full Workflow
              </motion.button>
            </div>

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-cream-soft/10 pt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-cream-soft">
                    Results
                  </h3>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyResult}
                      className="p-2 hover:bg-cream-soft/10 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-cream-muted" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-cream-soft/10 rounded-lg transition-colors"
                      title="Export results"
                    >
                      <Download className="w-4 h-4 text-cream-muted" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Result Tabs */}
                <div className="bg-album-charcoal/50 rounded-xl p-4">
                  {/* Execution Info */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-cream-muted/60">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Execution Time: {result.execution_time?.toFixed(2)}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {/* Result Content */}
                  <div className="space-y-4">
                    {/* Visualization Results */}
                    {agentKey === 'visualization' && result.visualizations && (
                      <div>
                        <h4 className="font-medium text-cream-soft mb-2">Visualizations Created</h4>
                        <div className="grid gap-3">
                          {result.visualizations.map((viz, i) => (
                            <div key={i} className="bg-album-midnight/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="w-4 h-4 text-purple-rain-accent" />
                                <span className="font-medium text-cream-soft">{viz.title}</span>
                                <span className="text-xs px-2 py-1 bg-purple-rain-accent/20 text-purple-rain-accent rounded">
                                  {viz.type}
                                </span>
                              </div>
                              <p className="text-sm text-cream-muted/80">{viz.config?.charts?.length || 0} charts configured</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Research Results */}
                    {agentKey === 'research' && result.research_results && (
                      <div>
                        <h4 className="font-medium text-cream-soft mb-2">Research Findings</h4>
                        <div className="bg-album-midnight/50 rounded-lg p-3">
                          <p className="text-sm text-cream-muted/80 mb-2">
                            Sources Analyzed: {result.sources_analyzed || 0}
                          </p>
                          <p className="text-sm text-cream-muted/80">
                            Confidence Score: {((result.confidence_score || 0) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Code Results */}
                    {agentKey === 'code' && result.code_solutions && (
                      <div>
                        <h4 className="font-medium text-cream-soft mb-2">Code Solutions</h4>
                        <div className="bg-album-midnight/50 rounded-lg p-3">
                          <p className="text-sm text-cream-muted/80 mb-2">
                            Architecture: {result.architecture_design?.architecture_type || 'N/A'}
                          </p>
                          <p className="text-sm text-cream-muted/80">
                            Development Time: {result.estimated_development_time || 'N/A'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Raw Result */}
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-cream-muted/80 hover:text-cream-soft transition-colors">
                        View Raw Result
                      </summary>
                      <div className="mt-2 p-3 bg-album-black/50 rounded-lg">
                        <pre className="text-xs text-cream-muted/70 overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </div>
                    </details>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Error Display */}
            {executeMutation.isError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-cream-soft/10 pt-6"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="font-medium text-red-400">Execution Failed</span>
                  </div>
                  <p className="text-sm text-red-300/80">
                    {executeMutation.error?.message || 'An unexpected error occurred'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AgentModal