'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'

const features = [
  { icon: '🌿', title: 'AI Plant Doctor', desc: 'Photo-based crop disease detection in seconds', href: '/plant-doctor', color: '#22c55e' },
  { icon: '💧', title: 'Smart Irrigation', desc: 'Weather-aware watering that saves 40% water', href: '/irrigation', color: '#38bdf8' },
  { icon: '📈', title: 'Market Analysis', desc: 'Real-time prices & optimal sell-timing AI', href: '/market', color: '#eab308' },
  { icon: '🔗', title: 'Blockchain Trace', desc: 'QR-code product passport, tamper-proof', href: '/blockchain', color: '#a78bfa' },
  { icon: '🎯', title: 'Yield Forecast', desc: 'AI predicts harvest volume, date & risks', href: '/dashboard', color: '#f97316' },
  { icon: '📊', title: 'Farmer Dashboard', desc: 'Digital history for credit & insurance access', href: '/dashboard', color: '#ec4899' },
]

const stats = [
  { value: '40%', label: 'Water Saved', icon: '💧' },
  { value: '2.3x', label: 'Yield Increase', icon: '🌾' },
  { value: '5sec', label: 'Disease Detection', icon: '🔬' },
  { value: '100%', label: 'Trace Accuracy', icon: '✅' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
}

export default function LandingPage() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-4 text-center overflow-hidden">
        {/* Radial glow background */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: '#22c55e' }} />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-15" style={{ background: '#eab308' }} />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
          AI + Blockchain Agriculture Platform
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 max-w-5xl">
          <span className="gradient-text">AgriChain</span>
          <br />
          <span style={{ color: '#e8f5e9' }}>AI</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ color: 'rgba(232,245,233,0.65)' }}>
          Empowering Uzbekistan farmers with AI-driven insights, blockchain traceability, and smart automation — from Qashqadaryo to the global market.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/dashboard"
            className="px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#000', boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}>
            Launch Dashboard
          </Link>
          <Link href="/plant-doctor"
            className="px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid rgba(34,197,94,0.35)', color: '#22c55e', background: 'rgba(34,197,94,0.05)' }}>
            Try Plant Doctor
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {stats.map((s, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" animate="show"
              className="card-glass rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black" style={{ color: '#22c55e' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(232,245,233,0.5)' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ color: '#e8f5e9' }}>Everything a farmer</span><br />
            <span className="gradient-text">needs in one platform</span>
          </h2>
          <p style={{ color: 'rgba(232,245,233,0.5)' }} className="text-lg max-w-xl mx-auto">
            Six powerful modules working together to transform how Uzbekistan farms operate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Link href={f.href} className="block group">
                <div className="card-glass rounded-2xl p-6 h-full cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors" style={{ color: '#e8f5e9' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,245,233,0.5)' }}>{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: f.color }}>
                    Explore <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4" style={{ background: 'rgba(34,197,94,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl font-black text-center mb-16">
            <span className="gradient-text">How it works</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Register Farm', desc: 'Create your farm profile with location, crop type, and field size.' },
              { step: '02', title: 'AI Analysis', desc: 'Upload plant photos or let AI monitor via weather data continuously.' },
              { step: '03', title: 'Get Insights', desc: 'Receive irrigation advice, disease alerts, and market timing tips.' },
              { step: '04', title: 'Sell & Prove', desc: 'Generate blockchain QR code proving product origin and quality.' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center font-black text-sm"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
                  {item.step}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#e8f5e9' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(232,245,233,0.5)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto card-glass rounded-3xl p-12 glow-green">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Ready to grow smarter?</span>
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(232,245,233,0.6)' }}>
            Join the agricultural revolution in Uzbekistan. No hardware needed — start with your smartphone.
          </p>
          <Link href="/dashboard"
            className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#000', boxShadow: '0 0 40px rgba(34,197,94,0.4)' }}>
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center" style={{ borderColor: 'rgba(34,197,94,0.1)', color: 'rgba(232,245,233,0.35)' }}>
        <p className="text-sm">© 2026 AgriChain AI — Transforming Uzbekistan Agriculture with AI & Blockchain</p>
      </footer>
    </div>
  )
}
