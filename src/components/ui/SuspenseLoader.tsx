import type { ReactNode } from 'react'
import { Suspense } from 'react'

interface SuspenseLoaderProps {
  children: ReactNode
  className?: string
}

/**
 * Premium suspense wrapper with beautiful loading animation.
 * Features a pulsing gradient loader with glow effects.
 */
function SuspenseLoader({ children, className = '' }: SuspenseLoaderProps) {
  return (
    <Suspense
      fallback={
        <div className={`flex min-h-[60vh] items-center justify-center ${className}`}>
          <div className="flex flex-col items-center gap-6">
            {/* Animated loading rings */}
            <div className="relative h-16 w-16">
              {/* Outer ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400"
                style={{
                  animation: 'spin 1.5s linear infinite'
                }}
              />
              
              {/* Middle ring */}
              <div 
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-400 border-l-cyan-400"
                style={{
                  animation: 'spin 2s linear infinite reverse'
                }}
              />
              
              {/* Inner glow */}
              <div 
                className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-500/40 to-cyan-500/40 blur-md"
                style={{
                  animation: 'pulse-glow 2s ease-in-out infinite'
                }}
              />
              
              {/* Center dot */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
            </div>
            
            {/* Loading text */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
                Loading
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                Please wait
              </span>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default SuspenseLoader