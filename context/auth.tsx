import { createContext, useState, useEffect, useContext } from 'react'

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

  const login = async (token: string) => {
    localStorage.setItem('auth_token', token)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
  }

  const value = { login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
