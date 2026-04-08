"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Layers,
  BookA,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FeltonLogo } from "@/components/shared";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Guias", href: "/admin/guides", icon: BookOpen },
  { name: "Comparativas", href: "/admin/comparisons", icon: Layers },
  { name: "Diccionario", href: "/admin/dictionary", icon: BookA },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-card border-b border-border px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2">
          <FeltonLogo textClassName="text-xl" />
          <span className="text-xs font-medium text-muted-foreground">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border hidden lg:block">
            <Link href="/admin" className="flex items-center gap-3">
              <FeltonLogo textClassName="text-2xl" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 mt-16 lg:mt-0">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-1">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground rounded transition-colors"
            >
              <Settings className="h-5 w-5" />
              Configuracion
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground rounded transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Volver al Sitio
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
