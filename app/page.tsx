"use client"

import { useState } from "react"
import { useScroll, useTransform } from "framer-motion"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import RealisationsSection from "@/components/realisations-section"
import TimelineSection from "@/components/timeline-section"
import DevisForm from "@/components/devis-form"
import ContactSection from "@/components/contact-section"
import AudioPlayer from "@/components/audio-player"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState("fr")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />

      <main>
        <HeroSection />
        <ServicesSection />
        <RealisationsSection />
        <TimelineSection />
        <DevisForm />
        <ContactSection />
      </main>

      <AudioPlayer />
      <Footer />
      <CookieConsent />
    </div>
  )
}
