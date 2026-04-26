"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Eye, ExternalLink, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type { TiendaNubeBlogPostScraped } from "@/lib/tiendanube-blog"

const STORE_URL = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://felton2.mitiendanube.com"
const TN_ADMIN_BLOG_URL = `${STORE_URL}/admin/blog/`

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<TiendaNubeBlogPostScraped[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchPosts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    try {
      const res = await fetch("/api/tiendanube/blog")
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Error fetching posts")
      }
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error(error)
      toast.error(`No se pudieron cargar los posts: ${error.message}`)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Posts sincronizados desde Tienda Nube · Los cambios se gestionan en el panel de TN
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPosts(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border border-border rounded hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            Sincronizar
          </button>
          <a
            href={TN_ADMIN_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Crear post en TN
          </a>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded p-4 flex items-start gap-3">
        <ExternalLink className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground">
          Los posts se crean y editan en{" "}
          <a href={TN_ADMIN_BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Tienda online → Blog
          </a>{" "}
          dentro del panel de Tienda Nube. Acá podés ver el estado y previsualizar cada artículo.
        </p>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar posts..."
            className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm rounded focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Cargando posts desde Tienda Nube...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Título
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Autor
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Publicado
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts.map(post => (
                  <tr key={post.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground line-clamp-1">{post.title}</span>
                      {post.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{post.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-500/10 text-green-500">
                        Publicado
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString("es-AR")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title="Ver en el sitio"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <a
                          href={post.url.replace("felton2.mitiendanube.com", "felton2.mitiendanube.com/admin/blog")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          title="Editar en Tienda Nube"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-sm">
                  {posts.length === 0
                    ? "No hay posts publicados en Tienda Nube."
                    : "No se encontraron posts con ese término."}
                </p>
                {posts.length === 0 && (
                  <a
                    href={TN_ADMIN_BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Publicar primer post en Tienda Nube
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
