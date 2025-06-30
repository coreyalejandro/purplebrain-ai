import React from 'react'
import { motion } from 'framer-motion'

const NeuralBackground = () => {
  return (
    <div className="neural-background fixed inset-0 pointer-events-none z-0">
      {/* Animated Neural Nodes */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(147, 51, 234, 0.3) 3px, transparent 4px),
            radial-gradient(circle at 85% 20%, rgba(59, 130, 246, 0.3) 3px, transparent 4px),
            radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.3) 2px, transparent 3px),
            radial-gradient(circle at 25% 75%, rgba(184, 134, 11, 0.3) 2px, transparent 3px),
            radial-gradient(circle at 60% 30%, rgba(107, 76, 159, 0.3) 2px, transparent 3px),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.2) 1px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 2px, transparent 3px),
            radial-gradient(circle at 30% 40%, rgba(184, 134, 11, 0.2) 1px, transparent 2px)
          `,
          backgroundSize: '150px 150px, 180px 180px, 120px 120px, 200px 200px, 110px 110px, 140px 140px, 160px 160px, 130px 130px'
        }}
      />
      
      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-paisley-gold/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Connection Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          background: `
            linear-gradient(45deg, transparent 48%, rgba(147, 51, 234, 0.1) 49%, rgba(147, 51, 234, 0.1) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(59, 130, 246, 0.1) 49%, rgba(59, 130, 246, 0.1) 51%, transparent 52%),
            linear-gradient(135deg, transparent 48%, rgba(236, 72, 153, 0.1) 49%, rgba(236, 72, 153, 0.1) 51%, transparent 52%)
          `,
          backgroundSize: '80px 80px, 100px 100px, 90px 90px'
        }}
      />
      
      {/* Pulsing Brain Visualization */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-48 opacity-20 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 60% 45% at 50% 50%, 
                rgba(147, 51, 234, 0.3) 0%,
                rgba(79, 70, 229, 0.2) 30%,
                rgba(59, 130, 246, 0.1) 60%,
                transparent 100%)
            `,
            borderRadius: '50% 50% 45% 55% / 60% 55% 45% 40%'
          }}
        />
      </motion.div>
      
      {/* Paisley Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 10c-15 0-25 10-25 25 0 10 5 15 15 20-10 5-15 10-15 20 0 15 10 25 25 25s25-10 25-25c0-10-5-15-15-20 10-5 15-10 15-20 0-15-10-25-25-25z' fill='%23800080' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
    </div>
  )
}

export default NeuralBackground