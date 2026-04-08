"use client"

import Link from "next/link"
import { FileText, BookOpen, Layers, BookA, Plus, TrendingUp, Eye, Users } from "lucide-react"

const stats = [
  { name: "Blog Posts", value: "12", change: "+2", icon: FileText, href: "/admin/blog" },
  { name: "Guias", value: "8", change: "+1", icon: BookOpen, href: "/admin/guides" },
  { name: "Comparativas", value: "5", change: "0", icon: Layers, href: "/admin/comparisons" },
  { name: "Diccionario", value: "45", change: "+5", icon: BookA, href: "/admin/dictionary" },
]

const recentActivity = [
  { type: "blog", title: "Como Reconocer Cuero Genuino", date: "Hace 2 horas", status: "publicado" },
  { type: "guide", title: "Guia de Cuidado de Billeteras", date: "Hace 1 dia", status: "borrador" },
  { type: "dictionary", title: "Termino: Curtido Vegetal", date: "Hace 2 dias", status: "publicado" },
  { type: "comparison", title: "LV vs Gucci: Billeteras", date: "Hace 3 dias", status: "publicado" },
]

const quickActions = [
  { name: "Nuevo Post", icon: FileText, href: "/admin/blog/new" },
  { name: "Nueva Guia", icon: BookOpen, href: "/admin/guides/new" },
  { name: "Nueva Comparativa", icon: Layers, href: "/admin/comparisons/new" },
  { name: "Nuevo Termino", icon: BookA, href: "/admin/dictionary/new" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-light text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Administra el contenido de Felton
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="group p-6 bg-card border border-border rounded hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs text-green-500 font-medium">{stat.change}</span>
            </div>
            <p className="mt-4 font-serif text-3xl font-light text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.name}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-foreground mb-4">Acciones Rapidas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-secondary/30 border border-border rounded hover:bg-secondary/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    activity.status === "publicado"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card border border-border rounded p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Metricas</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Visitas del Mes</span>
              </div>
              <span className="font-serif text-2xl font-light text-foreground">2,847</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Suscriptores Newsletter</span>
              </div>
              <span className="font-serif text-2xl font-light text-foreground">483</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tasa de Conversion</span>
              </div>
              <span className="font-serif text-2xl font-light text-foreground">3.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
