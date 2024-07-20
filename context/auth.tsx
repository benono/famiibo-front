import { createContext, useState, useEffect, useContext } from 'react'
import apiClient from '../app/lib/apiClient'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: { id: string; username: string; email: string } | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{
    id: string
    username: string
    email: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
      apiClient
        .get('/users/me/')
        .then((res) => {
          console.log('user', res.data.user)
          setUser(res.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    console.log('user', user)
  }, [user])

  const login = async (token: string) => {
    localStorage.setItem('auth_token', token)
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
    apiClient
      .get('/users/me/')
      .then((res) => {
        console.log('user', res.data.user)
        setUser(res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logout = () => {
    apiClient.defaults.headers['Authorization'] = ''
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const value = { login, logout, user, loading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
