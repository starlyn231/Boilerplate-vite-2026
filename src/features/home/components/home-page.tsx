import { Link } from 'react-router-dom'
import { useKeycloak } from '@/lib/keycloak'

export function HomePage() {
  const { authenticated } = useKeycloak()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="text-muted-foreground">Esta página es pública.</p>
      {authenticated && (
        <p>
          <Link to="/dashboard" className="text-primary hover:underline">
            Ir al Dashboard
          </Link>
        </p>
      )}
    </div>
  )
}
