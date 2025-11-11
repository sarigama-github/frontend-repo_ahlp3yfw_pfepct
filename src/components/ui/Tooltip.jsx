import React from 'react'

export function Tooltip({ label, children }) {
  return (
    <div className="group relative">
      {children}
      <div className="pointer-events-none absolute -top-2 right-full mr-2 opacity-0 group-hover:opacity-100 transition opacity duration-150">
        <div className="rounded bg-black/80 text-white text-xs px-2 py-1 border border-white/10 shadow">
          {label}
        </div>
      </div>
    </div>
  )
}
