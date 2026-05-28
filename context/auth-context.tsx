'use client'

import { createContext, useContext, useState } from 'react'
import { User } from '@/lib/types'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
  updateProfile: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: 'Nguyễn Văn A',
      email,
      phone: '0123456789',
      addresses: [],
      createdAt: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const register = (name: string, email: string, password: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone: '',
      addresses: [],
      createdAt: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
