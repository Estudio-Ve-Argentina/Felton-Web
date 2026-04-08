"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Eye, ImageIcon } from "lucide-react"
import { toast } from "sonner"

const categories = ["Guias", "Tendencias", "Cuidado", "Marcas", "General"]

export default function NewBlogPost() {
  const [title, setTitle] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [excerptEn, setExcerptEn] = useState("")
  const [content, setContent] = useState("")
  const [contentEn, setContentEn] = useState("")
  const [category, setCategory] = useState("General")
  const [status, setStatus] = useState<"borrador" | "publicado">("borrador")
  const [featuredImage, setFeaturedImage] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title) {
      toast.error("El titulo es requerido")
      return
    }

    setIsSaving(true)
    
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success("Post guardado exitosamente")
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-light text-foreground">Nuevo Post</h1>
            <p className="text-sm text-muted-foreground">
              Crea un nuevo articulo para el blog
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded transition-colors">
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spanish Content */}
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Contenido en Espanol
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Titulo
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titulo del articulo..."
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Extracto
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve descripcion del articulo..."
                rows={3}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Contenido
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe el contenido del articulo... (soporta HTML)"
                rows={12}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none resize-none font-mono"
              />
            </div>
          </div>

          {/* English Content */}
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Contenido en Ingles
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Article title..."
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Excerpt
              </label>
              <textarea
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
                placeholder="Brief description..."
                rows={3}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Content
              </label>
              <textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                placeholder="Write the article content... (supports HTML)"
                rows={12}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none resize-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Publicacion
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Estado
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "borrador" | "publicado")}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              >
                <option value="borrador">Borrador</option>
                <option value="publicado">Publicado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Imagen Destacada
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                URL de la imagen
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              />
            </div>

            {featuredImage && (
              <div className="aspect-video bg-secondary rounded overflow-hidden">
                <img
                  src={featuredImage || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {!featuredImage && (
              <div className="aspect-video bg-secondary/50 border-2 border-dashed border-border rounded flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Sin imagen</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
