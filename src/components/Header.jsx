import React from 'react'
import { useTheme } from './ThemeProvider'
import { Menu, Settings, Sun, Moon, Contrast, Volume2, VolumeX, BarChart3, User, Palette } from 'lucide-react'

export default function Header({ onOpenSettings }) {
  const { theme, cycleTheme, sound, setSound } = useTheme()

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Contrast

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 text-zinc-200">
          <button className="p-2 rounded hover:bg-white/5 transition" aria-label="Menu">
            <Menu size={18} />
          </button>
          <span className="font-mono tracking-tight text-sm">Your Website Name Here</span>
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-zinc-300 text-sm">
          <a className="hover:text-white transition" href="#features">Features</a>
          <a className="hover:text-white transition" href="#shortcuts">Shortcuts</a>
          <a className="hover:text-white transition" href="#about">About</a>
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={cycleTheme} className="p-2 rounded hover:bg-white/5 text-zinc-200 transition" aria-label="Toggle theme">
            <ThemeIcon size={18} />
          </button>
          <button onClick={() => setSound(!sound)} className="p-2 rounded hover:bg-white/5 text-zinc-200 transition" aria-label="Toggle sound">
            {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button className="p-2 rounded hover:bg-white/5 text-zinc-200 transition" aria-label="Stats">
            <BarChart3 size={18} />
          </button>
          <button className="p-2 rounded hover:bg-white/5 text-zinc-200 transition" aria-label="Themes">
            <Palette size={18} />
          </button>
          <button className="p-2 rounded hover:bg-white/5 text-zinc-200 transition" aria-label="Account">
            <User size={18} />
          </button>
          <button onClick={() => onOpenSettings && onOpenSettings()} className="p-2 rounded hover:bg-white/5 text-zinc-200 transition" aria-label="Settings">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
