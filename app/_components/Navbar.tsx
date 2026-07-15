'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Droplets, TrendingUp, Link2, LayoutDashboard, Menu, X, ChevronRight, Languages } from 'lucide-react'
import { useLang, t } from '../_context/LangContext'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, toggle } = useLang()

  const links = [
    { href: '/plant-doctor', uz: "O'simlik", en: 'Plant', icon: Leaf },
    { href: '/irrigation', uz: "Sug'orish", en: 'Irrigation', icon: Droplets },
    { href: '/market', uz: 'Bozor', en: 'Market', icon: TrendingUp },
    { href: '/blockchain', uz: 'Blokcheyn', en: 'Blockchain', icon: Link2 },
    { href: '/dashboard', uz: 'Boshqaruv', en: 'Dashboard', icon: LayoutDashboard },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(4,14,7,0.96)' : 'rgba(4,14,7,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black"
              style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', fontSize: '1.1rem' }}>A</div>
            <span className="font-black text-lg" style={{ color: '#e8f5ea' }}>
              AgriChain<span style={{ color: '#4ade80' }}>AI</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(l => {
              const active = pathname === l.href
              return (
                <Link key={l.href} href={l.href}
                  className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: active ? '#4ade80' : 'rgba(232,245,234,0.5)' }}>
                  {active && (
                    <motion.div layoutId="active-nav" transition={{ type: 'spring', duration: 0.3 }}
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }} />
                  )}
                  <span className="relative">{t(l.uz, l.en, lang)}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {/* Language toggle */}
            <button onClick={toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
              <Languages size={14} />
              {lang === 'uz' ? 'EN' : 'UZ'}
            </button>
            <Link href="/dashboard" className="btn btn-p" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>
              {t("Boshlash", "Launch", lang)} <ChevronRight size={15} />
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggle}
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
              {lang === 'uz' ? 'EN' : 'UZ'}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 rounded-lg"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', color: '#4ade80' }}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40" onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
            <motion.div className="fixed top-16 left-0 right-0 z-40 p-4"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ background: 'rgba(4,14,7,0.98)', borderBottom: '1px solid rgba(34,197,94,0.12)' }}>
              <div className="flex flex-col gap-1 pb-2">
                {links.map(l => {
                  const Icon = l.icon
                  return (
                    <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: pathname === l.href ? 'rgba(34,197,94,0.1)' : 'transparent', color: pathname === l.href ? '#4ade80' : 'rgba(232,245,234,0.6)' }}>
                      <Icon size={18} /><span className="font-medium">{t(l.uz, l.en, lang)}</span>
                    </Link>
                  )
                })}
                <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(34,197,94,0.1)' }}>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="btn btn-p w-full justify-center">
                    {t("Boshlash", "Launch App", lang)}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
