import React, { useEffect, useState } from 'react'

const glyphs = ['▁','▂','▃','▄','▅','▆','▇','█']

export default function LoadingCursor({ running = true }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setI((v) => (v + 1) % glyphs.length), 100)
    return () => clearInterval(t)
  }, [running])
  return (
    <span className="inline-flex font-mono text-cyan-300/90 select-none" aria-hidden>
      {glyphs[i]}
    </span>
  )
}
