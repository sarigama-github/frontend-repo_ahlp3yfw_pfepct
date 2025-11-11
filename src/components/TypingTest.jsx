import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressRing from './ProgressRing'

const DEFAULT_WORDS = `future neon focus orbit vector pixel synth pulse drift quantum cyber lumen glide prism byte core mono echo flux nova zen logic ether wave scale frame node mesh code shift glyph array modal rapid cloud spark circuit render engine solar noir apex chrono atlas kinetic sigma`.split(' ')

const ACCENT = '#22D3EE'

function useCountdown(seconds, running, onDone) {
  const [remaining, setRemaining] = useState(seconds)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => { setRemaining(seconds) }, [seconds])

  const tick = useCallback((ts) => {
    if (startRef.current == null) startRef.current = ts
    const elapsed = (ts - startRef.current) / 1000
    const next = Math.max(0, seconds - elapsed)
    setRemaining(next)
    if (next <= 0.0001) {
      cancelAnimationFrame(rafRef.current)
      onDone && onDone()
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [onDone, seconds])

  useEffect(() => {
    if (running) {
      startRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [running, tick])

  return remaining
}

export default function TypingTest({ onFinished, mode = 'time', seconds = 60, accent = ACCENT, settings }) {
  const [words, setWords] = useState(() => shuffle(DEFAULT_WORDS).slice(0, 220))
  const [cursor, setCursor] = useState({ w: 0, c: 0 })
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const [complete, setComplete] = useState(false)
  const [stats, setStats] = useState(null)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const remaining = useCountdown(seconds, running && !complete, () => finish())
  const progress = 1 - remaining / seconds

  const displayWords = useMemo(() => words.slice(0, 120), [words])
  const flat = useMemo(() => displayWords.join(' '), [displayWords])

  const charactersTyped = input.length
  const mistakes = useMemo(() => computeMistakes(flat, input), [flat, input])
  const correct = Math.max(0, charactersTyped - mistakes)
  const accuracy = charactersTyped > 0 ? (correct / charactersTyped) * 100 : 100
  const wpm = Math.max(0, Math.round((correct / 5) / Math.max(1e-3, (seconds - remaining) / 60)))
  const raw = Math.max(0, Math.round((charactersTyped / 5) / Math.max(1e-3, (seconds - remaining) / 60)))

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && !running) { start() }
      if (e.key === 'Escape') { reset() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running])

  const start = () => {
    if (complete) return
    setRunning(true)
    inputRef.current?.focus()
  }

  const reset = () => {
    setRunning(false)
    setComplete(false)
    setInput('')
    setCursor({ w: 0, c: 0 })
    setWords(shuffle(DEFAULT_WORDS).slice(0, 220))
  }

  const finish = () => {
    setRunning(false)
    setComplete(true)
    const payload = { wpm, accuracy: Math.round(accuracy), raw, characters: charactersTyped, time: seconds }
    setStats(payload)
    onFinished && onFinished(payload)
  }

  const handleChange = (e) => {
    if (!running) setRunning(true)
    const val = e.target.value
    setInput(val)
    // Auto-complete condition for words mode not implemented here; time mode only by default
  }

  // Background glow reacts to wpm
  const glow = Math.min(1, wpm / 150)

  return (
    <div className="relative" ref={containerRef}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 600, height: 600, background: `radial-gradient(ellipse at center, ${accent}22, transparent 60%)` }}
          animate={{ opacity: glow, scale: 0.9 + glow * 0.2 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
          <ProgressRing size={46} stroke={4} progress={progress} accent={accent} />
          <div>
            <div className="text-xs text-zinc-400">time</div>
            <div className="text-lg tabular-nums">{Math.ceil(remaining)}s</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <Stat label="wpm" value={wpm} />
          <Stat label="acc" value={`${Math.round(accuracy)}%`} />
          <Stat label="raw" value={raw} />
        </div>
      </div>

      <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 sm:px-6 py-6 sm:py-8">
        <div className={`mb-4 text-xs text-zinc-400 ${running ? 'opacity-60' : ''}`}>Press Enter to start • Esc to reset</div>
        <div className="relative font-mono leading-relaxed text-lg sm:text-xl text-zinc-300 min-h-[120px] select-none">
          <WordCarousel flat={flat} input={input} />
          <Caret active={running && !complete} />
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          className="sr-only"
          aria-label="Hidden typing input"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-zinc-400">Words fade and errors highlight in real-time.</div>
          <button onClick={reset} className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 transition">Restart</button>
        </div>
      </div>

      <AnimatePresence>
        {complete && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 grid place-items-center bg-black/40 backdrop-blur-sm">
            <StatsCard stats={stats} accent={accent} onClose={() => setComplete(false)} onRestart={() => { setComplete(false); reset(); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 min-w-[72px] text-center">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-lg tabular-nums">{value}</div>
    </div>
  )
}

function WordCarousel({ flat, input }) {
  const chars = flat.split('')
  const inChars = input.split('')
  return (
    <div className="whitespace-pre-wrap">
      {chars.map((ch, i) => {
        const typed = inChars[i]
        const state = typed == null ? 'pending' : typed === ch ? 'correct' : 'wrong'
        const cls = state === 'pending' ? 'text-zinc-400/60' : state === 'correct' ? 'text-emerald-400' : 'text-rose-400'
        return <span key={i} className={cls}>{ch}</span>
      })}
    </div>
  )
}

function Caret({ active }) {
  return (
    <motion.span
      className="absolute -mt-6 h-5 w-[2px] bg-cyan-300 shadow-[0_0_12px_2px_rgba(34,211,238,0.45)]"
      animate={{ opacity: active ? [0, 1, 1, 0] : 0 }}
      transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
      style={{ left: 8, top: 56 }}
      aria-hidden
    />
  )
}

function StatsCard({ stats, accent, onClose, onRestart }) {
  return (
    <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="w-[92vw] max-w-xl rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur p-6 shadow-[0_0_60px_-20px_rgba(34,211,238,0.45)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-zinc-400 text-xs">result</div>
          <div className="text-2xl font-semibold">{stats.wpm} WPM</div>
        </div>
        <div className="flex gap-6">
          <ProgressRing size={72} stroke={6} progress={Math.min(1, stats.accuracy/100)} accent={accent} />
          <div className="text-sm text-zinc-300">
            <div className="tabular-nums">acc {stats.accuracy}%</div>
            <div className="tabular-nums">raw {stats.raw}</div>
            <div className="tabular-nums">chars {stats.characters}</div>
          </div>
        </div>
      </div>
      <div className="mt-6 h-20 rounded-lg bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent border border-white/5" />
      <div className="mt-6 flex items-center justify-end gap-3">
        <button onClick={onClose} className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200">Close</button>
        <button onClick={onRestart} className="px-3 py-2 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-200">Restart</button>
      </div>
    </motion.div>
  )
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function computeMistakes(target, typed) {
  let errors = 0
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== target[i]) errors++
  }
  return errors
}
