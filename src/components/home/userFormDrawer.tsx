import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { useUsers } from 'hooks/useUsers'
import { FaEdit, FaUserPlus } from 'react-icons/fa'
import UserForm from './userForm'

interface UserFormDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

function UserFormDrawer({ isOpen, onClose, onSuccess }: UserFormDrawerProps) {
  const { user } = useUsers()

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="md"
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            height="44px"
          >
            {user ? (
              <FaEdit size={22} color="#31979599" />
            ) : (
              <FaUserPlus size={22} color="#31979599" />
            )}
            <Text fontSize="lg" marginLeft="12px">
              {user ? 'Editar usuário' : 'Cadastrar novo usuário'}
            </Text>
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <UserForm user={user} onSuccess={onSuccess} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default UserFormDrawer
