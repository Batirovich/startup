'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Bell, BellOff, MapPin, Clock, ArrowUpRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import AnimatedCounter from '../_components/AnimatedCounter'
import { useLang, t } from '../_context/LangContext'

const crops = [
  {
    id: 'tomato', name: 'Tomato', name_uz: 'Pomidor', unit: "so'm/kg", icon: '🍅',
    current: 6500, change: 12.3, positive: true,
    data: [
      { d: 'Jun 1', p: 4200 }, { d: 'Jun 8', p: 4800 }, { d: 'Jun 15', p: 5100 },
      { d: 'Jun 22', p: 5600 }, { d: 'Jul 1', p: 6200 }, { d: 'Jul 8', p: 6500 },
      { d: 'Jul 15', p: 6500 }, { d: 'Jul 22', p: 7100 }, { d: 'Jul 29', p: 7800 },
    ],
    forecast: 7800, forecastDate: 'Jul 29',
    advice_en: 'Wait 5 days — price projected to rise 20% due to reduced regional supply.',
    advice_uz: "5 kun kuting — mintaqaviy ta'minot kamayishi sababli narx 20% oshishi kutilmoqda.",
    adviceType: 'hold' as const,
    regions: [
      { name: 'Tashkent', name_uz: 'Toshkent', v: 42 },
      { name: 'Samarkand', name_uz: 'Samarqand', v: 28 },
      { name: 'Bukhara', name_uz: 'Buxoro', v: 18 },
      { name: 'Export', name_uz: 'Eksport', v: 12 },
    ],
  },
  {
    id: 'cotton', name: 'Cotton', name_uz: 'Paxta', unit: "so'm/kg", icon: '🌿',
    current: 12800, change: 3.2, positive: false,
    data: [
      { d: 'Jun 1', p: 14200 }, { d: 'Jun 8', p: 13800 }, { d: 'Jun 15', p: 13500 },
      { d: 'Jun 22', p: 13100 }, { d: 'Jul 1', p: 12900 }, { d: 'Jul 8', p: 12800 },
      { d: 'Jul 15', p: 12800 }, { d: 'Jul 22', p: 12600 }, { d: 'Jul 29', p: 13200 },
    ],
    forecast: 13800, forecastDate: 'Aug 12',
    advice_en: 'Hold production. Global cotton futures rising — sell in 3 weeks for 8% premium.',
    advice_uz: "Ishlab chiqarishni ushlab turing. Global paxta fyucherlari o'smoqda — 3 haftadan so'ng 8% mukofot bilan soting.",
    adviceType: 'hold' as const,
    regions: [
      { name: 'State orders', name_uz: 'Davlat buyurtmalari', v: 55 },
      { name: 'Export', name_uz: 'Eksport', v: 30 },
      { name: 'Local mills', name_uz: 'Mahalliy tegirmonlar', v: 15 },
    ],
  },
  {
    id: 'potato', name: 'Potato', name_uz: 'Kartoshka', unit: "so'm/kg", icon: '🥔',
    current: 2100, change: 5.8, positive: true,
    data: [
      { d: 'Jun 1', p: 1600 }, { d: 'Jun 8', p: 1750 }, { d: 'Jun 15', p: 1900 },
      { d: 'Jun 22', p: 1950 }, { d: 'Jul 1', p: 2000 }, { d: 'Jul 8', p: 2050 },
      { d: 'Jul 15', p: 2100 }, { d: 'Jul 22', p: 2250 }, { d: 'Jul 29', p: 2400 },
    ],
    forecast: 2400, forecastDate: 'Jul 29',
    advice_en: 'Sell within 2 weeks. Peak price Jul 29, then seasonal drop begins.',
    advice_uz: "2 hafta ichida soting. Narx cho'qqisi Jul 29, keyin mavsumiy tushish boshlanadi.",
    adviceType: 'sell' as const,
    regions: [
      { name: 'Retail', name_uz: 'Chakana savdo', v: 48 },
      { name: 'Wholesale', name_uz: 'Ulgurji savdo', v: 32 },
      { name: 'Processing', name_uz: 'Qayta ishlash', v: 20 },
    ],
  },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-4 py-3 text-sm">
      <p className="mb-1" style={{ color: 'rgba(240,250,242,0.45)' }}>{label}</p>
      <p className="font-bold" style={{ color: '#4ade80' }}>{payload[0].value.toLocaleString()} so&apos;m</p>
    </div>
  )
}

export default function MarketPage() {
  const { lang } = useLang()
  const [sel, setSel] = useState(crops[0])
  const [alerts, setAlerts] = useState<Record<string, boolean>>({ tomato: true, cotton: false, potato: false })

  const upside = ((sel.forecast - sel.current) / sel.current * 100).toFixed(1)

  return (
    <div className="min-h-screen" style={{ background: '#05100a' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#090d04,#111a04)', borderBottom: '1px solid rgba(34,197,94,0.12)' }} className="relative h-52 flex flex-col justify-between">
        <div className="px-5 pt-5 max-w-7xl mx-auto w-full">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80" style={{ color: 'rgba(240,250,242,0.4)' }}>
            <ChevronLeft size={15} /> {t("Boshqaruv paneli", "Dashboard", lang)}
          </Link>
        </div>
        <div className="px-5 pb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.25)' }}>
              <TrendingUp size={20} style={{ color: '#f0b429' }} />
            </div>
            <span className="tag tag-gold">{t("Bozor Tahlili", "Market Intelligence", lang)}</span>
          </div>
          <h1 className="heading-lg">
            <span style={{ color: '#f0faf2' }}>{t("To'g'ri vaqtda ", "Sell at the ", lang)}</span>
            <span className="text-gradient">{t("soting", "perfect moment", lang)}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-20 space-y-8">
        {/* Crop selector */}
        <div className="flex gap-3 flex-wrap">
          {crops.map(c => (
            <button key={c.id} onClick={() => setSel(c)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
              style={{
                background: sel.id === c.id ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${sel.id === c.id ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.06)'}`,
                color: sel.id === c.id ? '#4ade80' : 'rgba(240,250,242,0.5)',
              }}>
              <span className="text-lg">{c.icon}</span>
              {t(c.name_uz, c.name, lang)}
              <span className="text-xs font-bold" style={{ color: c.positive ? '#4ade80' : '#f87171' }}>
                {c.positive ? '+' : '-'}{c.change}%
              </span>
            </button>
          ))}
        </div>

        {/* Main price card */}
        <motion.div key={sel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 border-gradient">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(240,250,242,0.4)' }}>{t("Jonli bozor narxi", "Live market price", lang)} — {t(sel.name_uz, sel.name, lang)}</p>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl font-black" style={{ color: '#f0faf2' }}>
                  <AnimatedCounter value={sel.current} />
                </span>
                <span className="mb-1 text-lg" style={{ color: 'rgba(240,250,242,0.4)' }}>{sel.unit}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: sel.positive ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)',
                    color: sel.positive ? '#4ade80' : '#f87171',
                  }}>
                  {sel.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {sel.positive ? '+' : '-'}{sel.change}% {t("bu hafta", "this week", lang)}
                </span>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(240,250,242,0.35)' }}>
                  <MapPin size={11} /> {t("Toshkent Markaziy Bozori", "Tashkent Central Market", lang)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs mb-1" style={{ color: 'rgba(240,250,242,0.35)' }}>{t("Prognoz cho'qqisi", "Forecast peak", lang)}</div>
              <div className="text-2xl font-black" style={{ color: '#f0b429' }}>{sel.forecast.toLocaleString()}</div>
              <div className="flex items-center justify-end gap-1 text-xs mt-0.5" style={{ color: '#4ade80' }}>
                <ArrowUpRight size={11} /> +{upside}% by {sel.forecastDate}
              </div>
            </div>
          </div>

          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sel.data}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
                <XAxis dataKey="d" tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="p" stroke="#22c55e" strokeWidth={2.5}
                  fill="url(#areaGrad)" dot={false} activeDot={{ r: 5, fill: '#4ade80', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Advice */}
          <div className="glass rounded-2xl p-6 border-gradient" style={{ borderColor: sel.adviceType === 'sell' ? 'rgba(248,113,113,0.2)' : 'rgba(240,180,41,0.2)' }}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                <TrendingUp size={18} style={{ color: '#f0b429' }} />
              </div>
              <span className="font-bold" style={{ color: '#f0faf2' }}>{t("AI Sotish Maslahatchisi", "AI Sell Advisor", lang)}</span>
              <span className="tag tag-gold text-[10px] ml-auto">{sel.adviceType === 'sell' ? t("HOZIR SOTING", "SELL NOW", lang) : t("USHLAB TURING", "HOLD", lang)}</span>
            </div>

            <div className="p-4 rounded-xl mb-5"
              style={{ background: sel.adviceType === 'sell' ? 'rgba(248,113,113,0.07)' : 'rgba(240,180,41,0.07)', border: `1px solid ${sel.adviceType === 'sell' ? 'rgba(248,113,113,0.18)' : 'rgba(240,180,41,0.18)'}` }}>
              <p className="text-sm font-medium leading-relaxed" style={{ color: sel.adviceType === 'sell' ? '#fca5a5' : '#fde68a' }}>
                {t(sel.advice_uz, sel.advice_en, lang)}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: t("Prognoz cho'qqisi", 'Forecast peak', lang), value: `${sel.forecast.toLocaleString()} so'm by ${sel.forecastDate}` },
                { label: t("Eng yaxshi bozor", 'Best market', lang), value: t('Toshkent Markaziy', 'Tashkent Central', lang) },
                { label: t("Optimal partiya", 'Optimal lot', lang), value: '2–5 tonnes' },
                { label: t("Taxm. transport", 'Est. transport', lang), value: '~180,000 so\'m' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm py-1.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'rgba(240,250,242,0.4)' }}>{item.label}</span>
                  <span className="font-semibold" style={{ color: '#f0faf2' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market distribution + Alerts */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <p className="font-bold mb-4" style={{ color: '#f0faf2' }}>{t("Bozor Taqsimoti", "Market Distribution", lang)}</p>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sel.regions.map(r => ({ ...r, name: t(r.name_uz, r.name, lang) }))} layout="vertical" barSize={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: 'rgba(240,250,242,0.35)', fontSize: 10 }} axisLine={false} tickLine={false}
                      tickFormatter={v => `${v}%`} />
                    <YAxis dataKey="name" type="category" tick={{ fill: 'rgba(240,250,242,0.45)', fontSize: 11 }}
                      axisLine={false} tickLine={false} width={85} />
                    <Tooltip formatter={(v) => [`${v}%`, t('Hajm', 'Volume', lang)]}
                      contentStyle={{ background: 'rgba(5,16,10,0.95)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8 }} />
                    <Bar dataKey="v" fill="#22c55e" radius={[0, 4, 4, 0]} fillOpacity={0.75} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <p className="font-bold mb-4" style={{ color: '#f0faf2' }}>{t("Narx Ogohlantirishlari", "Price Alerts", lang)}</p>
              <div className="space-y-2">
                {crops.map(c => (
                  <div key={c.id} className="flex items-center justify-between py-2 px-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#f0faf2' }}>{t(c.name_uz, c.name, lang)}</p>
                        <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(240,250,242,0.35)' }}>
                          <Clock size={10} /> {t("+15% da ogohlantirish", "Alert at +15%", lang)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setAlerts(a => ({ ...a, [c.id]: !a[c.id] }))}>
                      {alerts[c.id]
                        ? <Bell size={18} style={{ color: '#4ade80' }} />
                        : <BellOff size={18} style={{ color: 'rgba(240,250,242,0.25)' }} />
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
