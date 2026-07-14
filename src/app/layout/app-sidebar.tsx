import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  ChevronDown,
  Home,
  LayoutDashboard,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from './use-sidebar'

type NavItem = {
  name: string
  icon: LucideIcon
  path?: string
  comingSoon?: boolean
  subItems?: { name: string; comingSoon?: boolean }[]
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Perfil', icon: User, path: '/profile' },
  {
    name: 'Reportes',
    icon: BarChart3,
    subItems: [
      { name: 'Ventas', comingSoon: true },
      { name: 'Tráfico', comingSoon: true },
    ],
  },
  { name: 'Configuración', icon: Settings, comingSoon: true },
]

export function AppSidebar() {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered, closeMobileSidebar } = useSidebar()
  const location = useLocation()
  const showLabels = isExpanded || isHovered || isMobileOpen

  const [openItem, setOpenItem] = useState<string | null>(null)
  const [submenuHeight, setSubmenuHeight] = useState<Record<string, number>>({})
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    closeMobileSidebar()
  }, [location.pathname, closeMobileSidebar])

  useEffect(() => {
    if (openItem && submenuRefs.current[openItem]) {
      setSubmenuHeight((prev) => ({
        ...prev,
        [openItem]: submenuRefs.current[openItem]?.scrollHeight ?? 0,
      }))
    }
  }, [openItem])

  return (
    <aside
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out',
        showLabels ? 'w-64' : 'w-20',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-sidebar-border px-4',
          showLabels ? 'justify-start' : 'justify-center',
        )}
      >
        <span className="text-lg font-semibold text-sidebar-primary">
          {showLabels ? 'My Portal' : 'MP'}
        </span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon

          if (item.subItems) {
            const isOpen = openItem === item.name

            return (
              <div key={item.name}>
                <button
                  type="button"
                  onClick={() => showLabels && setOpenItem(isOpen ? null : item.name)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    !showLabels && 'justify-center px-0',
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  {showLabels && <span className="flex-1 truncate text-left">{item.name}</span>}
                  {showLabels && (
                    <ChevronDown
                      className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')}
                    />
                  )}
                </button>
                {showLabels && (
                  <div
                    ref={(el) => {
                      submenuRefs.current[item.name] = el
                    }}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ height: isOpen ? (submenuHeight[item.name] ?? 0) : 0 }}
                  >
                    <ul className="ml-8 space-y-1 border-l border-sidebar-border py-1 pl-3">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.name}
                          className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/40"
                        >
                          {subItem.name}
                          {subItem.comingSoon && (
                            <span className="rounded-full bg-sidebar-accent px-2 py-0.5 text-[10px]">
                              Pronto
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          }

          if (item.comingSoon) {
            return (
              <div
                key={item.name}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/40',
                  !showLabels && 'justify-center px-0',
                )}
              >
                <Icon className="size-5 shrink-0" />
                {showLabels && <span className="flex-1 truncate">{item.name}</span>}
                {showLabels && (
                  <span className="rounded-full bg-sidebar-accent px-2 py-0.5 text-[10px]">
                    Pronto
                  </span>
                )}
              </div>
            )
          }

          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path!}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
                !showLabels && 'justify-center px-0',
              )}
            >
              <Icon className="size-5 shrink-0" />
              {showLabels && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
