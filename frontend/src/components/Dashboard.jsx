import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Activity, 
  Clock, 
  TrendingUp,
  Zap,
  BarChart3,
  Users,
  Database
} from 'lucide-react'

const Dashboard = () => {
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
            Dashboard
          </h1>
          <p className="text-xl text-cream-muted">
            Your AI Empire Command Center
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-rain-accent/20 rounded-lg">
                <Brain className="w-6 h-6 text-purple-rain-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-paisley-gold">3</div>
                <div className="text-sm text-cream-muted/80">Active Agents</div>
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              100% operational
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-400/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-paisley-gold">127</div>
                <div className="text-sm text-cream-muted/80">Total Executions</div>
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +23% this week
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-paisley-gold">1.2s</div>
                <div className="text-sm text-cream-muted/80">Avg Response</div>
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              15% faster
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-light/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-light" />
              </div>
              <div>
                <div className="text-2xl font-bold text-paisley-gold">97%</div>
                <div className="text-sm text-cream-muted/80">Success Rate</div>
              </div>
            </div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2% improvement
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-purple-rain-accent" />
              <div>
                <h3 className="text-lg font-semibold text-cream-soft">
                  Visualization Agent
                </h3>
                <p className="text-sm text-cream-muted/80">
                  Create stunning data visualizations
                </p>
              </div>
            </div>
            <button className="btn-primary w-full">
              Quick Execute
            </button>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-paisley-gold" />
              <div>
                <h3 className="text-lg font-semibold text-cream-soft">
                  Research Agent
                </h3>
                <p className="text-sm text-cream-muted/80">
                  Deep market intelligence
                </p>
              </div>
            </div>
            <button className="btn-primary w-full">
              Quick Execute
            </button>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-purple-soft" />
              <div>
                <h3 className="text-lg font-semibold text-cream-soft">
                  Code Agent
                </h3>
                <p className="text-sm text-cream-muted/80">
                  Full-stack development
                </p>
              </div>
            </div>
            <button className="btn-primary w-full">
              Quick Execute
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <h3 className="text-xl font-semibold text-cream-soft mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { agent: 'Visualization Agent', action: 'Created dashboard visualization', time: '2 minutes ago', status: 'success' },
              { agent: 'Research Agent', action: 'Market analysis completed', time: '15 minutes ago', status: 'success' },
              { agent: 'Code Agent', action: 'Architecture design generated', time: '1 hour ago', status: 'success' },
              { agent: 'Visualization Agent', action: 'Infographic created', time: '2 hours ago', status: 'success' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-album-midnight/30 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <div className="flex-1">
                  <div className="font-medium text-cream-soft">{activity.agent}</div>
                  <div className="text-sm text-cream-muted/80">{activity.action}</div>
                </div>
                <div className="text-xs text-cream-muted/60">{activity.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard