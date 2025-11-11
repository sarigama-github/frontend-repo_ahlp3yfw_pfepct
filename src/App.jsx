import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TypingTest from './components/TypingTest'
import ControlsBar from './components/ControlsBar'
import SettingsPanel from './components/SettingsPanel'
import Leaderboard from './components/Leaderboard'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'

export default function App() {
  const [seconds, setSeconds] = useState(60)
  const [mode, setMode] = useState('time')
  const [openSettings, setOpenSettings] = useState(false)
  const [accent, setAccent] = useState('#22D3EE')
  const [selections, setSelections] = useState({ theme: 'dark', font: 'mono', sound: true, keypress: true, numbers: false, punct: false })

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenSettings(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ThemeProvider>
      <div className={`min-h-screen bg-[#0b0c10] text-white selection:bg-cyan-300/30 selection:text-white ${selections.font === 'mono' ? 'font-mono' : ''}`}>
        <Header />
        <main className="pt-14">
          <Hero />

          <section className="relative z-10 -mt-14">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col items-center text-center">
                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">Your Website Name Here</h2>
                <p className="mt-2 max-w-xl text-zinc-400">A futuristic typing practice platform with a calm, focused design and smooth interactions.</p>
              </div>
              <div className="mt-8">
                <TypingTest seconds={seconds} mode={mode} accent={accent} onFinished={() => {}} />
                <ControlsBar seconds={seconds} setSeconds={setSeconds} mode={mode} setMode={setMode} />

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm text-zinc-400 mb-2">rewards</div>
                    <div className="flex flex-wrap gap-2">
                      {['Warmup', 'Streak 3', 'Streak 7', 'Precision 98%', 'Sprinter 120 WPM'].map(b => (
                        <span key={b} className="px-2 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-zinc-300">{b}</span>
                      ))}
                    </div>
                  </div>
                  <Leaderboard />
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm text-zinc-400 mb-2">themes</div>
                    <div className="flex flex-wrap gap-2">
                      {['#22D3EE','#A78BFA','#34D399','#F472B6','#F59E0B'].map(c => (
                        <button key={c} onClick={() => setAccent(c)} className="h-8 w-8 rounded-full border border-white/20" style={{ background: c }} aria-label={`Set accent ${c}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>

        <SettingsPanel open={openSettings} onClose={() => setOpenSettings(false)} selections={selections} setSelections={setSelections} />
      </div>
    </ThemeProvider>
  )
}
