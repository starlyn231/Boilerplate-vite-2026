import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useKeycloak } from '@/lib/keycloak'

export function AuthStatus() {
  const { keycloak } = useKeycloak()
  const username = keycloak.tokenParsed?.preferred_username ?? keycloak.tokenParsed?.sub

  return (
    <Button
      variant="outline"
      size="icon"
      title={`Cerrar sesión (${username})`}
      aria-label={`Cerrar sesión (${username})`}
      onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
    >
      <User />
    </Button>
  )
}
