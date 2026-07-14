import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'
import { Backdrop } from './backdrop'
import { SidebarProvider } from './sidebar-provider'
import { useSidebar } from './use-sidebar'

function LayoutContent() {
  const { isExpanded, isHovered } = useSidebar()

  return (
    <div className="min-h-svh">
      <AppSidebar />
      <Backdrop />
      <div
        className={cn(
          'flex min-h-svh flex-col transition-all duration-300 ease-in-out',
          isExpanded || isHovered ? 'lg:ml-64' : 'lg:ml-20',
        )}
      >
        <AppHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}
