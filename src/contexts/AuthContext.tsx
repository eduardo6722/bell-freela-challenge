import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useCallback, useState } from 'react'
import { clearAuthService, getAuthTokenService } from 'services/auth'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const { push } = useRouter()

  const signIn = useCallback(
    async (data: AuthDto) => {
      try {
        setLoading(true)
        await getAuthTokenService(data)
        push('/home')
      } catch (error) {
        toast({
          title: 'Verifique os dados de login!',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [push, toast]
  )

  const signOut = useCallback(() => {
    clearAuthService()
    push('/login')
  }, [push])

  return (
    <AuthContext.Provider value={{ loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
