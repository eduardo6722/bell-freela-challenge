import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Dropzone from 'components/dropzone'
import { useUsers } from 'hooks/useUsers'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaCheck,
  FaEnvelope,
  FaPlus,
  FaRegTrashAlt,
  FaUserAlt,
} from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { savePhotoService } from 'services/users'
import { createUserValidatorSchema } from 'validators/users'

interface UserFormProps {
  user: User | undefined
  onSuccess: () => void
}

function UserForm({ user, onSuccess }: UserFormProps) {
  const [userPhoto, setUserPhoto] = useState<File>()
  const [photoPreview, setPhotoPreview] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserDto>({
    resolver: yupResolver(createUserValidatorSchema),
  })

  const toast = useToast()

  const { loading, createUser, updateUser, updatePhoto } = useUsers()

  const onDrop = useCallback((files: File[]) => {
    if (files?.length) {
      const [file] = files
      setUserPhoto(file)
    }
  }, [])

  const onSubmit = useCallback(
    async (data: UserDto) => {
      if (user?.id) {
        const { id: user_id } = user
        await updateUser({ user_id, ...data }, onSuccess)
        if (userPhoto) {
          await updatePhoto({ user_id, file: userPhoto })
        }
      } else {
        const createdUser = await createUser(data, onSuccess)
        if (createdUser?.id && userPhoto) {
          await savePhotoService({ file: userPhoto, user_id: createdUser.id })
        }
      }
      toast({
        title: 'Dados salvos com sucesso!',
      })
      reset()
    },
    [
      user,
      createUser,
      userPhoto,
      reset,
      updateUser,
      updatePhoto,
      onSuccess,
      toast,
    ]
  )

  const handleRemoveImage = useCallback(() => {
    setUserPhoto(undefined)
    setPhotoPreview('')
  }, [])

  useEffect(() => {
    if (user?.photo?.photo && !userPhoto) {
      setPhotoPreview(user.photo.photo)
    }
    if (userPhoto) {
      setPhotoPreview(URL.createObjectURL(userPhoto as File))
    }
  }, [user?.photo?.photo, userPhoto])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {photoPreview ? (
        <Box display="flex" justifyContent="center" position="relative">
          <Avatar size="2xl" name="Dan Abrahmov" src={photoPreview} />
          <Box cursor="pointer" onClick={handleRemoveImage}>
            <FaRegTrashAlt size={22} color="red" />
          </Box>
        </Box>
      ) : (
        <Dropzone onDrop={onDrop} />
      )}
      <FormControl isInvalid={!!errors.email?.message} marginTop="32px">
        <FormLabel htmlFor="name">Email</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaEnvelope size="22" color="#31979599" />}
          />
          <Input
            id="email"
            placeholder="Email"
            defaultValue={user?.email}
            {...register('email')}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.name?.message} marginTop="24px">
        <FormLabel htmlFor="name">Nome</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaUserAlt size="22" color="#31979599" />}
          />
          <Input
            id="name"
            placeholder="Nome"
            type="name"
            defaultValue={user?.name}
            {...register('name')}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.name?.message} marginTop="24px">
        <FormLabel htmlFor="mobile_phone">Telefone celular</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaUserAlt size="22" color="#31979599" />}
          />
          <Input
            id="mobile_phone"
            placeholder="Telefone celular"
            type="mobile_phone"
            as={InputMask}
            mask="(99) 9 9999-9999"
            maskPlaceholder={null}
            defaultValue={user?.mobile_phone}
            {...register('mobile_phone')}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.mobile_phone && errors.mobile_phone.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        marginTop="32px"
        colorScheme="teal"
        isLoading={isSubmitting || loading}
        type="submit"
        width="100%"
        leftIcon={
          user ? (
            <FaCheck size={22} color="white" />
          ) : (
            <FaPlus size={22} color="white" />
          )
        }
      >
        {user ? 'Salvar' : 'Cadastrar'}
      </Button>
    </form>
  )
}

export default UserForm
