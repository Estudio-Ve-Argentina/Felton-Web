# 🛍️ Tienda Nube × Next.js — Starter Template

Un starter **listo para producción** para construir storefronts custom sobre cualquier tienda Tienda Nube. Forkeá este repo, conectá la tienda del cliente, y enfocate solo en diseño y branding.

---

## ¿Qué incluye?

| Área | Qué viene resuelto |
|------|--------------------|
| **Backend** | Cliente de API completo para Tienda Nube (productos, órdenes, stock, categorías) |
| **Auth** | Flujo OAuth automático para obtener el access token del cliente |
| **Productos** | Grilla con filtros por categoría, cards, página de detalle, variantes |
| **Carrito** | Estado global persistente (Zustand), drawer lateral, checkout seguro vía API (Draft Orders) |
| **Admin** | Panel básico para ver órdenes y stock en tiempo real |
| **SEO** | Metadata dinámica por producto desde la API |
| **DX** | TypeScript estricto, caché ISR de 60s, recarga automática de env vars |

---

## 🔒 Checkout Seguro (Draft Orders)

A diferencia de los templates básicos que redirigen a URLs estáticas (propensas a errores de "Invalid URL"), este starter utiliza el flujo de **Órdenes en Borrador (Draft Orders)** de Tienda Nube:

1. **Server-to-Server**: La petición se procesa en el backend (`app/api/tiendanube/checkout/route.ts`).
2. **Seguridad**: El `ACCESS_TOKEN` nunca se expone al cliente.
3. **Persistencia**: Se crea una orden real en estado de borrador en el panel de Tienda Nube antes de redirigir al usuario.
4. **Redirección oficial**: Se utiliza la `checkout_url` generada dinámicamente por la API de Tienda Nube.

> [!IMPORTANT]
> **Permisos Requeridos**: Para que el checkout funcione, el Access Token de la app debe tener los scopes `write_draft_orders`, `read_draft_orders` y `write_orders`. Si recibes un error 403, revisa los permisos en tu Panel de Partners.

---

## Stack
...
...
...
| Archivo | Qué customizar |
|---------|---------------|
| `app/globals.css` | Colores, tipografía, variables de diseño |
| `components/header.tsx` | Logo, navegación |
| `components/hero-section.tsx` | Hero, copy principal |
| `components/footer.tsx` | Links, redes sociales |
| `public/` | Imágenes y assets del cliente |
| `lib/blog-data.ts` | Contenido del blog (si aplica) |
| `content/` | Textos estáticos (FAQ, historia, etc.) |

El backend (API, carrito, productos) viene desacoplado para facilitar el mantenimiento.

---

## Arquitectura del backend

```
lib/
  tiendanube.ts         ← Cliente de API central. Todo pasa por acá.

app/api/tiendanube/
  products/route.ts     ← GET /api/tiendanube/products
  products/[id]/route.ts
  orders/route.ts       ← GET /api/tiendanube/orders
  stock/route.ts        ← PUT /api/tiendanube/stock
  checkout/route.ts     ← POST /api/tiendanube/checkout (Crea Draft Order)

app/api/auth/
  callback/route.ts     ← OAuth callback — obtiene el access token
```

### Cómo funciona el Checkout Seguro

```
Cliente Browser               Este servidor (API)          Tienda Nube API
      │                            │                            │
      ├──── POST /api/.../checkout ─►                           │
      │      (items del carrito)   │                            │
      │                            ├──── POST /draft_orders ───►│
      │                            │      (con Access Token)    │
      │                            │                            │
      │                            ◄──── { checkout_url } ──────┤
      │                            │                            │
      │◄─── JSON { checkoutUrl } ──┘                            │
      │                            │                            │
      ├──────── Redirección ───────┼───────────────────────────►│
      │                            │                       (Checkout)
```

> Headers: Tienda Nube usa `Authentication: bearer TOKEN` (no `Authorization`).

---

## Notas importantes

- **Tokens**: no expiran, pero si el cliente desinstala la app se invalidan. Volvé a correr el OAuth.
- **`.env.local`** está en `.gitignore`. Nunca subas credenciales al repo.
- **Caché**: los datos de productos se cachean 60 segundos (ISR). Editable en `components/products-grid.tsx`.
- **Tienda de prueba vs tienda real**: el OAuth genera un token específico para la tienda donde el usuario está logueado. Siempre verificar el `user_id` del callback coincida con el Store ID esperado.

---

## Checklist para onboarding de nuevo cliente

- [ ] Forkear el repo
- [ ] `cp .env.local.example .env.local`
- [ ] Completar `CLIENT_ID`, `CLIENT_SECRET`, `STORE_URL`
- [ ] `npm install && npm run dev`
- [ ] Cliente corre el OAuth desde SU cuenta → copiar `access_token` y `user_id`
- [ ] Verificar productos en `localhost:3000`
- [ ] Customizar `globals.css`, header, hero, footer con el branding del cliente
- [ ] Deploy a Vercel (configurar las env vars en el dashboard)
