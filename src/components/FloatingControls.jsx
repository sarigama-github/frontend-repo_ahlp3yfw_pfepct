import React from 'react'
import { Tooltip } from './ui/Tooltip'
import { Settings, HelpCircle, MousePointer2, Command } from 'lucide-react'

export default function FloatingControls() {
  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-2">
      <Tooltip label="Shortcuts ( ? )">
        <a href="#shortcuts" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 shadow transition">
          <Command size={18} />
        </a>
      </Tooltip>
      <Tooltip label="Help">
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 shadow transition">
          <HelpCircle size={18} />
        </button>
      </Tooltip>
      <Tooltip label="Settings">
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 shadow transition">
          <Settings size={18} />
        </button>
      </Tooltip>
    </div>
  )
}
