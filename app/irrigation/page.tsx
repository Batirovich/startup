'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const weatherDays = [
  { day: 'Today', icon: '☀️', temp: 34, rain: 0, wind: 12 },
  { day: 'Tue', icon: '⛅', temp: 31, rain: 5, wind: 8 },
  { day: 'Wed', icon: '🌧️', temp: 26, rain: 68, wind: 15 },
  { day: 'Thu', icon: '🌧️', temp: 24, rain: 80, wind: 18 },
  { day: 'Fri', icon: '⛅', temp: 28, rain: 20, wind: 10 },
  { day: 'Sat', icon: '☀️', temp: 33, rain: 0, wind: 9 },
  { day: 'Sun', icon: '☀️', temp: 35, rain: 0, wind: 11 },
]

const crops = ['Tomato', 'Cotton', 'Wheat', 'Potato', 'Corn', 'Pepper']

const getRecommendation = (crop: string, soilMoisture: number) => {
  if (soilMoisture > 70) return {
    action: 'DO NOT IRRIGATE',
    icon: '🚫',
    color: '#22c55e',
    reason: 'Soil moisture is high and rain is expected Wednesday. Irrigating now would waste water and risk root rot.',
    nextIrrigation: 'Thursday morning',
    waterSaved: Math.floor(Math.random() * 800 + 600),
    schedule: [
      { time: 'Today', status: 'Skip', note: 'Soil moisture 72% — adequate' },
      { time: 'Tomorrow', status: 'Skip', note: 'Rain forecast 68%' },
      { time: 'Wednesday', status: 'Natural Rain', note: 'Expected 24mm rainfall' },
      { time: 'Thursday 6AM', status: 'Irrigate', note: '45 min — 380L recommended' },
    ]
  }

  if (soilMoisture < 35) return {
    action: 'IRRIGATE NOW',
    icon: '💧',
    color: '#38bdf8',
    reason: `${crop} needs water urgently. Soil moisture critically low. Heat stress risk is high at 34°C.`,
    nextIrrigation: 'Today immediately',
    waterSaved: 0,
    schedule: [
      { time: 'Today 7AM', status: 'Irrigate', note: '90 min — 760L recommended' },
      { time: 'Tomorrow', status: 'Monitor', note: 'Check moisture after watering' },
      { time: 'Wednesday', status: 'Natural Rain', note: 'Expected 24mm rainfall' },
      { time: 'Friday', status: 'Irrigate', note: '45 min — 380L recommended' },
    ]
  }

  return {
    action: 'IRRIGATE TOMORROW MORNING',
    icon: '⏰',
    color: '#eab308',
    reason: 'Moisture levels are adequate today. Irrigating tomorrow at 6AM will maximize absorption before the afternoon heat.',
    nextIrrigation: 'Tomorrow 6:00 AM',
    waterSaved: Math.floor(Math.random() * 400 + 200),
    schedule: [
      { time: 'Today', status: 'Skip', note: 'Moisture sufficient for 24h' },
      { time: 'Tomorrow 6AM', status: 'Irrigate', note: '60 min — 520L recommended' },
      { time: 'Wednesday', status: 'Natural Rain', note: 'Expected 24mm rainfall' },
      { time: 'Friday', status: 'Monitor', note: 'Assess after rain' },
    ]
  }
}

export default function IrrigationPage() {
  const [crop, setCrop] = useState('Tomato')
  const [soilMoisture, setSoilMoisture] = useState(48)
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)

  const rec = getRecommendation(crop, soilMoisture)

  function analyze() {
    setLoading(true)
    setAnalyzed(false)
    setTimeout(() => { setLoading(false); setAnalyzed(true) }, 1800)
  }

  return (
    <div className="min-h-screen grid-bg px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', color: '#38bdf8' }}>
            💧 Smart Irrigation AI
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#e8f5e9' }}>
            Water <span className="gradient-text">intelligently,</span><br />not habitually
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(232,245,233,0.55)' }}>
            AI analyzes weather, soil moisture, and crop type to give precise irrigation schedules. Save up to 40% water.
          </p>
        </motion.div>

        {/* Weather strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="card-glass rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold" style={{ color: '#e8f5e9' }}>Qashqadaryo, Uzbekistan</p>
              <p className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>7-day forecast — Updated 5 min ago</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black" style={{ color: '#eab308' }}>34°C</div>
              <div className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>Clear sky</div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weatherDays.map((d, i) => (
              <div key={i} className="text-center rounded-xl py-3 px-1"
                style={{ background: i === 0 ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.02)', border: i === 0 ? '1px solid rgba(34,197,94,0.25)' : '1px solid transparent' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: i === 0 ? '#22c55e' : 'rgba(232,245,233,0.5)' }}>{d.day}</p>
                <p className="text-xl mb-1">{d.icon}</p>
                <p className="text-sm font-bold" style={{ color: '#e8f5e9' }}>{d.temp}°</p>
                {d.rain > 0 && <p className="text-xs" style={{ color: '#38bdf8' }}>{d.rain}%</p>}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Config panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="card-glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-5" style={{ color: '#e8f5e9' }}>Farm Settings</h2>

            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'rgba(232,245,233,0.4)' }}>Crop Type</label>
              <div className="grid grid-cols-3 gap-2">
                {crops.map(c => (
                  <button key={c} onClick={() => { setCrop(c); setAnalyzed(false) }}
                    className="py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: crop === c ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${crop === c ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      color: crop === c ? '#22c55e' : 'rgba(232,245,233,0.55)',
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'rgba(232,245,233,0.4)' }}>
                Soil Moisture: <span style={{ color: soilMoisture > 60 ? '#22c55e' : soilMoisture > 35 ? '#eab308' : '#ef4444' }}>{soilMoisture}%</span>
              </label>
              <input type="range" min={10} max={90} value={soilMoisture}
                onChange={e => { setSoilMoisture(Number(e.target.value)); setAnalyzed(false) }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #22c55e ${soilMoisture}%, rgba(34,197,94,0.15) ${soilMoisture}%)` }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: 'rgba(232,245,233,0.35)' }}>
                <span>Dry (10%)</span><span>Optimal (50%)</span><span>Wet (90%)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Field Size', value: '2.4 ha', icon: '📐' },
                { label: 'Irrigation Type', value: 'Drip', icon: '🔧' },
                { label: 'Growth Stage', value: 'Flowering', icon: '🌸' },
                { label: 'Last Irrigated', value: '2 days ago', icon: '🕒' },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(232,245,233,0.4)' }}>{item.icon} {item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: '#e8f5e9' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <button onClick={analyze}
              className="w-full py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#000' }}>
              {loading ? 'Analyzing...' : 'Get AI Recommendation'}
            </button>
          </motion.div>

          {/* Result panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {!analyzed && !loading && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="card-glass rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center min-h-80">
                  <div className="text-5xl mb-4 float-anim">🌱</div>
                  <p className="font-semibold mb-2" style={{ color: '#e8f5e9' }}>Configure your farm</p>
                  <p className="text-sm" style={{ color: 'rgba(232,245,233,0.45)' }}>
                    Select crop type and adjust soil moisture, then click Analyze to get your AI irrigation schedule.
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="card-glass rounded-2xl p-6 h-full flex flex-col items-center justify-center min-h-80">
                  <div className="text-4xl mb-4">🛰️</div>
                  <p className="font-semibold mb-2" style={{ color: '#e8f5e9' }}>Processing satellite & weather data...</p>
                  <div className="w-full mt-4 space-y-2">
                    {['Fetching OpenWeather data', 'Analyzing soil moisture', 'Calculating evapotranspiration', 'Generating schedule'].map((s, i) => (
                      <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35 }}
                        className="flex items-center gap-2 text-sm" style={{ color: 'rgba(232,245,233,0.6)' }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.35 + 0.2 }}
                          className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: 'rgba(34,197,94,0.4)' }} />
                        {s}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {analyzed && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="card-glass rounded-2xl p-6" style={{ borderColor: `${rec.color}30` }}>
                  <div className="text-center mb-5 py-4 rounded-xl"
                    style={{ background: `${rec.color}10`, border: `1px solid ${rec.color}25` }}>
                    <div className="text-3xl mb-2">{rec.icon}</div>
                    <div className="text-lg font-black" style={{ color: rec.color }}>{rec.action}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(232,245,233,0.5)' }}>for {crop} field</div>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'rgba(232,245,233,0.65)' }}>{rec.reason}</p>

                  {rec.waterSaved > 0 && (
                    <div className="flex items-center gap-3 p-3 rounded-xl mb-4"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      <span className="text-2xl">💧</span>
                      <div>
                        <div className="font-bold" style={{ color: '#22c55e' }}>{rec.waterSaved}L saved this week</div>
                        <div className="text-xs" style={{ color: 'rgba(232,245,233,0.45)' }}>compared to traditional irrigation</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(232,245,233,0.4)' }}>Irrigation Schedule</p>
                    <div className="space-y-2">
                      {rec.schedule.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <span className="font-medium w-32 flex-shrink-0" style={{ color: 'rgba(232,245,233,0.5)' }}>{s.time}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                            style={{
                              background: s.status === 'Irrigate' ? 'rgba(56,189,248,0.15)' : s.status === 'Skip' ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)',
                              color: s.status === 'Irrigate' ? '#38bdf8' : s.status === 'Skip' ? '#22c55e' : '#eab308',
                            }}>
                            {s.status}
                          </span>
                          <span style={{ color: 'rgba(232,245,233,0.45)' }}>{s.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
