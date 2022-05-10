import { Box } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  onDrop: any
}

function Dropzone({ onDrop }: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
  })

  return (
    <Box
      borderRadius="24px"
      border="2px dashed gray"
      width="100%"
      height="120px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      padding="12px"
      textAlign="center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Clique ou arraste e solte uma imagem aqui...</p>
    </Box>
  )
}

export default Dropzone
