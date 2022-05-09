import type { GetServerSidePropsContext, NextPage } from 'next'
import { useEffect } from 'react'
import { checkAuthService, getAuthTokenService } from 'services/auth'

const Home: NextPage = () => {
  useEffect(() => {
    async function getToken() {
      await getAuthTokenService({
        email: 'oeduardofreitas@gmail.com',
        password: 'password',
      })
    }
    getToken()
  }, [])
  return <div />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (checkAuthService(ctx)) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
  }
}

export default Home
