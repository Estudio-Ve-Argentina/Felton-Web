/**
 * /coming-soon has its own isolated layout (no site header/footer/cart).
 * It must NOT be wrapped by StoreGate to avoid redirect loops.
 *
 * StoreGate in the root layout whitelists this path via the x-pathname header.
 */
export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
