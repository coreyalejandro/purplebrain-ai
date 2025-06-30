import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Agent Store - Global state management for agents
export const useAgentStore = create(
  devtools(
    (set, get) => ({
      // State
      agents: {},
      activeAgent: null,
      executionHistory: [],
      isExecuting: false,
      
      // Actions
      setAgents: (agents) => set({ agents }),
      
      setActiveAgent: (agentKey) => set({ activeAgent: agentKey }),
      
      addExecutionResult: (result) => set((state) => ({
        executionHistory: [result, ...state.executionHistory.slice(0, 49)] // Keep last 50
      })),
      
      setExecuting: (isExecuting) => set({ isExecuting }),
      
      // Get agent by key
      getAgent: (agentKey) => {
        const { agents } = get()
        return agents[agentKey] || null
      },
      
      // Update agent execution count
      updateAgentStats: (agentKey, executionTime) => set((state) => ({
        agents: {
          ...state.agents,
          [agentKey]: {
            ...state.agents[agentKey],
            execution_count: (state.agents[agentKey]?.execution_count || 0) + 1,
            last_execution: new Date().toISOString(),
            avg_execution_time: executionTime
          }
        }
      })),
      
      // Clear execution history
      clearHistory: () => set({ executionHistory: [] }),
    }),
    {
      name: 'purplebrain-agents',
    }
  )
)

// UI Store - Global UI state
export const useUIStore = create(
  devtools(
    (set) => ({
      // State
      sidebarCollapsed: false,
      currentTheme: 'purple-rain',
      notifications: [],
      modals: {
        agentModal: false,
        settingsModal: false,
        knowledgeModal: false
      },
      
      // Actions
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      
      setTheme: (theme) => set({ currentTheme: theme }),
      
      addNotification: (notification) => set((state) => ({
        notifications: [
          ...state.notifications,
          { ...notification, id: Date.now() }
        ]
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      openModal: (modalName) => set((state) => ({
        modals: { ...state.modals, [modalName]: true }
      })),
      
      closeModal: (modalName) => set((state) => ({
        modals: { ...state.modals, [modalName]: false }
      })),
      
      closeAllModals: () => set((state) => ({
        modals: Object.keys(state.modals).reduce((acc, key) => {
          acc[key] = false
          return acc
        }, {})
      })),
    }),
    {
      name: 'purplebrain-ui',
    }
  )
)

// Knowledge Base Store
export const useKnowledgeStore = create(
  devtools(
    (set, get) => ({
      // State
      knowledgeBases: [],
      currentKB: null,
      uploadProgress: 0,
      isProcessing: false,
      searchResults: [],
      
      // Actions
      setKnowledgeBases: (kbs) => set({ knowledgeBases: kbs }),
      
      setCurrentKB: (kb) => set({ currentKB: kb }),
      
      addKnowledgeBase: (kb) => set((state) => ({
        knowledgeBases: [...state.knowledgeBases, kb]
      })),
      
      updateKnowledgeBase: (id, updates) => set((state) => ({
        knowledgeBases: state.knowledgeBases.map(kb => 
          kb.id === id ? { ...kb, ...updates } : kb
        )
      })),
      
      deleteKnowledgeBase: (id) => set((state) => ({
        knowledgeBases: state.knowledgeBases.filter(kb => kb.id !== id),
        currentKB: state.currentKB?.id === id ? null : state.currentKB
      })),
      
      setUploadProgress: (progress) => set({ uploadProgress: progress }),
      
      setProcessing: (isProcessing) => set({ isProcessing }),
      
      setSearchResults: (results) => set({ searchResults: results }),
      
      // Search knowledge base
      searchKnowledgeBase: async (query, kbId) => {
        set({ isProcessing: true })
        try {
          // This would be an API call to search the knowledge base
          const results = await searchKB(query, kbId)
          set({ searchResults: results, isProcessing: false })
          return results
        } catch (error) {
          console.error('Search failed:', error)
          set({ isProcessing: false })
          throw error
        }
      }
    }),
    {
      name: 'purplebrain-knowledge',
    }
  )
)

// Mock search function - replace with actual API
async function searchKB(query, kbId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    {
      id: '1',
      title: `Search result for: ${query}`,
      content: 'This is a mock search result that would come from your knowledge base...',
      score: 0.95,
      source: 'document.pdf',
      page: 1
    }
  ]
}