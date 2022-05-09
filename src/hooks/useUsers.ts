import { UsersContext } from 'contexts/UsersContext'
import { useContext } from 'react'

export function useUsers() {
  return useContext(UsersContext)
}
