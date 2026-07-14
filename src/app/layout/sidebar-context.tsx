import { createContext } from 'react'

export type SidebarContextValue = {
  isExpanded: boolean
  isHovered: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  toggleMobileSidebar: () => void
  setIsHovered: (value: boolean) => void
  closeMobileSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)
