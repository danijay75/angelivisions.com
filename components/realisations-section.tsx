"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Users, MapPin, Eye, ImageIcon } from "lucide-react"

export default function RealisationsSection() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")

  // Catégories dynamiques (en production, récupérer depuis une API)
  const [categories, setCategories] = useState([
    { id: "all", label: "Tous les projets", color: "from-gray-500 to-gray-600" },
    { id: "wedding", label: "Mariages", color: "from-pink-500 to-rose-500" },
    { id: "corporate", label: "Entreprise", color: "from-blue-500 to-cyan-500" },
    { id: "production", label: "Production Musicale", color: "from-purple-500 to-pink-500" },
    { id: "mapping", label: "Vidéo Mapping", color: "from-indigo-500 to-purple-500" },
    { id: "media", label: "Captations & Médias", color: "from-green-500 to-emerald-500" },
  ])

  const projects = [
    {
      id: 1,
      title: "Mariage Château de Versailles",
      slug: "mariage-chateau-versailles",
      category: "wedding",
      image: "/placeholder.svg?height=400&width=600&text=Mariage+Principal",
      galleryCount: 6,
      description: "Organisation complète d'un mariage de 200 invités avec production musicale sur-mesure",
      services: ["Organisation complète", "Production musicale", "Éclairage scénique", "DJ & Animation"],
      client: "Sophie & Alexandre",
      date: "Juin 2024",
      guests: "200 invités",
      location: "Château de Versailles",
    },
    {
      id: 2,
      title: "Convention Technologique",
      slug: "convention-technologique",
      category: "corporate",
      image: "/placeholder.svg?height=400&width=600&text=Convention+Principal",
      galleryCount: 5,
      description: "Événement d'entreprise avec vidéo mapping et streaming live pour 500 participants",
      services: ["Vidéo mapping", "Streaming live", "Sonorisation", "Régie technique"],
      client: "TechCorp International",
      date: "Mars 2024",
      guests: "500 participants",
      location: "Palais des Congrès",
    },
    {
      id: 3,
      title: "Album 'Midnight Vibes'",
      slug: "album-midnight-vibes",
      category: "production",
      image: "/placeholder.svg?height=400&width=600&text=Studio+Production",
      galleryCount: 4,
      description: "Production complète d'un album de musique électronique avec 12 compositions originales",
      services: ["Composition originale", "Arrangement", "Mixage", "Mastering"],
      client: "Artist Collective",
      date: "Février 2024",
      guests: "Album 12 titres",
      location: "Studio EventPro",
    },
    {
      id: 4,
      title: "Festival Summer Beats",
      slug: "festival-summer-beats",
      category: "mapping",
      image: "/placeholder.svg?height=400&width=600&text=Festival+Mapping",
      galleryCount: 8,
      description: "Spectacle de vidéo mapping sur façade historique avec synchronisation musicale",
      services: ["Vidéo mapping", "Conception visuelle", "Synchronisation audio", "Régie technique"],
      client: "Ville de Paris",
      date: "Juillet 2024",
      guests: "5000 spectateurs",
      location: "Place de la République",
    },
    {
      id: 5,
      title: "Soirée Gala Entreprise",
      slug: "soiree-gala-entreprise",
      category: "corporate",
      image: "/placeholder.svg?height=400&width=600&text=Gala+Entreprise",
      galleryCount: 7,
      description: "Gala annuel avec performances live et animation DJ pour célébrer les 50 ans de l'entreprise",
      services: ["Animation DJ", "Performances live", "Éclairage scénique", "Organisation"],
      client: "Groupe Industriel",
      date: "Octobre 2024",
      guests: "300 invités",
      location: "Grand Palais",
    },
    {
      id: 6,
      title: "Bar-Mitzvah Moderne",
      slug: "bar-mitzvah-moderne",
      category: "wedding",
      image: "/placeholder.svg?height=400&width=600&text=Bar+Mitzvah",
      galleryCount: 5,
      description: "Célébration moderne avec thème musical personnalisé et animations interactives",
      services: ["Thème personnalisé", "Animations interactives", "DJ jeune public", "Éclairage"],
      client: "Famille Cohen",
      date: "Septembre 2024",
      guests: "120 invités",
      location: "Salle Wagram",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const handleProjectClick = (slug: string) => {
    router.push(`/projet/${slug}`)
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.color || "from-gray-500 to-gray-600"
  }

  return (
    <section id="realisations" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nos Réalisations
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Portfolio Créatif
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Découvrez nos créations les plus marquantes : événements sur-mesure, productions musicales originales et
            spectacles audiovisuels innovants.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white hover:opacity-90`
                    : "border-white/30 text-white hover:bg-white/10 bg-transparent"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const categoryColor = getCategoryColor(project.category)
              const categoryLabel = categories.find((cat) => cat.id === project.category)?.label || "Sans catégorie"

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(project.slug)}
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Overlay avec actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          <Button size="sm" className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le projet
                          </Button>
                          {project.galleryCount > 1 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-md"
                            >
                              <ImageIcon className="w-4 h-4 mr-2" />
                              {project.galleryCount} photos
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <Badge className={`bg-gradient-to-r ${categoryColor} text-white`}>{categoryLabel}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                        <p className="text-white/80 text-sm">{project.client}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-white/80 mb-4 line-clamp-2">{project.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-white/70">
                          <Calendar className="w-4 h-4 mr-2" />
                          {project.date}
                        </div>
                        <div className="flex items-center text-white/70">
                          <Users className="w-4 h-4 mr-2" />
                          {project.guests}
                        </div>
                        <div className="flex items-center text-white/70 col-span-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {project.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.services.slice(0, 2).map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                            {service}
                          </Badge>
                        ))}
                        {project.services.length > 2 && (
                          <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs">
                            +{project.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Voir tous nos projets
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
