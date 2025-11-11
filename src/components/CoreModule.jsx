import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const PURPOSES = [
  'Portfolio Showcase',
  'Knowledge Drills',
  'Creative Prompts',
  'Product Demos',
]

function useSound(enabled) {
  const clickRef = useRef(null)
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'square'
    oscillator.frequency.value = 220
    gain.gain.value = 0
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start()
    clickRef.current = (ms = 30) => {
      if (!enabled) return
      const now = ctx.currentTime
      gain.gain.cancelScheduledValues(now)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + ms / 1000)
    }
    return () => {
      oscillator.stop()
      oscillator.disconnect()
      gain.disconnect()
    }
  }, [enabled])
  return {
    click: () => clickRef.current && clickRef.current(),
  }
}

export default function CoreModule({ title = PURPOSES[0] }) {
  const { sound } = useTheme()
  const { click } = useSound(sound)

  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const steps = useMemo(() => [
    { label: 'Ready', hint: 'Press Enter to begin' },
    { label: 'Focused', hint: 'Navigate with Tab • Press Space to pause' },
    { label: 'Complete', hint: 'Press R to restart' },
  ], [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') { setActive(true); setStep(1); click() }
      if (e.key.toLowerCase() === 'r') { setActive(false); setStep(0); click() }
      if (e.key === ' ') { e.preventDefault(); setActive((a) => !a); click() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [click])

  return (
    <div className="relative mx-auto max-w-3xl w-full">
      <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur p-6 sm:p-8 shadow-[0_0_40px_-20px_rgba(0,255,255,0.35)]">
        <div className="flex items-center justify-between">
          <div className="text-zinc-300 text-sm tracking-wide">{title}</div>
          <div className="text-xs text-zinc-500">Step {step}/{steps.length-1}</div>
        </div>
        <div className="mt-6 min-h-[140px] sm:min-h-[160px] grid place-items-center">
          <AnimatePresence mode="popLayout">
            {step === 0 && (
              <motion.div key="ready" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-center">
                <div className="text-3xl sm:text-4xl font-medium text-white">Drop into flow</div>
                <div className="mt-2 text-zinc-400">Calm, focused, distraction-free</div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="focused" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <motion.span className="text-4xl sm:text-5xl font-semibold tracking-tight text-white" animate={{ opacity: [0.7,1,0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                    Focus
                  </motion.span>
                  <motion.span className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent" animate={{ y: [0, -2, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                    Flow
                  </motion.span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-3 text-zinc-300">
                  <div className="h-1 w-24 bg-zinc-700/60 rounded overflow-hidden">
                    <motion.div className="h-full bg-cyan-400" initial={{ width: '10%' }} animate={{ width: '80%' }} transition={{ duration: 6 }} />
                  </div>
                  <div className="text-xs">progress</div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="complete" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-center">
                <div className="text-3xl sm:text-4xl font-medium text-white">Nice. You kept it zen.</div>
                <div className="mt-2 text-zinc-400">Hit R to run it again</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => { setActive(true); setStep(1); click() }} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition">
            <Play size={16} /> Start
          </button>
          <button onClick={() => { setActive(false); setStep(0); click() }} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition">
            <RotateCcw size={16} /> Reset
          </button>
          <button onClick={() => { setActive((a)=>!a); if(active) setStep(2); click() }} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition">
            {active ? <Pause size={16} /> : <ArrowRight size={16} />} {active ? 'Pause' : 'Next'}
          </button>
        </div>
        <div className="mt-4 text-center text-xs text-zinc-500">Enter • Space • R</div>
      </div>
    </div>
  )
}
