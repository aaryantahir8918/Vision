import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { pageMotion, pageTransition } from '../../constants/animation'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Premium page layout wrapper with seamless glow integration.
 * Allows visual effects to extend beyond container boundaries while maintaining content structure.
 */
function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <motion.section
      className={`relative flex flex-1 flex-col ${className}`}
      style={{
        paddingTop: '5rem', // Using inline style instead of mt-20 for smoother integration
        isolation: 'isolate'
      }}
      initial={pageMotion.initial}
      animate={pageMotion.animate}
      exit={pageMotion.exit}
      transition={pageTransition}
    >
      {/* Premium ambient background gradient that doesn't interfere with hero glows */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-visible">
        <div 
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)',
            animation: 'pulse-glow 8s ease-in-out infinite'
          }}
        />
      </div>
      
      <div className="flex flex-1 flex-col gap-12">
        {children}
      </div>
    </motion.section>
  )
}

export default PageLayout