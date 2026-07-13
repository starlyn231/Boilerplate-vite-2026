import { Button } from '@/components/ui/button'
import { useKeycloak } from '@/lib/keycloak'

export function ProfilePage() {
  const { keycloak } = useKeycloak()
  const profile = keycloak.tokenParsed

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Usuario</dt>
        <dd>{profile?.preferred_username ?? '—'}</dd>
        <dt className="text-muted-foreground">Nombre</dt>
        <dd>{profile?.name ?? '—'}</dd>
        <dt className="text-muted-foreground">Email</dt>
        <dd>{profile?.email ?? '—'}</dd>
        <dt className="text-muted-foreground">Roles</dt>
        <dd>{profile?.realm_access?.roles?.join(', ') ?? '—'}</dd>
      </dl>
      <Button variant="outline" onClick={() => keycloak.accountManagement()}>
        Gestionar cuenta en Keycloak
      </Button>
    </div>
  )
}
