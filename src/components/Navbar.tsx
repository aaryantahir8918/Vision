import { Link, NavLink } from 'react-router-dom'
import { memo, useState, useEffect } from 'react'

import GooeyNav from './ui/GooeyNav'

export type NavLink = {
  label: string
  href: string
}

interface NavbarProps {
  links: NavLink[]
}

const Navbar = memo(function Navbar({ links }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`transition-all duration-500 ${
        scrolled 
          ? 'rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent'
      } ${scrolled ? 'px-4 py-3' : 'py-4'}`}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <Link 
          className="group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-105" 
          to="/" 
          aria-label="Navigate to home"
        >
          <div className="relative grid h-11 w-11 place-content-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-cyan-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-xl ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] group-hover:ring-emerald-400/30">
            <span className="text-sm font-bold tracking-widest text-emerald-400">
              VA
            </span>
            {/* Glow overlay on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/0 via-emerald-400/20 to-cyan-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white transition-colors duration-300 group-hover:text-emerald-400">
              VISION AI
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 transition-colors duration-300 group-hover:text-white/60">
              Security Reimagined
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - GooeyNav */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <GooeyNav items={links} />
        </div>
        
        {/* Mobile Navigation - Simple Links */}
        <nav className="flex items-center gap-4 text-sm font-medium text-white/60 md:hidden">
          {links.map(({ label, href }) => (
            <NavLink
              key={label}
              to={href}
              className={({ isActive }) =>
                `relative cursor-pointer transition-colors duration-300 hover:text-white ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <button className="group relative flex-shrink-0 overflow-hidden rounded-full border border-white/20 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 hover:scale-105 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] sm:px-6">
          {/* Animated gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), transparent 50%, rgba(6,182,212,0.2))'
            }}
          />
          
          {/* Shine effect */}
          <div 
            className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            }}
          />
          
          <span className="relative z-10">On AIR Soon</span>
        </button>
      </div>
    </header>
  )
})

export default Navbar