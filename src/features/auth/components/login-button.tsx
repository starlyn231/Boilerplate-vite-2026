import { Button } from '@/components/ui/button'
import { useKeycloak } from '@/lib/keycloak'

export function LoginButton() {
  const { keycloak } = useKeycloak()

  return <Button onClick={() => keycloak.login()}>Iniciar sesión</Button>
}
