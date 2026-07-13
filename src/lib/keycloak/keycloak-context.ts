import { createContext } from 'react'
import type Keycloak from 'keycloak-js'

export type KeycloakContextValue = {
  keycloak: Keycloak
  authenticated: boolean
}

export const KeycloakContext = createContext<KeycloakContextValue | undefined>(undefined)
