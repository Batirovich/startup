'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Map, Leaf, Droplets, TrendingUp, Link2, LayoutDashboard, ChevronRight, Play } from 'lucide-react'
import { useLang, t } from '../_context/LangContext'

const steps = [
  {
    n: '01',
    icon: Leaf,
    color: '#22c55e',
    href: '/plant-doctor',
    uz: "O'simlik Shifokori",
    en: 'Plant Doctor',
    desc_uz: "Kasallangan o'simlik suratini yuklang. AI 5 soniyada kasallikni aniqlaydi va davolash tavsiyasini beradi.",
    desc_en: "Upload a photo of a sick plant. AI identifies the disease in 5 seconds and gives treatment advice.",
    action_uz: "Rasm yuklang →",
    action_en: "Upload a photo →",
  },
  {
    n: '02',
    icon: Droplets,
    color: '#38bdf8',
    href: '/irrigation',
    uz: "Aqlli Sug'orish",
    en: 'Smart Irrigation',
    desc_uz: "Ekin turini va tuproq namligi darajasini tanlang. AI ob-havo ma'lumotlari asosida optimal sug'orish jadvalini yaratadi.",
    desc_en: "Select crop type and soil moisture level. AI creates an optimal irrigation schedule based on weather data.",
    action_uz: "Jadval olish →",
    action_en: "Get schedule →",
  },
  {
    n: '03',
    icon: TrendingUp,
    color: '#f0b429',
    href: '/market',
    uz: 'Bozor Tahlili',
    en: 'Market Analysis',
    desc_uz: "Ekin narxlarini real vaqtda kuzating. AI qachon sotish kerakligini va qaysi bozorda eng yaxshi narx borligini aytadi.",
    desc_en: "Track crop prices in real time. AI tells you when to sell and which market offers the best price.",
    action_uz: "Narxlarni ko'ring →",
    action_en: "View prices →",
  },
  {
    n: '04',
    icon: Link2,
    color: '#a78bfa',
    href: '/blockchain',
    uz: 'Blokcheyn Iz Qolish',
    en: 'Blockchain Trace',
    desc_uz: "Har bir mahsulot uchun QR kodli raqamli pasport. Ekilganidan tortib sotilgunga qadar to'liq tarix blokcheynda saqlanadi.",
    desc_en: "A digital passport with QR code for every product. Full history from planting to sale stored on blockchain.",
    action_uz: "Pasportni ko'rish →",
    action_en: "View passport →",
  },
  {
    n: '05',
    icon: LayoutDashboard,
    color: '#fb923c',
    href: '/dashboard',
    uz: "Fermer Paneli",
    en: 'Farmer Dashboard',
    desc_uz: "Barcha dala ko'rsatkichlari, AI ogohlantirishlar va fermer raqamli pasporti — kredit olish uchun banklar bilan ulashing.",
    desc_en: "All field metrics, AI alerts, and farmer digital passport — share with banks for credit access.",
    action_uz: "Panelni ochish →",
    action_en: "Open dashboard →",
  },
]

export default function DemoGuide() {
  const [open, setOpen] = useState(false)
  const { lang } = useLang()

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(10,26,14,0.97), rgba(5,16,10,0.99))',
          border: '1px solid rgba(34,197,94,0.4)',
          color: '#4ade80',
          boxShadow: '0 0 30px rgba(34,197,94,0.2), 0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <Map size={16} />
        {t("Qo'llanma", "Demo Guide", lang)}
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 rounded-full bg-green-400"
        />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col overflow-hidden"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              style={{ background: 'linear-gradient(180deg,#051208,#040e07)', borderLeft: '1px solid rgba(34,197,94,0.18)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(34,197,94,0.1)' }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Map size={16} style={{ color: '#4ade80' }} />
                    <span className="font-black text-lg" style={{ color: '#f0faf2' }}>
                      {t("Qo'llanma", "Demo Guide", lang)}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>
                    {t("AgriChain AI bilan tanishing", "Explore AgriChain AI step by step", lang)}
                  </p>
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,250,242,0.5)' }}>
                  <X size={16} />
                </button>
              </div>

              {/* Intro */}
              <div className="px-6 py-5 flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.04)', borderBottom: '1px solid rgba(34,197,94,0.08)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,250,242,0.65)' }}>
                  {t(
                    "AgriChain AI — O'zbekiston fermerlariga mo'ljallangan sun'iy intellekt va blokcheyn platformasi. Quyidagi 5 ta modulni sinab ko'ring:",
                    "AgriChain AI is an AI + blockchain platform for Uzbekistan farmers. Try the 5 modules below — each takes under 1 minute to demo.",
                    lang
                  )}
                </p>
              </div>

              {/* Steps */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {steps.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link href={s.href} onClick={() => setOpen(false)}
                        className="flex items-start gap-4 p-4 rounded-2xl group transition-all block"
                        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = `${s.color}35`
                          el.style.background = `${s.color}08`
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'rgba(255,255,255,0.06)'
                          el.style.background = 'rgba(255,255,255,0.025)'
                        }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                          <Icon size={18} style={{ color: s.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold" style={{ color: s.color }}>{s.n}</span>
                            <span className="font-bold text-sm" style={{ color: '#f0faf2' }}>
                              {t(s.uz, s.en, lang)}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed mb-2" style={{ color: 'rgba(240,250,242,0.45)' }}>
                            {t(s.desc_uz, s.desc_en, lang)}
                          </p>
                          <span className="text-xs font-semibold flex items-center gap-1" style={{ color: s.color }}>
                            {t(s.action_uz, s.action_en, lang)}
                          </span>
                        </div>
                        <ChevronRight size={14} className="flex-shrink-0 mt-3" style={{ color: 'rgba(240,250,242,0.2)' }} />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="p-6 flex-shrink-0" style={{ borderTop: '1px solid rgba(34,197,94,0.1)' }}>
                <Link href="/presentation" onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#000' }}>
                  <Play size={15} />
                  {t("To'liq taqdimotni ko'rish", "View full presentation", lang)}
                </Link>
                <p className="text-center text-xs mt-3" style={{ color: 'rgba(240,250,242,0.25)' }}>
                  {t("Axborot texnologiyalari va menejment universiteti", "Axborot texnologiyalari va menejment universiteti", lang)}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
