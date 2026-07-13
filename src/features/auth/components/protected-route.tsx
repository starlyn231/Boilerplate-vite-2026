import { Navigate, Outlet } from 'react-router-dom'
import { useKeycloak } from '@/lib/keycloak'

export function ProtectedRoute() {
  const { authenticated } = useKeycloak()

  if (!authenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
