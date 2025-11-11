import React from 'react'
import { motion } from 'framer-motion'

const DURATIONS = [15, 30, 60, 120]
const MODES = ['Time', 'Words', 'Quote', 'Numbers', 'Custom']

export default function ControlsBar({ seconds, setSeconds, mode, setMode }) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {DURATIONS.map((d) => (
          <Pill key={d} active={seconds === d} onClick={() => setSeconds(d)}>{d}s</Pill>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {MODES.map((m) => (
          <Pill key={m} active={mode === m.toLowerCase()} onClick={() => setMode(m.toLowerCase())}>{m}</Pill>
        ))}
      </div>
    </div>
  )
}

function Pill({ active, children, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-sm border transition transform ${active ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200' : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:scale-[1.02]'}`}>
      {children}
    </button>
  )
}
