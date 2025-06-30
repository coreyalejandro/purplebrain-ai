import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error)
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout - please try again')
    } else if (error.response?.status === 404) {
      toast.error('Service not found')
    } else if (error.response?.status >= 500) {
      toast.error('Server error - please try again later')
    } else if (error.response?.status === 401) {
      toast.error('Unauthorized access')
    } else {
      toast.error(error.response?.data?.detail || 'An error occurred')
    }
    
    return Promise.reject(error)
  }
)

// API Functions
export const agentAPI = {
  // Get all agents status
  getAgentsStatus: async () => {
    const response = await api.get('/api/agents/status')
    return response.data
  },
  
  // Execute specific agent
  executeAgent: async (agentName, taskData) => {
    const response = await api.post(`/api/agent/${agentName}`, taskData)
    return response.data
  },
  
  // Get agent execution history
  getExecutionHistory: async (agentName, limit = 10) => {
    const response = await api.get(`/api/agent/${agentName}/history?limit=${limit}`)
    return response.data
  }
}

export const knowledgeAPI = {
  // Get all knowledge bases
  getKnowledgeBases: async () => {
    const response = await api.get('/api/knowledge-bases')
    return response.data
  },
  
  // Create new knowledge base
  createKnowledgeBase: async (data) => {
    const response = await api.post('/api/knowledge-bases', data)
    return response.data
  },
  
  // Upload file to knowledge base
  uploadFile: async (kbId, file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post(`/api/knowledge-bases/${kbId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(progress)
        }
      },
    })
    return response.data
  },
  
  // Search knowledge base
  searchKnowledgeBase: async (kbId, query, options = {}) => {
    const response = await api.post(`/api/knowledge-bases/${kbId}/search`, {
      query,
      ...options
    })
    return response.data
  },
  
  // Delete knowledge base
  deleteKnowledgeBase: async (kbId) => {
    const response = await api.delete(`/api/knowledge-bases/${kbId}`)
    return response.data
  }
}

export const promptAPI = {
  // Get all prompts
  getPrompts: async () => {
    const response = await api.get('/api/prompts')
    return response.data
  },
  
  // Create new prompt
  createPrompt: async (promptData) => {
    const response = await api.post('/api/prompts', promptData)
    return response.data
  },
  
  // Test prompt
  testPrompt: async (promptData) => {
    const response = await api.post('/api/prompts/test', promptData)
    return response.data
  },
  
  // Update prompt
  updatePrompt: async (promptId, promptData) => {
    const response = await api.put(`/api/prompts/${promptId}`, promptData)
    return response.data
  },
  
  // Delete prompt
  deletePrompt: async (promptId) => {
    const response = await api.delete(`/api/prompts/${promptId}`)
    return response.data
  }
}

export const monitorAPI = {
  // Get system metrics
  getSystemMetrics: async () => {
    const response = await api.get('/api/monitor/metrics')
    return response.data
  },
  
  // Get agent performance stats
  getAgentStats: async (timeRange = '24h') => {
    const response = await api.get(`/api/monitor/agents?range=${timeRange}`)
    return response.data
  },
  
  // Get error logs
  getErrorLogs: async (limit = 50) => {
    const response = await api.get(`/api/monitor/errors?limit=${limit}`)
    return response.data
  }
}

// Health check function
export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/', { timeout: 5000 })
    return response.status === 200
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}

// Export the configured axios instance for custom requests
export default api