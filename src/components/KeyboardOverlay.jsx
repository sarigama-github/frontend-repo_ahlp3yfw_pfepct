import React, { useEffect, useMemo, useState } from 'react'

// Visual keyboard overlay that lights up keys when the user presses them
export default function KeyboardOverlay() {
  const [pressed, setPressed] = useState(new Set())

  // Normalize codes we care about
  const keyRows = useMemo(() => ([
    [
      { code: 'Backquote', label: '`' },
      { code: 'Digit1', label: '1' },
      { code: 'Digit2', label: '2' },
      { code: 'Digit3', label: '3' },
      { code: 'Digit4', label: '4' },
      { code: 'Digit5', label: '5' },
      { code: 'Digit6', label: '6' },
      { code: 'Digit7', label: '7' },
      { code: 'Digit8', label: '8' },
      { code: 'Digit9', label: '9' },
      { code: 'Digit0', label: '0' },
      { code: 'Minus', label: '-' },
      { code: 'Equal', label: '=' },
      { code: 'Backspace', label: '⌫', wide: true },
    ],
    [
      { code: 'Tab', label: 'Tab', wide: true },
      { code: 'KeyQ', label: 'Q' },
      { code: 'KeyW', label: 'W' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: '[' },
      { code: 'BracketRight', label: ']' },
      { code: 'Backslash', label: '\\' },
    ],
    [
      { code: 'CapsLock', label: 'Caps', wide: true },
      { code: 'KeyA', label: 'A' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: ';' },
      { code: 'Quote', label: "'" },
      { code: 'Enter', label: 'Enter', wide: true },
    ],
    [
      { code: 'ShiftLeft', label: 'Shift', wide: true },
      { code: 'KeyZ', label: 'Z' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: 'M' },
      { code: 'Comma', label: ',' },
      { code: 'Period', label: '.' },
      { code: 'Slash', label: '/' },
      { code: 'ShiftRight', label: 'Shift', wide: true },
    ],
    [
      { code: 'ControlLeft', label: 'Ctrl', wide: true },
      { code: 'MetaLeft', label: '⌘', wide: true },
      { code: 'AltLeft', label: 'Alt', wide: true },
      { code: 'Space', label: '', space: true },
      { code: 'AltRight', label: 'Alt', wide: true },
      { code: 'MetaRight', label: '⌘', wide: true },
      { code: 'ContextMenu', label: 'Menu', wide: true },
      { code: 'ControlRight', label: 'Ctrl', wide: true },
    ],
  ]), [])

  useEffect(() => {
    const down = (e) => {
      // Avoid repeating additions for held keys
      setPressed(prev => {
        if (prev.has(e.code)) return prev
        const copy = new Set(prev)
        copy.add(e.code)
        return copy
      })
    }
    const up = (e) => {
      setPressed(prev => {
        if (!prev.has(e.code)) return prev
        const copy = new Set(prev)
        copy.delete(e.code)
        return copy
      })
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  return (
    <div className="pointer-events-none w-full flex flex-col items-center gap-1.5">
      {keyRows.map((row, idx) => (
        <div key={idx} className="flex gap-1.5">
          {row.map(key => {
            const isPressed = pressed.has(key.code)
            const base = 'h-9 sm:h-10 md:h-11 rounded-md border bg-white/5 border-white/10 text-zinc-200 flex items-center justify-center backdrop-blur-md'
            const wide = key.space ? 'w-40 sm:w-56 md:w-72' : key.wide ? 'w-14 sm:w-16' : 'w-8 sm:w-10 md:w-11'
            const active = isPressed ? 'translate-y-0.5 scale-[0.98] bg-cyan-400/30 border-cyan-300/40 shadow-[0_0_20px_#22D3EE44]' : 'translate-y-0 bg-white/5'
            return (
              <div
                key={key.code}
                className={`${base} ${wide} ${active} transition-all duration-75 will-change-transform`}
              >
                <span className="text-[10px] sm:text-xs select-none">{key.label}</span>
              </div>
            )
          })}
        </div>
      ))}
      <div className="mt-3 text-[11px] sm:text-xs text-zinc-400">Start typing anywhere — keys will respond in real time</div>
    </div>
  )
}
