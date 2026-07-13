import { Button } from '@/components/ui/button'
import { useKeycloak } from '@/lib/keycloak'

export function LogoutButton() {
  const { keycloak } = useKeycloak()

  return (
    <Button
      variant="outline"
      onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
    >
      Cerrar sesión
    </Button>
  )
}
