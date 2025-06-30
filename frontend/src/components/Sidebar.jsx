import React from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Cpu, 
  FileText, 
  Monitor, 
  Settings, 
  BarChart3,
  Shield,
  BookOpen,
  Zap,
  Users,
  GitBranch,
  Play,
  Home
} from 'lucide-react'

const Sidebar = ({ currentSection, onSectionChange }) => {
  const navSections = [
    {
      title: 'PurpleBrain Builder',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Quick Actions' },
        { id: 'knowledge-base', label: 'Knowledge Base', icon: Database, description: 'AI-Powered Knowledge Hub' },
        { id: 'agent-store', label: 'AI Agents', icon: Cpu, description: 'Enhanced Agent Collection' },
        { id: 'prompt-lab', label: 'Prompt Lab', icon: Zap, description: 'Prompt Engineering Workspace' },
        { id: 'workflows', label: 'Workflows', icon: GitBranch, description: 'Agent Orchestration' },
        { id: 'monitor', label: 'Monitor', icon: Monitor, description: 'Performance Analytics' },
        { id: 'security', label: 'Security Features', icon: Shield, description: 'Enterprise Security' },
        { id: 'settings', label: 'Settings', icon: Settings, description: 'Platform Configuration' },
        { id: 'api-docs', label: 'API Tutorials', icon: BookOpen, description: 'Developer Resources' }
      ]
    },
    {
      title: 'PurpleBrain XPLR',
      items: [
        { id: 'xplr-modules', label: 'XPLR Modules', icon: Play, description: 'Advanced Exploration Tools' },
        { id: 'simulation', label: 'Simulation XPLR', icon: BarChart3, description: 'Scenario Simulation' },
        { id: 'taxonomy', label: 'Taxonomy XPLR', icon: FileText, description: 'Knowledge Organization' },
        { id: 'solution', label: 'Solution XPLR', icon: Zap, description: 'Solution Discovery' },
        { id: 'portfolio', label: 'Portfolio XPLR', icon: Users, description: 'Project Portfolio' }
      ]
    }
  ]

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-80 bg-album-charcoal/95 backdrop-blur-xl border-r border-cream-soft/10 h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-cream-soft/10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gradient mb-2">
            PurpleBrain
          </h1>
          <p className="text-cream-muted text-sm">
            Your Purple Rain AI Workspace
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-6">
        {navSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
          >
            {/* Section Header */}
            <div className="mb-3">
              <h3 className="text-xs font-semibold text-cream-muted/60 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                const isActive = currentSection === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + itemIndex * 0.05 }}
                    onClick={() => onSectionChange(item.id)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-all duration-300
                      flex items-center gap-3 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-paisley-gold/10 text-paisley-gold border-l-4 border-paisley-gold' 
                        : 'text-cream-soft/80 hover:text-paisley-gold hover:bg-album-midnight/50 border-l-4 border-transparent hover:border-paisley-gold/50'
                      }
                    `}
                  >
                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-paisley-gold/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={false}
                      animate={{ x: isActive ? 0 : '-100%' }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? 5 : 0 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'neural-glow' : ''}`} />
                    </motion.div>
                    
                    {/* Label & Description */}
                    <div className="flex-1 relative z-10">
                      <div className={`font-medium ${isActive ? 'text-paisley-gold' : ''}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-cream-muted/60 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-paisley-gold rounded-full relative z-10"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto p-6 border-t border-cream-soft/10"
      >
        <div className="text-xs text-cream-muted/60 text-center">
          <div className="mb-2">Version 2.0.0</div>
          <div className="italic">
            "Where AI Agents Dance Like Purple Rain" 💜
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Sidebar