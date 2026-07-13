import type { ReactNode } from 'react'
import { KeycloakProvider } from '@/lib/keycloak'

export function AppProviders({ children }: { children: ReactNode }) {
  return <KeycloakProvider>{children}</KeycloakProvider>
}
