"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data
const blogPosts = [
  {
    id: "1",
    title: "Como Reconocer Cuero Genuino de Alta Calidad",
    category: "Guias",
    status: "publicado",
    date: "15 Ene 2026",
    views: 1243,
  },
  {
    id: "2",
    title: "Tendencias en Accesorios Premium para 2026",
    category: "Tendencias",
    status: "publicado",
    date: "10 Ene 2026",
    views: 892,
  },
  {
    id: "3",
    title: "Guia Completa: Cuidado de Billeteras de Cuero",
    category: "Cuidado",
    status: "borrador",
    date: "05 Ene 2026",
    views: 0,
  },
  {
    id: "4",
    title: "La Historia de Louis Vuitton",
    category: "Marcas",
    status: "publicado",
    date: "28 Dic 2025",
    views: 567,
  },
]

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || post.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">
            Administra los articulos del blog
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card border border-border rounded p-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar posts..."
            className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm rounded focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["all", "publicado", "borrador"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded transition-colors",
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {status === "all" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Titulo
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Categoria
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Fecha
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Visitas
                </th>
                <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">{post.title}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{post.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex px-2 py-1 text-xs font-medium rounded",
                        post.status === "publicado"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      )}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{post.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron posts</p>
          </div>
        )}
      </div>
    </div>
  )
}
