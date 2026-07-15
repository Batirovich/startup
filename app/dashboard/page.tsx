'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { Leaf, Droplets, TrendingUp, Link2, LayoutDashboard, AlertTriangle, ArrowUpRight, Sprout, CheckCircle2, ChevronRight } from 'lucide-react'
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

const alerts_en = [
  { icon: AlertTriangle, text: 'Field 2 soil moisture 31% — irrigate today', text_uz: "2-dala tuproq namligi 31% — bugun sug'oring", color: '#f0b429', time: '2h ago', time_uz: '2 soat oldin' },
  { icon: TrendingUp, text: 'Tomato price +12% — optimal sell window now', text_uz: "Pomidor narxi +12% — hozir sotish uchun qulay vaqt", color: '#4ade80', time: '4h ago', time_uz: '4 soat oldin' },
  { icon: Droplets, text: 'Rain Wednesday — skip Tuesday irrigation', text_uz: "Chorshanba kuni yomg'ir — Seshanbadagi sug'orishni o'tkazing", color: '#38bdf8', time: '6h ago', time_uz: '6 soat oldin' },
  { icon: CheckCircle2, text: 'Lab cert AGC-2026-07-4821 confirmed', text_uz: "Lab sertifikat AGC-2026-07-4821 tasdiqlandi", color: '#a78bfa', time: '1d ago', time_uz: '1 kun oldin' },
]

const fields = [
  { name: 'Field 1 — North', crop: 'Tomato', crop_uz: 'Pomidor', icon: '🍅', area: '1.2 ha', health: 92, moisture: 58, stage: 'Flowering', stage_uz: 'Gullash', harvest: 'Aug 5' },
  { name: 'Field 2 — East', crop: 'Potato', crop_uz: 'Kartoshka', icon: '🥔', area: '0.8 ha', health: 74, moisture: 31, stage: 'Bulking', stage_uz: 'Rivojlanish', harvest: 'Aug 18' },
  { name: 'Field 3 — South', crop: 'Pepper', crop_uz: 'Qalampir', icon: '🫑', area: '0.4 ha', health: 88, moisture: 62, stage: 'Fruit set', stage_uz: 'Meva tugishi', harvest: 'Aug 28' },
]

const quickLinks = [
  { label_en: 'Plant Doctor', label_uz: "O'simlik Shifokori", icon: Leaf, href: '/plant-doctor', color: '#22c55e' },
  { label_en: 'Irrigation', label_uz: "Sug'orish", icon: Droplets, href: '/irrigation', color: '#38bdf8' },
  { label_en: 'Market', label_uz: 'Bozor', icon: TrendingUp, href: '/market', color: '#f0b429' },
  { label_en: 'Blockchain', label_uz: 'Blokcheyn', icon: Link2, href: '/blockchain', color: '#a78bfa' },
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
      <div style={{ background: 'linear-gradient(135deg,#051208,#082010)', borderBottom: '1px solid rgba(34,197,94,0.12)' }} className="relative h-52 flex items-end">
        <div className="px-5 pb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>👨‍🌾</div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: '#f0faf2' }}>Alisher Karimov</h1>
                <p className="text-sm mt-1" style={{ color: 'rgba(240,250,242,0.45)' }}>Green Valley Farm · Shahrisabz, Qashqadaryo</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#4ade80' }} />
              <span className="text-sm font-semibold" style={{ color: '#4ade80' }}>{t("Jonli · Yangilandi", "Live · Updated now", lang)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-20 space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: t("Jami Hosil", 'Total Yield', lang), value: 34.2, suffix: 'T', sub: t('+18% o\'tgan yilga nisbatan', '+18% vs last year', lang), icon: Sprout, color: '#22c55e', decimals: 1 },
            { label: t("Tejalgan Suv", 'Water Saved', lang), value: 24800, suffix: 'L', sub: t("an'anaviyga nisbatan", 'vs traditional', lang), icon: Droplets, color: '#38bdf8', decimals: 0 },
            { label: t("Daromad / Oy", 'Revenue / Month', lang), value: 8.4, suffix: 'M', sub: t('+23% Iyunga nisbatan', '+23% vs June', lang), icon: TrendingUp, color: '#f0b429', decimals: 1 },
            { label: t("AI Aniqligi", 'AI Accuracy', lang), value: 96.2, suffix: '%', sub: t("kasallik + sug'orish", 'disease + irrigation', lang), icon: LayoutDashboard, color: '#a78bfa', decimals: 1 },
          ].map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div key={i} custom={i} variants={fade} initial="hidden" animate="show"
                className="glass rounded-2xl p-5 border-gradient">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${c.color}12` }}>
                    <Icon size={18} style={{ color: c.color }} />
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'rgba(240,250,242,0.2)' }} />
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Yield chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 lg:col-span-2 border-gradient">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-lg" style={{ color: '#f0faf2' }}>{t("Hosildorlik Tarixi", "Yield History", lang)}</p>
                <p className="text-xs" style={{ color: 'rgba(240,250,242,0.35)' }}>{t("Oylik ishlab chiqarish tonnalarda", "Monthly production in tonnes", lang)}</p>
              </div>
              <span className="tag tag-green">+28% YoY</span>
            </div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
                  <XAxis dataKey="m" tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 12 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${v}T`} />
                  <Tooltip contentStyle={{ background: 'rgba(5,16,10,0.95)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10 }}
                    labelStyle={{ color: 'rgba(240,250,242,0.5)' }} itemStyle={{ color: '#4ade80' }}
                    formatter={(v) => [`${v}T`, t('Hosil', 'Yield', lang)]} />
                  <Line type="monotone" dataKey="y" stroke="#22c55e" strokeWidth={2.5}
                    dot={{ fill: '#22c55e', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#4ade80', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Water efficiency */}
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fields */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 border-gradient">
            <p className="font-bold text-lg mb-5" style={{ color: '#f0faf2' }}>{t("Mening Dalarim", "My Fields", lang)}</p>
            <div className="space-y-3">
              {fields.map((f, i) => (
                <div key={i} className="p-4 rounded-xl transition-all hover:bg-white/[0.02]"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{f.icon}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#f0faf2' }}>{f.name}</p>
                        <p className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>{f.area} · {t(f.stage_uz, f.stage, lang)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: 'rgba(240,250,242,0.35)' }}>{t("Hosil", "Harvest", lang)}</p>
                      <p className="text-sm font-bold" style={{ color: '#f0b429' }}>{f.harvest}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: t("O'simlik Sog'lig'i", 'Plant Health', lang), value: f.health, color: f.health > 80 ? '#22c55e' : '#f0b429' },
                      { label: t("Tuproq Namligi", 'Soil Moisture', lang), value: f.moisture, color: f.moisture < 35 ? '#f87171' : '#38bdf8' },
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
                            style={{ background: `linear-gradient(90deg, ${bar.color}aa, ${bar.color})` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alerts + Quick links */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex flex-col gap-4">
            <div className="glass rounded-2xl p-6 border-gradient flex-1">
              <p className="font-bold text-lg mb-4" style={{ color: '#f0faf2' }}>{t("AI Ogohlantirishlar", "AI Alerts", lang)}</p>
              <div className="space-y-2.5">
                {alerts_en.map((a, i) => {
                  const Icon = a.icon
                  return (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl"
                      style={{ background: `${a.color}08`, border: `1px solid ${a.color}16` }}>
                      <Icon size={16} style={{ color: a.color }} className="flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug" style={{ color: 'rgba(240,250,242,0.72)' }}>{t(a.text_uz, a.text, lang)}</p>
                        <p className="text-xs mt-1" style={{ color: 'rgba(240,250,242,0.28)' }}>{t(a.time_uz, a.time, lang)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map(({ label_en, label_uz, icon: Icon, href, color }) => (
                <Link key={label_en} href={href}
                  className="glass glass-hover rounded-xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}10` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'rgba(240,250,242,0.7)' }}>{t(label_uz, label_en, lang)}</span>
                  <ChevronRight size={14} className="ml-auto" style={{ color: 'rgba(240,250,242,0.2)' }} />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Digital Passport */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl"
          style={{ background: 'linear-gradient(135deg,#051208,#082010)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-black text-xl" style={{ color: '#f0faf2' }}>{t("Fermer Raqamli Pasporti", "Farmer Digital Passport", lang)}</p>
                <p className="text-sm" style={{ color: 'rgba(240,250,242,0.4)' }}>
                  {t("Tasdiqlangan fermerlik tarixi — kredit olish uchun banklar va sug'urta bilan ulashing", "Verifiable farming record — share with banks & insurers for credit access", lang)}
                </p>
              </div>
              <span className="tag tag-gold glow-gold">⭐ 4.9 Rating</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: t("Fermerlik Yillari", 'Years Farming', lang), value: 7, suffix: '', icon: '📅', decimals: 0 },
                { label: t("Jami Hosillar", 'Total Harvests', lang), value: 142, suffix: '', icon: '🌾', decimals: 0 },
                { label: t("Tejalgan Suv", 'Water Saved', lang), value: 1.2, suffix: 'M L', icon: '💧', decimals: 1 },
                { label: t("AI Muvofiqligi", 'AI Compliance', lang), value: 94, suffix: '%', icon: '🤖', decimals: 0 },
                { label: t("Kredit Ball", 'Credit Score', lang), value: 0, suffix: '', icon: '🏦', label2: 'A+', decimals: 0 },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl glass-green">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-2xl font-black mb-1 text-gradient-green">
                    {item.label2 ?? <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals} />}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
