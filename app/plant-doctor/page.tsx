'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ScanLine, CheckCircle2, AlertTriangle, XCircle, Leaf, Bug, Zap, RefreshCw } from 'lucide-react'
import { useLang, t } from '../_context/LangContext'

const diagnoses = [
  { disease: "Unli shudring (Powdery Mildew)", en: 'Powdery Mildew', sev: "Oʻrtacha", sev_en: 'Moderate', sevColor: '#f0b429', conf: 94, icon: AlertTriangle,
    symptoms: ["Barg yuzasida oq kukun", "Pastki barglar sargʻishi", "Oʻsishning sekinlashishi"],
    symp_en: ['White powdery coating on leaves', 'Yellowing of lower foliage', 'Stunted growth'],
    treat: ["Oltingugurt fungitsidini qoʻlang", "Havo almashinuvini yaxshilang", "Zararlangan barglarni olib tashlang"],
    treat_en: ['Apply sulfur-based fungicide', 'Improve airflow', 'Remove infected leaves'] },
  { disease: "Barg buralish virusi", en: 'Tomato Leaf Curl Virus', sev: "Kritik", sev_en: 'Critical', sevColor: '#f87171', conf: 89, icon: XCircle,
    symptoms: ["Barglar yuqoriga buraladi", "Sariq chegaralar paydo boʻladi", "Oʻsish toʻxtaydi"],
    symp_en: ['Leaves curl upward', 'Yellow margins appear', 'Growth stops'],
    treat: ["Kasallangan oʻsimliklarni ajrating", "Oq pashshalarni yoʻq qiling", "Sistemik insektitsid qoʻlang"],
    treat_en: ['Isolate infected plants', 'Control whiteflies', 'Apply systemic insecticide'] },
  { disease: "Sogʻlom Oʻsimlik", en: 'Healthy Plant', sev: "Yoʻq", sev_en: 'None', sevColor: '#22c55e', conf: 97, icon: CheckCircle2,
    symptoms: ["Kasallik belgilari yoʻq", "Barg rangi normal", "Oʻsish meʻyorida"],
    symp_en: ['No disease signs', 'Normal leaf color', 'Normal growth'],
    treat: ["Joriy parvarish rejimini davom ettiring", "Sugʻorishni ushlab turing", "Haftalik kuzatuvni oʻtkazing"],
    treat_en: ['Continue current care', 'Maintain irrigation', 'Monitor weekly'] },
]

const steps_uz = ['Rasm tayyorlanmoqda...', 'Xususiyatlar ajratilmoqda...', 'AI modeli ishlamoqda...', '50k+ namuna bilan solishtirilmoqda...', 'Tashxis yaratilmoqda...']
const steps_en = ['Preprocessing image...', 'Extracting features...', 'Running AI model...', 'Comparing to 50k+ samples...', 'Generating diagnosis...']
const crops_uz = ["🍅 Pomidor", "🌽 Makkajo'xori", "🥔 Kartoshka", "🍇 Uzum", "🌾 Bug'doy", "🥒 Bodring", "🧅 Piyoz", "🫑 Qalampir"]

export default function PlantDoctor() {
  const { lang } = useLang()
  const [phase, setPhase] = useState<'idle'|'loading'|'result'>('idle')
  const [diag, setDiag] = useState(diagnoses[0])
  const [preview, setPreview] = useState<string|null>(null)
  const [prog, setProg] = useState(0)
  const [step, setStep] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const steps = lang === 'uz' ? steps_uz : steps_en

  function run(url?: string) {
    if (url) setPreview(url)
    setPhase('loading'); setProg(0)
    steps.forEach((s, i) => {
      setTimeout(() => {
        setProg(Math.round((i+1)/steps.length*100)); setStep(s)
        if (i === steps.length-1) setTimeout(() => { setDiag(diagnoses[Math.floor(Math.random()*diagnoses.length)]); setPhase('result') }, 500)
      }, i * 700)
    })
  }

  const Icon = diag.icon

  return (
    <div className="min-h-screen bg-grid" style={{ background: '#040e07' }}>
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="mb-10">
          <div className="section-accent" />
          <span className="tag tag-g mb-3 inline-flex"><Leaf size={13} />{t("AI O'simlik Shifokori", "AI Plant Doctor", lang)}</span>
          <h1 className="h1 mb-3">
            <span style={{ color: '#e8f5ea' }}>{t("Har qanday ekinni ", "Diagnose any crop ", lang)}</span>
            <span className="grad">{t("soniyalarda tashxislang", "in seconds", lang)}</span>
          </h1>
          <p className="text-lg" style={{ color: 'rgba(232,245,234,0.55)' }}>
            {t("O'simlik suratini yuboring — AI kasallik, zararkunanda va ozuqa yetishmovchiligini aniqlaydi.", "Upload a plant photo — AI identifies diseases, pests, and nutrient deficiencies.", lang)}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="card p-8 flex flex-col items-center justify-center min-h-72 cursor-pointer group relative"
              style={{ borderStyle: phase === 'idle' ? 'dashed' : 'solid', borderRadius: 20 }}
              onClick={() => phase === 'idle' && fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) run(URL.createObjectURL(f)) }}>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) run(URL.createObjectURL(f)) }} />
              {preview
                ? <div className="w-full"><img src={preview} alt="" className="w-full h-56 object-cover rounded-xl mb-4" />
                    {phase==='idle' && <button onClick={e=>{e.stopPropagation();setPhase('idle');setPreview(null)}} className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2" style={{border:'1px solid rgba(34,197,94,0.2)',color:'rgba(232,245,234,0.5)'}}><RefreshCw size={14}/>{t("Boshqa surat yuklash","Upload different photo",lang)}</button>}</div>
                : <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.22)'}}>
                      <Upload size={28} style={{color:'#4ade80'}} />
                    </div>
                    <p className="font-semibold text-lg mb-1.5" style={{color:'#e8f5ea'}}>{t("Surat tashlang yoki tanlang","Drop photo or click to browse",lang)}</p>
                    <p className="text-sm" style={{color:'rgba(232,245,234,0.4)'}}>JPG, PNG · Max 10MB</p>
                  </div>}
            </div>
            <button onClick={() => run()} className="w-full mt-3 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 card" style={{color:'#4ade80'}}>
              <ScanLine size={16}/> {t("Demo namuna bilan sinash","Try with demo sample",lang)}
            </button>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:'rgba(232,245,234,0.3)'}}>{t("Qo'llab-quvvatlanadigan ekinlar","Supported crops",lang)}</p>
              <div className="flex flex-wrap gap-2">{crops_uz.map(c=><span key={c} className="card px-3 py-1.5 text-xs" style={{color:'rgba(232,245,234,0.55)',borderRadius:99}}>{c}</span>)}</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase==='idle' && (
              <motion.div key="i" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="card p-8 flex flex-col items-center justify-center text-center min-h-72" style={{borderRadius:20}}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 fl" style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)'}}>
                  <Bug size={36} style={{color:'#4ade80'}} strokeWidth={1.4}/>
                </div>
                <p className="font-bold text-xl mb-2" style={{color:'#e8f5ea'}}>{t("AI Tashxisga Tayyor","AI Ready to Diagnose",lang)}</p>
                <p className="text-sm max-w-xs" style={{color:'rgba(232,245,234,0.45)'}}>{t("Aniq barg, poya yoki meva suratini yuklang.","Upload a clear leaf, stem, or fruit photo.",lang)}</p>
                <div className="grid grid-cols-3 gap-3 mt-8 w-full">
                  {([
                    [AlertTriangle,'#f0b429',t("Kasallik","Disease",lang)],
                    [Bug,'#f87171',t("Zararkunanda","Pests",lang)],
                    [Zap,'#4ade80',t("Ozuqa","Nutrients",lang)],
                  ] as [React.ElementType, string, string][]).map(([Ic,c,lb])=>(
                    <div key={String(lb)} className="card rounded-xl py-3 flex flex-col items-center gap-1.5"><Ic size={18} style={{color:String(c)}}/><span className="text-xs font-medium" style={{color:'rgba(232,245,234,0.5)'}}>{String(lb)}</span></div>
                  ))}
                </div>
              </motion.div>
            )}
            {phase==='loading' && (
              <motion.div key="l" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="card p-8 flex flex-col items-center justify-center min-h-72" style={{borderRadius:20}}>
                <div className="relative w-28 h-28 mb-6">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="6"/>
                    <circle cx="56" cy="56" r="50" fill="none" stroke="url(#pg)" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${2*Math.PI*50*prog/100} ${2*Math.PI*50}`}/>
                    <defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#4ade80"/></linearGradient></defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-black" style={{color:'#4ade80'}}>{prog}%</span></div>
                </div>
                <p className="font-semibold text-lg mb-1" style={{color:'#e8f5ea'}}>{t("Tahlil qilinmoqda...","Analyzing...",lang)}</p>
                <p className="text-sm mb-6" style={{color:'rgba(232,245,234,0.4)'}}>{step}</p>
                <div className="w-full space-y-2.5">
                  {steps.map((s,i)=>{ const done=prog>=(i+1)/steps.length*100; return (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{background:done?'rgba(34,197,94,0.18)':'rgba(255,255,255,0.04)',border:`1px solid ${done?'rgba(34,197,94,0.4)':'rgba(255,255,255,0.08)'}`}}>
                        {done && <CheckCircle2 size={11} style={{color:'#4ade80'}}/>}
                      </div>
                      <span style={{color:done?'rgba(232,245,234,0.7)':'rgba(232,245,234,0.3)'}}>{s}</span>
                    </div>
                  )})}
                </div>
              </motion.div>
            )}
            {phase==='result' && (
              <motion.div key="r" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} className="card p-7 min-h-72" style={{borderColor:`${diag.sevColor}30`,borderRadius:20}}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:`${diag.sevColor}14`,border:`1px solid ${diag.sevColor}28`}}>
                      <Icon size={24} style={{color:diag.sevColor}}/>
                    </div>
                    <div>
                      <h3 className="font-black text-xl" style={{color:'#e8f5ea'}}>{t(diag.disease,diag.en,lang)}</h3>
                      <span className="tag text-[0.65rem] py-0.5 px-2.5" style={{background:`${diag.sevColor}14`,border:`1px solid ${diag.sevColor}28`,color:diag.sevColor}}>{t(diag.sev,diag.sev_en,lang)}</span>
                    </div>
                  </div>
                  <div className="text-center"><div className="text-3xl font-black" style={{color:diag.sevColor}}>{diag.conf}%</div><div className="text-xs" style={{color:'rgba(232,245,234,0.35)'}}>{t("aniqlik","confidence",lang)}</div></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'rgba(232,245,234,0.3)'}}>{t("Belgilar","Symptoms",lang)}</p>
                    {(lang==='uz'?diag.symptoms:diag.symp_en).map((s,i)=><div key={i} className="flex gap-2 text-sm mb-1"><span style={{color:diag.sevColor}}>▸</span><span style={{color:'rgba(232,245,234,0.65)'}}>{s}</span></div>)}
                  </div>
                  <div className="div"/>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'rgba(232,245,234,0.3)'}}>{t("Davolash","Treatment",lang)}</p>
                    {(lang==='uz'?diag.treat:diag.treat_en).map((s,i)=><div key={i} className="flex gap-2 text-sm mb-1"><span style={{color:'#4ade80'}}>→</span><span style={{color:'rgba(232,245,234,0.65)'}}>{s}</span></div>)}
                  </div>
                </div>
                <button onClick={()=>{setPhase('idle');setPreview(null)}} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 card" style={{color:diag.sevColor,borderColor:`${diag.sevColor}30`}}>
                  <RefreshCw size={14}/>{t("Boshqa o'simlikni skanerlash","Scan another plant",lang)}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
