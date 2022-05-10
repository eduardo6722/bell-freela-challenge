import app from 'config/axios'

export async function createUserService(data: UserDto) {
  const form = new FormData()
  const { name, email, mobile_phone } = data
  form.append('name', name)
  form.append('email', email)
  form.append('mobile_phone', mobile_phone)
  return app.post<{ result: User }>('/user/create', form)
}

export async function updateUserService(data: UpdateUserDto) {
  const form = new FormData()
  const { name, email, mobile_phone, user_id } = data
  form.append('name', name)
  form.append('email', email)
  form.append('mobile_phone', mobile_phone)
  form.append('user_id', String(user_id))
  return app.post<{ result: User }>('/user/update', form)
}

export async function listUsersService() {
  return app.get<{ result: User[] }>('/user/list')
}

export async function savePhotoService(data: UserPhotoDto) {
  const form = new FormData()
  const { user_id, file } = data
  form.append('user_id', String(user_id))
  form.append('file', file)
  return app.post<{ photo: string }>('/photo/save', form)
}

export async function updatePhotoService(data: UserPhotoDto) {
  const form = new FormData()
  const { user_id, file } = data
  form.append('user_id', String(user_id))
  form.append('file', file)
  return app.post<{ photo: string }>('/photo/update', form)
}
