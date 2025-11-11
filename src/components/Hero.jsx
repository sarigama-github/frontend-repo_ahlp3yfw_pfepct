import React, { useState } from 'react'
import Spline from '@splinetool/react-spline'
import KeyboardOverlay from './KeyboardOverlay'
import BackgroundLayers from './BackgroundLayers'

// Error boundary to keep the hero stable if a Spline scene fails to load
class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Spline scene failed to load:', error, info)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.sceneUrl !== this.props.sceneUrl && this.state.hasError) {
      // Reset error state when a new scene is requested
      this.setState({ hasError: false, error: null })
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30">
          <div className="px-3 py-1.5 rounded bg-red-500/10 text-red-300 border border-red-500/30 text-xs">
            3D scene failed to load
          </div>
          <button
            onClick={() => this.props.onRecover?.()}
            className="px-3 py-2 rounded bg-white/5 text-white/90 border border-white/10 hover:bg-white/10 transition-colors text-sm"
          >Use safe preset</button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function Hero() {
  // Known-good presets
  const presets = {
    orb: 'https://prod.spline.design/1u6t0qkQ0h4x2bqM/scene.splinecode',
    neonCube: 'https://prod.spline.design/Hw0XcQe7IhC6B3rX/scene.splinecode',
    laptopDesk: 'https://prod.spline.design/9aJYj9xT5mJwJcUQ/scene.splinecode',
    holographicCube: 'https://prod.spline.design/6jz4p4rQK8q9w2dZ/scene.splinecode',
  }

  const safeDefault = presets.orb

  const [bg, setBg] = useState('aurora') // 'aurora' | 'mesh' | 'grid'
  const [sceneUrl, setSceneUrl] = useState(safeDefault)
  const [tempUrl, setTempUrl] = useState('')

  const applyScene = () => {
    if (!tempUrl) return
    try {
      const u = new URL(tempUrl)
      if (!u.href.endsWith('.splinecode')) return
      setSceneUrl(u.href)
      setTempUrl('')
    } catch (e) {
      // ignore invalid URL
    }
  }

  return (
    <section className="relative w-full h-[68vh] sm:h-[76vh] overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0">
        <SceneErrorBoundary
          sceneUrl={sceneUrl}
          onRecover={() => setSceneUrl(safeDefault)}
        >
          <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
        </SceneErrorBoundary>
      </div>

      {/* Swappable background accents (non-blocking) */}
      <BackgroundLayers variant={bg} />

      {/* Gradient and vignette overlays for readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow">UI/UX Typing Playground</h1>
          <p className="mt-3 max-w-2xl mx-auto text-zinc-300">Interactive hero with a responsive 3D scene and a live keyboard that reacts to your keystrokes.</p>
        </div>

        <div className="relative">
          <KeyboardOverlay />
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col items-center gap-3 text-xs text-zinc-400">
          {/* Background toggle */}
          <div className="flex items-center gap-2">
            <span>Background:</span>
            {['aurora','mesh','grid'].map(v => (
              <button
                key={v}
                onClick={() => setBg(v)}
                className={`px-2 py-1 rounded border transition-colors ${bg===v ? 'border-cyan-400 text-white' : 'border-white/10 hover:border-white/30'}`}
                aria-label={`Set background ${v}`}
              >{v}</button>
            ))}
          </div>

          {/* Quick 3D presets */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="opacity-80">3D presets:</span>
            {Object.entries(presets).map(([key, url]) => (
              <button
                key={key}
                onClick={() => setSceneUrl(url)}
                className={`px-2 py-1 rounded border transition-colors ${sceneUrl===url ? 'border-cyan-400 text-white' : 'border-white/10 hover:border-white/30 text-white/90'}`}
              >{key}</button>
            ))}
          </div>

          {/* Spline scene swapper */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <span className="whitespace-nowrap">Change 3D model:</span>
            <input
              value={tempUrl}
              onChange={e => setTempUrl(e.target.value)}
              placeholder="Paste Spline .splinecode URL"
              className="w-full sm:w-80 px-3 py-2 rounded bg-black/40 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              onClick={applyScene}
              className="px-3 py-2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
            >Apply</button>
            {sceneUrl !== safeDefault && (
              <button
                onClick={() => setSceneUrl(safeDefault)}
                className="px-3 py-2 rounded bg-white/5 text-white/90 border border-white/10 hover:bg-white/10 transition-colors"
              >Reset</button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
