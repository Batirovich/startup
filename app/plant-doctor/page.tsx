'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mockDiagnoses = [
  {
    disease: 'Powdery Mildew',
    severity: 'Moderate',
    confidence: 94,
    color: '#eab308',
    symptoms: ['White powdery spots on leaves', 'Stunted growth', 'Yellowing of lower leaves'],
    treatment: ['Apply sulfur-based fungicide', 'Improve air circulation', 'Reduce overhead irrigation'],
    prevention: 'Avoid overcrowding plants. Water at the base, not the leaves.',
    icon: '🍃',
  },
  {
    disease: 'Tomato Leaf Curl Virus',
    severity: 'High',
    confidence: 89,
    color: '#ef4444',
    symptoms: ['Upward curling of leaves', 'Yellowing leaf margins', 'Stunted plant development'],
    treatment: ['Remove infected plants immediately', 'Control whitefly population', 'Apply imidacloprid insecticide'],
    prevention: 'Use virus-resistant varieties. Install insect nets.',
    icon: '🌿',
  },
  {
    disease: 'Healthy Plant',
    severity: 'None',
    confidence: 97,
    color: '#22c55e',
    symptoms: ['No visible disease symptoms', 'Normal leaf color', 'Healthy growth pattern'],
    treatment: ['Continue current care routine', 'Maintain proper irrigation', 'Monitor weekly'],
    prevention: 'Great job! Keep up the current farming practices.',
    icon: '✅',
  },
]

export default function PlantDoctor() {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'result'>('idle')
  const [diagnosis, setDiagnosis] = useState(mockDiagnoses[0])
  const [preview, setPreview] = useState<string | null>(null)
  const [loadProgress, setLoadProgress] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setPhase('loading')
    setLoadProgress(0)

    const steps = [
      { p: 20, label: 'Preprocessing image...' },
      { p: 45, label: 'Extracting features...' },
      { p: 70, label: 'Running AI model...' },
      { p: 90, label: 'Cross-referencing database...' },
      { p: 100, label: 'Generating report...' },
    ]

    steps.forEach(({ p }, i) => {
      setTimeout(() => {
        setLoadProgress(p)
        if (i === steps.length - 1) {
          setTimeout(() => {
            setDiagnosis(mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)])
            setPhase('result')
          }, 400)
        }
      }, i * 600)
    })
  }

  return (
    <div className="min-h-screen grid-bg px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}>
            🌿 AI Plant Doctor
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#e8f5e9' }}>
            Diagnose your crop <span className="gradient-text">instantly</span>
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(232,245,233,0.55)' }}>
            Upload a photo of any plant leaf or fruit. Our AI identifies diseases, pests, and nutrient deficiencies in seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div
              className="card-glass rounded-2xl p-6 min-h-80 flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => phase === 'idle' && fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
            >
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleFile(e.target.files?.[0])} />

              {preview ? (
                <div className="w-full">
                  <img src={preview} alt="Plant" className="w-full h-48 object-cover rounded-xl mb-4" />
                  {phase === 'idle' && (
                    <button onClick={(e) => { e.stopPropagation(); setPreview(null); setPhase('idle') }}
                      className="w-full py-2 rounded-lg text-sm font-medium"
                      style={{ border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}>
                      Upload different photo
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    📷
                  </div>
                  <p className="font-semibold mb-1" style={{ color: '#e8f5e9' }}>Drop your plant photo here</p>
                  <p className="text-sm" style={{ color: 'rgba(232,245,233,0.45)' }}>or click to browse</p>
                  <p className="text-xs mt-3" style={{ color: 'rgba(232,245,233,0.3)' }}>JPG, PNG supported</p>
                </>
              )}
            </div>

            {/* Demo button */}
            <button
              onClick={() => {
                setPreview('/demo-leaf.jpg')
                setPhase('loading')
                setLoadProgress(0)
                const steps = [20, 45, 70, 90, 100]
                steps.forEach((p, i) => {
                  setTimeout(() => {
                    setLoadProgress(p)
                    if (i === steps.length - 1) setTimeout(() => {
                      setDiagnosis(mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)])
                      setPhase('result')
                    }, 400)
                  }, i * 600)
                })
              }}
              className="w-full mt-3 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}>
              Try with Demo Image
            </button>
          </motion.div>

          {/* Result panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="card-glass rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center min-h-80">
                  <div className="text-5xl mb-4">🔬</div>
                  <p className="font-semibold mb-2" style={{ color: '#e8f5e9' }}>AI Ready to Diagnose</p>
                  <p className="text-sm" style={{ color: 'rgba(232,245,233,0.45)' }}>
                    Upload a clear photo of a leaf, stem, or fruit to get instant analysis.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3 w-full">
                    {['Disease', 'Pests', 'Nutrients'].map(t => (
                      <div key={t} className="rounded-xl py-2 text-xs font-medium text-center"
                        style={{ background: 'rgba(34,197,94,0.07)', color: 'rgba(232,245,233,0.5)' }}>
                        {t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'loading' && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="card-glass rounded-2xl p-6 h-full flex flex-col items-center justify-center min-h-80">
                  <div className="relative w-20 h-20 mb-6">
                    <svg className="spin-slow w-20 h-20" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="4" />
                      <circle cx="40" cy="40" r="36" fill="none" stroke="#22c55e" strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 36 * loadProgress / 100} ${2 * Math.PI * 36}`}
                        strokeLinecap="round" transform="rotate(-90 40 40)" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: '#22c55e' }}>
                      {loadProgress}%
                    </div>
                  </div>
                  <p className="font-semibold mb-2" style={{ color: '#e8f5e9' }}>Analyzing plant...</p>
                  <div className="w-full space-y-2 mt-4">
                    {['Image preprocessing', 'Feature extraction', 'AI classification', 'Report generation'].map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs"
                          style={{ background: loadProgress > i * 25 + 20 ? '#22c55e' : 'rgba(34,197,94,0.15)' }}>
                          {loadProgress > i * 25 + 20 ? '✓' : ''}
                        </div>
                        <span className="text-xs" style={{ color: loadProgress > i * 25 + 20 ? '#e8f5e9' : 'rgba(232,245,233,0.35)' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'result' && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="card-glass rounded-2xl p-6 min-h-80" style={{ borderColor: `${diagnosis.color}30` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{diagnosis.icon}</div>
                      <h3 className="text-xl font-black" style={{ color: '#e8f5e9' }}>{diagnosis.disease}</h3>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1"
                        style={{ background: `${diagnosis.color}20`, color: diagnosis.color }}>
                        {diagnosis.severity} severity
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black" style={{ color: diagnosis.color }}>{diagnosis.confidence}%</div>
                      <div className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>confidence</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'rgba(232,245,233,0.4)' }}>Symptoms detected</p>
                      {diagnosis.symptoms.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm mb-1">
                          <span style={{ color: diagnosis.color }}>•</span>
                          <span style={{ color: 'rgba(232,245,233,0.7)' }}>{s}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'rgba(232,245,233,0.4)' }}>Recommended treatment</p>
                      {diagnosis.treatment.map((t, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm mb-1">
                          <span style={{ color: '#22c55e' }}>→</span>
                          <span style={{ color: 'rgba(232,245,233,0.7)' }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => { setPhase('idle'); setPreview(null) }}
                    className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                    style={{ background: `${diagnosis.color}15`, border: `1px solid ${diagnosis.color}30`, color: diagnosis.color }}>
                    Scan Another Plant
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Supported crops */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
          <p className="text-sm text-center mb-4" style={{ color: 'rgba(232,245,233,0.4)' }}>Supports 200+ crop diseases across</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['🍅 Tomato', '🌽 Corn', '🥔 Potato', '🍇 Grape', '🌾 Wheat', '🥒 Cucumber', '🧅 Onion', '🫑 Pepper'].map(c => (
              <span key={c} className="px-3 py-1.5 rounded-full text-sm"
                style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)', color: 'rgba(232,245,233,0.6)' }}>
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
