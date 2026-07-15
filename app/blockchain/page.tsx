'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, Copy, Check, ShieldCheck, Sprout, FlaskConical, Wheat, Snowflake, Truck, Lock } from 'lucide-react'

const harvests = [
  {
    id: 'AGC-2026-07-4821', product: 'Organic Tomato', icon: '🍅',
    farmer: 'Alisher Karimov', farm: 'Green Valley Farm', region: 'Shahrisabz, Qashqadaryo',
    planted: '2026-04-12', harvested: '2026-07-10', quantity: '4.2 tonnes',
    lab: 'No pesticide residue · Grade A', labDate: '2026-07-11',
    storage: 'Cold chain · 4°C · 72h', transport: 'Refrigerated · Tashkent hub',
    organic: true, txHash: '0x4a8f3c...b291', blockchain: 'Polygon', block: 52841923,
  },
  {
    id: 'AGC-2026-06-3319', product: 'Premium Cotton', icon: '🌿',
    farmer: 'Bobur Yusupov', farm: 'Sunrise Agro', region: 'Karshi, Qashqadaryo',
    planted: '2026-03-20', harvested: '2026-06-28', quantity: '8.5 tonnes',
    lab: 'Fiber length 32mm · Grade A', labDate: '2026-06-29',
    storage: 'Dry warehouse · 45% RH', transport: 'Standard freight · Bukhara mill',
    organic: false, txHash: '0x7c2ef1...f441', blockchain: 'Polygon', block: 51932847,
  },
]

function QRCode({ seed }: { seed: string }) {
  const n = seed.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xFFFF, 0)
  const S = 21, sz = 140, cs = sz / S
  const cells = Array.from({ length: S }, (_, r) =>
    Array.from({ length: S }, (_, c) => {
      if ((r < 7 && c < 7) || (r < 7 && c >= S - 7) || (r >= S - 7 && c < 7)) return true
      if ((r >= 2 && r <= 4 && c >= 2 && c <= 4) || (r >= 2 && r <= 4 && c >= S - 5 && c <= S - 3) || (r >= S - 5 && r <= S - 3 && c >= 2 && c <= 4)) return true
      return ((n * (r * S + c + 1)) & 3) > 1
    })
  )
  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} className="rounded-xl overflow-hidden">
      <rect width={sz} height={sz} fill="white" />
      {cells.flatMap((row, r) => row.map((on, c) => on ? (
        <rect key={`${r}-${c}`} x={c * cs} y={r * cs} width={cs} height={cs} fill="#030d06" />
      ) : null))}
    </svg>
  )
}

const timeline = [
  { icon: Sprout, label: 'Planted', color: '#22c55e', field: 'planted' },
  { icon: FlaskConical, label: 'Lab Certified', color: '#38bdf8', field: 'labDate' },
  { icon: Wheat, label: 'Harvested', color: '#f0b429', field: 'harvested' },
  { icon: Snowflake, label: 'Cold Storage', color: '#a78bfa', field: 'storage' },
  { icon: Truck, label: 'Transported', color: '#fb923c', field: 'transport' },
  { icon: Lock, label: 'Blockchain Sealed', color: '#4ade80', field: 'txHash' },
]

export default function BlockchainPage() {
  const [sel, setSel] = useState(harvests[0])
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(sel.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen" style={{ background: '#05100a' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#07050f,#100820)', borderBottom: '1px solid rgba(34,197,94,0.12)' }} className="relative h-52 flex items-end">
        <div className="px-5 pb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)' }}>
              <Link2 size={20} style={{ color: '#a78bfa' }} />
            </div>
            <span className="tag" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.28)', color: '#a78bfa' }}>
              Blockchain Traceability
            </span>
          </div>
          <h1 className="heading-lg">
            <span style={{ color: '#f0faf2' }}>Every harvest,</span>
            <span className="text-gradient"> provably authentic</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(240,250,242,0.35)' }}>
              Harvest Records
            </p>
            {harvests.map(h => (
              <motion.button key={h.id} whileHover={{ scale: 1.01 }} onClick={() => setSel(h)}
                className="w-full text-left glass rounded-xl p-4 transition-all"
                style={{ borderColor: sel.id === h.id ? 'rgba(167,139,250,0.4)' : undefined, borderWidth: sel.id === h.id ? 1 : undefined }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{h.icon}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#f0faf2' }}>{h.product}</p>
                    <p className="text-xs" style={{ color: 'rgba(240,250,242,0.4)' }}>{h.farmer}</p>
                  </div>
                </div>
                <code className="text-xs block mb-2 font-mono" style={{ color: 'rgba(167,139,250,0.7)' }}>{h.id}</code>
                <div className="flex items-center gap-2">
                  {h.organic && (
                    <span className="tag" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80', fontSize: '0.65rem', padding: '2px 8px' }}>
                      <ShieldCheck size={10} /> Organic
                    </span>
                  )}
                  <span className="text-xs" style={{ color: 'rgba(240,250,242,0.3)' }}>{h.quantity}</span>
                </div>
              </motion.button>
            ))}
            <button className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
              style={{ border: '1px dashed rgba(167,139,250,0.25)', color: 'rgba(167,139,250,0.55)' }}>
              + Generate New Passport
            </button>
          </div>

          {/* Passport */}
          <AnimatePresence mode="wait">
            <motion.div key={sel.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 glass rounded-2xl overflow-hidden border-gradient"
              style={{ borderColor: 'rgba(167,139,250,0.15)' }}>
              {/* Header */}
              <div className="p-6 flex flex-col sm:flex-row items-start gap-6"
                style={{ background: 'linear-gradient(135deg,rgba(167,139,250,0.07),rgba(34,197,94,0.04))' }}>
                <div className="flex-shrink-0">
                  <QRCode seed={sel.id} />
                  <p className="text-[10px] text-center mt-2 font-mono" style={{ color: 'rgba(240,250,242,0.35)' }}>Scan to verify</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{sel.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-2xl font-black" style={{ color: '#f0faf2' }}>{sel.product}</h2>
                        {sel.organic && (
                          <span className="tag" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80', fontSize: '0.65rem' }}>
                            <ShieldCheck size={10} /> ORGANIC
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-sm font-mono" style={{ color: '#a78bfa' }}>{sel.id}</code>
                        <button onClick={copy}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(167,139,250,0.1)' }}>
                          {copied ? <Check size={13} style={{ color: '#4ade80' }} /> : <Copy size={13} style={{ color: '#a78bfa' }} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { l: 'Farmer', v: sel.farmer },
                      { l: 'Farm', v: sel.farm },
                      { l: 'Region', v: sel.region },
                      { l: 'Quantity', v: sel.quantity },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <p className="text-xs mb-0.5" style={{ color: 'rgba(240,250,242,0.35)' }}>{l}</p>
                        <p className="text-sm font-semibold" style={{ color: '#f0faf2' }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(240,250,242,0.35)' }}>
                  Supply Chain
                </p>
                <div className="space-y-0">
                  {timeline.map((step, i) => {
                    const Icon = step.icon
                    const vals: Record<string, string> = {
                      planted: sel.planted, labDate: sel.labDate, harvested: sel.harvested,
                      storage: sel.storage, transport: sel.transport, txHash: `${sel.txHash} · Block #${sel.block}`,
                    }
                    return (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${step.color}12`, border: `1px solid ${step.color}28` }}>
                            <Icon size={16} style={{ color: step.color }} />
                          </div>
                          {i < timeline.length - 1 && (
                            <div className="w-px my-1.5 flex-1" style={{ background: 'rgba(255,255,255,0.05)', minHeight: 20 }} />
                          )}
                        </div>
                        <div className="pb-4 flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-0.5" style={{ color: '#f0faf2' }}>{step.label}</p>
                          <p className="text-xs leading-relaxed truncate" style={{ color: 'rgba(240,250,242,0.45)' }}>
                            {vals[step.field]}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Proof */}
                <div className="mt-4 p-4 rounded-xl flex items-start gap-3"
                  style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.14)' }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 pulse-dot" style={{ background: '#a78bfa' }} />
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: '#a78bfa' }}>
                      Immutably stored on {sel.blockchain} — cannot be altered
                    </p>
                    <code className="text-xs break-all" style={{ color: 'rgba(167,139,250,0.5)' }}>
                      {sel.txHash} · Block #{sel.block.toLocaleString()} · 2,841 confirmations
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
