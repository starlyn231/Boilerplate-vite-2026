import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useKeycloak } from '@/lib/keycloak'

export function AuthStatus() {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()
  const username = keycloak.tokenParsed?.preferred_username ?? keycloak.tokenParsed?.sub

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: 'outline', size: 'icon' })}
        aria-label={`Cuenta (${username})`}
      >
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate('/profile')}>Ir a perfil</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
