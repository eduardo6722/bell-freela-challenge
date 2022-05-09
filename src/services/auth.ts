import app from 'config/axios'
import { GetServerSidePropsContext } from 'next'
import nookies, { setCookie } from 'nookies'

export async function getAuthTokenService(data: AuthDto) {
  const authToken = await app.post<{ token: string }>('/token', data)
  if (authToken?.data?.token) {
    setCookie(null, 'token', authToken.data.token)
    return
  }
  throw new Error('Login inválido')
}

export function clearAuthService() {
  const token = nookies.get()['token']
  if (token) {
    nookies.destroy(null, 'token')
    localStorage.clear()
  }
  return
}

export function checkAuthService(ctx: GetServerSidePropsContext) {
  return !!nookies.get(ctx)['token']
}
