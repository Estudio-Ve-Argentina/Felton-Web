"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Package,
  FileText,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { formatPrice } from "@/lib/tiendanube"
import type { TiendaNubeProduct, TiendaNubeOrder } from "@/lib/tiendanube"
import type { TiendaNubeBlogPostScraped } from "@/lib/tiendanube-blog"

const paymentLabel: Record<string, { label: string; className: string }> = {
  pending:    { label: "Pendiente",   className: "bg-yellow-500/10 text-yellow-500" },
  authorized: { label: "Autorizado",  className: "bg-blue-500/10 text-blue-500" },
  paid:       { label: "Pagado",      className: "bg-green-500/10 text-green-500" },
  voided:     { label: "Anulado",     className: "bg-red-500/10 text-red-500" },
  refunded:   { label: "Reembolsado", className: "bg-orange-500/10 text-orange-500" },
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<TiendaNubeProduct[]>([])
  const [orders, setOrders] = useState<TiendaNubeOrder[]>([])
  const [posts, setPosts] = useState<TiendaNubeBlogPostScraped[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/tiendanube/products?per_page=200").then(r => r.ok ? r.json() : []),
      fetch("/api/tiendanube/orders?per_page=100").then(r => r.ok ? r.json() : []),
      fetch("/api/tiendanube/blog").then(r => r.ok ? r.json() : []),
    ])
      .then(([prods, ords, blg]) => {
        setProducts(Array.isArray(prods) ? prods : [])
        setOrders(Array.isArray(ords) ? ords : [])
        setPosts(Array.isArray(blg) ? blg : [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const paidOrders = orders.filter(o => o.payment_status === "paid")
  const monthlyOrders = paidOrders.filter(o => new Date(o.created_at) >= monthStart)
  const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + parseFloat(o.total), 0)
  const currency = orders[0]?.currency || "ARS"
  const publishedProducts = products.filter(p => p.published)
  const pendingOrders = orders.filter(
    o => o.payment_status === "pending" || o.shipping_status === "unpacked"
  )
  const recentOrders = orders.slice(0, 6)
  const recentPosts = posts.slice(0, 5)

  const stats = [
    {
      name: "Productos",
      value: loading ? "—" : String(publishedProducts.length),
      sub: loading ? "" : `${products.length} en total`,
      icon: Package,
      href: "/admin/productos",
    },
    {
      name: "Blog Posts",
      value: loading ? "—" : String(posts.length),
      sub: "artículos publicados",
      icon: FileText,
      href: "/admin/blog",
    },
    {
      name: "Pedidos",
      value: loading ? "—" : String(orders.length),
      sub: loading ? "" : `${pendingOrders.length} pendientes`,
      icon: ShoppingBag,
      href: "/admin/ventas",
    },
    {
      name: "Ingresos del Mes",
      value: loading ? "—" : formatPrice(monthlyRevenue, currency),
      sub: loading ? "" : `${monthlyOrders.length} pedidos pagados`,
      icon: TrendingUp,
      href: "/admin/ventas",
      wide: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-light text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Vista general de Felton</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="group relative p-6 bg-card border border-border rounded hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="p-2 bg-primary/10 rounded">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <ArrowRight className="h-4 w-4 text-border group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className={`font-serif font-light text-foreground leading-none ${stat.wide ? "text-2xl" : "text-4xl"}`}>
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{stat.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pedidos Recientes
            </h2>
            <Link
              href="/admin/ventas"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="px-6 py-10 text-sm text-muted-foreground text-center">
              No hay pedidos todavía
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map(order => {
                const pay = paymentLabel[order.payment_status] ?? {
                  label: order.payment_status,
                  className: "bg-secondary text-muted-foreground",
                }
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-secondary/20 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-mono font-medium text-foreground">
                        #{order.number}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer?.name || "Sin nombre"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${pay.className}`}>
                        {pay.label}
                      </span>
                      <span className="text-sm font-medium text-foreground font-mono tabular-nums">
                        {formatPrice(order.total, order.currency)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent blog posts */}
        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Blog Reciente
            </h2>
            <Link
              href="/admin/blog"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="px-6 py-10 text-sm text-muted-foreground text-center">
              No hay posts publicados
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentPosts.map(post => (
                <div
                  key={post.id}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.author}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                    {new Date(post.published_at).toLocaleDateString("es-AR")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
