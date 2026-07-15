'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import Link from 'next/link'

const yieldHistory = [
  { month: 'Feb', yield: 12 }, { month: 'Mar', yield: 18 }, { month: 'Apr', yield: 22 },
  { month: 'May', yield: 31 }, { month: 'Jun', yield: 28 }, { month: 'Jul', yield: 34 },
]

const waterSavings = [
  { name: 'Saved', value: 68, fill: '#22c55e' },
  { name: 'Used', value: 32, fill: 'rgba(34,197,94,0.12)' },
]

const alerts = [
  { icon: '⚠️', text: 'Soil moisture in Field 2 below 35% — irrigate today', color: '#eab308', time: '2h ago' },
  { icon: '📈', text: 'Tomato price rose 12% — optimal sell window open', color: '#22c55e', time: '4h ago' },
  { icon: '🌧️', text: 'Rain forecast Wednesday — skip Tuesday irrigation', color: '#38bdf8', time: '6h ago' },
  { icon: '🔬', text: 'Lab certification for AGC-2026-07-4821 confirmed', color: '#a78bfa', time: '1d ago' },
]

const fields = [
  { name: 'Field 1 — North', crop: 'Tomato 🍅', area: '1.2 ha', health: 92, moisture: 58, stage: 'Flowering', harvest: 'Aug 5' },
  { name: 'Field 2 — East', crop: 'Potato 🥔', area: '0.8 ha', health: 74, moisture: 31, stage: 'Bulking', harvest: 'Aug 18' },
  { name: 'Field 3 — South', crop: 'Pepper 🫑', area: '0.4 ha', health: 88, moisture: 62, stage: 'Fruit set', harvest: 'Aug 28' },
]

const cards = [
  { label: 'Total Yield This Season', value: '34.2 T', sub: '+18% vs last year', icon: '🌾', color: '#22c55e' },
  { label: 'Water Saved', value: '24,800 L', sub: 'vs traditional irrigation', icon: '💧', color: '#38bdf8' },
  { label: 'Revenue This Month', value: "8.4M so'm", sub: '+23% vs Jun', icon: '💰', color: '#eab308' },
  { label: 'AI Accuracy Score', value: '96.2%', sub: 'disease + irrigation', icon: '🤖', color: '#a78bfa' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen grid-bg px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>👨‍🌾</div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: '#e8f5e9' }}>Alisher Karimov</h1>
                <p className="text-sm" style={{ color: 'rgba(232,245,233,0.45)' }}>Green Valley Farm · Shahrisabz, Qashqadaryo</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
            Live · Updated just now
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((c, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" animate="show"
              className="card-glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{c.icon}</div>
                <div className="w-8 h-8 rounded-lg" style={{ background: `${c.color}15` }} />
              </div>
              <div className="text-2xl font-black mb-1" style={{ color: c.color }}>{c.value}</div>
              <div className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>{c.label}</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'rgba(232,245,233,0.25)' }}>{c.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Yield chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card-glass rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold" style={{ color: '#e8f5e9' }}>Yield History</p>
                <p className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>Monthly production in tonnes</p>
              </div>
              <div className="px-3 py-1 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                +28% YoY
              </div>
            </div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldHistory}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(232,245,233,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(232,245,233,0.4)', fontSize: 12 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${v}T`} />
                  <Tooltip contentStyle={{ background: 'rgba(3,13,6,0.95)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8 }}
                    labelStyle={{ color: 'rgba(232,245,233,0.5)' }} itemStyle={{ color: '#22c55e' }} formatter={(v) => [`${v}T`, 'Yield']} />
                  <Line type="monotone" dataKey="yield" stroke="#22c55e" strokeWidth={2.5}
                    dot={{ fill: '#22c55e', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#22c55e' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Water savings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="card-glass rounded-2xl p-6 flex flex-col items-center justify-center">
            <p className="font-bold mb-1" style={{ color: '#e8f5e9' }}>Water Efficiency</p>
            <p className="text-xs mb-4" style={{ color: 'rgba(232,245,233,0.4)' }}>vs traditional irrigation</p>
            <div style={{ height: 140, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="55%" outerRadius="90%" data={waterSavings} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={6} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <div className="text-3xl font-black" style={{ color: '#22c55e' }}>68%</div>
              <div className="text-sm" style={{ color: 'rgba(232,245,233,0.5)' }}>water saved</div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Fields */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="card-glass rounded-2xl p-6">
            <p className="font-bold mb-4" style={{ color: '#e8f5e9' }}>My Fields</p>
            <div className="space-y-3">
              {fields.map((f, i) => (
                <div key={i} className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#e8f5e9' }}>{f.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(232,245,233,0.45)' }}>{f.crop} · {f.area} · {f.stage}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>Harvest</div>
                      <div className="text-sm font-bold" style={{ color: '#eab308' }}>{f.harvest}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'rgba(232,245,233,0.4)' }}>Plant Health</span>
                        <span style={{ color: f.health > 80 ? '#22c55e' : '#eab308' }}>{f.health}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${f.health}%`, background: f.health > 80 ? '#22c55e' : '#eab308' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'rgba(232,245,233,0.4)' }}>Soil Moisture</span>
                        <span style={{ color: f.moisture < 35 ? '#ef4444' : '#38bdf8' }}>{f.moisture}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${f.moisture}%`, background: f.moisture < 35 ? '#ef4444' : '#38bdf8' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alerts + quick actions */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="card-glass rounded-2xl p-6 mb-4">
              <p className="font-bold mb-4" style={{ color: '#e8f5e9' }}>AI Alerts</p>
              <div className="space-y-3">
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: `${a.color}08`, border: `1px solid ${a.color}18` }}>
                    <span className="text-lg flex-shrink-0">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug" style={{ color: 'rgba(232,245,233,0.75)' }}>{a.text}</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(232,245,233,0.3)' }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Plant Doctor', icon: '🌿', href: '/plant-doctor', color: '#22c55e' },
                { label: 'Irrigation', icon: '💧', href: '/irrigation', color: '#38bdf8' },
                { label: 'Market Prices', icon: '📈', href: '/market', color: '#eab308' },
                { label: 'QR Passport', icon: '🔗', href: '/blockchain', color: '#a78bfa' },
              ].map(item => (
                <Link key={item.label} href={item.href}
                  className="card-glass rounded-xl p-4 flex items-center gap-3 transition-all hover:scale-[1.02]">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: `${item.color}12` }}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'rgba(232,245,233,0.7)' }}>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Farmer Digital Passport */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="card-glass rounded-2xl p-6 glow-green">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-bold text-lg" style={{ color: '#e8f5e9' }}>Farmer Digital Passport</p>
              <p className="text-sm" style={{ color: 'rgba(232,245,233,0.4)' }}>Your verifiable farming record — shareable with banks & insurers</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl text-sm font-bold"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
              ⭐ 4.9 Rating
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Years Farming', value: '7', icon: '📅' },
              { label: 'Total Harvests', value: '142', icon: '🌾' },
              { label: 'Water Saved', value: '1.2M L', icon: '💧' },
              { label: 'AI Compliance', value: '94%', icon: '🤖' },
              { label: 'Credit Score', value: 'A+', icon: '🏦' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-xl"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xl font-black" style={{ color: '#22c55e' }}>{item.value}</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(232,245,233,0.45)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
