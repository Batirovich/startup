'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const crops = [
  {
    name: 'Tomato', icon: '🍅', current: 6500, change: +12.3, unit: "so'm/kg",
    data: [
      { date: 'Jun 1', price: 4200 }, { date: 'Jun 8', price: 4800 }, { date: 'Jun 15', price: 5100 },
      { date: 'Jun 22', price: 5600 }, { date: 'Jul 1', price: 6200 }, { date: 'Jul 8', price: 6500 },
      { date: 'Jul 15', price: 6500 }, { date: 'Jul 22', price: 7100 }, { date: 'Jul 29', price: 7800 },
    ],
    forecast: [
      { date: 'Jul 15', price: 6500 }, { date: 'Jul 22', price: 7100 }, { date: 'Jul 29', price: 7800 },
      { date: 'Aug 5', price: 8200 }, { date: 'Aug 12', price: 7600 },
    ],
    advice: 'Wait 5 days. Price expected to rise 20% due to reduced regional supply.',
    adviceColor: '#22c55e',
    region: 'Tashkent market showing high demand',
    marketShare: [
      { region: 'Tashkent', volume: 42 }, { region: 'Samarkand', volume: 28 }, { region: 'Bukhara', volume: 18 }, { region: 'Export', volume: 12 },
    ]
  },
  {
    name: 'Cotton', icon: '🌿', current: 12800, change: -3.2, unit: "so'm/kg",
    data: [
      { date: 'Jun 1', price: 14200 }, { date: 'Jun 8', price: 13800 }, { date: 'Jun 15', price: 13500 },
      { date: 'Jun 22', price: 13100 }, { date: 'Jul 1', price: 12900 }, { date: 'Jul 8', price: 12800 },
      { date: 'Jul 15', price: 12800 }, { date: 'Jul 22', price: 12600 }, { date: 'Jul 29', price: 12400 },
    ],
    forecast: [
      { date: 'Jul 15', price: 12800 }, { date: 'Jul 22', price: 12600 },
      { date: 'Jul 29', price: 12400 }, { date: 'Aug 5', price: 13200 }, { date: 'Aug 12', price: 13800 },
    ],
    advice: 'Hold production. Global cotton futures rising. Sell in 3 weeks for 8% premium.',
    adviceColor: '#eab308',
    region: 'Export demand recovering — EU buyers active',
    marketShare: [
      { region: 'State orders', volume: 55 }, { region: 'Export', volume: 30 }, { region: 'Local mills', volume: 15 },
    ]
  },
  {
    name: 'Potato', icon: '🥔', current: 2100, change: +5.8, unit: "so'm/kg",
    data: [
      { date: 'Jun 1', price: 1600 }, { date: 'Jun 8', price: 1750 }, { date: 'Jun 15', price: 1900 },
      { date: 'Jun 22', price: 1950 }, { date: 'Jul 1', price: 2000 }, { date: 'Jul 8', price: 2050 },
      { date: 'Jul 15', price: 2100 }, { date: 'Jul 22', price: 2250 }, { date: 'Jul 29', price: 2400 },
    ],
    forecast: [
      { date: 'Jul 15', price: 2100 }, { date: 'Jul 22', price: 2250 },
      { date: 'Jul 29', price: 2400 }, { date: 'Aug 5', price: 2350 }, { date: 'Aug 12', price: 2200 },
    ],
    advice: 'Sell now or within 2 weeks. Peak prices expected Jul 29, then seasonal drop.',
    adviceColor: '#f97316',
    region: 'Local demand stable, storage prices rising',
    marketShare: [
      { region: 'Retail', volume: 48 }, { region: 'Wholesale', volume: 32 }, { region: 'Processing', volume: 20 },
    ]
  },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl p-3 text-sm" style={{ background: 'rgba(3,13,6,0.95)', border: '1px solid rgba(34,197,94,0.25)' }}>
        <p style={{ color: 'rgba(232,245,233,0.5)' }}>{label}</p>
        <p className="font-bold" style={{ color: '#22c55e' }}>{payload[0].value.toLocaleString()} so&apos;m</p>
      </div>
    )
  }
  return null
}

export default function MarketPage() {
  const [selected, setSelected] = useState(crops[0])

  return (
    <div className="min-h-screen grid-bg px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', color: '#eab308' }}>
            📈 Market Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#e8f5e9' }}>
            Sell at the <span className="gradient-text">right moment</span>
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(232,245,233,0.55)' }}>
            Real-time price tracking with AI-powered sell timing recommendations for Uzbekistan agricultural markets.
          </p>
        </motion.div>

        {/* Crop selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex gap-3 mb-6 flex-wrap">
          {crops.map(c => (
            <button key={c.name} onClick={() => setSelected(c)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: selected.name === c.name ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected.name === c.name ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: selected.name === c.name ? '#22c55e' : 'rgba(232,245,233,0.55)',
              }}>
              {c.icon} {c.name}
              <span className={`text-xs ${c.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {c.change > 0 ? '+' : ''}{c.change}%
              </span>
            </button>
          ))}
        </motion.div>

        {/* Main price card */}
        <motion.div key={selected.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="card-glass rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(232,245,233,0.4)' }}>Current market price</p>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black" style={{ color: '#e8f5e9' }}>
                  {selected.current.toLocaleString()}
                </span>
                <span style={{ color: 'rgba(232,245,233,0.5)' }} className="mb-2">{selected.unit}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: selected.change > 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: selected.change > 0 ? '#22c55e' : '#ef4444',
                  }}>
                  {selected.change > 0 ? '↑' : '↓'} {Math.abs(selected.change)}% this week
                </span>
                <span className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>{selected.region}</span>
              </div>
            </div>
            <div className="text-5xl">{selected.icon}</div>
          </div>

          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selected.data}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.08)" />
                <XAxis dataKey="date" tick={{ fill: 'rgba(232,245,233,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(232,245,233,0.4)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2}
                  fill="url(#priceGradient)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Advice */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="card-glass rounded-2xl p-6" style={{ borderColor: `${selected.adviceColor}25` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                style={{ background: `${selected.adviceColor}15` }}>🤖</div>
              <p className="font-bold" style={{ color: '#e8f5e9' }}>AI Sell Advisor</p>
            </div>
            <div className="p-4 rounded-xl mb-4"
              style={{ background: `${selected.adviceColor}10`, border: `1px solid ${selected.adviceColor}25` }}>
              <p className="text-sm font-medium" style={{ color: selected.adviceColor }}>{selected.advice}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: '7-day high', value: `${Math.round(selected.current * 1.2).toLocaleString()} so'm` },
                { label: 'Best market', value: 'Tashkent Central' },
                { label: 'Optimal quantity', value: '2-5 tonnes' },
                { label: 'Transport cost', value: '~180,000 so\'m' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span style={{ color: 'rgba(232,245,233,0.45)' }}>{item.label}</span>
                  <span className="font-semibold" style={{ color: '#e8f5e9' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Market distribution */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="card-glass rounded-2xl p-6">
            <p className="font-bold mb-4" style={{ color: '#e8f5e9' }}>Market Distribution</p>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selected.marketShare} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.08)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'rgba(232,245,233,0.4)', fontSize: 11 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${v}%`} />
                  <YAxis dataKey="region" type="category" tick={{ fill: 'rgba(232,245,233,0.5)', fontSize: 12 }}
                    axisLine={false} tickLine={false} width={80} />
                  <Tooltip formatter={(v) => [`${v}%`, 'Volume']} contentStyle={{ background: 'rgba(3,13,6,0.95)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8 }} />
                  <Bar dataKey="volume" fill="#22c55e" radius={[0, 4, 4, 0]} fillOpacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Price alerts */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(232,245,233,0.4)' }}>Price Alerts</p>
              {[
                { label: `Alert when ${selected.name} > ${Math.round(selected.current * 1.15).toLocaleString()} so'm`, active: true },
                { label: `Alert when price drops 10%`, active: false },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-2.5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(232,245,233,0.6)' }}>{alert.label}</span>
                  <div className="w-8 h-4 rounded-full relative cursor-pointer"
                    style={{ background: alert.active ? '#22c55e' : 'rgba(255,255,255,0.1)' }}>
                    <div className="w-3 h-3 rounded-full bg-white absolute top-0.5"
                      style={{ right: alert.active ? 2 : 'auto', left: alert.active ? 'auto' : 2, transition: 'all 0.2s' }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
