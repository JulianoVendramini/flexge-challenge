import { User } from '../types/api'

export const setToken = (token: string) => {
  localStorage.setItem('authToken', token)
}

export const getToken = () => {
  return localStorage.getItem('authToken')
}

export const setUserLocal = (user: User | null) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUserLocal = (): User | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
