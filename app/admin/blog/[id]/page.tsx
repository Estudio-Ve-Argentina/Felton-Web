"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye, ImageIcon, Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { TiendaNubeBlogPost } from "@/lib/tiendanube"

export default function EditBlogPost() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const [title, setTitle] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [excerptEn, setExcerptEn] = useState("")
  const [content, setContent] = useState("")
  const [contentEn, setContentEn] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [featuredImage, setFeaturedImage] = useState("")
  const [handle, setHandle] = useState({ es: "", en: "" })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/tiendanube/blog/${id}`)
        if (!response.ok) throw new Error("Error al cargar el post")
        const post: TiendaNubeBlogPost = await response.json()
        
        setTitle(post.title.es || "")
        setTitleEn(post.title.en || "")
        setExcerpt(post.excerpt?.es || "")
        setExcerptEn(post.excerpt?.en || "")
        setContent(post.content.es || "")
        setContentEn(post.content.en || "")
        setStatus(post.status)
        setFeaturedImage(post.image || "")
        setHandle(post.handle as { es: string; en: string })
      } catch (error) {
        toast.error("No se pudo cargar el post")
        router.push("/admin/blog")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id, router])

  const handleSave = async () => {
    if (!title) {
      toast.error("El título en español es requerido")
      return
    }

    setIsSaving(true)
    
    try {
      const payload = {
        title: {
          es: title,
          en: titleEn || title
        },
        content: {
          es: content,
          en: contentEn || content
        },
        excerpt: {
          es: excerpt,
          en: excerptEn || excerpt
        },
        status: status,
        image: featuredImage || null
      }

      const response = await fetch(`/api/tiendanube/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Error al actualizar el post")
      }
      
      toast.success("Post actualizado exitosamente")
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Cargando contenido...</p>
      </div>
    )
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
            <h1 className="font-serif text-2xl font-light text-foreground">Editar Post</h1>
            <p className="text-sm text-muted-foreground">
              Modifica el artículo sincronizado con Tienda Nube
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/blog/${handle.es}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded transition-colors"
          >
            <Eye className="h-4 w-4" />
            Ver Online
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Guardando..." : "Guardar Cambios"}
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
              Contenido en Español
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del artículo..."
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Extracto (Descripción corta)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve descripción del artículo..."
                rows={3}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Contenido (HTML)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe el contenido del artículo... (soporta HTML)"
                rows={12}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none resize-none font-mono"
              />
            </div>
          </div>

          {/* English Content */}
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
              Contenido en Inglés
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
                placeholder="Write the article content..."
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
              Publicación
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Estado
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:border-primary focus:outline-none"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <div className="pt-4 border-t border-border">
              <label className="block text-xs font-medium text-muted-foreground uppercase mb-2">
                ID en Tienda Nube
              </label>
              <code className="text-xs bg-secondary px-2 py-1 rounded">{id}</code>
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
                  src={featuredImage}
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
