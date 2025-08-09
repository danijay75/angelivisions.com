"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, MapPin, ExternalLink, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface Project {
  id: number
  title: string
  slug: string
  category: string
  image: string
  gallery: string[]
  description: string
  services: string[]
  client: string
  date: string
  guests: string
  location: string
  fullDescription?: string
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const categories = [
    { id: "wedding", label: "Mariages" },
    { id: "corporate", label: "Entreprise" },
    { id: "production", label: "Production Musicale" },
    { id: "mapping", label: "Vidéo Mapping" },
    { id: "media", label: "Captations & Médias" },
  ]

  // Données de démonstration (en production, récupérer depuis une API)
  const projects: Project[] = [
    {
      id: 1,
      title: "Mariage Château de Versailles",
      slug: "mariage-chateau-versailles",
      category: "wedding",
      image: "/placeholder.svg?height=400&width=600&text=Mariage+Principal",
      gallery: [
        "/placeholder.svg?height=600&width=800&text=Cérémonie+Extérieure",
        "/placeholder.svg?height=600&width=800&text=Décoration+Florale",
        "/placeholder.svg?height=600&width=800&text=Première+Danse",
        "/placeholder.svg?height=600&width=800&text=Animation+DJ",
        "/placeholder.svg?height=600&width=800&text=Éclairage+Scénique",
        "/placeholder.svg?height=600&width=800&text=Cocktail+Vin+Honneur",
      ],
      description: "Organisation complète d'un mariage de 200 invités avec production musicale sur-mesure",
      fullDescription:
        "Un mariage d'exception dans le cadre prestigieux du Château de Versailles. Nous avons orchestré chaque détail de cette célébration unique, de la cérémonie extérieure dans les jardins à la soirée dansante dans la Grande Galerie. Notre équipe a créé une ambiance musicale sur-mesure, alliant classique et moderne, avec un éclairage scénique qui a sublimé l'architecture historique du lieu.",
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
      gallery: [
        "/placeholder.svg?height=600&width=800&text=Scène+Principale",
        "/placeholder.svg?height=600&width=800&text=Vidéo+Mapping",
        "/placeholder.svg?height=600&width=800&text=Streaming+Live",
        "/placeholder.svg?height=600&width=800&text=Stands+Exposition",
        "/placeholder.svg?height=600&width=800&text=Networking+Cocktail",
      ],
      description: "Événement d'entreprise avec vidéo mapping et streaming live pour 500 participants",
      fullDescription:
        "Une convention technologique d'envergure internationale avec des innovations audiovisuelles spectaculaires. Notre équipe a déployé un système de vidéo mapping immersif sur toute la scène principale, créant un environnement visuel dynamique qui s'adaptait aux différentes présentations. Le streaming live multi-caméras a permis de toucher plus de 10 000 participants à distance.",
      services: ["Vidéo mapping", "Streaming live", "Sonorisation", "Régie technique"],
      client: "TechCorp International",
      date: "Mars 2024",
      guests: "500 participants",
      location: "Palais des Congrès",
    },
  ]

  useEffect(() => {
    const foundProject = projects.find((p) => p.slug === params.slug)
    if (foundProject) {
      setProject(foundProject)
      // Mettre à jour le titre de la page
      document.title = `${foundProject.title} - Angeli Visions`
    }
  }, [params.slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Projet non trouvé</h1>
          <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-purple-600 to-pink-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    )
  }

  const allImages = [project.image, ...project.gallery]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
  }

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Button onClick={() => router.push("/")} variant="ghost" className="text-white hover:bg-slate-800/50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>
            <img
              src="/images/angeli-visions-logo-white.png"
              alt="Angeli Visions"
              className="h-16 w-auto object-contain"
            />
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="bg-purple-600/80 text-white mb-4">
              {categories.find((c) => c.id === project.category)?.label}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{project.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Galerie principale */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                {/* Image principale */}
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={allImages[currentImageIndex] || "/placeholder.svg"}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onClick={() => openLightbox(currentImageIndex)}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Navigation des images */}
                  {allImages.length > 1 && (
                    <>
                      <Button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </>
                  )}

                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Miniatures */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {allImages.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`relative cursor-pointer rounded-lg overflow-hidden ${
                        index === currentImageIndex ? "ring-2 ring-purple-500" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Informations du projet */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                {/* Détails */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold text-lg mb-4">Détails du projet</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-5 h-5 mr-3 text-purple-400" />
                        <div>
                          <p className="text-sm text-white/60">Date</p>
                          <p>{project.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Users className="w-5 h-5 mr-3 text-purple-400" />
                        <div>
                          <p className="text-sm text-white/60">Participants</p>
                          <p>{project.guests}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                        <div>
                          <p className="text-sm text-white/60">Lieu</p>
                          <p>{project.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Client */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold text-lg mb-4">Client</h3>
                    <p className="text-white/80">{project.client}</p>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold text-lg mb-4">Services fournis</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <Badge key={index} className="bg-purple-600/80 text-white">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-white font-bold mb-2">Projet similaire ?</h3>
                    <p className="text-white/80 text-sm mb-4">Contactez-nous pour discuter de votre événement</p>
                    <Button
                      onClick={() => router.push("/#devis")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demander un devis
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Description complète */}
          {project.fullDescription && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-white font-bold text-2xl mb-6">À propos de ce projet</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{project.fullDescription}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-7xl max-h-full p-4">
              <img
                src={allImages[lightboxImageIndex] || "/placeholder.svg"}
                alt={`${project.title} - Image ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Navigation lightbox */}
              {allImages.length > 1 && (
                <>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevLightboxImage()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextLightboxImage()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Fermer */}
              <Button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Compteur */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                {lightboxImageIndex + 1} / {allImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
