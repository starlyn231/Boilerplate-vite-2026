import { AxiosError, type AxiosResponse } from 'axios'
import { keycloak } from '@/lib/keycloak'
import { api } from './axios-instance'
import { ApiError } from './api-error'

const MIN_TOKEN_VALIDITY_SECONDS = 5

api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    await keycloak.updateToken(MIN_TOKEN_VALIDITY_SECONDS)
    config.headers.Authorization = `Bearer ${keycloak.token}`
  }
  return config
})

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    if (error.response?.status === 401) {
      keycloak.login()
    }
    return Promise.reject(ApiError.fromAxiosError(error))
  },
)
