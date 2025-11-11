import React from 'react'

// Background layers that can be swapped without affecting Spline interactions
export default function BackgroundLayers({ variant = 'aurora' }) {
  return (
    <div className="absolute inset-0 pointer-events-none mix-blend-screen">
      {variant === 'aurora' && (
        <div className="absolute inset-0 opacity-70 animate-[aurora_12s_ease-in-out_infinite]" style={{
          background: 'radial-gradient(60% 60% at 20% 20%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(60% 60% at 80% 30%, rgba(34,211,238,0.25) 0%, transparent 60%), radial-gradient(70% 70% at 50% 80%, rgba(244,114,182,0.2) 0%, transparent 60%)'
        }} />
      )}
      {variant === 'mesh' && (
        <div className="absolute inset-0 opacity-70" style={{
          background: 'conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.15), rgba(168,85,247,0.15), rgba(244,114,182,0.15), rgba(34,211,238,0.15))'
        }} />
      )}
      {variant === 'grid' && (
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}
      <style>{`
        @keyframes aurora {
          0%, 100% { transform: translate3d(0,0,0) scale(1); filter: hue-rotate(0deg); }
          50% { transform: translate3d(-2%, -2%, 0) scale(1.05); filter: hue-rotate(20deg); }
        }
      `}</style>
    </div>
  )
}
