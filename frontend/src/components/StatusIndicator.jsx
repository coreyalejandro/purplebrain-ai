import React from 'react'
import { motion } from 'framer-motion'
import { Wifi, WifiOff, Activity, AlertCircle } from 'lucide-react'

const StatusIndicator = ({ backendStatus, wsConnected }) => {
  const getStatusColor = () => {
    if (backendStatus === 'connected' && wsConnected) return 'text-green-400'
    if (backendStatus === 'connected' && !wsConnected) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusIcon = () => {
    if (backendStatus === 'connected' && wsConnected) return <Activity className="w-4 h-4" />
    if (backendStatus === 'connected' && !wsConnected) return <Wifi className="w-4 h-4" />
    return <WifiOff className="w-4 h-4" />
  }

  const getStatusText = () => {
    if (backendStatus === 'connected' && wsConnected) return 'Connected & Live'
    if (backendStatus === 'connected' && !wsConnected) return 'API Connected'
    if (backendStatus === 'connecting') return 'Connecting...'
    return 'Connection Failed'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="glass-panel px-4 py-2 flex items-center gap-3">
        <motion.div
          animate={{ 
            rotate: backendStatus === 'connecting' ? 360 : 0,
            scale: wsConnected ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 1, repeat: backendStatus === 'connecting' ? Infinity : 0 },
            scale: { duration: 2, repeat: Infinity }
          }}
          className={`${getStatusColor()}`}
        >
          {getStatusIcon()}
        </motion.div>
        
        <div>
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
          <div className="text-xs text-cream-muted/60">
            PurpleBrain-AI Status
          </div>
        </div>
        
        {/* Connection Quality Indicator */}
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 h-3 rounded-full ${
                backendStatus === 'connected' && wsConnected
                  ? 'bg-green-400'
                  : backendStatus === 'connected'
                  ? i < 2 ? 'bg-yellow-400' : 'bg-gray-600'
                  : i < 1 ? 'bg-red-400' : 'bg-gray-600'
              }`}
              animate={{
                scaleY: backendStatus === 'connected' && wsConnected ? [1, 1.5, 1] : 1
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default StatusIndicator