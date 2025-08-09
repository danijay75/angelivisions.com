"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Calendar, Mic, Zap, Sparkles, Users, Building, Heart, Star, Camera } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: Music,
      title: "Production Musicale",
      description: "Compositions originales, jingles personnalisés, musiques d'ambiance pour vos événements",
      features: [
        "Jingles d'entreprise",
        "Musiques d'ambiance",
        "Compositions originales",
        "Arrangements personnalisés",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "Organisation d'Événements",
      description: "Gestion complète de vos événements : logistique, venue, traiteur, décoration et animation",
      features: ["Mariages clé-en-main", "Événements d'entreprise", "Soirées privées", "Conventions & séminaires"],
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Mic,
      title: "Booking DJ & Animation",
      description:
        "DJs professionnels, animation live audiovisuel, VJing et performances audiovisuelles personnalisées",
      features: ["DJ sets professionnels", "VJ live performances", "Animation interactive", "Streaming en direct"],
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Prestations Techniques",
      description: "Sonorisation, éclairage scénique, vidéo mapping et conception technique d'événements",
      features: ["Sonorisation événementielle", "Éclairage scénique", "VJ / Vidéo mapping", "Régie technique"],
      color: "from-emerald-500 to-blue-500",
    },
    {
      icon: Camera,
      title: "Captations & Médias",
      description: "Captations multicaméras, émissions TV et création de podcasts pour vos événements",
      features: ["Captations multicaméras", "Émissions TV", "Création de Podcasts", "Post-production vidéo"],
      color: "from-pink-500 to-rose-500",
    },
  ]

  const clientTypes = [
    { icon: Building, title: "Entreprises", desc: "Séminaires, conventions, team building" },
    { icon: Heart, title: "Mariages", desc: "Cérémonies et réceptions sur-mesure" },
    { icon: Users, title: "Événements Privés", desc: "Anniversaires, bar-mitzvah, soirées" },
    { icon: Star, title: "Spectacles", desc: "Concerts, festivals, performances" },
  ]

  return (
    <section id="services" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nos Services
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
              Expertise 360°
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            De la création musicale à l'organisation complète, nous maîtrisons tous les aspects de l'événementiel pour
            créer des expériences uniques et mémorables.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="bg-slate-800/30 backdrop-blur-md border-slate-700/50 h-full hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300">
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-slate-400">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Client Types */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Nos Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {clientTypes.map((client, index) => (
              <motion.div
                key={client.title}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                <client.icon className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                <h4 className="text-white font-semibold mb-2">{client.title}</h4>
                <p className="text-slate-400 text-sm">{client.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full shadow-lg shadow-blue-500/25"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Demander un devis personnalisé
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
