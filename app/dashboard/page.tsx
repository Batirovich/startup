'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { Leaf, Droplets, TrendingUp, Link2, AlertTriangle, ArrowUpRight, Sprout, CheckCircle2, ChevronRight, ChevronLeft, User, Calendar, Wheat, Bot, CreditCard, Star, ShieldCheck } from 'lucide-react'
import AnimatedCounter from '../_components/AnimatedCounter'
import { useLang, t } from '../_context/LangContext'

const yieldData = [
  { m: 'Feb', y: 12 }, { m: 'Mar', y: 18 }, { m: 'Apr', y: 22 },
  { m: 'May', y: 31 }, { m: 'Jun', y: 28 }, { m: 'Jul', y: 34 },
]

const waterData = [
  { name: 'Saved', value: 68, fill: '#22c55e' },
  { name: 'Used', value: 32, fill: 'rgba(34,197,94,0.1)' },
]

const alerts = [
  { icon: AlertTriangle, text_en: 'Field 2 soil moisture 31% — irrigate today', text_uz: "2-dala namligi 31% — bugun sug'oring", color: '#f0b429', time_en: '2h ago', time_uz: '2 soat oldin' },
  { icon: TrendingUp,   text_en: 'Tomato price +12% — optimal sell window now', text_uz: "Pomidor +12% — hozir sotish uchun qulay", color: '#4ade80', time_en: '4h ago', time_uz: '4 soat oldin' },
  { icon: Droplets,     text_en: 'Rain Wednesday — skip Tuesday irrigation', text_uz: "Chorshanba yomg'ir — Seshanbani o'tkaz", color: '#38bdf8', time_en: '6h ago', time_uz: '6 soat oldin' },
  { icon: CheckCircle2, text_en: 'Lab cert AGC-2026-07-4821 confirmed', text_uz: "Lab sertifikat AGC-2026-07-4821 tasdiqlandi", color: '#a78bfa', time_en: '1d ago', time_uz: '1 kun oldin' },
]

const fields = [
  { name_en: 'Field 1 — North', name_uz: '1-Dala — Shimol', crop_en: 'Tomato', crop_uz: 'Pomidor', area: '1.2 ha', health: 92, moisture: 58, stage_en: 'Flowering', stage_uz: 'Gullash', harvest: 'Aug 5' },
  { name_en: 'Field 2 — East',  name_uz: '2-Dala — Sharq',  crop_en: 'Potato', crop_uz: 'Kartoshka', area: '0.8 ha', health: 74, moisture: 31, stage_en: 'Bulking',    stage_uz: 'Rivojlanish', harvest: 'Aug 18' },
  { name_en: 'Field 3 — South', name_uz: '3-Dala — Janub', crop_en: 'Pepper', crop_uz: 'Qalampir',  area: '0.4 ha', health: 88, moisture: 62, stage_en: 'Fruit set',  stage_uz: 'Meva tugishi', harvest: 'Aug 28' },
]

const modules = [
  {
    icon: Leaf, color: '#22c55e', href: '/plant-doctor',
    uz: "O'simlik Shifokori", en: 'Plant Doctor',
    desc_uz: "Kasallangan o'simlik suratini yuklang — AI 5 soniyada tashxis beradi",
    desc_en: 'Upload a plant photo — AI diagnoses disease in 5 seconds',
    cta_uz: "Tashxis boshlash", cta_en: 'Start diagnosis',
  },
  {
    icon: Droplets, color: '#38bdf8', href: '/irrigation',
    uz: "Aqlli Sug'orish", en: 'Smart Irrigation',
    desc_uz: "Tuproq namligi va ob-havoga qarab optimal sug'orish jadvalini oling",
    desc_en: 'Get an optimal watering schedule based on soil moisture and weather',
    cta_uz: "Jadval olish", cta_en: 'Get schedule',
  },
  {
    icon: TrendingUp, color: '#f0b429', href: '/market',
    uz: 'Bozor Tahlili', en: 'Market Analysis',
    desc_uz: "Real vaqtda narxlar va AI sotish maslahati — qachon va qayerda soting",
    desc_en: 'Live prices and AI sell advice — know when and where to sell',
    cta_uz: "Narxlarni ko'rish", cta_en: 'View prices',
  },
  {
    icon: Link2, color: '#a78bfa', href: '/blockchain',
    uz: 'Blokcheyn Pasporti', en: 'Blockchain Passport',
    desc_uz: "Har bir hosilning QR kodli raqamli pasporti — o'zgartirib bo'lmaydi",
    desc_en: 'QR-coded digital passport for each harvest — tamper-proof on blockchain',
    cta_uz: "Pasportni ko'rish", cta_en: 'View passport',
  },
]

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
}

export default function Dashboard() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen" style={{ background: '#05100a' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#051208,#082010)', borderBottom: '1px solid rgba(34,197,94,0.12)' }}
        className="relative h-52 flex flex-col justify-between">
        <div className="px-5 pt-5 max-w-7xl mx-auto w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: 'rgba(240,250,242,0.4)' }}>
            <ChevronLeft size={15} /> {t("Bosh sahifa", "Home", lang)}
          </Link>
        </div>
        <div className="px-5 pb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
                <User size={20} style={{ color: '#000' }} />
              </div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: '#f0faf2' }}>Alisher Karimov</h1>
                <p className="text-sm mt-0.5" style={{ color: 'rgba(240,250,242,0.45)' }}>Green Valley Farm · Shahrisabz, Qashqadaryo</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#4ade80' }} />
              <span className="text-sm font-semibold" style={{ color: '#4ade80' }}>
                {t("Jonli · Yangilandi", "Live · Updated now", lang)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10 space-y-8">

        {/* ── MODULE CARDS — first thing judges see ── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(240,250,242,0.3)' }}>
            {t("Nimani amalga oshirmoqchisiz?", "What would you like to do?", lang)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div key={m.href} custom={i} variants={fade} initial="hidden" animate="show">
                  <Link href={m.href} className="block h-full rounded-2xl p-5 group transition-all"
                    style={{
                      background: 'linear-gradient(135deg,rgba(10,26,14,0.95),rgba(8,20,11,0.98))',
                      border: `1px solid ${m.color}22`,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${m.color}55`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${m.color}22`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${m.color}14`, border: `1px solid ${m.color}28` }}>
                      <Icon size={20} style={{ color: m.color }} />
                    </div>
                    <p className="font-bold text-base mb-1.5" style={{ color: '#f0faf2' }}>{t(m.uz, m.en, lang)}</p>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(240,250,242,0.45)' }}>
                      {t(m.desc_uz, m.desc_en, lang)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: m.color }}>
                      {t(m.cta_uz, m.cta_en, lang)} <ChevronRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: t("Jami Hosil", 'Total Yield', lang), value: 34.2, suffix: 'T', sub: '+18%', icon: Sprout, color: '#22c55e', decimals: 1 },
            { label: t("Tejalgan Suv", 'Water Saved', lang), value: 24800, suffix: 'L', sub: t("an'anaviyga nisbatan", 'vs traditional', lang), icon: Droplets, color: '#38bdf8', decimals: 0 },
            { label: t("Daromad / Oy", 'Revenue / Month', lang), value: 8.4, suffix: 'M', sub: '+23% vs Jun', icon: TrendingUp, color: '#f0b429', decimals: 1 },
            { label: t("AI Aniqligi", 'AI Accuracy', lang), value: 96.2, suffix: '%', sub: t("kasallik + sug'orish", 'disease + irrigation', lang), icon: Bot, color: '#a78bfa', decimals: 1 },
          ].map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div key={i} custom={i + 4} variants={fade} initial="hidden" animate="show"
                className="glass rounded-2xl p-5 border-gradient">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${c.color}12` }}>
                    <Icon size={17} style={{ color: c.color }} />
                  </div>
                  <ArrowUpRight size={15} style={{ color: 'rgba(240,250,242,0.2)' }} />
                </div>
                <div className="text-2xl font-black mb-0.5" style={{ color: c.color }}>
                  <AnimatedCounter value={c.value} suffix={c.suffix} decimals={c.decimals} />
                </div>
                <div className="text-xs font-medium" style={{ color: 'rgba(240,250,242,0.4)' }}>{c.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(240,250,242,0.25)' }}>{c.sub}</div>
              </motion.div>
            )
          })}
        </div>

        {/* ── CHARTS ── */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 lg:col-span-2 border-gradient">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-lg" style={{ color: '#f0faf2' }}>{t("Hosildorlik Tarixi", "Yield History", lang)}</p>
                <p className="text-xs" style={{ color: 'rgba(240,250,242,0.35)' }}>{t("Oylik ishlab chiqarish (tonna)", "Monthly production in tonnes", lang)}</p>
              </div>
              <span className="tag tag-green">+28% YoY</span>
            </div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
                  <XAxis dataKey="m" tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}T`} />
                  <Tooltip contentStyle={{ background: 'rgba(5,16,10,0.95)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10 }}
                    labelStyle={{ color: 'rgba(240,250,242,0.5)' }} itemStyle={{ color: '#4ade80' }}
                    formatter={(v) => [`${v}T`, t('Hosil', 'Yield', lang)]} />
                  <Line type="monotone" dataKey="y" stroke="#22c55e" strokeWidth={2.5}
                    dot={{ fill: '#22c55e', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#4ade80', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center border-gradient">
            <p className="font-bold text-lg mb-1" style={{ color: '#f0faf2' }}>{t("Suv Samaradorligi", "Water Efficiency", lang)}</p>
            <p className="text-xs mb-2 text-center" style={{ color: 'rgba(240,250,242,0.35)' }}>{t("an'anaviy sug'orishga nisbatan", "vs. traditional irrigation", lang)}</p>
            <div style={{ height: 150, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="55%" outerRadius="90%" data={waterData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={6} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gradient">68%</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(240,250,242,0.45)' }}>{t("suv tejalgan", "water saved", lang)}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(240,250,242,0.25)' }}>24,800L {t("bu mavsum", "this season", lang)}</div>
            </div>
          </motion.div>
        </div>

        {/* ── FIELDS + ALERTS ── */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 border-gradient">
            <p className="font-bold text-lg mb-5" style={{ color: '#f0faf2' }}>{t("Mening Dalarim", "My Fields", lang)}</p>
            <div className="space-y-3">
              {fields.map((f, i) => (
                <div key={i} className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                        <Leaf size={14} style={{ color: '#4ade80' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#f0faf2' }}>{t(f.name_uz, f.name_en, lang)}</p>
                        <p className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>
                          {f.area} · {t(f.stage_uz, f.stage_en, lang)} · {t(f.crop_uz, f.crop_en, lang)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs" style={{ color: 'rgba(240,250,242,0.35)' }}>{t("Hosil", "Harvest", lang)}</p>
                      <p className="text-sm font-bold" style={{ color: '#f0b429' }}>{f.harvest}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: t("Sog'liq", 'Health', lang), value: f.health, color: f.health > 80 ? '#22c55e' : '#f0b429' },
                      { label: t("Namlik", 'Moisture', lang), value: f.moisture, color: f.moisture < 35 ? '#f87171' : '#38bdf8' },
                    ].map(bar => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span style={{ color: 'rgba(240,250,242,0.4)' }}>{bar.label}</span>
                          <span className="font-bold" style={{ color: bar.color }}>{bar.value}%</span>
                        </div>
                        <div className="progress-bar">
                          <motion.div className="progress-fill"
                            initial={{ width: 0 }} whileInView={{ width: `${bar.value}%` }}
                            viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                            style={{ background: `linear-gradient(90deg,${bar.color}88,${bar.color})` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 border-gradient">
            <p className="font-bold text-lg mb-4" style={{ color: '#f0faf2' }}>{t("AI Ogohlantirishlar", "AI Alerts", lang)}</p>
            <div className="space-y-2.5">
              {alerts.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: `${a.color}08`, border: `1px solid ${a.color}16` }}>
                    <Icon size={15} style={{ color: a.color }} className="flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug" style={{ color: 'rgba(240,250,242,0.75)' }}>
                        {t(a.text_uz, a.text_en, lang)}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(240,250,242,0.28)' }}>
                        {t(a.time_uz, a.time_en, lang)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ── DIGITAL PASSPORT ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#051208,#082010)', border: '1px solid rgba(34,197,94,0.18)' }}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <ShieldCheck size={20} style={{ color: '#4ade80' }} />
                  <p className="font-black text-xl" style={{ color: '#f0faf2' }}>
                    {t("Fermer Raqamli Pasporti", "Farmer Digital Passport", lang)}
                  </p>
                </div>
                <p className="text-sm" style={{ color: 'rgba(240,250,242,0.4)' }}>
                  {t(
                    "Tasdiqlangan fermerlik tarixi — kredit olish uchun banklar bilan ulashing",
                    "Verifiable farming record — share with banks & insurers for credit access",
                    lang
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
                <Star size={13} style={{ color: '#facc15' }} />
                <span className="text-sm font-bold" style={{ color: '#facc15' }}>4.9</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { icon: Calendar,   color: '#4ade80', label: t("Fermerlik Yillari", 'Years Farming', lang),  value: 7,   suffix: '',    decimals: 0 },
                { icon: Wheat,      color: '#f0b429', label: t("Jami Hosillar", 'Total Harvests', lang),     value: 142, suffix: '',    decimals: 0 },
                { icon: Droplets,   color: '#38bdf8', label: t("Tejalgan Suv", 'Water Saved', lang),         value: 1.2, suffix: 'M L', decimals: 1 },
                { icon: Bot,        color: '#a78bfa', label: t("AI Muvofiqligi", 'AI Compliance', lang),     value: 94,  suffix: '%',   decimals: 0 },
                { icon: CreditCard, color: '#22c55e', label: t("Kredit Ball", 'Credit Score', lang),          value: 0,   suffix: '',    decimals: 0, fixed: 'A+' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="text-center p-4 rounded-xl"
                    style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `${item.color}14`, border: `1px solid ${item.color}28` }}>
                      <Icon size={17} style={{ color: item.color }} />
                    </div>
                    <div className="text-2xl font-black mb-1 text-gradient-green">
                      {item.fixed ?? <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals} />}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>{item.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
