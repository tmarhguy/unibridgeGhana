"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isVerified: boolean
  createdAt: string
}

interface StudentProfile {
  id: string
  dateOfBirth?: string
  phoneNumber?: string
  gender?: string
  nationality?: string
  streetAddress?: string
  city?: string
  region?: string
  postalCode?: string
  currentSchool?: string
  programType?: string
  expectedGraduation?: string
  emergencyName?: string
  emergencyRelationship?: string
  emergencyPhone?: string
}

interface AuthContextType {
  user: User | null
  studentProfile: StudentProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<void>
  logout: () => void
  updateProfile: (profileData: any) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        // Mock user restoration from token
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          firstName: 'Student',
          lastName: 'User',
          isVerified: true,
          createdAt: new Date().toISOString()
        }
        
        const mockProfile: StudentProfile = {
          id: '1',
          phoneNumber: '+233 24 123 4567',
          nationality: 'Ghanaian'
        }
        
        setUser(mockUser)
        setStudentProfile(mockProfile)
      } catch (error) {
        console.error('Failed to refresh user:', error)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }
    }
    setIsLoading(false)
  }

  const refreshUser = async () => {
    try {
      // Mock refresh - in real app, this would fetch from API
      if (user) {
        setUser({ ...user })
        if (studentProfile) {
          setStudentProfile({ ...studentProfile })
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Mock authentication for demo purposes
      if (email && password) {
        // Create mock user data
        const mockUser: User = {
          id: '1',
          email: email,
          firstName: email.split('@')[0].split('.')[0] || 'Student',
          lastName: email.split('@')[0].split('.')[1] || 'User',
          isVerified: true,
          createdAt: new Date().toISOString()
        }
        
        const mockProfile: StudentProfile = {
          id: '1',
          phoneNumber: '+233 24 123 4567',
          nationality: 'Ghanaian',
          city: 'Accra',
          region: 'Greater Accra'
        }
        
        // Store mock token
        localStorage.setItem('access_token', 'mock_token_' + Date.now())
        
        setUser(mockUser)
        setStudentProfile(mockProfile)
        return
      }
      
      throw new Error('Invalid credentials')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    try {
      // Mock registration for demo purposes
      const mockUser: User = {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isVerified: true,
        createdAt: new Date().toISOString()
      }
      
      const mockProfile: StudentProfile = {
        id: '1',
        phoneNumber: '',
        nationality: 'Ghanaian'
      }
      
      // Store mock token
      localStorage.setItem('access_token', 'mock_token_' + Date.now())
      
      setUser(mockUser)
      setStudentProfile(mockProfile)
    } catch (error: any) {
      console.error('Registration failed:', error)
      throw new Error('Registration failed')
    }
  }

  const logout = async () => {
    try {
      // Clear local state and storage
      setUser(null)
      setStudentProfile(null)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = async (profileData: any) => {
    try {
      // Mock profile update
      if (user) {
        const updatedUser = { ...user, ...profileData }
        setUser(updatedUser)
        
        if (studentProfile) {
          const updatedProfile = { ...studentProfile, ...profileData }
          setStudentProfile(updatedProfile)
        }
      }
    } catch (error: any) {
      console.error('Profile update failed:', error)
      throw new Error(error.response?.data?.detail || 'Profile update failed')
    }
  }

  const value: AuthContextType = {
    user,
    studentProfile,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-unibridge-primary"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return null
    }

    return <Component {...props} />
  }
}
