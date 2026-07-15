'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Maximize2, X, Grid3x3, ArrowLeft } from 'lucide-react'

const slides = [
  { id: 1, title: 'AgriChain AI — Digital Revolution', subtitle: 'AI + Blockchain Agriculture' },
  { id: 2, title: 'The Problem', subtitle: 'Challenges facing farmers' },
  { id: 3, title: 'Our Solution', subtitle: 'Comprehensive digital platform' },
  { id: 4, title: 'Smart Irrigation', subtitle: 'AI-powered water management' },
  { id: 5, title: 'Blockchain Traceability', subtitle: 'Tamper-proof product passports' },
  { id: 6, title: 'Market Analysis', subtitle: 'Real-time pricing & forecasts' },
  { id: 7, title: 'Farmer Digital Passport', subtitle: 'Financial inclusion for farmers' },
  { id: 8, title: 'Future: IoT & Drones', subtitle: 'Next phase of expansion' },
  { id: 9, title: 'Team & Technology', subtitle: 'Our technical foundation' },
  { id: 10, title: 'Call to Action', subtitle: 'Join the revolution' },
]

export default function PresentationPage() {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [grid, setGrid] = useState(false)

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(slides.length - 1, c + 1)), [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'Escape') { setFullscreen(false); setGrid(false) }
      if (e.key === 'f' || e.key === 'F') setFullscreen(f => !f)
      if (e.key === 'g' || e.key === 'G') setGrid(g => !g)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [next, prev])

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#000' }}>
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button onClick={() => setFullscreen(false)}
            className="w-10 h-10 rounded-xl flex items-center justify-center glass"
            style={{ color: 'rgba(240,250,242,0.6)' }}>
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 relative" onClick={next}>
          <Image src={`/slides/bg-${slides[current].id}.jpg`} alt={slides[current].title} fill className="object-contain" priority sizes="100vw" />
        </div>
        <div className="flex items-center justify-center gap-4 py-3" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <button onClick={(e) => { e.stopPropagation(); prev() }} disabled={current === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
            style={{ color: '#4ade80' }}>
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm" style={{ color: 'rgba(240,250,242,0.5)' }}>
            {current + 1} / {slides.length}
          </span>
          <button onClick={(e) => { e.stopPropagation(); next() }} disabled={current === slides.length - 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
            style={{ color: '#4ade80' }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#05100a' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'rgba(240,250,242,0.5)' }}>
              <ArrowLeft size={16} /> Back
            </Link>
            <div className="w-px h-5" style={{ background: 'rgba(240,250,242,0.1)' }} />
            <div>
              <h1 className="font-bold text-xl" style={{ color: '#f0faf2' }}>AgriChain AI Presentation</h1>
              <p className="text-sm" style={{ color: 'rgba(240,250,242,0.4)' }}>
                {slides.length} slides · Use ← → or click to navigate
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGrid(g => !g)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: grid ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${grid ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                color: grid ? '#4ade80' : 'rgba(240,250,242,0.55)',
              }}>
              <Grid3x3 size={16} /> {grid ? 'Slide view' : 'Grid view'}
            </button>
            <button onClick={() => setFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
              <Maximize2 size={16} /> Fullscreen
            </button>
          </div>
        </div>

        {/* Grid view */}
        <AnimatePresence mode="wait">
          {grid ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {slides.map((s, i) => (
                  <motion.button key={s.id}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { setCurrent(i); setGrid(false) }}
                    className="group relative rounded-xl overflow-hidden aspect-video transition-all hover:scale-105"
                    style={{
                      border: current === i ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.06)',
                      boxShadow: current === i ? '0 0 20px rgba(34,197,94,0.3)' : 'none',
                    }}>
                    <Image src={`/slides/bg-${s.id}.jpg`} alt={s.title} fill className="object-cover" sizes="100vw" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(34,197,94,0.1)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-2"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                      <div className="text-xs font-semibold text-white truncate">{i + 1}. {s.title}</div>
                    </div>
                    {current === i && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: '#22c55e', color: '#000' }}>✓</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Main slide */}
              <div className="relative rounded-2xl overflow-hidden mb-5 cursor-pointer group"
                style={{ aspectRatio: '16/9', border: '1px solid rgba(34,197,94,0.15)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}
                onClick={next}>
                <AnimatePresence mode="wait">
                  <motion.div key={current} className="absolute inset-0"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={`/slides/bg-${slides[current].id}.jpg`} alt={slides[current].title}
                      fill className="object-cover" priority sizes="100vw" />
                  </motion.div>
                </AnimatePresence>

                {/* Click zones */}
                <button onClick={(e) => { e.stopPropagation(); prev() }}
                  disabled={current === 0}
                  className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start pl-4 opacity-0 group-hover:opacity-100 transition-opacity disabled:pointer-events-none">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(5,16,10,0.7)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <ChevronLeft size={22} style={{ color: '#4ade80' }} />
                  </div>
                </button>
                <button onClick={(e) => { e.stopPropagation(); next() }}
                  disabled={current === slides.length - 1}
                  className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity disabled:pointer-events-none">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(5,16,10,0.7)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <ChevronRight size={22} style={{ color: '#4ade80' }} />
                  </div>
                </button>

                {/* Slide counter */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-semibold"
                  style={{ background: 'rgba(5,16,10,0.75)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                  {current + 1} / {slides.length}
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-xl" style={{ color: '#f0faf2' }}>{slides[current].title}</h2>
                  <p className="text-sm" style={{ color: 'rgba(240,250,242,0.4)' }}>{slides[current].subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={prev} disabled={current === 0}
                    className="w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm w-16 text-center" style={{ color: 'rgba(240,250,242,0.4)' }}>
                    {current + 1} of {slides.length}
                  </span>
                  <button onClick={next} disabled={current === slides.length - 1}
                    className="w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-bar mb-6">
                <motion.div className="progress-fill" animate={{ width: `${((current + 1) / slides.length) * 100}%` }} />
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                {slides.map((s, i) => (
                  <motion.button key={s.id} onClick={() => setCurrent(i)} whileHover={{ scale: 1.05 }}
                    className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all"
                    style={{
                      width: 120, height: 68,
                      border: current === i ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.06)',
                      opacity: current === i ? 1 : 0.5,
                      boxShadow: current === i ? '0 0 12px rgba(34,197,94,0.3)' : 'none',
                    }}>
                    <Image src={`/slides/bg-${s.id}.jpg`} alt={s.title} fill className="object-cover" sizes="100vw" />
                    <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 text-[9px] font-semibold text-white truncate"
                      style={{ background: 'rgba(0,0,0,0.65)' }}>
                      {i + 1}. {s.title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard shortcuts */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {[
            { key: '← →', label: 'Navigate' },
            { key: 'F', label: 'Fullscreen' },
            { key: 'G', label: 'Grid view' },
            { key: 'Esc', label: 'Exit' },
          ].map(k => (
            <div key={k.key} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(240,250,242,0.3)' }}>
              <kbd className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {k.key}
              </kbd>
              {k.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
