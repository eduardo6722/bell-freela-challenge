import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from 'contexts/AuthContext'
import UsersProvider from 'contexts/UsersContext'
import type { AppProps } from 'next/app'
import 'styles/globals.css'
import theme from 'styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UsersProvider>
          <Component {...pageProps} />
        </UsersProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
