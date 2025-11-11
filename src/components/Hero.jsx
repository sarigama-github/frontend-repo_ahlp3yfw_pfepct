import React, { useState } from 'react'
import Spline from '@splinetool/react-spline'
import KeyboardOverlay from './KeyboardOverlay'
import BackgroundLayers from './BackgroundLayers'

export default function Hero() {
  const [bg, setBg] = useState('aurora') // 'aurora' | 'mesh' | 'grid'

  return (
    <section className="relative w-full h-[68vh] sm:h-[76vh] overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fcD-iW8YZHyBp1qq/scene.splinecode" style={{ width: '100%', height: '100%' }} />
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

        {/* Simple toggle to switch backgrounds */}
        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400">
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
      </div>
    </section>
  )
}
