'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'uz' | 'en'
interface Ctx { lang: Lang; toggle: () => void }
const LangContext = createContext<Ctx>({ lang: 'uz', toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('uz')
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === 'uz' ? 'en' : 'uz') }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)

export const t = (uz: string, en: string, lang: Lang) => lang === 'uz' ? uz : en
