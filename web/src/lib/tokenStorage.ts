import { isBrowser } from './isBrowser'

export const tokenKey = 'token' as const

/**
 * get token from local storage.
 */
export function getToken(): string | null {
  if (!isBrowser()) return null
  return window.localStorage.getItem(tokenKey)
}

/**
 * save token to local storage.
 */
export function setToken(token: string): void {
  if (!isBrowser()) return
  window.localStorage.setItem(tokenKey, token)
}

/**
 * remove token from local storage.
 */
export function removeToken(): void {
  if (!isBrowser()) return
  window.localStorage.removeItem(tokenKey)
}
