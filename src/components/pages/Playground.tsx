import PageLayout from '../ui/PageLayout'

const technologies = [
  {
    title: 'Edge AI Processing',
    summary: 'NVIDIA Jetson Orin Nano deployment enabling real-time inference at the edge. Low-latency processing keeps sensitive video data on-premise while delivering instant situation detection.',
    status: 'Production',
    color: 'emerald'
  },
  {
    title: 'DeepStream Pipeline',
    summary: 'Optimized video analytics pipeline leveraging NVIDIA DeepStream SDK and GStreamer. Multi-stream processing with hardware-accelerated decoding and inference for scalable deployments.',
    status: 'Production',
    color: 'cyan'
  },
  {
    title: 'Situation Classification Engine',
    summary: 'Advanced AI models trained to recognize complex situations beyond simple object detection: altercations, suspicious behavior patterns, falls, crowd dynamics, and anomalous activities.',
    status: 'Active R&D',
    color: 'purple'
  },
  {
    title: 'Robotic Actuator Integration',
    summary: 'Call-to-action system demonstrating physical world integration. Prototype triggers robotic arm responses to detected situations, proving concept for automated intervention systems.',
    status: 'Prototype',
    color: 'emerald'
  },
  {
    title: 'Privacy-Preserving Architecture',
    summary: 'Edge-first design ensuring video data never leaves the premises. Anonymized metadata and situation alerts sent to cloud for analytics while raw footage stays local.',
    status: 'In Development',
    color: 'cyan'
  },
  {
    title: 'Model Optimization Pipeline',
    summary: 'ONNX-based model conversion and optimization workflow. Enables deployment of cutting-edge models on resource-constrained edge devices without sacrificing accuracy.',
    status: 'Beta',
    color: 'purple'
  },
]

const statusColors = {
  'Production': {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400/90'
  },
  'Active R&D': {
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400/90'
  },
  'Prototype': {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400/90'
  },
  'In Development': {
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400/90'
  },
  'Beta': {
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400/90'
  }
}

function Technology() {
  return (
    <PageLayout>
      <header className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400/60">
            Technology
          </p>
          <h1 className="bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Built on Cutting-Edge AI Infrastructure
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-white/70">
          Our technology stack combines NVIDIA edge computing power with advanced computer vision and 
          situation-aware AI. Every component is designed for production reliability, privacy compliance, 
          and real-time performance.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech, index) => (
          <article
            key={tech.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Hover glow effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div 
                className="absolute -inset-20 rounded-full"
                style={{
                  background: tech.color === 'emerald' 
                    ? 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)'
                    : tech.color === 'cyan'
                    ? 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)'
                    : 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-5">
              {/* Status badges */}
              <div className="flex items-center justify-between text-xs">
                <span className={`inline-flex rounded-full border px-3 py-1 font-semibold uppercase tracking-[0.25em] ${statusColors[tech.status as keyof typeof statusColors].border} ${statusColors[tech.status as keyof typeof statusColors].bg} ${statusColors[tech.status as keyof typeof statusColors].text}`}>
                  {tech.status}
                </span>
                <span className="text-white/40 uppercase tracking-[0.25em]">Core Tech</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                  {tech.title}
                </h2>
                <p className="text-sm leading-relaxed text-white/70">
                  {tech.summary}
                </p>
              </div>

              {/* Button */}
              <button className="group/btn relative mt-auto inline-flex items-center gap-2 self-start overflow-hidden rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-400">
                <span className="relative z-10">Learn More</span>
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                
                {/* Button glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20" />
                </div>
              </button>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  )
}

export default Technology