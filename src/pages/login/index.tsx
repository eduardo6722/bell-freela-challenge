import { Box, Stack, Text } from '@chakra-ui/react'
import LoginForm from 'components/login/loginForm'
import { GetServerSidePropsContext } from 'next'
import { FaSignInAlt } from 'react-icons/fa'
import { checkAuthService } from 'services/auth'

function Login() {
  return (
    <Box display="flex" alignItems="stretch" height="100vh">
      <Box
        display="flex"
        backgroundColor="gray"
        flex="1"
        backgroundImage="/images/login-bg.jpg"
        backgroundSize="cover"
      ></Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        maxWidth="540px"
        alignItems="center"
      >
        <Stack width="100%" padding="44px">
          <Box display="flex" flexDirection="row" alignItems="center">
            <FaSignInAlt size={32} color="#31979599" />
            <Text fontSize="4xl" marginY="24px" marginLeft="12px">
              Login
            </Text>
          </Box>
          <LoginForm />
        </Stack>
      </Box>
    </Box>
  )
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
  return { props: {} }
}

export default Login
