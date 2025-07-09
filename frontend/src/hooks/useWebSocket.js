import { useState, useEffect, useCallback, useRef } from 'react'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const socketRef = useRef(null)

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8001'
    
    socketRef.current = io(wsUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    })

    socketRef.current.on('connect', () => {
      console.log('🔌 WebSocket connected')
      setIsConnected(true)
      toast.success('Connected to PurpleBrain-AI', { duration: 2000 })
    })

    socketRef.current.on('disconnect', (reason) => {
      console.log('🔌 WebSocket disconnected:', reason)
      setIsConnected(false)
      
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        setTimeout(() => {
          if (socketRef.current) {
            socketRef.current.connect()
          }
        }, 2000)
      }
    })

    socketRef.current.on('connect_error', (error) => {
      console.error('🔌 WebSocket connection error:', error)
      setIsConnected(false)
      toast.error('Connection failed - retrying...', { duration: 3000 })
    })

    socketRef.current.on('agent_response', (data) => {
      console.log('🤖 Agent response received:', data)
      setLastMessage(data)
      
      if (data.success) {
        toast.success(`${data.agent} completed successfully`)
      } else {
        toast.error(`${data.agent} failed: ${data.error}`)
      }
    })

    socketRef.current.on('agent_status', (data) => {
      console.log('📊 Agent status update:', data)
      setLastMessage(data)
    })

    socketRef.current.on('system_alert', (data) => {
      console.log('⚠️ System alert:', data)
      toast(data.message, {
        icon: data.type === 'error' ? '❌' : data.type === 'warning' ? '⚠️' : 'ℹ️',
        duration: data.type === 'error' ? 5000 : 3000
      })
    })

  }, [])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [])

  const sendMessage = useCallback((event, data) => {
    if (socketRef.current?.connected) {
      console.log(`📤 Sending message: ${event}`, data)
      socketRef.current.emit(event, data)
      return true
    } else {
      console.warn('❌ Cannot send message - WebSocket not connected')
      toast.error('Not connected to server')
      return false
    }
  }, [])

  const executeAgent = useCallback((agentName, taskData) => {
    return sendMessage('agent_request', {
      agent: agentName,
      task: taskData,
      timestamp: new Date().toISOString()
    })
  }, [sendMessage])

  // Auto-connect on mount
  useEffect(() => {
    connect()

    // Cleanup on unmount
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  // Auto-reconnect logic
  useEffect(() => {
    if (!isConnected) {
      const reconnectTimer = setTimeout(() => {
        console.log('🔄 Attempting to reconnect...')
        connect()
      }, 5000)

      return () => clearTimeout(reconnectTimer)
    }
  }, [isConnected, connect])

  return {
    isConnected,
    lastMessage,
    sendMessage,
    executeAgent,
    connect,
    disconnect
  }
}

// Custom hook for real-time agent monitoring
export const useAgentMonitoring = () => {
  const { lastMessage, isConnected } = useWebSocket()
  const [agentMetrics, setAgentMetrics] = useState({})
  const [recentExecutions, setRecentExecutions] = useState([])

  useEffect(() => {
    if (lastMessage?.type === 'agent_response') {
      // Update metrics
      setAgentMetrics(prev => ({
        ...prev,
        [lastMessage.agent]: {
          ...prev[lastMessage.agent],
          lastExecution: new Date().toISOString(),
          totalExecutions: (prev[lastMessage.agent]?.totalExecutions || 0) + 1,
          successRate: lastMessage.success ? 
            ((prev[lastMessage.agent]?.successRate || 0) + 1) : 
            (prev[lastMessage.agent]?.successRate || 0),
          averageTime: lastMessage.execution_time || 0
        }
      }))

      // Add to recent executions
      setRecentExecutions(prev => [
        {
          id: Date.now(),
          agent: lastMessage.agent,
          success: lastMessage.success,
          timestamp: new Date().toISOString(),
          executionTime: lastMessage.execution_time || 0
        },
        ...prev.slice(0, 19) // Keep last 20
      ])
    }
  }, [lastMessage])

  return {
    isConnected,
    agentMetrics,
    recentExecutions,
    clearMetrics: () => {
      setAgentMetrics({})
      setRecentExecutions([])
    }
  }
}