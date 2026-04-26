"use client"

import { useState, useEffect } from "react"
import { Search, ExternalLink, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/tiendanube"
import type { TiendaNubeOrder } from "@/lib/tiendanube"

const STORE_URL = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://felton2.mitiendanube.com"
const TN_ADMIN_ORDERS_URL = `${STORE_URL}/admin/orders/`

const paymentLabels: Record<string, { label: string; className: string }> = {
  pending:    { label: "Pendiente",   className: "bg-yellow-500/10 text-yellow-500" },
  authorized: { label: "Autorizado",  className: "bg-blue-500/10 text-blue-500" },
  paid:       { label: "Pagado",      className: "bg-green-500/10 text-green-500" },
  voided:     { label: "Anulado",     className: "bg-red-500/10 text-red-500" },
  refunded:   { label: "Reembolsado", className: "bg-orange-500/10 text-orange-500" },
}

const shippingLabels: Record<string, { label: string; className: string }> = {
  unpacked:  { label: "Sin preparar", className: "bg-secondary text-muted-foreground" },
  shipped:   { label: "Enviado",      className: "bg-blue-500/10 text-blue-500" },
  delivered: { label: "Entregado",    className: "bg-green-500/10 text-green-500" },
}

export default function AdminVentasPage() {
  const [orders, setOrders] = useState<TiendaNubeOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPayment, setFilterPayment] = useState("all")

  const fetchOrders = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    try {
      const res = await fetch("/api/tiendanube/orders?per_page=100")
      if (!res.ok) throw new Error("Error al cargar pedidos")
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const filtered = orders.filter(order => {
    const matchSearch =
      !searchQuery ||
      order.number.includes(searchQuery) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchPayment = filterPayment === "all" || order.payment_status === filterPayment
    return matchSearch && matchPayment
  })

  const currency = orders[0]?.currency || "ARS"
  const totalRevenue = orders
    .filter(o => o.payment_status === "paid")
    .reduce((sum, o) => sum + parseFloat(o.total), 0)
  const pendingCount = orders.filter(o => o.payment_status === "pending").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Ventas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading
              ? "Cargando pedidos..."
              : `${orders.length} pedidos · ${formatPrice(totalRevenue, currency)} cobrados · ${pendingCount} pendientes de pago`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border border-border rounded hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            Actualizar
          </button>
          <a
            href={TN_ADMIN_ORDERS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Gestionar en Tienda Nube
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
            placeholder="Buscar por #pedido, cliente o email..."
            className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm rounded focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={filterPayment}
          onChange={e => setFilterPayment(e.target.value)}
          className="bg-background border border-border px-3 py-2 text-sm rounded focus:border-primary focus:outline-none text-foreground"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="authorized">Autorizado</option>
          <option value="paid">Pagado</option>
          <option value="voided">Anulado</option>
          <option value="refunded">Reembolsado</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Cargando pedidos desde Tienda Nube...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Cliente
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pago
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Envío
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                    Fecha
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(order => {
                  const pay = paymentLabels[order.payment_status] ?? {
                    label: order.payment_status,
                    className: "bg-secondary text-muted-foreground",
                  }
                  const ship = shippingLabels[order.shipping_status] ?? {
                    label: order.shipping_status,
                    className: "bg-secondary text-muted-foreground",
                  }
                  return (
                    <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-medium text-foreground">
                          #{order.number}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-foreground">{order.customer?.name || "—"}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {order.customer?.email || ""}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${pay.className}`}>
                          {pay.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${ship.className}`}>
                          {ship.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-medium text-foreground font-mono tabular-nums">
                          {formatPrice(order.total, order.currency)}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <span className="text-sm text-muted-foreground tabular-nums">
                          {new Date(order.created_at).toLocaleDateString("es-AR")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <a
                            href={TN_ADMIN_ORDERS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded"
                            title="Ver en Tienda Nube"
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
                  {orders.length === 0
                    ? "No hay pedidos todavía."
                    : "No se encontraron pedidos con ese criterio."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
