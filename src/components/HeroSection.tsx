import { Link } from 'react-router-dom'
import { memo, useEffect, useRef, useState } from 'react'

import SplitText from './ui/SplitText'

export type HighlightTile = {
  title: string
  detail: string
}

interface HeroSectionProps {
  tiles: HighlightTile[]
}

const HeroSection = memo(function HeroSection({ tiles }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Normalize to -1 to 1 range and reduce intensity
      const percentX = ((x - centerX) / centerX) * 0.5
      const percentY = ((y - centerY) / centerY) * 0.5

      // Use RAF to smooth out updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x: percentX, y: percentY })
      })
    }

    const handleMouseLeave = () => {
      // Smoothly return to center
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x: 0, y: 0 })
      })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 flex max-w-xl flex-col gap-10"
    >
      {/* Animated neon border glow effect */}
      <div className="pointer-events-none absolute -inset-1 -z-[8] rounded-[40px]">
        {/* Main glowing border */}
        <div 
          className="absolute inset-0 rounded-[40px] opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.7), rgba(6,182,212,0.6) 25%, rgba(139,92,246,0.6) 50%, rgba(251,146,60,0.5) 75%, rgba(16,185,129,0.7))',
            backgroundSize: '300% 300%',
            animation: 'neonFlow 8s ease-in-out infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1.5px'
          }}
        />
        
        {/* Outer glow layer */}
        <div 
          className="absolute -inset-2 rounded-[42px] opacity-35 blur-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 170, 0.29), rgba(6, 181, 212, 0.17) 25%, rgba(13, 148, 221, 0.17) 50%, rgba(255, 255, 255, 0) 75%, rgba(16, 185, 129, 0.26))',
            backgroundSize: '300% 300%',
            animation: 'neonFlow 8s ease-in-out infinite'
          }}
        />
        
        {/* Inner highlight */}
        <div 
          className="absolute inset-[0.5px] rounded-[39.5px] opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5), transparent 50%, rgba(255,255,255,0.3))',
            backgroundSize: '200% 200%',
            animation: 'neonShine 6s ease-in-out infinite'
          }}
        />
      </div>

      {/* 3D Layered atmospheric glow system - Fixed positioning */}
      <div 
        ref={glowRef} 
        className="pointer-events-none absolute inset-0 -z-10 overflow-visible"
      >
        {/* Layer 1 - Deepest emerald glow */}
        <div 
          className="absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full opacity-60 will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.28) 25%, rgba(4,120,87,0.16) 45%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'breathe 15s ease-in-out infinite',
            transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Layer 2 - Cyan accent */}
        <div 
          className="absolute -right-40 top-0 h-[750px] w-[750px] rounded-full opacity-50 will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(6,182,212,0.35) 0%, rgba(8,145,178,0.22) 30%, rgba(14,116,144,0.12) 50%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'breathe 18s ease-in-out infinite reverse',
            transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 28}px)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Layer 3 - Purple depth */}
        <div 
          className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full opacity-35 will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(139,92,246,0.28) 0%, rgba(124,58,237,0.16) 35%, transparent 65%)',
            filter: 'blur(100px)',
            animation: 'breathe 12s ease-in-out infinite',
            transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Layer 4 - Warm orange accent */}
        <div 
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full opacity-25 will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(60, 251, 203, 0.22) 0%, rgba(48, 255, 186, 0.12) 40%, transparent 65%)',
            filter: 'blur(85px)',
            animation: 'breathe 14s ease-in-out infinite 2s',
            transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 18}px)`,
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Layer 5 - White highlight */}
        <div 
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-12 will-change-transform"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.25) 35%, transparent 65%)',
            filter: 'blur(70px)',
            animation: 'breathe 10s ease-in-out infinite 1s',
            transform: `translate(calc(-50% + ${mousePos.x * 15}px), ${mousePos.y * 15}px)`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      {/* Fine grain texture for depth */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      <div 
        className="will-change-transform text-center"
        style={{
          transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <SplitText
          text="Welcome!"
          tag="h2"
          splitType="chars"
          delay={45}
          textAlign="center"
          className="relative text-xs font-semibold uppercase tracking-[0.8em] text-white/40"
        />
      </div>

      {/* Enhanced Launching Soon Badge */}
      <div className="flex justify-center">
        <div 
          className="will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
        <div className="group/badge relative inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 via-emerald-900/30 to-teal-950/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-50/90 shadow-[0_0_50px_rgba(16,185,129,0.25),0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-all duration-700 hover:border-emerald-400/50 hover:shadow-[0_0_70px_rgba(16,185,129,0.35),0_8px_30px_rgba(0,0,0,0.4)]">
          {/* Animated shimmer effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              animation: 'shimmer 3s ease-in-out infinite'
            }}
          />
          
          {/* Flowing gradient animation on hover */}
          <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/badge:opacity-100"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)',
              animation: 'flow 2s linear infinite'
            }}
          />
          
          {/* Particle effects */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
            <div 
              className="absolute h-1 w-1 rounded-full bg-emerald-300/50 blur-[1px]"
              style={{
                left: '15%',
                top: '25%',
                animation: 'float-particle-1 4s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute h-1 w-1 rounded-full bg-cyan-300/40 blur-[1px]"
              style={{
                left: '75%',
                top: '60%',
                animation: 'float-particle-2 5s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute h-0.5 w-0.5 rounded-full bg-white/40 blur-[0.5px]"
              style={{
                left: '50%',
                top: '40%',
                animation: 'float-particle-3 3.5s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Enhanced status indicator with multiple layers */}
          <span className="relative z-10 flex h-2 w-2">
            {/* Outer ping */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 duration-1000" />
            {/* Secondary ping with delay */}
            <span 
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50 duration-1500"
              style={{ animationDelay: '0.5s' }}
            />
            {/* Core dot with intense glow */}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-[0_0_16px_rgba(52,211,153,0.9),0_0_32px_rgba(16,185,129,0.5),0_0_48px_rgba(16,185,129,0.2)]">
              {/* Inner highlight */}
              <span className="absolute inset-[2px] rounded-full bg-emerald-200/60" />
            </span>
          </span>
          
          <span className="relative z-10">Launching Soon!</span>
          
          {/* Edge highlight on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/badge:opacity-100">
            <div className="absolute inset-[0.5px] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.1)]" />
          </div>
          
          {/* Outer glow on hover */}
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-700 group-hover/badge:opacity-100">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40" />
          </div>
        </div>
      </div>
      </div>

      <div className="space-y-6 text-center">
        <div 
          className="will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <h1 className="relative text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {/* Diffused glow layer */}
            <span 
              className="absolute inset-0 bg-gradient-to-b from-white/60 via-emerald-200/40 to-cyan-200/30 bg-clip-text text-transparent opacity-50"
              style={{ filter: 'blur(40px)' }}
            >
              Vision AI - On watch when you can't.
            </span>
            
            {/* Main text layer with enhanced gradient */}
            <span className="relative inline-block bg-gradient-to-b from-white via-white/98 to-white/92 bg-clip-text text-transparent drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              Vision AI - On watch when you can't.
            </span>
            
            {/* Subtle accent reflection */}
            <span 
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-200/0 via-emerald-200/10 to-emerald-200/0 bg-clip-text text-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            >
              Vision AI - On watch when you can't.
            </span>
          </h1>
        </div>
        
        <div 
          className="will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <p className="mx-auto max-w-lg text-base leading-[1.7] text-white/70 sm:text-lg">
            Vision turns any camera into a real-time AI security and safety system — instantly.
            Plug in your camera. Define your rules. Vision handles the rest.
          </p>
        </div>
      </div>

      <div 
        className="flex flex-wrap items-center justify-center gap-4 will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Link
          className="group/primary relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-black shadow-[0_0_50px_rgba(255,255,255,0.25),0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 hover:shadow-[0_0_70px_rgba(255,255,255,0.4),0_15px_50px_rgba(0,0,0,0.4)] hover:scale-[1.03] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          to="/work"
        >
          {/* Iridescent overlay */}
          <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/primary:opacity-100"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), transparent 50%, rgba(6,182,212,0.15))'
            }}
          />
          
          {/* Sweeping shine */}
          <div 
            className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover/primary:translate-x-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)'
            }}
          />
          
          {/* Outer glow on hover */}
          <div className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/primary:opacity-100">
            <div className="h-full w-full rounded-full bg-white/40" />
          </div>
          
          <span className="relative z-10">Check Details</span>
          <span className="relative z-10 inline-block transition-transform duration-300 group-hover/primary:translate-x-1">→</span>
        </Link>
        
        <Link
          className="group/secondary relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-white/25 bg-white/[0.08] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_0_30px_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/[0.12] hover:shadow-[0_0_50px_rgba(255,255,255,0.2),0_8px_30px_rgba(0,0,0,0.4)] hover:scale-[1.03] hover:-translate-y-0.5"
          to="/contact"
        >
          {/* Multi-color glow layer */}
          <div className="absolute -inset-2 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/secondary:opacity-100">
            <div className="h-full w-full bg-gradient-to-br from-cyan-400/30 via-emerald-400/30 to-purple-400/20" />
          </div>
          
          {/* Subtle shimmer */}
          <div 
            className="absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 group-hover/secondary:translate-x-full group-hover/secondary:opacity-100"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }}
          />
          
          <span className="relative z-10">Shoot us an email!</span>
        </Link>
      </div>

      <dl className="grid gap-6 sm:grid-cols-2">
        {tiles.map(({ title, detail }, index) => (
          <div 
            key={title}
            className="group/tile relative cursor-default overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-700 will-change-transform hover:border-white/[0.15] hover:bg-white/[0.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-1 hover:scale-[1.02]"
            style={{
              transform: `translate(${mousePos.x * (12 + index * 2)}px, ${mousePos.y * (12 + index * 2)}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), all 0.7s ease'
            }}
          >
            {/* Primary radial glow */}
            <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-700 group-hover/tile:opacity-100">
              <div 
                className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(6,182,212,0.25) 50%, transparent 70%)',
                  filter: 'blur(50px)'
                }}
              />
            </div>
            
            {/* Secondary purple accent */}
            <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-700 group-hover/tile:opacity-100">
              <div 
                className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />
            </div>
            
            {/* Inner light reflection */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100">
              <div className="absolute inset-px rounded-[27px] bg-gradient-to-br from-white/[0.1] via-transparent to-white/[0.05]" />
            </div>
            
            {/* Animated border gradient */}
            <div 
              className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-700 group-hover/tile:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.5), rgba(6,182,212,0.3) 50%, rgba(139,92,246,0.4))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px'
              }}
            />
            
            {/* Subtle shimmer on hover */}
            <div 
              className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 group-hover/tile:translate-x-full group-hover/tile:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
              }}
            />
            
            <div className="relative z-10 space-y-3 text-center">
              <dt className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover/tile:text-emerald-400/85 group-hover/tile:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                {title}
              </dt>
              <dd className="text-[15px] leading-relaxed text-white/75 transition-colors duration-500 group-hover/tile:text-white/92">
                {detail}
              </dd>
            </div>
            
            {/* Corner accent indicator */}
            <div className="pointer-events-none absolute bottom-7 right-7 h-1.5 w-1.5 rounded-full bg-white/0 shadow-[0_0_0_rgba(16,185,129,0)] transition-all duration-500 group-hover/tile:bg-emerald-400/70 group-hover/tile:shadow-[0_0_16px_rgba(16,185,129,0.9)]">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/0 opacity-0 duration-1000 group-hover/tile:bg-emerald-400/60 group-hover/tile:opacity-100" />
            </div>
          </div>
        ))}
      </dl>

      <style>{`
        @keyframes breathe {
          0%, 100% { 
            transform: scale(1) translate(0, 0);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.08) translate(15px, -15px);
            opacity: 0.45;
          }
        }
        
        @keyframes neonFlow {
          0%, 100% { 
            background-position: 0% 50%;
            opacity: 0.5;
          }
          50% { 
            background-position: 100% 50%;
            opacity: 0.7;
          }
        }
        
        @keyframes neonShine {
          0%, 100% { 
            background-position: 0% 0%;
            opacity: 0.2;
          }
          50% { 
            background-position: 100% 100%;
            opacity: 0.35;
          }
        }
        
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% { 
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
        }
        
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { 
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% { 
            transform: translate(8px, -8px);
            opacity: 0.8;
          }
        }
        
        @keyframes float-particle-2 {
          0%, 100% { 
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% { 
            transform: translate(-6px, 10px);
            opacity: 0.7;
          }
        }
        
        @keyframes float-particle-3 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.25;
          }
          50% { 
            transform: translate(5px, -5px) scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  )
})

export default HeroSection