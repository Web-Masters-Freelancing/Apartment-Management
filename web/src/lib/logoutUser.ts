import Router from 'next/router'

import { removeToken } from '@/lib/tokenStorage'

/**
 * Logout function that can be called to trigger logout of an
 * M1 API user.
 */
export type LogoutUserFn = () => void

export const logoutUser: LogoutUserFn = () => {
  removeToken()

  if (!Router.asPath.includes('/login')) {
    Router.push('/login')
  }
}
