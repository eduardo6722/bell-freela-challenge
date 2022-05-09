import { Box, Button, Progress, useDisclosure } from '@chakra-ui/react'
import UserFormDrawer from 'components/home/userFormDrawer'
import UsersTable from 'components/home/usersTable'
import Layout from 'components/layout'
import UserDetailsModal from 'components/modals/userDetailsModal'
import { useAuth } from 'hooks/useAuth'
import { useUsers } from 'hooks/useUsers'
import { GetServerSidePropsContext } from 'next'
import { useCallback, useEffect } from 'react'
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa'
import { checkAuthService } from 'services/auth'

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenUserDetails,
    onOpen: onOpenUserDetails,
    onClose: onCloseUserDetails,
  } = useDisclosure()

  const { loading, fetchUsers, handleSetUser } = useUsers()
  const { signOut } = useAuth()

  const onSelectUser = useCallback(
    (user: User, showDetails?: boolean) => {
      handleSetUser(user)
      if (showDetails) {
        onOpenUserDetails()
      } else {
        onOpen()
      }
    },
    [handleSetUser, onOpen, onOpenUserDetails]
  )

  const handleClose = useCallback(() => {
    handleSetUser(undefined)
    onClose()
  }, [handleSetUser, onClose])

  const handleCloseUserDetails = useCallback(() => {
    handleSetUser(undefined)
    onCloseUserDetails()
  }, [handleSetUser, onCloseUserDetails])

  const onSuccess = useCallback(() => {
    handleClose()
    fetchUsers()
  }, [handleClose, fetchUsers])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <Layout>
      <UserFormDrawer
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={onSuccess}
      />
      <UserDetailsModal
        isOpen={isOpenUserDetails}
        onClose={handleCloseUserDetails}
      />
      <Box
        width="100%"
        display="flex"
        height="90px"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
        paddingX="24px"
        marginBottom="44px"
        borderRadius="md"
      >
        <Button
          leftIcon={<FaUserPlus size={22} />}
          colorScheme="green"
          onClick={onOpen}
        >
          Novo usuário
        </Button>

        <Button
          leftIcon={<FaSignOutAlt size={22} />}
          variant="ghost"
          colorScheme="green"
          onClick={signOut}
        >
          Sair
        </Button>
      </Box>
      {loading ? <Progress isIndeterminate colorScheme="green" /> : undefined}
      <UsersTable onSelectUser={onSelectUser} />
    </Layout>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (!checkAuthService(ctx)) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }
  return {
    props: {},
  }
}

export default Home
