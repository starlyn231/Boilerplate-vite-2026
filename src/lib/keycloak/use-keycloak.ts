import { useContext } from 'react'
import { KeycloakContext } from './keycloak-context'

export function useKeycloak() {
  const context = useContext(KeycloakContext)
  if (!context) {
    throw new Error('useKeycloak must be used within a KeycloakProvider')
  }
  return context
}
