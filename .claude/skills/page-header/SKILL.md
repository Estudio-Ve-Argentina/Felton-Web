---
name: page-header
description: Crea el hero/header de una página del proyecto Felton con altura consistente, eyebrow dorado, línea gold y posicionamiento correcto independientemente del fondo.
---

## Propósito

Cada página del proyecto necesita un bloque hero/header consistente con:
- Altura fija que no varía con el fondo
- Texto pequeño (eyebrow) arriba con línea dorada debajo
- Título serif grande
- Descripción opcional
- Padding correcto que compensa el Header fijo (pt-20)

---

## Componente a usar

**Siempre usar `SectionHeader`** de `@/components/layout`. Este componente ya incluye internamente:
- Eyebrow: texto pequeño uppercase con tracking amplio en color `text-primary/80`
- Línea gold: `h-px w-16 bg-primary/60` animada con `goldLineReveal`
- Título: serif, `text-3xl md:text-4xl lg:text-5xl`, font-light
- Descripción: `text-base lg:text-lg`, font-light, muted

**No recrear estos elementos manualmente.**

---

## Estructura base (siempre igual)

```tsx
<main className="min-h-screen pt-20">        {/* pt-20 = altura del Header fijo */}

  {/* ── HERO HEADER ──────────────────────────────── */}
  <div className="{WRAPPER_CLASS}">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14">
      <SectionHeader
        eyebrow={locale === "es" ? "Texto ES" : "Text EN"}
        title={locale === "es" ? "Título ES" : "Title EN"}
        description={locale === "es"
          ? "Descripción en español."
          : "Description in English."
        }
      />
    </div>
  </div>

  {/* ── CONTENIDO ──────────────────────────────────── */}
  ...
</main>
```

**Padding fijo del hero: `pt-16 pb-14`** — no cambiar.

---

## Variantes de fondo para el WRAPPER_CLASS

Elegir según el diseño de la página. El `SectionHeader` funciona igual en todas.

### 1. Fondo sólido (más usado — FAQs, Blog, etc.)
```tsx
<div className="bg-background border-b border-primary/10">
```

### 2. Fondo con gradiente (Contact, páginas con imagen detrás)
```tsx
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-secondary/10" />
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14">
    <SectionHeader ... />
  </div>
</div>
```
> Nota: cuando usás `relative/absolute`, el `max-w-7xl` va adentro del z-10, no en el wrapper externo.

### 3. Fondo oscuro (dark variant)
```tsx
<div className="bg-secondary/10 border-b border-primary/10">
```

### 4. Alineación izquierda (para páginas más editoriales)
```tsx
<SectionHeader
  eyebrow="..."
  title="..."
  description="..."
  align="left"         {/* default es "center" */}
/>
```

---

## Reglas que no se rompen

1. **`pt-20` en `<main>`** — siempre, sin excepción. Compensa el Header fijo (`fixed top-0`).
2. **`pt-16 pb-14` en el contenedor interno** — da altura visual uniforme entre páginas.
3. **No hardcodear strings** — usar `locale === "es" ? "..." : "..."` o claves `t()` si ya existen en `lib/i18n/context.tsx`.
4. **No crear el eyebrow/línea/título manualmente** — usar `SectionHeader`.
5. **No agregar animaciones extra** al hero header salvo que se pida explícitamente.

---

## Imports necesarios

```tsx
import { Header, Footer, SectionHeader } from "@/components/layout"
import { useI18n } from "@/lib/i18n"
// Si la página también usa Section:
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
```

---

## Ejemplo completo mínimo

```tsx
"use client"

import { Header, Footer, SectionHeader } from "@/components/layout"
import { useI18n } from "@/lib/i18n"

export default function NombrePage() {
  const { locale } = useI18n()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">

        {/* Hero */}
        <div className="bg-background border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14 text-center">
            <SectionHeader
              eyebrow={locale === "es" ? "Sección" : "Section"}
              title={locale === "es" ? "Título de la Página" : "Page Title"}
              description={locale === "es"
                ? "Descripción corta que contextualiza la página."
                : "Short description that contextualizes the page."
              }
            />
          </div>
        </div>

        {/* Contenido */}
        ...

      </main>
      <Footer />
    </>
  )
}
```