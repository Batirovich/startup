'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mockHarvests = [
  {
    id: 'AGC-2026-07-4821',
    product: 'Organic Tomato',
    icon: '🍅',
    farmer: 'Alisher Karimov',
    farm: 'Green Valley Farm',
    region: 'Shahrisabz, Qashqadaryo',
    planted: '2026-04-12',
    harvested: '2026-07-10',
    quantity: '4.2 tonnes',
    lab: 'Passed — No pesticide residue detected',
    labDate: '2026-07-11',
    storage: 'Cold storage, 4°C, 72h',
    transport: 'Refrigerated truck, Tashkent',
    organic: true,
    txHash: '0x4a8f...b291',
    blockchain: 'Polygon',
    block: 52841923,
  },
  {
    id: 'AGC-2026-06-3319',
    product: 'Premium Cotton',
    icon: '🌿',
    farmer: 'Bobur Yusupov',
    farm: 'Sunrise Agro',
    region: 'Karshi, Qashqadaryo',
    planted: '2026-03-20',
    harvested: '2026-06-28',
    quantity: '8.5 tonnes',
    lab: 'Grade A — Fiber length 32mm',
    labDate: '2026-06-29',
    storage: 'Dry warehouse, humidity 45%',
    transport: 'Standard truck, Bukhara mill',
    organic: false,
    txHash: '0x7c2e...f441',
    blockchain: 'Polygon',
    block: 51932847,
  },
]

function QRCode({ id }: { id: string }) {
  const size = 120
  const cells = 21
  const cellSize = size / cells

  const hash = id.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xFFFF, 0)
  const pattern = Array.from({ length: cells }, (_, row) =>
    Array.from({ length: cells }, (_, col) => {
      if (row < 7 && col < 7) return true
      if (row < 7 && col >= cells - 7) return true
      if (row >= cells - 7 && col < 7) return true
      if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true
      if (row >= 2 && row <= 4 && col >= cells - 5 && col <= cells - 3) return true
      if (row >= cells - 5 && row <= cells - 3 && col >= 2 && col <= 4) return true
      return ((hash * (row * cells + col + 1)) & 1) === 1
    })
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx={4} />
      {pattern.map((row, r) =>
        row.map((on, c) => on ? (
          <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize}
            width={cellSize} height={cellSize} fill="#030d06" />
        ) : null)
      )}
    </svg>
  )
}

export default function BlockchainPage() {
  const [selected, setSelected] = useState(mockHarvests[0])
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(selected.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen grid-bg px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', color: '#a78bfa' }}>
            🔗 Blockchain Traceability
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#e8f5e9' }}>
            Every harvest, <span className="gradient-text">provably authentic</span>
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(232,245,233,0.55)' }}>
            Immutable product passports on Polygon blockchain. Scan any QR to verify origin, lab tests, and full supply chain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Harvest list */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(232,245,233,0.4)' }}>
              Recent Harvests
            </p>
            {mockHarvests.map(h => (
              <motion.button key={h.id} whileHover={{ scale: 1.02 }} onClick={() => setSelected(h)}
                className="w-full text-left card-glass rounded-xl p-4 transition-all"
                style={{ borderColor: selected.id === h.id ? 'rgba(167,139,250,0.4)' : undefined }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{h.icon}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#e8f5e9' }}>{h.product}</p>
                    <p className="text-xs" style={{ color: 'rgba(232,245,233,0.45)' }}>{h.farmer}</p>
                    <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(167,139,250,0.7)' }}>{h.id}</p>
                  </div>
                </div>
                {h.organic && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>✓ Organic Certified</span>
                )}
              </motion.button>
            ))}

            {/* Generate new */}
            <button className="w-full py-3 rounded-xl text-sm font-semibold border-dashed transition-all hover:scale-[1.02]"
              style={{ border: '1px dashed rgba(167,139,250,0.3)', color: 'rgba(167,139,250,0.7)' }}>
              + Generate New Passport
            </button>
          </div>

          {/* Passport detail */}
          <AnimatePresence mode="wait">
            <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="md:col-span-2">
              <div className="card-glass rounded-2xl overflow-hidden" style={{ borderColor: 'rgba(167,139,250,0.2)' }}>
                {/* Header */}
                <div className="p-6 flex items-start gap-6"
                  style={{ background: 'linear-gradient(135deg,rgba(167,139,250,0.08),rgba(34,197,94,0.05))' }}>
                  <div className="flex-shrink-0">
                    <QRCode id={selected.id} />
                    <p className="text-xs text-center mt-2 font-mono" style={{ color: 'rgba(232,245,233,0.4)' }}>
                      Scan to verify
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{selected.icon}</span>
                      <h2 className="text-xl font-black" style={{ color: '#e8f5e9' }}>{selected.product}</h2>
                      {selected.organic && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>ORGANIC</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <code className="text-sm font-mono" style={{ color: '#a78bfa' }}>{selected.id}</code>
                      <button onClick={copy} className="text-xs px-2 py-0.5 rounded"
                        style={{ background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(167,139,250,0.1)', color: copied ? '#22c55e' : '#a78bfa' }}>
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Farmer', value: selected.farmer },
                        { label: 'Farm', value: selected.farm },
                        { label: 'Region', value: selected.region },
                        { label: 'Quantity', value: selected.quantity },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-xs" style={{ color: 'rgba(232,245,233,0.4)' }}>{item.label}</p>
                          <p className="text-sm font-medium" style={{ color: '#e8f5e9' }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(232,245,233,0.4)' }}>
                    Supply Chain Timeline
                  </p>
                  <div className="space-y-0">
                    {[
                      { icon: '🌱', title: 'Planted', date: selected.planted, desc: `${selected.farm} — ${selected.region}`, color: '#22c55e' },
                      { icon: '🔬', title: 'Lab Certified', date: selected.labDate, desc: selected.lab, color: '#38bdf8' },
                      { icon: '🌾', title: 'Harvested', date: selected.harvested, desc: `${selected.quantity} collected`, color: '#eab308' },
                      { icon: '❄️', title: 'Stored', date: selected.harvested, desc: selected.storage, color: '#a78bfa' },
                      { icon: '🚛', title: 'Transported', date: '2026-07-12', desc: selected.transport, color: '#f97316' },
                      { icon: '✅', title: 'Blockchain Sealed', date: '2026-07-12', desc: `${selected.blockchain} — Block #${selected.block}`, color: '#22c55e' },
                    ].map((step, i, arr) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                            style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                            {step.icon}
                          </div>
                          {i < arr.length - 1 && (
                            <div className="w-px flex-1 my-1" style={{ background: 'rgba(34,197,94,0.15)', minHeight: 20 }} />
                          )}
                        </div>
                        <div className="pb-4 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-semibold text-sm" style={{ color: '#e8f5e9' }}>{step.title}</p>
                            <p className="text-xs" style={{ color: 'rgba(232,245,233,0.35)' }}>{step.date}</p>
                          </div>
                          <p className="text-xs" style={{ color: 'rgba(232,245,233,0.5)' }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Blockchain proof */}
                  <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#a78bfa' }} />
                      <p className="text-xs font-semibold" style={{ color: '#a78bfa' }}>Immutably stored on {selected.blockchain}</p>
                    </div>
                    <code className="text-xs break-all" style={{ color: 'rgba(167,139,250,0.6)' }}>
                      Tx: {selected.txHash} · Block #{selected.block} · Confirmed
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
