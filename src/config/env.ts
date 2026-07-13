function requireEnv(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  keycloak: {
    url: requireEnv('VITE_KEYCLOAK_URL', import.meta.env.VITE_KEYCLOAK_URL),
    realm: requireEnv('VITE_KEYCLOAK_REALM', import.meta.env.VITE_KEYCLOAK_REALM),
    clientId: requireEnv('VITE_KEYCLOAK_CLIENT_ID', import.meta.env.VITE_KEYCLOAK_CLIENT_ID),
  },
}
