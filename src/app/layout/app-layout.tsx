import { Link, Outlet } from 'react-router-dom'
import { AuthStatus } from '@/features/auth'

export function AppLayout() {
  return (
    <div className="min-h-svh">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Perfil</Link>
        </nav>
        <AuthStatus />
      </header>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
