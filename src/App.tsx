import type { CSSProperties } from 'react'
import { lazy } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import SiteFooter from './components/SiteFooter'
import SuspenseLoader from './components/ui/SuspenseLoader'
import useIsMobileDevice from './hooks/useIsMobileDevice'
import fallbackPreview from './assets/fatahh.png'
import { pageMotion, pageTransition } from './constants/animation'

// Lazy load heavy components - use your existing page paths
const SplineShowcase = lazy(() => import('./components/3DTeto'))
const AboutMe = lazy(() => import('./components/pages/AboutMe'))
const Contact = lazy(() => import('./components/pages/Contact'))
const Playground = lazy(() => import('./components/pages/Playground'))
const Work = lazy(() => import('./components/pages/Work'))

const navLinks = [
  { label: 'Working', href: '/work' },
  { label: 'About Vision', href: '/about' },
  { label: 'Tech', href: '/playground' },
  { label: 'Contact', href: '/contact' },
]

const highlightTiles = [
  {
    title: 'Our Own Ai on watch',
    detail: 'Define your own rules. And Vision makes sure to do the rest!',
  },
  {
    title: 'Making Surveillance Actionable',
    detail: 'Powered by Nvidia, Easy to setup and deploy',
  },
]

const backgroundStyles: CSSProperties = {
  backgroundColor: '#000',
  backgroundImage:
    'radial-gradient(circle at top, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%), linear-gradient(115deg, rgba(255,255,255,0.036) 0%, rgba(255,255,255,0.012) 45%, rgba(0,0,0,0) 70%)',
  backgroundBlendMode: 'screen, screen',
  backgroundRepeat: 'no-repeat, no-repeat',
}

function App() {
  const location = useLocation()
  const isMobile = useIsMobileDevice()

  return (
    <div className="relative min-h-screen text-white" style={backgroundStyles}>
      {/* CRITICAL: Global glow layers that extend beyond all containers */}
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ overflow: 'visible' }}>
        {/* Ambient background glows */}
        <div 
          className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35), transparent 70%)',
            filter: 'blur(140px)',
            animation: 'pulse-glow 10s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full opacity-12"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)',
            filter: 'blur(130px)',
            animation: 'pulse-glow 12s ease-in-out infinite 2s'
          }}
        />
      </div>

      {/* Premium grid overlay */}
      <div 
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content - CRITICAL: removed overflow constraints */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-10 sm:px-10 lg:px-16">
        <Navbar links={navLinks} />

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                isMobile ? (
                  <motion.main
                    className="mt-14 flex flex-1 flex-col gap-6"
                    initial={pageMotion.initial}
                    animate={pageMotion.animate}
                    exit={pageMotion.exit}
                    transition={pageTransition}
                  >
                    <div className="flex flex-col gap-4">
                      <h1 className="bg-gradient-to-b from-white via-white to-white/90 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                        Vision AI
                      </h1>

                      <p className="leading-relaxed text-sm text-white/60">
                        Wsg! Chaneg this Later
                      </p>
                    </div>

                    <div className="flex justify-center py-6">
                      <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl shadow-emerald-500/20 ring-1 ring-white/5">
                        <img
                          src={fallbackPreview}
                          alt="Teto"
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        {/* Glow overlay */}
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
                      </div>
                    </div>

                    <nav className="grid grid-cols-2 gap-3">
                      {navLinks.map(({ label, href }) => (
                        <Link
                          key={label}
                          to={href}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] active:scale-95"
                        >
                          {/* Hover glow */}
                          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
                          </div>
                          
                          <span className="relative z-10 mb-2 text-2xl opacity-80 transition-transform duration-300 group-hover:scale-110 origin-left">
                            {label === 'Work' ? '💼' : label === 'About' ? '👤' : label === 'Playground' ? '🎮' : '✉️'}
                          </span>
                          <span className="relative z-10 font-semibold text-white/90">{label}</span>
                        </Link>
                      ))}
                    </nav>

                    <section className="space-y-3 pt-4">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">Highlights</h2>
                      <div className="grid gap-3">
                        {highlightTiles.map(({ title, detail }) => (
                          <div 
                            key={title} 
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/15 hover:bg-white/8"
                          >
                            {/* Hover glow */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                            </div>
                            
                            <h3 className="relative z-10 text-xs font-bold uppercase tracking-widest text-white/50 transition-colors duration-300 group-hover:text-emerald-400/70">
                              {title}
                            </h3>
                            <p className="relative z-10 mt-2 text-sm font-medium leading-relaxed text-white/80">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.main>
                ) : (
                  // DESKTOP VIEW - CRITICAL: overflow-visible for glows
                  <motion.main
                    className="relative mt-20 flex flex-1 flex-col gap-16 lg:flex-row lg:items-stretch"
                    style={{ 
                      isolation: 'isolate',
                      overflow: 'visible' // CRITICAL: allows glows to extend
                    }}
                    initial={pageMotion.initial}
                    animate={pageMotion.animate}
                    exit={pageMotion.exit}
                    transition={pageTransition}
                  >
                    <HeroSection tiles={highlightTiles} />
                    <SuspenseLoader className="">
                      <SplineShowcase />
                    </SuspenseLoader>
                  </motion.main>
                )
              }
            />
            <Route
              path="/work"
              element={
                <SuspenseLoader>
                  <Work />
                </SuspenseLoader>
              }
            />
            <Route
              path="/about"
              element={
                <SuspenseLoader>
                  <AboutMe />
                </SuspenseLoader>
              }
            />
            <Route
              path="/playground"
              element={
                <SuspenseLoader>
                  <Playground />
                </SuspenseLoader>
              }
            />
            <Route
              path="/contact"
              element={
                <SuspenseLoader>
                  <Contact />
                </SuspenseLoader>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        <SiteFooter />
      </div>
    </div>
  )
}

export default App