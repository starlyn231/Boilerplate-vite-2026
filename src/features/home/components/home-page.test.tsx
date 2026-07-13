import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import type Keycloak from 'keycloak-js'
import { render, screen } from '@/test/test-utils'
import { KeycloakContext } from '@/lib/keycloak/keycloak-context'
import { HomePage } from './home-page'

function renderHome(authenticated: boolean) {
  return render(
    <KeycloakContext.Provider value={{ keycloak: {} as Keycloak, authenticated }}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </KeycloakContext.Provider>,
  )
}

describe('HomePage', () => {
  it('does not show the dashboard link when unauthenticated', () => {
    renderHome(false)

    expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument()
  })

  it('shows the dashboard link when authenticated', () => {
    renderHome(true)

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
  })
})
