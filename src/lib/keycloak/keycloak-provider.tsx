import { useEffect, useRef, useState, type ReactNode } from 'react'
import { keycloak } from './keycloak-instance'
import { KeycloakContext } from './keycloak-context'

const MIN_VALIDITY_SECONDS = 30
const TOKEN_REFRESH_INTERVAL_MS = 6000

export function KeycloakProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const initStarted = useRef(false)

  useEffect(() => {
    if (initStarted.current) return
    initStarted.current = true

    keycloak.onAuthSuccess = () => setAuthenticated(true)
    keycloak.onAuthLogout = () => setAuthenticated(false)
    keycloak.onAuthRefreshError = () => setAuthenticated(false)

    keycloak
      .init({ onLoad: 'check-sso', pkceMethod: 'S256' })
      .then((isAuthenticated) => {
        setAuthenticated(isAuthenticated)
        setInitialized(true)
      })
      .catch(() => {
        setInitialized(true)
      })
  }, [])

  useEffect(() => {
    if (!authenticated) return

    const refreshInterval = setInterval(() => {
      keycloak.updateToken(MIN_VALIDITY_SECONDS).catch(() => setAuthenticated(false))
    }, TOKEN_REFRESH_INTERVAL_MS)

    return () => clearInterval(refreshInterval)
  }, [authenticated])

  if (!initialized) return null

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  )
}
