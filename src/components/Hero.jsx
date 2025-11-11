import React from 'react'
import Spline from '@splinetool/react-spline'
import KeyboardOverlay from './KeyboardOverlay'

export default function Hero() {
  return (
    <section className="relative w-full h-[68vh] sm:h-[76vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fcD-iW8YZHyBp1qq/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient and vignette overlays for readability; don't block 3D interaction */}
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
      </div>
    </section>
  )
}
