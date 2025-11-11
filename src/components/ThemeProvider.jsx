import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  cycleTheme: () => {},
  sound: true,
  setSound: () => {},
})

const THEMES = ['dark', 'light', 'high-contrast']

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [sound, setSound] = useState(() => (localStorage.getItem('sound') ?? 'true') === 'true')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    localStorage.setItem('sound', String(sound))
  }, [sound])

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme)
    const next = THEMES[(idx + 1) % THEMES.length]
    setTheme(next)
  }

  const value = useMemo(() => ({ theme, setTheme, cycleTheme, sound, setSound }), [theme, sound])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
