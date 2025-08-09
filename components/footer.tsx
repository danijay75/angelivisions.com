"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Instagram, Facebook, ArrowUp, Settings } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate newsletter subscription
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

  const footerLinks = {
    services: [
      { label: "Booking DJ", href: "#services" },
      { label: "Production Musicale", href: "#services" },
      { label: "Organisation Événements", href: "#services" },
      { label: "Prestations Techniques", href: "#services" },
      { label: "VJ / Vidéo Mapping", href: "#services" },
      { label: "Captations & Médias", href: "#services" },
    ],
    company: [
      { label: "À propos", href: "#" },
      { label: "Notre équipe", href: "#" },
      { label: "Nos valeurs", href: "#" },
      { label: "Carrières", href: "#" },
      { label: "Partenaires", href: "#" },
    ],
    support: [
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "#" },
      { label: "Devis", href: "#devis" },
      { label: "Support technique", href: "#" },
      { label: "Conditions générales", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com/angelivisions", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com/angelivisions", label: "Instagram" },
    {
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.623-.312-1.544c0-1.448.839-2.529 1.884-2.529.888 0 1.317.667 1.317 1.466 0 .893-.568 2.229-.861 3.467-.245 1.040.522 1.887 1.549 1.887 1.857 0 3.285-1.958 3.285-4.789 0-2.503-1.799-4.253-4.370-4.253-2.977 0-4.727 2.234-4.727 4.546 0 .901.347 1.869.780 2.393.085.104.098.195.072.301-.079.329-.255 1.045-.290 1.193-.047.189-.153.229-.353.138-1.316-.612-2.140-2.536-2.140-4.078 0-3.298 2.397-6.325 6.913-6.325 3.628 0 6.449 2.586 6.449 6.041 0 3.604-2.273 6.505-5.42 6.505-1.058 0-2.055-.549-2.394-1.275l-.651 2.479c-.236.915-.872 2.062-1.297 2.759.977.302 2.010.461 3.070.461 6.624 0 11.990-5.367 11.990-11.987C24.007 5.367 18.641.001 12.017.001z" />
        </svg>
      ),
      url: "https://tiktok.com/@angelivisions",
      label: "TikTok",
    },
    {
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "https://x.com/angelivisions",
      label: "X (Twitter)",
    },
  ]

  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="/images/angeli-visions-logo-white.png"
                  alt="Angeli Visions"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-4">Angeli Visions</h3>
              <p className="text-slate-300 mb-4">Organisateur d'événements culturels et producteur de musique</p>

              {/* Legal Information */}
              <div className="space-y-2 text-sm text-slate-400">
                <p>Angeli Visions est une SAS immatriculée au RCS de Versailles sous le n° 898018221.</p>
                <p>Licence entrepreneur de spectacles n° PLATESV-D-2022-000968</p>
                <p className="mt-4">
                  La société est adhérente de l'Économie Sociale et Solidaire (ESS). Nous luttons contre toute forme de
                  discrimination et violence sexiste.
                  <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">
                    Consultez le kit ici.
                  </a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">CONTACTS</h3>
            <div className="space-y-4">
              <div className="flex items-center text-slate-300">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <a href="tel:+33663796742" className="hover:text-white transition-colors">
                  +33 6 63 79 67 42
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <a href="mailto:contact@angelivisions.com" className="hover:text-white transition-colors">
                  contact@angelivisions.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">ALORS QUOI DE NEUF ?</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Entrez votre e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribed}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg"
              >
                {isSubscribed ? "Inscrit !" : "S'inscrire"}
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-8">
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-800/50 backdrop-blur-md rounded-lg flex items-center justify-center border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-slate-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-slate-700/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025. All rights reserved. |
              <a href="#" className="hover:text-white ml-1">
                Politique de confidentialité
              </a>{" "}
              |
              <a href="#" className="hover:text-white ml-1">
                Mentions légales
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/admin"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center text-sm"
              >
                <Settings className="w-4 h-4 mr-1" />
                Admin
              </a>
              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Retour en haut
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="/mentions-legales" className="hover:text-white">Mentions légales</a>
          <a href="/politique-de-confidentialite" className="hover:text-white">Politique de confidentialité</a>
          <a href="/politique-cookies" className="hover:text-white">Politique cookies</a>
</nav>
</footer>
  )
}
