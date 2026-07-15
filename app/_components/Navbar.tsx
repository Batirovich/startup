'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Languages, ChevronRight } from 'lucide-react'
import { useLang, t } from '../_context/LangContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, toggle } = useLang()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(4,14,7,0.96)' : 'rgba(4,14,7,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent',
      }}>
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', fontSize: '1.1rem' }}>A</div>
          <span className="font-black text-lg" style={{ color: '#e8f5ea' }}>
            AgriChain<span style={{ color: '#4ade80' }}>AI</span>
          </span>
        </Link>

        {/* Tagline — hidden on small screens */}
        <p className="hidden md:block text-sm" style={{ color: 'rgba(232,245,234,0.35)' }}>
          {t("O'zbekiston fermerlariga mo'ljallangan AI platforma", "AI platform for Uzbekistan farmers", lang)}
        </p>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
            <Languages size={14} />
            {lang === 'uz' ? 'EN' : 'UZ'}
          </button>
          <Link href="/dashboard" className="btn btn-p" style={{ padding: '9px 22px', fontSize: '0.85rem' }}>
            {t("Boshlash", "Launch App", lang)} <ChevronRight size={15} />
          </Link>
        </div>

      </div>
    </nav>
  )
}
