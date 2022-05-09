import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
  colors: '#fff',
}

const colors = {
  primary: '#319795',
}

const theme = extendTheme({ fonts, colors })

export default theme
