import * as yup from 'yup'

export const loginValidatorSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Informe sua senha'),
})
