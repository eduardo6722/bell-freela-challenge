import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Box width="100%" padding="24px">
      {children}
    </Box>
  )
}

export default Layout
