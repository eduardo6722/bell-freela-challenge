import { useToast } from '@chakra-ui/react'
import { createContext, ReactNode, useCallback, useState } from 'react'
import {
  createUserService,
  listUsersService,
  savePhotoService,
  updatePhotoService,
  updateUserService,
} from 'services/users'

interface UsersProviderProps {
  children: ReactNode
}

export const UsersContext = createContext<UsersContextProps>(
  {} as UsersContextProps
)

function UsersProvider({ children }: UsersProviderProps) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User>()

  const toast = useToast()

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await listUsersService()
      if (response?.data?.result) {
        setUsers(response.data.result)
      }
    } catch (error) {
      toast({
        title: 'Falha ao buscar usuários!',
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createUser = useCallback(
    async (data: UserDto, onSuccess?: () => void) => {
      try {
        setLoading(true)
        const response = await createUserService(data)
        if (!!onSuccess) onSuccess()
        return response.data?.result as User
      } catch (error) {
        toast({
          title: 'Verifique os dados!',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const updateUser = useCallback(
    async (data: UpdateUserDto, onSuccess?: () => void) => {
      try {
        setLoading(true)
        const response = await updateUserService(data)
        if (!!onSuccess) onSuccess()
        return response.data?.result as User
      } catch (error) {
        toast({
          title: 'Verifique os dados!',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const savePhoto = useCallback(
    async (data: UserPhotoDto) => {
      try {
        setLoading(true)
        await savePhotoService(data)
        toast({
          title: 'Foto atualizada com sucesso!',
        })
      } catch (error) {
        toast({
          title: 'Verifique os dados!',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const updatePhoto = useCallback(
    async (data: UpdateUserPhotoDto) => {
      try {
        setLoading(true)
        await updatePhotoService(data)
        toast({
          title: 'Foto atualizada com sucesso!',
        })
      } catch (error) {
        toast({
          title: 'Verifique os dados!',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const handleSetUser = useCallback(
    (data: User | undefined) => setUser(data),
    []
  )

  return (
    <UsersContext.Provider
      value={{
        loading,
        users,
        user,
        handleSetUser,
        createUser,
        updateUser,
        savePhoto,
        updatePhoto,
        fetchUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
