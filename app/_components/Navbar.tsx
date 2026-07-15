'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/plant-doctor', label: 'Plant Doctor' },
  { href: '/irrigation', label: 'Irrigation' },
  { href: '/market', label: 'Market' },
  { href: '/blockchain', label: 'Blockchain' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(3,13,6,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(34,197,94,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
            <span className="text-black font-black text-sm">A</span>
          </div>
          <span className="font-bold text-lg" style={{ color: '#22c55e' }}>AgriChain<span style={{ color: '#eab308' }}>AI</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: pathname === l.href ? '#22c55e' : 'rgba(232,245,233,0.6)',
                background: pathname === l.href ? 'rgba(34,197,94,0.1)' : 'transparent',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard" className="ml-3 px-4 py-1.5 rounded-lg text-sm font-semibold" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#000' }}>
            Launch App
          </Link>
        </div>

        {/* Mobile */}
        <button className="md:hidden text-green-400" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ borderTop: '1px solid rgba(34,197,94,0.1)', background: 'rgba(3,13,6,0.95)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium"
                  style={{ color: pathname === l.href ? '#22c55e' : 'rgba(232,245,233,0.7)', background: pathname === l.href ? 'rgba(34,197,94,0.1)' : 'transparent' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
