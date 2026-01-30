import PageLayout from '../ui/PageLayout'

const milestones = [
  {
    year: '2025',
    label: 'Founded by Muhammad Aaryan Tahir with a vision to make video surveillance intelligent and actionable.',
  },
  {
    year: '2025',
    label: 'Our Team number Moved up to 6,Deployed first Jetson-based prototype with real-time object detection and situation awareness capabilities.',
  },
  {
    year: '2026',
    label: 'Advanced to Jetson Orin Nano deployment with integrated DeepStream pipeline and robotic actuator demonstrations.Currently seeking seed funding to expand development and pilot deployments.',
  },
]

const capabilities = [
  'Detect situations, not just objects—identify altercations, suspicious loitering, falls, crowd formation, and potential theft in real-time.',
  'Deploy on edge devices with NVIDIA Jetson Orin Nano for low-latency, on-premise processing that respects privacy.',
  'Generate prioritized call-to-action alerts rather than overwhelming security teams with endless raw footage.',
  'Integrate seamlessly with existing infrastructure through DeepStream SDK, GStreamer, and industry-standard protocols.',
]

function AboutUs() {
  return (
    <PageLayout>
      <header className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400/60">
            About Smart Vision
          </p>
          <h1 className="bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Making Surveillance Actionable
          </h1>
        </div>
        <p className="max-w-3xl text-lg leading-relaxed text-white/70">
          Smart Vision transforms passive video feeds into intelligent, situation-aware systems. 
          We don't just detect objects, we understand context, identify critical situations, and trigger 
          the right response at the right time. Born from a research at Drexel University, we're building 
          the future of intelligent security infrastructure.
        </p>
      </header>

      {/* What We Do Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-10">
        {/* Background glow */}
        <div className="pointer-events-none absolute -inset-20 opacity-30">
          <div 
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-2xl font-bold text-white">Core Capabilities</h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <li 
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30 hover:bg-black/60"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div 
                    className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)',
                      filter: 'blur(30px)'
                    }}
                  />
                </div>

                {/* Number badge */}
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-400/80">
                  {index + 1}
                </div>

                <p className="relative z-10 pr-8 text-sm leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white/95">
                  {capability}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Our Journey</h2>
        <ul className="space-y-4">
          {milestones.map((milestone, index) => (
            <li 
              key={milestone.year}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/8"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div 
                  className="absolute left-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)',
                    filter: 'blur(30px)'
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                {/* Year badge */}
                <span className="inline-flex w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/90">
                  {milestone.year}
                </span>
                
                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white/95">
                  {milestone.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  )
}

export default AboutUs