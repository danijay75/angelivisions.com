"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Calendar, Users, MapPin, LogOut, Shield, ImageIcon, Home } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/admin/login-form"
import ImageUpload from "@/components/admin/image-upload"
import CategoryManager from "@/components/admin/category-manager"

interface Category {
  id: string
  label: string
  description?: string
  color: string
  projectCount: number
}

interface Project {
  id: number
  title: string
  slug: string
  category: string
  image: string
  gallery: string[]
  description: string
  fullDescription: string
  services: string[]
  client: string
  date: string
  guests: string
  location: string
}

export default function AdminPage() {
  const { user, logout } = useAuth()

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "wedding",
      label: "Mariages",
      description: "Cérémonies et réceptions",
      color: "from-pink-500 to-rose-500",
      projectCount: 2,
    },
    {
      id: "corporate",
      label: "Entreprise",
      description: "Événements d'entreprise",
      color: "from-blue-500 to-cyan-500",
      projectCount: 2,
    },
    {
      id: "production",
      label: "Production Musicale",
      description: "Création musicale",
      color: "from-purple-500 to-pink-500",
      projectCount: 1,
    },
    {
      id: "mapping",
      label: "Vidéo Mapping",
      description: "Spectacles visuels",
      color: "from-indigo-500 to-purple-500",
      projectCount: 1,
    },
    {
      id: "media",
      label: "Captations & Médias",
      description: "Captations et podcasts",
      color: "from-green-500 to-emerald-500",
      projectCount: 0,
    },
  ])

  const [projects, setProjects] = useState<Project[]>([
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
      ],
      description: "Organisation complète d'un mariage de 200 invités avec production musicale sur-mesure",
      fullDescription: "Un mariage d'exception dans le cadre prestigieux du Château de Versailles...",
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
      ],
      description: "Événement d'entreprise avec vidéo mapping et streaming live pour 500 participants",
      fullDescription: "Une convention technologique d'envergure internationale...",
      services: ["Vidéo mapping", "Streaming live", "Sonorisation", "Régie technique"],
      client: "TechCorp International",
      date: "Mars 2024",
      guests: "500 participants",
      location: "Palais des Congrès",
    },
  ])

  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({})

  if (!user) {
    return <LoginForm />
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleCategoriesChange = (newCategories: Category[]) => {
    setCategories(newCategories)
    // Mettre à jour le compteur de projets pour chaque catégorie
    const updatedCategories = newCategories.map((cat) => ({
      ...cat,
      projectCount: projects.filter((project) => project.category === cat.id).length,
    }))
    setCategories(updatedCategories)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setEditingProject(null)
    setFormData({
      title: "",
      slug: "",
      category: "",
      image: "",
      gallery: [],
      description: "",
      fullDescription: "",
      services: [],
      client: "",
      date: "",
      guests: "",
      location: "",
    })
    setIsCreating(true)
  }

  const handleSave = () => {
    const slug = formData.slug || generateSlug(formData.title || "")
    const projectData = { ...formData, slug } as Project

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? projectData : p)))
    } else {
      const newProject = {
        ...projectData,
        id: Math.max(...projects.map((p) => p.id)) + 1,
      }
      setProjects([...projects, newProject])
    }

    // Mettre à jour les compteurs de catégories
    const updatedCategories = categories.map((cat) => ({
      ...cat,
      projectCount: projects.filter((project) => project.category === cat.id).length,
    }))
    setCategories(updatedCategories)

    setEditingProject(null)
    setIsCreating(false)
    setFormData({})
  }

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      const newProjects = projects.filter((p) => p.id !== id)
      setProjects(newProjects)

      // Mettre à jour les compteurs de catégories
      const updatedCategories = categories.map((cat) => ({
        ...cat,
        projectCount: newProjects.filter((project) => project.category === cat.id).length,
      }))
      setCategories(updatedCategories)
    }
  }

  const handleCancel = () => {
    setEditingProject(null)
    setIsCreating(false)
    setFormData({})
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }
      // Auto-generate slug when title changes
      if (field === "title" && value) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const addService = (service: string) => {
    if (service.trim() && !formData.services?.includes(service.trim())) {
      updateFormData("services", [...(formData.services || []), service.trim()])
    }
  }

  const removeService = (service: string) => {
    updateFormData("services", formData.services?.filter((s) => s !== service) || [])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
            <p className="text-slate-300">Gestion des réalisations et contenus</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent"
            >
              <Home className="w-4 h-4 mr-2" />
              Voir le site
            </Button>
            <div className="flex items-center text-white">
              <Shield className="w-5 h-5 mr-2" />
              <span>Connecté en tant que {user.email}</span>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Gestionnaire de catégories */}
        <div className="mb-8">
          <CategoryManager categories={categories} onCategoriesChange={handleCategoriesChange} projects={projects} />
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingProject) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{editingProject ? "Modifier le projet" : "Nouveau projet"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Informations de base */}
                <div className="space-y-6">
                  <h3 className="text-white font-semibold text-lg border-b border-white/20 pb-2">
                    Informations générales
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white mb-2 block">Titre du projet</Label>
                      <Input
                        value={formData.title || ""}
                        onChange={(e) => updateFormData("title", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="Nom du projet"
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Slug (URL)</Label>
                      <Input
                        value={formData.slug || ""}
                        onChange={(e) => updateFormData("slug", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="url-du-projet"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Catégorie</Label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) => updateFormData("category", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-slate-800">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Description courte</Label>
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Description courte du projet"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Description complète</Label>
                    <Textarea
                      value={formData.fullDescription || ""}
                      onChange={(e) => updateFormData("fullDescription", e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Description détaillée du projet"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Détails du projet */}
                <div className="space-y-6">
                  <h3 className="text-white font-semibold text-lg border-b border-white/20 pb-2">Détails du projet</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-white mb-2 block">Client</Label>
                      <Input
                        value={formData.client || ""}
                        onChange={(e) => updateFormData("client", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="Nom du client"
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Date</Label>
                      <Input
                        value={formData.date || ""}
                        onChange={(e) => updateFormData("date", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="ex: Juin 2024"
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Nombre d'invités</Label>
                      <Input
                        value={formData.guests || ""}
                        onChange={(e) => updateFormData("guests", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="ex: 200 invités"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Lieu</Label>
                    <Input
                      value={formData.location || ""}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Lieu de l'événement"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-6">
                  <h3 className="text-white font-semibold text-lg border-b border-white/20 pb-2">Images du projet</h3>

                  {/* Image principale */}
                  <div>
                    <ImageUpload
                      images={formData.image ? [formData.image] : []}
                      onImagesChange={(images) => updateFormData("image", images[0] || "")}
                      maxImages={1}
                      label="Image principale"
                    />
                  </div>

                  {/* Galerie */}
                  <div>
                    <ImageUpload
                      images={formData.gallery || []}
                      onImagesChange={(images) => updateFormData("gallery", images)}
                      maxImages={15}
                      label="Galerie d'images"
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-6">
                  <h3 className="text-white font-semibold text-lg border-b border-white/20 pb-2">Services fournis</h3>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.services?.map((service, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-600/80 text-white cursor-pointer"
                          onClick={() => removeService(service)}
                        >
                          {service} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="new-service"
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="Ajouter un service"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addService((e.target as HTMLInputElement).value)
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById("new-service") as HTMLInputElement
                          addService(input.value)
                          input.value = ""
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-white/20">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Projects List */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Projets ({projects.length})</h2>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau projet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const category = categories.find((cat) => cat.id === project.category)
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`bg-gradient-to-r ${category?.color || "from-gray-500 to-gray-600"} text-white`}
                      >
                        {category?.label || "Sans catégorie"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600/80 text-white">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {project.gallery?.length || 0} photos
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                      <p className="text-white/80 text-sm">{project.client}</p>
                      <p className="text-white/60 text-xs">/{project.slug}</p>
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

                    <div className="flex flex-wrap gap-2 mb-4">
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

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(project)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
