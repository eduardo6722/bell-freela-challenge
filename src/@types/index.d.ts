interface AuthDto {
  email: string
  password: string
}

interface User {
  id: number
  name: string
  email: string
  mobile_phone: string
  email_verified_at: string
  parent_id: number
  created_at: string
  updated_at: string
  photo: {
    id: number
    user_id: number
    photo: string
    created_at: string
    updated_at: string
  }
}

interface UserDto {
  name: string
  email: string
  mobile_phone: string
}

interface UpdateUserDto extends UserDto {
  user_id: number
}

interface UserPhotoDto {
  file: File
  user_id: number
}

type UpdateUserPhotoDto = UserPhotoDto

type ViewUserPhotoDto = UserPhotoDto

interface AuthContextProps {
  loading: boolean
  signIn: (data: AuthDto) => Promise<void>
  signOut: () => void
}

interface UsersContextProps {
  loading: boolean
  users: User[]
  user: User | undefined
  handleSetUser: (data: User | undefined) => void
  createUser: (
    data: UserDto,
    onSuccess?: () => void
  ) => Promise<User | undefined>
  updateUser: (
    data: UpdateUserDto,
    onSuccess?: () => void
  ) => Promise<User | undefined>
  savePhoto: (UserPhotoDto: UserPhotoDto) => Promise<void>
  updatePhoto: (UpdateUserPhotoDto: UpdateUserPhotoDto) => Promise<void>
  fetchUsers: () => Promise<void>
}
