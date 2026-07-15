import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./_components/Navbar"
import Footer from "./_components/Footer"
import DemoGuide from "./_components/DemoGuide"
import { LangProvider } from "./_context/LangContext"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgriChain AI — Aqlli Qishloq Xo'jaligi",
  description: "Sun'iy intellekt va blokcheyn asosidagi aqlli qishloq xo'jaligi ekotizimi",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: '#040e07' }}>
        <LangProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <DemoGuide />
        </LangProvider>
      </body>
    </html>
  )
}
