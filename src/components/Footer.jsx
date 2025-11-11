import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 py-10 text-center text-zinc-500 text-sm" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <p>Built for focus. No clutter, just flow.</p>
        <div className="mt-3 flex items-center justify-center gap-4 opacity-80">
          <a href="#" className="hover:text-white transition">GitHub</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
        <p className="mt-4 opacity-70">© {new Date().getFullYear()} Your Website Name Here</p>
      </div>
    </footer>
  )
}
