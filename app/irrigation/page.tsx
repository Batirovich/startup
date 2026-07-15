'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Wind, Thermometer, CloudRain, CheckCircle2, Clock, XCircle, Satellite } from 'lucide-react'

const weather = [
  { day: 'Today', icon: '☀️', temp: 34, rain: 0, humidity: 38 },
  { day: 'Tue',   icon: '⛅', temp: 31, rain: 8,  humidity: 45 },
  { day: 'Wed',   icon: '🌧️', temp: 26, rain: 68, humidity: 78 },
  { day: 'Thu',   icon: '🌧️', temp: 24, rain: 72, humidity: 82 },
  { day: 'Fri',   icon: '⛅', temp: 28, rain: 22, humidity: 55 },
  { day: 'Sat',   icon: '☀️', temp: 33, rain: 0,  humidity: 40 },
  { day: 'Sun',   icon: '☀️', temp: 35, rain: 0,  humidity: 35 },
]

const crops = ['Tomato', 'Cotton', 'Wheat', 'Potato', 'Corn', 'Pepper', 'Onion', 'Grape']

function getRec(moisture: number, crop: string) {
  if (moisture > 65) return {
    action: 'DO NOT IRRIGATE',
    icon: XCircle, color: '#22c55e',
    reason: `Soil moisture is high (${moisture}%). Rain forecast on Wednesday will add 24mm. Irrigating now risks root rot and wastes 800+ liters.`,
    waterSaved: 840,
    next: 'Thursday 6:00 AM',
    schedule: [
      { day: 'Today',     action: 'Skip', note: `Moisture ${moisture}% — no action needed`, color: '#22c55e' },
      { day: 'Tomorrow',  action: 'Skip', note: 'Pre-rain period — conserve water', color: '#22c55e' },
      { day: 'Wednesday', action: 'Rain', note: 'Natural rainfall 24mm expected', color: '#38bdf8' },
      { day: 'Thursday',  action: 'Irrigate', note: '45 min drip · 380L', color: '#4ade80' },
    ]
  }
  if (moisture < 30) return {
    action: 'IRRIGATE NOW',
    icon: Droplets, color: '#f87171',
    reason: `${crop} is under stress. Moisture at ${moisture}% is critically low. Heat at 34°C accelerates wilting — act within the hour.`,
    waterSaved: 0,
    next: 'Today immediately',
    schedule: [
      { day: 'Today',     action: 'Urgent', note: '90 min drip · 760L · do it now', color: '#f87171' },
      { day: 'Tomorrow',  action: 'Monitor', note: 'Check moisture after watering', color: '#f0b429' },
      { day: 'Wednesday', action: 'Rain', note: 'Natural rainfall 24mm expected', color: '#38bdf8' },
      { day: 'Friday',    action: 'Irrigate', note: '45 min drip · 380L', color: '#4ade80' },
    ]
  }
  return {
    action: 'IRRIGATE TOMORROW 6 AM',
    icon: Clock, color: '#f0b429',
    reason: `Moisture is adequate today (${moisture}%). Watering tomorrow at dawn maximises soil absorption before afternoon heat peak of 31°C.`,
    waterSaved: 420,
    next: 'Tomorrow 6:00 AM',
    schedule: [
      { day: 'Today',     action: 'Skip', note: `Moisture ${moisture}% — sufficient`, color: '#22c55e' },
      { day: 'Tomorrow',  action: 'Irrigate', note: '60 min drip · 520L at 6AM', color: '#4ade80' },
      { day: 'Wednesday', action: 'Rain', note: 'Natural rainfall 24mm expected', color: '#38bdf8' },
      { day: 'Friday',    action: 'Monitor', note: 'Reassess after rain', color: '#f0b429' },
    ]
  }
}

export default function IrrigationPage() {
  const [crop, setCrop] = useState('Tomato')
  const [moisture, setMoisture] = useState(48)
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)

  const rec = getRec(moisture, crop)
  const RecIcon = rec.icon

  const moistureColor = moisture > 65 ? '#22c55e' : moisture < 30 ? '#f87171' : '#f0b429'

  function analyze() {
    setAnalyzed(false)
    setLoading(true)
    setTimeout(() => { setLoading(false); setAnalyzed(true) }, 2000)
  }

  return (
    <div className="min-h-screen" style={{ background: '#05100a' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#051208,#082010)', borderBottom: '1px solid rgba(34,197,94,0.12)' }} className="relative h-52 flex items-end">
        <div className="px-5 pb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)' }}>
              <Droplets size={20} style={{ color: '#38bdf8' }} />
            </div>
            <span className="tag" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8' }}>
              Smart Irrigation AI
            </span>
          </div>
          <h1 className="heading-lg">
            <span style={{ color: '#f0faf2' }}>Water intelligently,</span>
            <span className="text-gradient"> not habitually</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-20 space-y-8">
        {/* Weather strip */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Satellite size={16} style={{ color: '#4ade80' }} />
              <span className="font-semibold" style={{ color: '#f0faf2' }}>Qashqadaryo — Live Weather</span>
              <span className="tag tag-green text-[10px]">Updated 2min ago</span>
            </div>
            <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(240,250,242,0.5)' }}>
              <span className="flex items-center gap-1"><Thermometer size={13} /> 34°C</span>
              <span className="flex items-center gap-1"><Wind size={13} /> 12 km/h</span>
              <span className="flex items-center gap-1"><Droplets size={13} /> 38% RH</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {weather.map((d, i) => (
              <div key={i} className="text-center rounded-xl py-3 px-1 transition-all"
                style={{
                  background: i === 0 ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === 0 ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.05)'}`,
                }}>
                <p className="text-xs font-bold mb-1" style={{ color: i === 0 ? '#4ade80' : 'rgba(240,250,242,0.4)' }}>{d.day}</p>
                <p className="text-2xl mb-1">{d.icon}</p>
                <p className="text-sm font-bold" style={{ color: '#f0faf2' }}>{d.temp}°</p>
                {d.rain > 0 && <p className="text-[10px] mt-0.5" style={{ color: '#38bdf8' }}>{d.rain}%</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Config */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-5" style={{ color: '#f0faf2' }}>Farm Configuration</h2>

            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: 'rgba(240,250,242,0.35)' }}>Crop Type</label>
              <div className="grid grid-cols-4 gap-2">
                {crops.map(c => (
                  <button key={c} onClick={() => { setCrop(c); setAnalyzed(false) }}
                    className="py-2 rounded-lg text-xs font-semibold transition-all hover:scale-[1.03]"
                    style={{
                      background: crop === c ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${crop === c ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.06)'}`,
                      color: crop === c ? '#4ade80' : 'rgba(240,250,242,0.45)',
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(240,250,242,0.35)' }}>Soil Moisture</label>
                <span className="text-2xl font-black" style={{ color: moistureColor }}>{moisture}%</span>
              </div>
              <div className="relative h-10 flex items-center">
                <input type="range" min={10} max={90} value={moisture}
                  onChange={e => { setMoisture(Number(e.target.value)); setAnalyzed(false) }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${moistureColor} ${(moisture - 10) / 80 * 100}%, rgba(255,255,255,0.08) ${(moisture - 10) / 80 * 100}%)`,
                    outline: 'none',
                  }} />
              </div>
              <div className="flex justify-between text-[10px] mt-1 font-medium" style={{ color: 'rgba(240,250,242,0.25)' }}>
                <span>DRY (10%)</span><span>OPTIMAL (50%)</span><span>WET (90%)</span>
              </div>
              <div className="flex gap-2 mt-3">
                {[
                  { label: 'Critical', color: '#f87171', range: '< 30%' },
                  { label: 'Moderate', color: '#f0b429', range: '30–65%' },
                  { label: 'Good', color: '#22c55e', range: '> 65%' },
                ].map(({ label, color, range }) => (
                  <div key={label} className="flex items-center gap-1.5 text-[10px]" style={{ color: 'rgba(240,250,242,0.4)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    {label} {range}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Field Area', value: '2.4 ha', icon: '📐' },
                { label: 'System', value: 'Drip', icon: '🔧' },
                { label: 'Stage', value: 'Flowering', icon: '🌸' },
                { label: 'Last watered', value: '2 days ago', icon: '🕒' },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(240,250,242,0.35)' }}>{item.icon} {item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: '#f0faf2' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <button onClick={analyze}
              className="w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              style={{ background: loading ? 'rgba(34,197,94,0.1)' : 'linear-gradient(135deg,#22c55e,#16a34a)', color: loading ? '#4ade80' : '#000' }}>
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <Satellite size={18} />
                  </motion.div>
                  Fetching satellite data...
                </>
              ) : (
                <><CloudRain size={18} /> Get AI Recommendation</>
              )}
            </button>
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {!analyzed && !loading && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-96">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 float"
                  style={{ background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.15)' }}>
                  <Droplets size={38} style={{ color: '#38bdf8' }} strokeWidth={1.4} />
                </div>
                <p className="font-bold text-xl mb-2" style={{ color: '#f0faf2' }}>Configure & Analyze</p>
                <p className="text-sm max-w-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>
                  Set your crop type and soil moisture, then click to get your AI-powered irrigation schedule.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-96">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
                    <Satellite size={30} style={{ color: '#4ade80' }} />
                  </motion.div>
                </div>
                <p className="font-semibold text-lg mb-6" style={{ color: '#f0faf2' }}>Processing satellite data...</p>
                <div className="w-full space-y-3">
                  {['OpenWeather API', 'Soil moisture sensors', 'Evapotranspiration model', 'Crop growth stage', 'Generating schedule'].map((s, i) => (
                    <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35 }}
                      className="flex items-center gap-3">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.35 + 0.2 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                        <CheckCircle2 size={11} style={{ color: '#4ade80' }} />
                      </motion.div>
                      <span className="text-sm" style={{ color: 'rgba(240,250,242,0.55)' }}>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {analyzed && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-6 border-gradient" style={{ borderColor: `${rec.color}25` }}>
                <div className="p-4 rounded-xl mb-5 flex items-start gap-3"
                  style={{ background: `${rec.color}0e`, border: `1px solid ${rec.color}22` }}>
                  <RecIcon size={22} style={{ color: rec.color }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-xl mb-1" style={{ color: rec.color }}>{rec.action}</div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,250,242,0.6)' }}>{rec.reason}</p>
                  </div>
                </div>

                {rec.waterSaved > 0 && (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl mb-5"
                    style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(34,197,94,0.12)' }}>
                      <Droplets size={20} style={{ color: '#4ade80' }} />
                    </div>
                    <div>
                      <div className="font-black text-xl" style={{ color: '#4ade80' }}>{rec.waterSaved}L saved</div>
                      <div className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>vs. traditional irrigation this week</div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(240,250,242,0.35)' }}>Recommended Schedule</p>
                  <div className="space-y-2.5">
                    {rec.schedule.map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-20 text-xs font-semibold flex-shrink-0" style={{ color: 'rgba(240,250,242,0.45)' }}>{s.day}</div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
                          style={{ background: `${s.color}14`, border: `1px solid ${s.color}28`, color: s.color }}>
                          {s.action}
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>{s.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
