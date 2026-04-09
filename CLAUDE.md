# CLAUDE.md — Felton Website Design

## Proyecto

**Felton** es un e-commerce de accesorios de lujo premium. Tagline: "No Es Para Cualquiera". Vende réplicas de alta calidad (declarado explícitamente en términos legales). Integrado con **Tienda Nube** para productos, órdenes y checkout.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **React**: 19.2.0 + TypeScript 5
- **Estilos**: Tailwind CSS 4.1.9 + shadcn/ui + Framer Motion 12.29.2
- **Colores**: OKLCH — Navy profundo (#0a1220) + Gold apagado
- **Fuentes**: Montserrat (body), Playfair Display (headings lujo), Cormorant Garamond
- **i18n**: Español/Inglés — contexto en `lib/i18n/context.tsx` (~700 keys)
- **API**: Tienda Nube — cliente en `lib/tiendanube.ts`
- **Animaciones**: Framer Motion — presets en `lib/animations.ts`

---

## Estructura principal

```
app/
  page.tsx                  # Landing (home)
  about/page.tsx            # Sobre nosotros
  brands/page.tsx           # Marcas
  brands/[slug]/page.tsx    # Detalle de marca
  collections/page.tsx      # Colecciones
  faqs/page.tsx             # FAQs
  contact/page.tsx          # Contacto
  blog/                     # Blog
  admin/                    # Panel admin

components/
  layout/
    header.tsx              # Navegación fija con dropdowns
    footer.tsx              # Footer con links y newsletter
  home/
    hero-section.tsx        # Hero con video full-screen
    premium-product-showcase.tsx
    philosophy-section.tsx
    brand-carousel.tsx
    newsletter-section.tsx
    blog-section.tsx
    ...
  shared/
    felton-logo.tsx
    language-switcher.tsx

lib/
  tiendanube.ts             # Cliente API Tienda Nube
  i18n/context.tsx          # Traducciones + hook useTranslation / useI18n
  animations.ts             # Presets Framer Motion
  utils.ts                  # cn() para clases
```

---

## Variables de entorno necesarias

```
TIENDANUBE_STORE_ID
TIENDANUBE_ACCESS_TOKEN
TIENDANUBE_CLIENT_ID
TIENDANUBE_CLIENT_SECRET
NEXT_PUBLIC_TIENDANUBE_STORE_URL=https://velmor.mitiendanube.com
```

---

## Sistema de colores (globals.css)

```css
--navy:        oklch(0.15 0.02 260)   /* fondo principal */
--navy-light:  oklch(0.22 0.02 260)
--gold:        oklch(0.72 0.12 85)    /* acento dorado */
--gold-light:  oklch(0.8  0.10 85)
--charcoal:    oklch(0.3  0.01 260)
--cream:       oklch(0.95 0.01 90)
```

---

## Tareas pendientes (roadmap conversación actual)

1. **Productos** — Refactorizar como catálogo con buscador por nombre y filtro por categoría
2. **Sobre nosotros** — Más humana, minimalista, con imágenes y mensaje personal
3. **Landing** — Mantener estilo/colores, reducir animaciones excesivas, más minimalista
4. **Marcas** — Agregar logos reales y mejorar el formato de la sección

> Trabajar de a una tarea a la vez, siguiendo las instrucciones del usuario.

---

## Skills del proyecto

- **Headers de página**: Al crear o modificar cualquier página que tenga un hero/header,
  seguir estrictamente las reglas de `.claude/skills/page-header/SKILL.md`.
  Resumen de las reglas críticas:
  - `<main className="min-h-screen pt-20">` — siempre, sin excepción
  - Wrapper del hero con `pt-16 pb-14` como padding interno
  - Usar `SectionHeader` de `@/components/layout` — nunca recrear eyebrow/línea/título a mano
  - Strings siempre en ES + EN con `locale === "es" ? "..." : "..."`

---

## Convenciones importantes

- **No modificar** el sistema de colores ni la tipografía sin instrucción explícita
- **Mantener i18n**: todo texto visible debe tener clave en `lib/i18n/context.tsx` (ES + EN)
- **Framer Motion**: usar presets de `lib/animations.ts` antes de crear animaciones nuevas
- **Minimalismo**: el usuario prefiere estética limpia y sobria — evitar efectos excesivos como partículas, glows intensos, animaciones muy elaboradas salvo que se pidan explícitamente
- **shadcn/ui**: preferir componentes existentes antes de crear nuevos
- **Tareas incrementales**: no hacer varias secciones a la vez; esperar confirmación antes de avanzar

---

## Patrón i18n

```tsx
const { t, locale, setLocale } = useTranslation()
// o
const { t, locale, setLocale } = useI18n()
```

Persistencia en `localStorage` como `felton-locale`. Default: `es`.

---

## Checkout (Tienda Nube)

1. Usuario agrega al carrito
2. POST a `/api/tiendanube/checkout` con items
3. Servidor crea Draft Order
4. Retorna `checkout_url`
5. Cliente redirige a checkout oficial de Tienda Nube
