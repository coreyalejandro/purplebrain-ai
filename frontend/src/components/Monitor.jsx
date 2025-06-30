import React from 'react'
import { motion } from 'framer-motion'
import { Monitor as MonitorIcon, Activity, AlertTriangle, BarChart3 } from 'lucide-react'

const Monitor = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-3">
            Monitor
          </h1>
          <p className="text-xl text-cream-muted">
            Performance Analytics & System Health - Coming Soon! 📊
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-12 text-center"
        >
          <MonitorIcon className="w-16 h-16 text-purple-rain-accent mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-cream-soft mb-4">
            Advanced Monitoring & Analytics
          </h2>
          <p className="text-cream-muted/80 max-w-2xl mx-auto mb-8">
            Monitor your AI agents' performance, track usage metrics, and get insights 
            into your AI operations with real-time dashboards and alerts.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Activity className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Real-time Metrics</h3>
              <p className="text-sm text-cream-muted/70">
                Live performance monitoring and system health checks
              </p>
            </div>
            
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <BarChart3 className="w-8 h-8 text-paisley-gold mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Usage Analytics</h3>
              <p className="text-sm text-cream-muted/70">
                Detailed insights into agent usage and performance trends
              </p>
            </div>
            
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Smart Alerts</h3>
              <p className="text-sm text-cream-muted/70">
                Proactive notifications for errors and performance issues
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Monitor