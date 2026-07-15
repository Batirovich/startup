'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { Leaf, Droplets, TrendingUp, Link2, LayoutDashboard, ShieldCheck, ChevronRight, ArrowRight, Zap, Globe2, AlertTriangle, Download } from 'lucide-react'
import AnimatedCounter from './_components/AnimatedCounter'
import TiltCard from './_components/TiltCard'
import { useLang, t } from './_context/LangContext'

const features = [
  { icon: Leaf,          color: '#22c55e', href: '/plant-doctor', uz: "O'simlik Shifokori",   en: 'Plant Doctor',   desc_uz: "Suratdan 5 soniyada kasallik aniqlanadi. 200+ kasallik bazasi.",                      desc_en: 'Disease detection from photo in 5s. 200+ disease database.',             stat: '94%',   sl: 'aniqlik' },
  { icon: Droplets,      color: '#38bdf8', href: '/irrigation',   uz: "Aqlli Sug'orish",      en: 'Smart Irrigation', desc_uz: "Ob-havo va tuproq namligi asosida sug'orish jadvali. 40% suv tejash.",      desc_en: 'Irrigation schedule from weather & soil data. 40% water saved.',         stat: '40%',   sl: 'suv tejash' },
  { icon: TrendingUp,    color: '#f0b429', href: '/market',       uz: 'Bozor Tahlili',        en: 'Market Analysis', desc_uz: "Real vaqtda narxlar va AI yordamida sotish vaqtini aniqlash.",               desc_en: 'Real-time prices and AI-driven optimal sell timing.',                    stat: '+23%',  sl: "daromad" },
  { icon: Link2,         color: '#a78bfa', href: '/blockchain',   uz: 'Blokcheyn Iz Qolish',  en: 'Blockchain Trace', desc_uz: "Polygon blokcheynda o'zgartirib bo'lmaydigan mahsulot pasporti va QR kod.", desc_en: 'Tamper-proof product passport on Polygon with QR code.',                stat: '100%',  sl: 'ishonch' },
  { icon: LayoutDashboard, color: '#fb923c', href: '/dashboard',  uz: 'Fermer Paneli',        en: 'Farmer Dashboard', desc_uz: "Barcha dala ma'lumotlari, xavflar va hisobotlar bitta joyda.",           desc_en: 'All field data, alerts and reports in one place.',                      stat: 'Live',  sl: 'ma\'lumot' },
  { icon: ShieldCheck,   color: '#34d399', href: '/dashboard',    uz: 'Raqamli Pasport',      en: 'Digital Passport', desc_uz: "Banklar va sug'urta uchun tasdiqlangan fermer tarixi. Kredit imkoni.",    desc_en: 'Verified farming history for banks and insurers. Credit access.',        stat: 'A+',    sl: 'kredit' },
]

const problems = [
  { icon: Droplets,    color: '#38bdf8', value: 40, uz: "Suv isrof",       en: 'Water wasted',    desc_uz: "oddiy sug'orish usullarida",    desc_en: 'through manual irrigation' },
  { icon: Leaf,        color: '#f87171', value: 30, uz: "Hosil yo'qoti",   en: 'Crop loss',       desc_uz: 'kech aniqlangan kasallik sababli', desc_en: 'from late disease detection' },
  { icon: TrendingUp,  color: '#f0b429', value: 25, uz: "Daromad yo'qoti", en: 'Revenue lost',    desc_uz: "noto'g'ri sotish vaqti sababli",  desc_en: 'by selling at wrong time' },
  { icon: Globe2,      color: '#a78bfa', value: 60, uz: "Eksport rad",     en: 'Export rejected', desc_uz: "iz qolish yo'qligi sababli",       desc_en: 'due to lack of traceability' },
]

const rv: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
}

export default function Home() {
  const { lang } = useLang()

  return (
    <div style={{ background: '#040e07' }}>
      <div className="scanline" />

      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden bg-hero hex-bg">
        <div className="orb ob1 absolute w-[520px] h-[520px] -top-32 -left-32" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.2), transparent 65%)' }} />
        <div className="orb ob2 absolute w-[420px] h-[420px] -bottom-20 -right-20" style={{ background: 'radial-gradient(circle, rgba(16,163,74,0.15), transparent 65%)' }} />
        <div className="orb absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.05), transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-20">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09 } } }}>
            <motion.div variants={rv} className="mb-5">
              <span className="tag tag-g">
                <span className="pd w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                {t("AI + Blokcheyn • Qishloq Xo'jaligi", "AI + Blockchain • Agriculture", lang)}
              </span>
            </motion.div>

            <motion.h1 variants={rv} className="h1 mb-6 max-w-4xl">
              <span style={{ color: '#e8f5ea' }}>
                {t("O'zbekistonning eng aqlli", "Uzbekistan's smartest", lang)}
              </span><br />
              <span className="grad">
                {t("qishloq xo'jaligi ekotizimi", "agriculture ecosystem", lang)}
              </span>
            </motion.h1>

            <motion.p variants={rv} className="text-xl max-w-2xl mb-10 leading-relaxed" style={{ color: 'rgba(232,245,234,0.6)' }}>
              {t(
                "Real vaqtda AI diagnostika, blokcheyn iz qolish va aqlli sug'orish — barchasi bitta platformada. Qashqadaryo fermerlariga mo'ljallangan, global bozorga tayyor.",
                "Real-time AI diagnostics, blockchain traceability, and smart irrigation — all in one platform. Built for Uzbekistan farmers, ready for global markets.",
                lang
              )}
            </motion.p>

            <motion.div variants={rv} className="flex flex-wrap gap-4 mb-20">
              <Link href="/dashboard" className="btn btn-p">
                {t("Boshlash", "Launch App", lang)} <ChevronRight size={18} />
              </Link>
              <Link href="/presentation" className="btn btn-o">
                {t("Taqdimotni ko'rish", "View Presentation", lang)} <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={rv} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { v: 40,  s: '%', uz: 'Suv Tejash',     en: 'Water Saved',     d: 0 },
                { v: 2.3, s: 'x', uz: 'Hosildorlik',    en: 'Yield Increase',  d: 1 },
                { v: 5,   s: 's', uz: 'Kasallik Tahlil', en: 'Disease Detect', d: 0 },
                { v: 100, s: '%', uz: 'Tasdiq',          en: 'Verified',        d: 0 },
              ].map((s, i) => (
                <div key={i} className="card p-5 text-center">
                  <div className="stat grad-green mb-1">
                    <AnimatedCounter value={s.v} suffix={s.s} decimals={s.d} />
                  </div>
                  <div className="text-xs font-semibold mt-1" style={{ color: 'rgba(232,245,234,0.45)' }}>
                    {t(s.uz, s.en, lang)}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(74,222,128,0.5), transparent)' }} />
        </motion.div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="relative py-28 bg-grid overflow-hidden">
        <div className="orb ob1 absolute w-[400px] h-[400px] -right-20 top-0" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.1), transparent 65%)' }} />
        <div className="max-w-7xl mx-auto px-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={rv}>
              <div className="section-accent" />
              <span className="tag tag-y mb-4 inline-flex">{t("Muammo", "The Problem", lang)}</span>
              <h2 className="h2 mb-4 max-w-3xl">
                <span style={{ color: '#e8f5ea' }}>{t("Fermerlar har yili", "Farmers lose billions", lang)}</span><br />
                <span className="grad">{t("milliardlarini yo'qotadi", "every year without data", lang)}</span>
              </h2>
              <p className="text-lg mb-14 max-w-xl" style={{ color: 'rgba(232,245,234,0.5)' }}>
                {t("An'anaviy dehqonchilik taxminga asoslanadi. AgriChain AI buni ilm bilan almashtiradi.", "Traditional farming relies on guesswork. AgriChain AI replaces that with science.", lang)}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {problems.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.div key={i} custom={i} variants={rv}>
                    <TiltCard className="card p-6 h-full">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                        <Icon size={22} style={{ color: p.color }} />
                      </div>
                      <div className="text-4xl font-black mb-2" style={{ color: p.color }}>
                        <AnimatedCounter value={p.value} suffix="%" />
                      </div>
                      <div className="font-bold mb-1 text-base" style={{ color: '#e8f5ea' }}>{t(p.uz, p.en, lang)}</div>
                      <div className="text-sm" style={{ color: 'rgba(232,245,234,0.45)' }}>{t(p.desc_uz, p.desc_en, lang)}</div>
                    </TiltCard>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg,#040e07 0%,#05140a 50%,#040e07 100%)' }}>
        <div className="orb ob2 absolute w-[500px] h-[500px] -left-40 top-20" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent 65%)' }} />
        <div className="max-w-7xl mx-auto px-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
            <motion.div variants={rv} className="text-center mb-14">
              <div className="section-accent mx-auto" />
              <span className="tag tag-g mb-4 inline-flex">{t("Yechim", "Solution", lang)}</span>
              <h2 className="h2 mb-4">
                <span style={{ color: '#e8f5ea' }}>{t("Bitta platforma.", "One platform.", lang)}</span>{' '}
                <span className="grad">{t("Barcha javoblar.", "Every answer.", lang)}</span>
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(232,245,234,0.5)' }}>
                {t("6 ta modul birgalikda ishlaydi — fermerlar uchun korporatsiya darajasidagi vositalar.", "Six modules working together — enterprise-grade tools for farmers.", lang)}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div key={i} custom={i} variants={rv}>
                    <TiltCard>
                      <Link href={f.href} className="block">
                        <div className="card p-6 h-full relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-36 h-36 rounded-full -mr-12 -mt-12 pointer-events-none"
                            style={{ background: `radial-gradient(circle, ${f.color}10 0%, transparent 70%)` }} />
                          <div className="flex items-start justify-between mb-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ background: `${f.color}14`, border: `1px solid ${f.color}28` }}>
                              <Icon size={22} style={{ color: f.color }} strokeWidth={1.8} />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black" style={{ color: f.color }}>{f.stat}</div>
                              <div className="text-xs" style={{ color: 'rgba(232,245,234,0.35)' }}>{f.sl}</div>
                            </div>
                          </div>
                          <h3 className="h3 mb-2" style={{ color: '#e8f5ea' }}>{t(f.uz, f.en, lang)}</h3>
                          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(232,245,234,0.5)' }}>
                            {t(f.desc_uz, f.desc_en, lang)}
                          </p>
                          <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: f.color }}>
                            {t("Ko'rish", "Explore", lang)} <ChevronRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-grid">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={rv} className="text-center mb-16">
              <div className="section-accent mx-auto" />
              <h2 className="h2"><span className="grad">{t("Qanday ishlaydi?", "How it works", lang)}</span></h2>
            </motion.div>
            <div className="relative">
              <div className="absolute top-7 left-8 right-8 h-px hidden md:block" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.25), rgba(34,197,94,0.25), transparent)' }} />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { n: '01', icon: LayoutDashboard, uz: "Ro'yxatdan o'ting",    en: 'Register',   desc_uz: "Ferma profili, ekin turi va dala hajmini kiriting.",              desc_en: 'Set up farm profile with crop type and field data.' },
                  { n: '02', icon: Leaf,            uz: 'AI Monitoring',          en: 'AI Monitors', desc_uz: "AI ob-havo, surat va dala ma'lumotlarini tahlil qiladi.",      desc_en: 'AI continuously analyses weather, photos, and field data.' },
                  { n: '03', icon: Zap,             uz: 'Tavsiyalar',             en: 'Get Insights', desc_uz: "Ogohlantirishlar, jadvallar va bozor tavsiyalari oling.",     desc_en: 'Receive alerts, schedules, and market timing advice.' },
                  { n: '04', icon: Link2,           uz: "Isbotla va Sot",         en: 'Prove & Sell', desc_uz: "Kelib chiqishni tasdiqlash uchun blokcheyn QR yarating.",    desc_en: 'Generate blockchain QR to certify origin and quality.' },
                ].map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.div key={i} custom={i} variants={rv} className="text-center">
                      <div className="relative inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-5 mx-auto"
                        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}>
                        <Icon size={22} style={{ color: '#4ade80' }} />
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                          style={{ background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}>
                          {parseInt(s.n)}
                        </div>
                      </div>
                      <h3 className="font-bold text-base mb-2" style={{ color: '#e8f5ea' }}>{t(s.uz, s.en, lang)}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,245,234,0.45)' }}>{t(s.desc_uz, s.desc_en, lang)}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20" style={{ background: 'rgba(2,10,4,0.6)' }}>
        <div className="max-w-5xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-accent mx-auto" />
            <h2 className="h2 mb-12">
              <span style={{ color: '#e8f5ea' }}>{t("Texnologiya", "Built with", lang)}</span>{' '}
              <span className="grad">{t("stack", "enterprise stack", lang)}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { n: 'Next.js', c: '#ffffff' }, { n: 'FastAPI', c: '#009688' }, { n: 'PostgreSQL', c: '#4fc3f7' },
                { n: 'Polygon', c: '#8247e5' }, { n: 'OpenAI GPT', c: '#10a37f' }, { n: 'Gemini Vision', c: '#4285f4' },
                { n: 'IPFS', c: '#65c2cb' }, { n: 'Tailwind CSS', c: '#38bdf8' },
              ].map(t2 => (
                <div key={t2.n} className="card px-5 py-3 font-semibold text-sm" style={{ color: t2.c, borderRadius: 12 }}>{t2.n}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA + DOWNLOAD ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #040e07, #061406)' }}>
        <div className="orb ob1 absolute w-[600px] h-[600px] -bottom-40 left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.18), transparent 65%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="section-accent mx-auto" />
            <h2 className="h1 mb-6 grad">
              {t("Hoziroq boshlang!", "Get started today!", lang)}
            </h2>
            <p className="text-xl mb-8" style={{ color: 'rgba(232,245,234,0.55)' }}>
              {t("Smartfondan boshlang — qo'shimcha qurilma shart emas.", "Start with your smartphone — no extra hardware needed.", lang)}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/dashboard" className="btn btn-p" style={{ fontSize: '1.05rem', padding: '15px 34px' }}>
                {t("Dasturni Ishga Tushirish", "Launch App", lang)} <ArrowRight size={20} />
              </Link>
              <Link href="/presentation" className="btn btn-o" style={{ fontSize: '1.05rem', padding: '14px 30px' }}>
                {t("Taqdimotni Ko'rish", "View Presentation", lang)}
              </Link>
            </div>

            {/* Download card */}
            <div className="card p-6 max-w-md mx-auto glow-g" style={{ borderColor: 'rgba(34,197,94,0.35)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  <Download size={20} style={{ color: '#4ade80' }} />
                </div>
                <div className="text-left">
                  <p className="font-bold" style={{ color: '#e8f5ea' }}>{t("Taqdimotni Yuklab Oling", "Download Presentation", lang)}</p>
                  <p className="text-xs" style={{ color: 'rgba(232,245,234,0.4)' }}>AgriChain AI · PowerPoint · 10 {t("slayd", "slides", lang)}</p>
                </div>
              </div>
              <a href="/AgriChain-AI-Taqdimot.pptx" download className="btn btn-p w-full justify-center" style={{ padding: '12px', fontSize: '0.9rem' }}>
                <Download size={17} /> {t("AgriChain-AI-Taqdimot.pptx", "AgriChain-AI-Presentation.pptx", lang)}
              </a>
              <p className="text-xs mt-2 text-center" style={{ color: 'rgba(232,245,234,0.3)' }}>
                {t("Axborot texnologiyalari va menejment universiteti talabalari", "Axborot texnologiyalari va menejment universiteti students", lang)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
