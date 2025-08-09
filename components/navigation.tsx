"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"

interface NavigationProps {
  currentLanguage: string
  setCurrentLanguage: (lang: string) => void
}

export default function Navigation({ currentLanguage, setCurrentLanguage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = {
    fr: [
      { href: "#accueil", label: "Accueil" },
      { href: "#services", label: "Services" },
      { href: "#realisations", label: "Réalisations", bold: true },
      { href: "#devis", label: "Devis Express" },
      { href: "#contact", label: "Contact" },
    ],
    en: [
      { href: "#home", label: "Home" },
      { href: "#services", label: "Services" },
      { href: "#portfolio", label: "Portfolio", bold: true },
      { href: "#quote", label: "Quick Quote" },
      { href: "#contact", label: "Contact" },
    ],
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <img
              src="/images/angeli-visions-logo-white.png"
              alt="Angeli Visions"
              className="h-20 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems[currentLanguage as keyof typeof menuItems].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`text-slate-300 hover:text-white transition-colors relative group ${item.bold ? "font-bold" : ""}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentLanguage(currentLanguage === "fr" ? "en" : "fr")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              <Globe className="w-4 h-4 mr-1" />
              {currentLanguage.toUpperCase()}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-slate-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/90 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            {menuItems[currentLanguage as keyof typeof menuItems].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block py-2 text-slate-300 hover:text-white transition-colors ${item.bold ? "font-bold" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
