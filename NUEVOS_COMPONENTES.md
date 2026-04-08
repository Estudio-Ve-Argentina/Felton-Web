# Nuevos Componentes Agregados

Se han creado dos nuevos componentes premium para el sitio web de Felton:

## 1. BlogSection (`components/home/blog-section.tsx`)

### Características:

- **Diseño de tarjetas elegante** con animaciones suaves al hacer scroll
- **Imágenes con efecto hover** que se amplían sutilmente
- **Categorías con badges** dorados que destacan el tipo de contenido
- **Información meta** (fecha y tiempo de lectura) con iconos
- **Línea dorada animada** en la parte inferior de cada imagen
- **Botón "Ver Todos"** para navegar a la página completa del blog

### Personalización:

Para agregar o modificar posts del blog, edita el array `blogPosts` en el archivo:

```typescript
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Tu Título",
    excerpt: "Descripción breve del artículo",
    image: "/images/tu-imagen.jpg",
    category: "Categoría",
    date: "15 Ene 2026",
    readTime: "5 min",
    href: "/blog/tu-slug",
  },
  // Agrega más posts aquí...
];
```

### Imágenes:

Las imágenes actuales están configuradas como:

- `/images/blog-1.jpg`
- `/images/blog-2.jpg`
- `/images/blog-3.jpg`

**Necesitas agregar estas imágenes** en la carpeta `public/images/` o cambiar las rutas a tus propias imágenes.

---

## 2. NewsletterSection (`components/home/newsletter-section.tsx`)

### Características:

- **Diseño llamativo** con partículas animadas y orbes de gradiente
- **Iconos flotantes** (Sparkles, Gift, Bell) que se mueven suavemente
- **Grid de beneficios** que destaca las ventajas de suscribirse
- **Formulario interactivo** con estados de carga y éxito
- **Indicadores de confianza** (Sin spam, Cancela cuando quieras, 100% privado)
- **Prueba social** mostrando el número de suscriptores

### Funcionalidad del Formulario:

Actualmente el formulario simula el envío (1.5 segundos de espera). Para conectarlo a un servicio real:

1. **Reemplaza la función `handleSubmit`** con tu lógica de API:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Reemplaza esto con tu llamada a la API
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  } catch (error) {
    console.error("Error:", error);
    // Maneja el error aquí
  } finally {
    setIsLoading(false);
  }
};
```

2. **Servicios de Newsletter recomendados:**
   - Mailchimp
   - ConvertKit
   - SendGrid
   - Resend
   - Brevo (anteriormente Sendinblue)

---

## Integración en la Página Principal

Los componentes ya están integrados en `app/page.tsx`:

```tsx
<main className="min-h-screen">
  <HeroSection />
  <PremiumProductShowcase />
  <PhilosophySection />
  <ProductCarousel />
  <BrandCarousel />
  <CollectionsPreview />
  <TestimonialsSection />
  <BlogSection /> {/* ✨ Nuevo */}
  <NewsletterSection /> {/* ✨ Nuevo */}
</main>
```

---

## Diseño y Estética

Ambos componentes siguen el sistema de diseño premium del sitio:

- ✅ **Animaciones suaves** con Framer Motion
- ✅ **Paleta de colores dorada** consistente con el resto del sitio
- ✅ **Tipografía serif** para títulos
- ✅ **Efectos hover** elegantes
- ✅ **Responsive design** para todos los dispositivos
- ✅ **Transiciones fluidas** con cubic-bezier
- ✅ **Efectos de partículas** y gradientes animados

---

## Próximos Pasos

1. **Agregar imágenes del blog** en `public/images/`
2. **Conectar el formulario de newsletter** a tu servicio preferido
3. **Crear las páginas de blog individuales** (opcional)
4. **Personalizar el contenido** según tu marca
5. **Ajustar colores/espaciado** si es necesario

---

## Notas Técnicas

- Todos los componentes son **"use client"** porque usan hooks de React
- Las animaciones están optimizadas con **viewport={{ once: true }}** para mejor rendimiento
- El formulario incluye **validación HTML5** nativa
- Los componentes son **totalmente responsive** (mobile-first)
