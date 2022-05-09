import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useUsers } from 'hooks/useUsers'
import React from 'react'

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

function UserDetailsModal({ isOpen, onClose }: UserDetailsModalProps) {
  const { user } = useUsers()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box display="flex" alignItems="center">
            <Avatar
              borderRadius="full"
              src={user?.photo?.photo}
              name={user?.name}
            />
            <Text fontSize="md" marginLeft="12px">
              {user?.name}
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Heading size="md">Email</Heading>
            <Text fontSize="md" marginLeft="12px">
              {user?.email}
            </Text>
          </Stack>
          <Divider marginY="12px" />
          <Stack>
            <Heading size="md">Telefone celular</Heading>
            <Text fontSize="md" marginLeft="12px">
              {user?.mobile_phone}
            </Text>
          </Stack>
          <Divider marginY="12px" />
          <Stack>
            <Heading size="md">Data de cadastro</Heading>
            <Text fontSize="md" marginLeft="12px">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : '-'}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UserDetailsModal
