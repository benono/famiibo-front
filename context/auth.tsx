import { createContext, useState, useEffect, useContext } from 'react'
import apiClient from '../app/lib/apiClient'

interface AuthContextType {
  login: (token: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
  }, [])

  const login = async (token: string) => {
    localStorage.setItem('auth_token', token)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
  }

  const value = { login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
