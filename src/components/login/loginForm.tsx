import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'hooks/useAuth'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaKey } from 'react-icons/fa'
import { loginValidatorSchema } from 'validators/login'

function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AuthDto>({
    resolver: yupResolver(loginValidatorSchema),
  })

  const { signIn, loading } = useAuth()

  const onSubmit = useCallback(
    async (data: AuthDto) => {
      await signIn(data)
    },
    [signIn]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email?.message}>
        <FormLabel htmlFor="name" fontWeight="bold">
          Email
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaEnvelope size="22" color="#31979599" />}
          />
          <Input id="email" placeholder="Email" {...register('email')} />
        </InputGroup>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password?.message} marginTop="12px">
        <FormLabel htmlFor="name" fontWeight="bold">
          Senha
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaKey size="22" color="#31979599" />}
          />
          <Input
            id="password"
            placeholder="Senha"
            type="password"
            {...register('password')}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        marginTop="32px"
        colorScheme="teal"
        isLoading={isSubmitting || loading}
        type="submit"
        width="100%"
      >
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm
