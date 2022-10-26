import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  logOut: () => void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const api = useApi()
  const navigate = useNavigate()

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
      setUser(data.user)

      axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` }

      return true
    }

    return false
  }

  const logOut = () => {
    setUser(null)
    setToken('')
    setUserLocal(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
