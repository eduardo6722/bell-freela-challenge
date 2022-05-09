import * as yup from 'yup'

export const createUserValidatorSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  mobile_phone: yup.string().required('Telefone é obrigatório'),
})
