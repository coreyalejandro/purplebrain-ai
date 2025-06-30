import React from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Palette, Shield, Key } from 'lucide-react'

const Settings = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-3">
            Settings
          </h1>
          <p className="text-xl text-cream-muted">
            Platform Configuration - Coming Soon! ⚙️
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-12 text-center"
        >
          <SettingsIcon className="w-16 h-16 text-paisley-gold mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-cream-soft mb-4">
            Comprehensive Platform Settings
          </h2>
          <p className="text-cream-muted/80 max-w-2xl mx-auto mb-8">
            Configure your PurpleBrain experience, manage API keys, customize themes, 
            and control security settings for your AI workspace.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Key className="w-8 h-8 text-purple-rain-accent mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">API Management</h3>
              <p className="text-sm text-cream-muted/70">
                Manage API keys and external service integrations
              </p>
            </div>
            
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Palette className="w-8 h-8 text-paisley-gold mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Theme & UI</h3>
              <p className="text-sm text-cream-muted/70">
                Customize your Purple Rain aesthetic and interface
              </p>
            </div>
            
            <div className="p-6 bg-album-midnight/30 rounded-lg">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-cream-soft mb-2">Security</h3>
              <p className="text-sm text-cream-muted/70">
                Configure security settings and access controls
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings