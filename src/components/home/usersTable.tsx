import {
  Avatar,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useUsers } from 'hooks/useUsers'
import { FaEdit, FaRegEye } from 'react-icons/fa'

interface UsersTableProps {
  onSelectUser: (user: User, showDetails?: boolean) => void
}

function UsersTable({ onSelectUser }: UsersTableProps) {
  const { users } = useUsers()

  return (
    <TableContainer boxShadow="md" borderRadius="md">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Foto</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Telefone celular</Th>
            <Th>Data de cadastro</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Avatar src={user?.photo?.photo} name={user?.name} />
              </Td>
              <Td>{user?.name}</Td>
              <Td>{user?.email}</Td>
              <Td>{user?.mobile_phone}</Td>
              <Td>
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : '-'}
              </Td>
              <Td>
                <Box display="flex" alignItems="center">
                  <Box>
                    <FaRegEye
                      size={22}
                      color="#31979599"
                      cursor="pointer"
                      onClick={() => onSelectUser(user, true)}
                    />
                  </Box>
                  <Box marginLeft="12px" onClick={() => onSelectUser(user)}>
                    <FaEdit size={22} color="#31979599" cursor="pointer" />
                  </Box>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
