import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthStatus } from '@/features/auth'
import { useSidebar } from './use-sidebar'

export function AppHeader() {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar()

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar()
    } else {
      toggleMobileSidebar()
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
      <Button variant="outline" size="icon" onClick={handleToggle} aria-label="Alternar menú">
        {isMobileOpen ? <X /> : <Menu />}
      </Button>
      <AuthStatus />
    </header>
  )
}
