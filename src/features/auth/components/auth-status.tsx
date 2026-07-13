import { Link } from 'react-router-dom'
import { useKeycloak } from '@/lib/keycloak'
import { LoginButton } from './login-button'
import { LogoutButton } from './logout-button'

export function AuthStatus() {
  const { keycloak, authenticated } = useKeycloak()

  if (!authenticated) {
    return <LoginButton />
  }

  const username = keycloak.tokenParsed?.preferred_username ?? keycloak.tokenParsed?.sub

  return (
    <div className="flex items-center gap-3">
      <Link to="/profile" className="text-sm font-medium hover:underline">
        {username}
      </Link>
      <LogoutButton />
    </div>
  )
}
