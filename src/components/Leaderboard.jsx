import React from 'react'

const mock = [
  { name: 'Astra', wpm: 153 },
  { name: 'Nova', wpm: 148 },
  { name: 'Cipher', wpm: 141 },
  { name: 'Quark', wpm: 132 },
  { name: 'Vanta', wpm: 128 },
]

export default function Leaderboard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-zinc-400 mb-3">leaderboard</div>
      <div className="divide-y divide-white/5">
        {mock.map((row, i) => (
          <div key={row.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="text-zinc-500 tabular-nums w-6">{i+1}</div>
              <div className="text-zinc-200">{row.name}</div>
            </div>
            <div className="text-cyan-300 tabular-nums">{row.wpm} WPM</div>
          </div>
        ))}
      </div>
    </div>
  )
}
