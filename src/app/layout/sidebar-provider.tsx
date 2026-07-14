import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { SidebarContext } from './sidebar-context'

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSidebar = useCallback(() => setIsExpanded((prev) => !prev), [])
  const toggleMobileSidebar = useCallback(() => setIsMobileOpen((prev) => !prev), [])
  const closeMobileSidebar = useCallback(() => setIsMobileOpen(false), [])

  const value = useMemo(
    () => ({
      isExpanded,
      isHovered,
      isMobileOpen,
      toggleSidebar,
      toggleMobileSidebar,
      setIsHovered,
      closeMobileSidebar,
    }),
    [isExpanded, isHovered, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
