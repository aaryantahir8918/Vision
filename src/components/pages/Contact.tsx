import { useState, type FormEvent } from 'react'
import PageLayout from '../ui/PageLayout'

const whyReachOut = [
  {
    title: 'See a Live Demo',
    description: 'Watch Smart Vision detect threats in real-time. We\'ll customize a demo for your specific security needs.',
    icon: '👁️',
    tag: 'Most Popular'
  },
  {
    title: 'Pilot Program',
    description: 'Ready to test Smart Vision at your facility? Join our early adopter program with preferential pricing.',
    icon: '🚀',
    tag: 'Limited Spots'
  },
  {
    title: 'Technical Deep Dive',
    description: 'Engineers and CTOs: Let\'s discuss integration, API access, deployment architecture, and custom training.',
    icon: '⚡',
    tag: null
  },
  {
    title: 'Strategic Partnership',
    description: 'Security firms, integrators, and VARs: Explore how we can grow together in the AI security space.',
    icon: '🤝',
    tag: null
  },
]

const founders = [
  {
    name: 'Prof. Bor Chin Chang',
    role: 'Fac Advisor',
    bio: '--',
    email: 'Via Team',
    linkedin: '#'
  },
  {
    name: 'Muhammad Aaryan Tahir',
    role: 'Founder & Lead',
    bio: '--',
    email: 'at3624@drexel.edu',
    linkedin: '#'
  },
  {
    name: 'Rameel Chaudhry',
    role: 'Researcher',
    bio: '--',
    email: 'Via Team',
    linkedin: '#'
  },
  {
    name: 'Nophir Harrel',
    role: 'Researcher',
    bio: '--',
    email: 'Via Team',
    linkedin: '#'
  },
  {
    name: 'Kyle Chen',
    role: 'Researcher',
    bio: '--',
    email: 'Via Team',
    linkedin: '#'
  },
]

interface FormData {
  name: string
  email: string
  company: string
  role: string
  phone: string
  interest: string
  message: string
  timeline: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  interest?: string
  message?: string
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    interest: '',
    message: '',
    timeline: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'We need your name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company/organization required'
    }

    if (!formData.interest) {
      newErrors.interest = 'Please select what you\'re interested in'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Tell us a bit about your needs'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (min 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Web3Forms API endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a97d5f2c-acf8-487a-9d2c-d5ac56cab2b9', // Replace with your actual key
          subject: `New Contact Form: ${formData.interest}`,
          from_name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
          timeline: formData.timeline
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          role: '',
          phone: '',
          interest: '',
          message: '',
          timeline: ''
        })

        setTimeout(() => {
          setSubmitStatus('idle')
        }, 8000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickSelect = (interestType: string) => {
    setFormData(prev => ({ ...prev, interest: interestType }))
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <header className="relative space-y-8 pb-12">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl" />
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-gradient-to-bl from-blue-500/10 via-emerald-500/5 to-transparent blur-3xl" />
        
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">We're actively onboarding early partners</span>
          </div>
          
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let's Build the Future of
            <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Intelligent Security
            </span>
          </h1>
          
          <p className="max-w-3xl text-xl leading-relaxed text-white/70">
            We're a research-driven startup from Drexel University, transforming campus and enterprise security with AI that actually works. 
            Whether you're a security director, CTO, or potential partner—let's talk about what we can build together.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-emerald-400/30">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-emerald-400/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="mt-1 text-sm text-white/60">Real-time monitoring</div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/30">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="text-3xl font-bold text-white">&lt;200ms</div>
              <div className="mt-1 text-sm text-white/60">Detection latency</div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-blue-400/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="text-3xl font-bold text-white">95%+</div>
              <div className="mt-1 text-sm text-white/60">Detection accuracy</div>
            </div>
          </div>
        </div>
      </header>

      {/* Why Reach Out Section */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">How Can We Help You?</h2>
          <p className="text-lg text-white/60">Click a card to get started, or scroll down to send us a message</p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {whyReachOut.map((item, index) => (
            <button
              key={item.title}
              onClick={() => handleQuickSelect(item.title)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-left backdrop-blur-xl transition-all duration-500 hover:border-emerald-400/30 hover:from-white/8 hover:to-white/5"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Glow effect */}
              <div className="pointer-events-none absolute -inset-40 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div 
                  className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 60%)',
                    filter: 'blur(60px)'
                  }}
                />
              </div>

              <div className="relative z-10 space-y-4">
                {item.tag && (
                  <div className="inline-block rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {item.tag}
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{item.icon}</div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>Get in touch</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="animate-in fade-in slide-in-from-top-4 relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 p-6 backdrop-blur-xl duration-500">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjEpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 text-2xl">
              ✓
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-bold text-emerald-400">Message Received!</h3>
              <p className="text-white/80">
                We'll review your inquiry and get back to you within 24 hours. If it's urgent, you can reach out directly to 
                <span className="font-semibold text-white"> Muhammad Aaryan Tahir</span> via LinkedIn.
              </p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="text-white/50 transition-colors hover:text-white"
              aria-label="Close notification"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="animate-in fade-in slide-in-from-top-4 relative overflow-hidden rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-400/20 to-red-400/5 p-6 backdrop-blur-xl duration-500">
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400/20 text-2xl">
              ⚠
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-bold text-red-400">Oops, Something Went Wrong</h3>
              <p className="text-white/80">
                Please try again, or reach out to us directly at <span className="font-semibold text-white">team@smartvision.ai</span>
              </p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="text-white/50 transition-colors hover:text-white"
              aria-label="Close notification"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <section 
        id="contact-form"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl shadow-2xl sm:p-12"
      >
        {/* Animated background gradient */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div 
            className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)',
              filter: 'blur(80px)',
              animationDuration: '4s'
            }}
          />
          <div 
            className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
              filter: 'blur(80px)',
              animationDuration: '6s',
              animationDelay: '2s'
            }}
          />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">Start the Conversation</h2>
            <p className="text-lg text-white/60">
              Fill out the form below and we'll get back to you within 24 hours. All fields marked with <span className="text-emerald-400">*</span> are required.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Personal Info */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-white/90">
                  Full Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border ${
                    errors.name ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 bg-white/5'
                  } px-4 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20`}
                  placeholder="John Smith"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="flex items-center gap-1 text-sm text-red-400">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white/90">
                  Work Email <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border ${
                    errors.email ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 bg-white/5'
                  } px-4 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20`}
                  placeholder="john@company.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="flex items-center gap-1 text-sm text-red-400">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Company Info */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-semibold text-white/90">
                  Company / Organization <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border ${
                    errors.company ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 bg-white/5'
                  } px-4 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20`}
                  placeholder="Acme Corp"
                  aria-invalid={errors.company ? 'true' : 'false'}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                />
                {errors.company && (
                  <p id="company-error" className="flex items-center gap-1 text-sm text-red-400">
                    <span>⚠</span> {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-semibold text-white/90">
                  Your Role
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="CTO, Security Director, etc."
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-white/90">
                  Phone Number <span className="text-xs text-white/50">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="timeline" className="block text-sm font-semibold text-white/90">
                  Implementation Timeline
                </label>
                <select 
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/90 px-4 py-3.5 text-white backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="" className="bg-slate-800 text-white/60">Select timeframe</option>
                  <option value="immediate" className="bg-slate-800 text-white">Immediate (1-3 months)</option>
                  <option value="planning" className="bg-slate-800 text-white">Planning (3-6 months)</option>
                  <option value="exploring" className="bg-slate-800 text-white">Exploring (6+ months)</option>
                  <option value="researching" className="bg-slate-800 text-white">Just researching</option>
                </select>
              </div>
            </div>

            {/* Interest Type */}
            <div className="space-y-2">
              <label htmlFor="interest" className="block text-sm font-semibold text-white/90">
                What are you interested in? <span className="text-emerald-400">*</span>
              </label>
              <select 
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className={`w-full rounded-xl border ${
                  errors.interest ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 bg-slate-800/90'
                } px-4 py-3.5 text-white backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 [&>option]:bg-slate-800 [&>option]:text-white`}
                aria-invalid={errors.interest ? 'true' : 'false'}
                aria-describedby={errors.interest ? 'interest-error' : undefined}
              >
                <option value="" className="bg-slate-800 text-white/60">Select what brings you here</option>
                <option value="See a Live Demo" className="bg-slate-800 text-white">See a Live Demo</option>
                <option value="Pilot Program" className="bg-slate-800 text-white">Pilot Program / Early Adoption</option>
                <option value="Technical Deep Dive" className="bg-slate-800 text-white">Technical Deep Dive</option>
                <option value="Strategic Partnership" className="bg-slate-800 text-white">Strategic Partnership</option>
                <option value="Investment Opportunity" className="bg-slate-800 text-white">Investment Opportunity</option>
                <option value="Join Our Team" className="bg-slate-800 text-white">Career / Join Our Team</option>
                <option value="Other" className="bg-slate-800 text-white">Other</option>
              </select>
              {errors.interest && (
                <p id="interest-error" className="flex items-center gap-1 text-sm text-red-400">
                  <span>⚠</span> {errors.interest}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-semibold text-white/90">
                Tell us about your needs <span className="text-emerald-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full rounded-xl border ${
                  errors.message ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 bg-white/5'
                } px-4 py-3.5 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20`}
                placeholder="Tell us about your security challenges, facility size, current setup, or any specific requirements..."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="flex items-center gap-1 text-sm text-red-400">
                  <span>⚠</span> {errors.message}
                </p>
              )}
              <p className="text-xs text-white/50">
                {formData.message.length} / 20 characters minimum
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending your message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">The Team Behind Smart Vision</h2>
          <p className="text-lg text-white/60">
            We're a small, focused team of researchers and engineers at Drexel University, building AI security solutions that work in the real world. Note that only Active members are listed here.
          </p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          {founders.map((member, index) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-emerald-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 text-2xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-sm font-semibold text-emerald-400">{member.role}</p>
                  <p className="text-sm leading-relaxed text-white/70">{member.bio}</p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs text-white/50">{member.email}</span>
                  <a 
                    href={member.linkedin}
                    className="ml-auto text-white/50 transition-colors hover:text-emerald-400"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Additional Info */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-xl">
                📍
              </div>
              <h3 className="text-xl font-bold text-white">Our Research Hub</h3>
            </div>
            <div className="space-y-2 text-white/70">
              <p className="font-semibold text-white">Drexel University</p>
              <p>Main Building<br />Philadelphia, Pennsylvania 19104</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white">Response Time</h3>
            </div>
            <div className="space-y-2 text-white/70">
              <p>We typically respond to inquiries within <span className="font-semibold text-white">24 hours</span> during business days.</p>
              <p className="text-sm">For urgent matters, mention "URGENT" in your message subject.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Contact