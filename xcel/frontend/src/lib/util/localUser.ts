import { User } from "lib/collections/user"

export const getLocalUser = () : User | null => {
  const savedUser = localStorage.getItem('user')

  return savedUser ? JSON.parse(savedUser) : null
}

export const setLocalUser = () => {

  localStorage.setItem('user', JSON.stringify({ id : new Date().getTime(), account: null }))
}