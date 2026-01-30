import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html, useGLTF } from '@react-three/drei'
import { Box3, MathUtils, Mesh, Vector3, type Group, type Object3D, type WebGLRenderer } from 'three'

import { TETOCAT_MODEL_URL } from '../constants/models'

type FrameState = {
  viewport: {
    height: number
  }
}

function LoadingOverlay() {
  return (
    <Html center>
      <div className="animate-pulse rounded-full border border-emerald-500/30 bg-black/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-xl transition-opacity duration-500">
        Loading 3D preview…
      </div>
    </Html>
  )
}

const TetocatAvatar = memo(function TetocatAvatar() {
  const group = useRef<Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { scene } = useGLTF(TETOCAT_MODEL_URL, true)
  const cloned = useMemo(() => scene.clone(true), [scene])

  const modelHeight = useMemo(() => {
    const box = new Box3().setFromObject(cloned)
    const size = new Vector3()
    box.getSize(size)
    return size.y || 1
  }, [cloned])

  useLayoutEffect(() => {
    cloned.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [cloned])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame((state: FrameState) => {
    if (!group.current) return
    const targetX = MathUtils.clamp(pointer.current.x, -1, 1)
    const targetY = MathUtils.clamp(pointer.current.y, -1, 1)

    const available = state.viewport.height * 0.8
    const desiredScale = MathUtils.clamp(available / modelHeight, 0.8, 0.8)
    const nextScale = MathUtils.lerp(group.current.scale.x, desiredScale, 0.08)
    group.current.scale.setScalar(nextScale)

    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetX * 0.5, 0.08)
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -targetY * 0.5 + 0.15, 0.08)

    const baseX = 0
    const baseY = -0.7
    group.current.position.x = MathUtils.lerp(group.current.position.x, baseX + targetX * 0.08, 0.08)
    group.current.position.y = MathUtils.lerp(group.current.position.y, baseY + targetY * 0.08, 0.08)
  })

  return (
    <group ref={group} position={[0.2, -0.4, 0]}>
      <primitive object={cloned} dispose={null} />
    </group>
  )
})

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={14}
      />
      <spotLight
        position={[-4, 5, 2]}
        intensity={0.9}
        angle={0.55}
        penumbra={0.4}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={1024}
      />
      <ContactShadows position={[0, -0.55, 0]} opacity={0.35} scale={4.5} blur={2.8} far={3} />
      <Environment preset="city" />
    </>
  )
}

function ErrorOverlay({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-black/70 text-center text-sm text-white/70 backdrop-blur-sm">
      <div className="rounded-2xl border border-red-500/30 bg-red-950/30 px-6 py-4 backdrop-blur-xl">
        <span className="block text-red-400">3D preview offline.</span>
      </div>
      <button
        className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:text-white"
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </div>
  )
}

class PreviewErrorBoundary extends Component<{ onReset: () => void; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override componentDidCatch(error: unknown) {
    console.error('3D preview failed to load', error)
  }

  private handleRetry = () => {
    this.setState({ hasError: false })
    this.props.onReset()
  }

  override render() {
    if (this.state.hasError) {
      return <ErrorOverlay onRetry={this.handleRetry} />
    }

    return this.props.children
  }
}

function SplineShowcase() {
  const [attempt, setAttempt] = useState(0)

  return (
    <section
      className="pointer-events-none absolute top-1/2 z-0 flex items-center justify-center -translate-y-1/2"
      style={{
        right: '-96px', // 1 inch = 96px (moves it 1 inch to the right)
        width: 'clamp(320px, 45vw, 550px)',
        height: 'min(75vh, 650px)'
      }}
      aria-hidden
    >
      {/* Ambient glow behind the 3D model - extends beyond container */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ overflow: 'visible' }}>
        <div 
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%)',
            filter: 'blur(120px)',
            animation: 'pulse-glow 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35), transparent 70%)',
            filter: 'blur(100px)',
            animation: 'pulse-glow 10s ease-in-out infinite 2s'
          }}
        />
      </div>

      <PreviewErrorBoundary onReset={() => setAttempt((value) => value + 1)} key={attempt}>
        <div className="relative h-full w-full">
          <Canvas
            className="pointer-events-none absolute inset-0 h-full w-full"
            camera={{ position: [0.1, 0.95, 4.2], fov: 50 }}
            dpr={[1, 1.5]}
            shadows
            onCreated={({ gl }: { gl: WebGLRenderer }) => {
              gl.setClearColor('#000000', 0)
            }}
          >
            <Suspense fallback={<LoadingOverlay />}>
              <TetocatAvatar />
              <SceneLights />
            </Suspense>
          </Canvas>

          {/* Premium info badge */}
          <div className="pointer-events-none absolute bottom-6 right-4 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col items-end gap-1.5 text-[0.65rem] uppercase tracking-[0.25em]">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-semibold text-transparent">
                Vision AI & 3D Web
              </span>
              <span className="text-white/40">Safety · Security · Private</span>
            </div>
          </div>
        </div>
      </PreviewErrorBoundary>
    </section>
  )
}

export default SplineShowcase