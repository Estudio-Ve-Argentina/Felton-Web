import { redirect } from "next/navigation"

/**
 * Los posts del blog se crean directamente en Tienda Nube.
 * Redirigimos al panel de TN.
 */
export default function NewBlogPost() {
  redirect("https://felton2.mitiendanube.com/admin/blog/")
}
