'use client'
import { useLang, t } from '../_context/LangContext'
import { Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const links = [
  { uz: "O'simlik shifokori", en: 'Plant Doctor', href: '/plant-doctor' },
  { uz: "Aqlli sug'orish", en: 'Smart Irrigation', href: '/irrigation' },
  { uz: 'Bozor tahlili', en: 'Market Analysis', href: '/market' },
  { uz: 'Blokcheyn', en: 'Blockchain', href: '/blockchain' },
  { uz: 'Boshqaruv paneli', en: 'Dashboard', href: '/dashboard' },
]

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer style={{ background: 'rgba(2,8,4,0.98)', borderTop: '1px solid rgba(34,197,94,0.1)' }}>
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-black text-lg" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>A</div>
              <span className="font-black text-xl" style={{ color: '#e8f5ea' }}>AgriChain<span style={{ color: '#4ade80' }}>AI</span></span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,245,234,0.45)' }}>
              {t("O'zbekiston fermerlarini sun'iy intellekt va blokcheyn texnologiyalari bilan jihozlash.", "Empowering Uzbekistan farmers with AI and blockchain technology.", lang)}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(232,245,234,0.3)' }}>
              {t('Modullar', 'Modules', lang)}
            </p>
            <div className="space-y-2.5">
              {links.map(l => (
                <Link key={l.href} href={l.href} className="block text-sm transition-colors hover:text-green-400"
                  style={{ color: 'rgba(232,245,234,0.5)' }}>
                  {t(l.uz, l.en, lang)}
                </Link>
              ))}
            </div>
          </div>

          {/* Download */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(232,245,234,0.3)' }}>
              {t('Taqdimot', 'Presentation', lang)}
            </p>
            <p className="text-sm mb-4" style={{ color: 'rgba(232,245,234,0.45)' }}>
              {t('Loyiha taqdimotini yuklab oling', 'Download the project presentation', lang)}
            </p>
            <a href="/AgriChain-AI-Taqdimot.pptx" download
              className="btn btn-p inline-flex" style={{ padding: '11px 22px', fontSize: '0.85rem' }}>
              <Download size={16} />
              {t("Taqdimotni yuklab olish", "Download Slides", lang)}
            </a>
            <Link href="/presentation"
              className="mt-2 flex items-center gap-1.5 text-sm transition-colors hover:text-green-400"
              style={{ color: 'rgba(232,245,234,0.4)' }}>
              <ExternalLink size={13} />
              {t("Onlayn ko'rish", "View Online", lang)}
            </Link>
          </div>
        </div>

        <div className="div mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(232,245,234,0.28)' }}>
          <p>© 2026 AgriChain AI. {t("Barcha huquqlar himoyalangan.", "All rights reserved.", lang)}</p>
          <p className="text-center">
            {t("Axborot texnologiyalari va menejment universiteti talabalari tomonidan yaratilgan", "Made by Axborot texnologiyalari va menejment universiteti students", lang)}
          </p>
          <p>Polygon Blockchain · OpenAI · Next.js</p>
        </div>
      </div>
    </footer>
  )
}
