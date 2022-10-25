import { createContext, useContext, useEffect, useState } from 'react'
import useApi from '../hooks/useApi'
import { User } from '../types/api'
import axios from '../utils/axios'
import { getUserLocal, setToken, setUserLocal } from '../utils/localStorage'

type Props = {
  children: React.ReactNode
}

type AuthContextProps = {
  user: User | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const api = useApi()

  useEffect(() => {
    const user = getUserLocal()

    if (user) {
      setUser(user)
    }

    setLoading(false)
  }, [])

  const signIn = async (username: string, password: string) => {
    const data = await api.signIn(username, password)

    if (data.user && data.token) {
      setToken(data.token)
      setUserLocal(data.user)

      axios.defaults.headers.Authorization = `Bearer ${data.token}`
      setUser(data.user)

      return true
    }

    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
