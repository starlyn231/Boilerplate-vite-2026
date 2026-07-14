import { useSidebar } from './use-sidebar'

export function Backdrop() {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar()

  if (!isMobileOpen) return null

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Cerrar menú"
      className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
      onClick={toggleMobileSidebar}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          toggleMobileSidebar()
        }
      }}
    />
  )
}
