"use client"

import { useState, useEffect } from "react"
import { Search, ExternalLink, Loader2, RefreshCw, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  formatPrice,
  getProductMainImage,
  getProductStock,
  isInStock,
} from "@/lib/tiendanube"
import type { TiendaNubeProduct } from "@/lib/tiendanube"

const STORE_URL = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://felton2.mitiendanube.com"
const TN_ADMIN_PRODUCTS_URL = `${STORE_URL}/admin/products/`
const TN_ADMIN_PRODUCTS_NEW_URL = `${STORE_URL}/admin/products/new`

export default function AdminProductosPage() {
  const [products, setProducts] = useState<TiendaNubeProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")

  const fetchProducts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    try {
      const res = await fetch("/api/tiendanube/products?per_page=200")
      if (!res.ok) throw new Error("Error al cargar productos")
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const filtered = products.filter(p => {
    const matchSearch = p.name.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && p.published) ||
      (filterStatus === "draft" && !p.published)
    return matchSearch && matchStatus
  })

  const publishedCount = products.filter(p => p.published).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading
              ? "Cargando catálogo..."
              : `${publishedCount} publicados · ${products.length - publishedCount} borradores · ${products.length} en total`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchProducts(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border border-border rounded hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            Actualizar
          </button>
          <a
            href={TN_ADMIN_PRODUCTS_NEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Agregar producto
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o marca..."
            className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm rounded focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as any)}
          className="bg-background border border-border px-3 py-2 text-sm rounded focus:border-primary focus:outline-none text-foreground"
        >
          <option value="all">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Cargando productos desde Tienda Nube...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Precio
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(product => {
                  const image = getProductMainImage(product)
                  const stock = getProductStock(product)
                  const inStock = isInStock(product)
                  const price = product.variants[0]?.price

                  return (
                    <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary rounded overflow-hidden shrink-0">
                            {image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={image}
                                alt={product.name.es}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {product.name.es}
                            </p>
                            {product.brand && (
                              <p className="text-xs text-muted-foreground">{product.brand}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-foreground tabular-nums">
                          {price ? formatPrice(price, "ARS") : "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span
                          className={`text-sm ${
                            stock === null
                              ? "text-muted-foreground"
                              : inStock
                              ? "text-foreground"
                              : "text-red-500"
                          }`}
                        >
                          {stock === null ? "Sin control" : `${stock} unid.`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                            product.published
                              ? "bg-green-500/10 text-green-500"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {product.published ? "Publicado" : "Borrador"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`${TN_ADMIN_PRODUCTS_URL}${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded"
                            title="Editar en Tienda Nube"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filtered.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-sm">
                  {products.length === 0
                    ? "No hay productos en el catálogo."
                    : "No se encontraron productos con ese criterio."}
                </p>
                {products.length === 0 && (
                  <a
                    href={TN_ADMIN_PRODUCTS_NEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Agregar primer producto en Tienda Nube
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
