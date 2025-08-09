"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Linkedin, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "+33 1 23 45 67 89",
      action: "tel:+33123456789",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@eventpro.fr",
      action: "mailto:contact@eventpro.fr",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "123 Avenue des Champs-Élysées\n75008 Paris, France",
      action: "https://maps.google.com",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven: 9h-19h\nSam: 10h-16h\nDim: Sur rendez-vous",
      action: null,
      color: "from-orange-500 to-red-500",
    },
  ]

  const socialLinks = [
    { icon: Instagram, url: "https://instagram.com/eventpro", label: "Instagram" },
    { icon: Facebook, url: "https://facebook.com/eventpro", label: "Facebook" },
    { icon: Youtube, url: "https://youtube.com/eventpro", label: "YouTube" },
    { icon: Linkedin, url: "https://linkedin.com/company/eventpro", label: "LinkedIn" },
  ]

  return (
    <section id="contact" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contactez-Nous
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Parlons de Votre Projet
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Notre équipe d'experts est à votre disposition pour discuter de vos besoins et créer ensemble l'événement de
            vos rêves.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white mb-8"
            >
              Informations de Contact
            </motion.h3>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">{info.title}</h4>
                        <p className="text-white/80 whitespace-pre-line">{info.content}</p>
                        {info.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300 p-0 h-auto mt-2"
                            onClick={() => window.open(info.action, "_blank")}
                          >
                            Contacter →
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-6"
            >
              <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map & Quick Actions */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white mb-8"
            >
              Localisation & Actions Rapides
            </motion.h3>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=256&width=400"
                      alt="Localisation EventPro Paris"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="font-medium">123 Avenue des Champs-Élysées, Paris</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl"
                onClick={() => document.getElementById("devis")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Demande de devis express
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl bg-transparent"
                onClick={() => window.open("tel:+33123456789")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Appel direct
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl bg-transparent"
                onClick={() => window.open("mailto:contact@eventpro.fr")}
              >
                <Mail className="w-5 h-5 mr-2" />
                Envoyer un email
              </Button>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-md border-red-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Urgence Événement</h4>
                      <p className="text-white/80 text-sm">24h/24 - 7j/7</p>
                      <a href="tel:+33123456789" className="text-red-400 font-medium">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
