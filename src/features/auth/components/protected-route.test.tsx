import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type Keycloak from 'keycloak-js'
import { render, screen } from '@/test/test-utils'
import { KeycloakContext } from '@/lib/keycloak/keycloak-context'
import { ProtectedRoute } from './protected-route'

function renderWithAuth(authenticated: boolean) {
  return render(
    <KeycloakContext.Provider value={{ keycloak: {} as Keycloak, authenticated }}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Secret dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </KeycloakContext.Provider>,
  )
}

describe('ProtectedRoute', () => {
  it('redirects to home when not authenticated', () => {
    renderWithAuth(false)

    expect(screen.getByText('Home page')).toBeInTheDocument()
    expect(screen.queryByText('Secret dashboard')).not.toBeInTheDocument()
  })

  it('renders the protected content when authenticated', () => {
    renderWithAuth(true)

    expect(screen.getByText('Secret dashboard')).toBeInTheDocument()
  })
})
