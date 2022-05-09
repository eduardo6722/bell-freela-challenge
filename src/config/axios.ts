import axios from 'axios'
import nookies from 'nookies'

const app = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_URL ||
    'https://cherry-custard-19143.herokuapp.com/api/v1',
})

app.interceptors.request.use((request) => {
  const token = nookies.get()['token']
  if (token && request?.headers) {
    ;(request.headers.common as any).Authorization = `Bearer ${token}`
  }
  return request
})

export default app
