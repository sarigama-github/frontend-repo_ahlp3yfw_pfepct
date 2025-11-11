import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const THEMES = [
  { key: 'dark', name: 'Dark' },
  { key: 'light', name: 'Light' },
  { key: 'solar', name: 'Solar' },
  { key: 'neon', name: 'Neon' },
]

const FONTS = [
  { key: 'mono', name: 'Mono' },
  { key: 'geo', name: 'Geometric Sans' },
]

export default function SettingsPanel({ open, onClose, selections, setSelections }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 380, opacity: 0 }} transition={{ type: 'spring', stiffness: 90, damping: 18 }} className="fixed top-0 right-0 h-full w-[340px] z-50 border-l border-white/10 bg-zinc-900/80 backdrop-blur p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-400">settings</div>
            <button onClick={onClose} className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200">Esc</button>
          </div>
          <div className="mt-4 space-y-5">
            <Section title="Theme">
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map(t => (
                  <Option key={t.key} active={selections.theme === t.key} onClick={() => setSelections(s => ({ ...s, theme: t.key }))}>{t.name}</Option>
                ))}
              </div>
            </Section>
            <Section title="Font">
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map(f => (
                  <Option key={f.key} active={selections.font === f.key} onClick={() => setSelections(s => ({ ...s, font: f.key }))}>{f.name}</Option>
                ))}
              </div>
            </Section>
            <Section title="Effects">
              <Toggle label="Sound" value={selections.sound} onChange={(v) => setSelections(s => ({ ...s, sound: v }))} />
              <Toggle label="Keypress animation" value={selections.keypress} onChange={(v) => setSelections(s => ({ ...s, keypress: v }))} />
              <Toggle label="Include numbers" value={selections.numbers} onChange={(v) => setSelections(s => ({ ...s, numbers: v }))} />
              <Toggle label="Include punctuation" value={selections.punct} onChange={(v) => setSelections(s => ({ ...s, punct: v }))} />
            </Section>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-xs text-zinc-400 mb-2">{title}</div>
      {children}
    </div>
  )
}

function Option({ active, children, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-md border text-sm ${active ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200' : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'}`}>{children}</button>
  )
}

function Toggle({ label, value, onChange }) {
  return (
    <label className="flex items-center justify-between px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm text-zinc-300">
      <span>{label}</span>
      <button type="button" onClick={() => onChange(!value)} className={`ml-3 w-10 h-6 rounded-full transition relative ${value ? 'bg-cyan-500/40' : 'bg-white/10'}`}>
        <span className={`absolute top-1/2 -translate-y-1/2 transition ${value ? 'right-1' : 'left-1'} inline-block h-4 w-4 rounded-full bg-white`} />
      </button>
    </label>
  )
}
