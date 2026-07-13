import type { AxiosError } from 'axios'

export class ApiError extends Error {
  status?: number
  code?: string

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.status = status
    this.code = code
  }

  static fromAxiosError(error: AxiosError<{ message?: string; code?: string }>) {
    return new ApiError(
      error.response?.data?.message ?? error.message,
      error.response?.status,
      error.response?.data?.code,
    )
  }
}
