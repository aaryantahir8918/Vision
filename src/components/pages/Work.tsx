import PageLayout from '../ui/PageLayout'

const useCases = [
  {
    title: 'Campus Security Enhancement',
    description: 'Real-time monitoring of Educational facilities detecting suspicious loitering, unauthorized access, and crowd formations. Automatically alerts security personnel to situations requiring attention while filtering out normal activity.',
    year: 'Security and Response',
    link: '/case-studies/campus-security',
    tags: ['Education', 'Access Control', 'Real-time']
  },
  {
    title: 'Retail Loss Prevention',
    description: 'Intelligent detection of potential theft behaviors, abandoned items, and unusual shopping patterns. Provides actionable alerts to store staff without creating privacy concerns or false alarms.',
    year: 'Domestic Market',
    link: '/case-studies/retail',
    tags: ['Retail', 'Loss Prevention', 'Privacy-First']
  },
  {
    title: 'Healthcare Fall Detection',
    description: 'Automated fall detection and patient safety monitoring in assisted living facilities. Immediate alerts to nursing staff when residents experience falls or show signs of distress, enabling faster response times.',
    year: 'Fatal Conditions Prevention',
    link: '/case-studies/healthcare',
    tags: ['Healthcare', 'Patient Safety', 'Edge Computing']
  },
  {
    title: 'Industrial Safety Monitoring',
    description: 'Workplace safety compliance monitoring detecting suspicious behavior patterns, unauthorized zone access, and hazardous situations. Reduces workplace incidents through proactive intervention and automated safety protocols.',
    year: 'Industrial Safety',
    link: '/case-studies/industrial',
    tags: ['Manufacturing', 'Safety', 'Compliance']
  },
]

function UseCases() {
  return (
    <PageLayout>
      <header className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400/60">
            Use Cases
          </p>
          <h1 className="bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Smart Vision in Action
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-white/70">
          From Personal Spaces to retail environments, Smart Vision delivers situation-aware intelligence 
          that transforms passive surveillance into proactive security. Explore our deployments and tested pilots.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {useCases.map((useCase, index) => (
          <article
            key={useCase.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Hover glow effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div 
                className="absolute -inset-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-5">
              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/90">
                  {useCase.year}
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                  {useCase.title}
                </h2>
                <p className="text-sm leading-relaxed text-white/70">
                  {useCase.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={useCase.link}
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-400"
              >
                <span className="relative z-10">Read Case Study</span>
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                
                {/* Button glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20" />
                </div>
              </a>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  )
}

export default UseCases