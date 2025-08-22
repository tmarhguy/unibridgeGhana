'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// API client for authentication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: 'STUDENT' | 'UNIV_ADMIN'
  isActive: boolean
  isVerified: boolean
  createdAt: string
}

interface StudentProfile {
  id: string
  phoneNumber: string
  nationality: string
  city?: string
  region?: string
  highSchool?: string
  graduationYear?: number
}

interface AuthContextType {
  user: User | null
  studentProfile: StudentProfile | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  updateProfile: (profileData: Partial<StudentProfile>) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      refreshUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('access_token')
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // TEMPORARY: Bypass authentication - any login will work
      console.log('🔓 AUTHENTICATION BYPASSED: Login successful for', email)
      
      // Create a mock user
      const mockUser: User = {
        id: '1',
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        phone: '+233000000000',
        role: 'STUDENT',
        isActive: true,
        isVerified: true,
        createdAt: new Date().toISOString(),
      }

      // Create a mock token
      const mockToken = 'mock-jwt-token-' + Date.now()
      localStorage.setItem('access_token', mockToken)

      setUser(mockUser)
      
      // Create a mock student profile
      const mockProfile: StudentProfile = {
        id: '1',
        phoneNumber: '+233000000000',
        nationality: 'Ghanaian',
        city: 'Accra',
        region: 'Greater Accra',
        highSchool: 'Demo High School',
        graduationYear: 2024,
      }
      setStudentProfile(mockProfile)
      
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true)
      setError(null)

      // TEMPORARY: Bypass registration - auto-login after registration
      console.log('🔓 REGISTRATION BYPASSED: Registration successful for', userData.email)
      
      // Auto-login after registration
      await login(userData.email, userData.password)
    } catch (error: any) {
      setError(error.message || 'Registration failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('🔓 LOGOUT: Clearing authentication')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('access_token')
      setUser(null)
      setStudentProfile(null)
      router.push('/login')
    }
  }

  const refreshUser = async () => {
    try {
      // TEMPORARY: Return mock user data
      const mockUser: User = {
        id: '1',
        email: 'demo@unibridge.gh',
        firstName: 'Demo',
        lastName: 'User',
        phone: '+233000000000',
        role: 'STUDENT',
        isActive: true,
        isVerified: true,
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)

      // Get student profile if user is a student
      if (mockUser.role === 'STUDENT') {
        const mockProfile: StudentProfile = {
          id: '1',
          phoneNumber: '+233000000000',
          nationality: 'Ghanaian',
          city: 'Accra',
          region: 'Greater Accra',
          highSchool: 'Demo High School',
          graduationYear: 2024,
        }
        setStudentProfile(mockProfile)
      }
    } catch (error: any) {
      console.error('Failed to refresh user:', error)
      // Clear invalid token
      localStorage.removeItem('access_token')
      setUser(null)
      setStudentProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (profileData: Partial<StudentProfile>) => {
    try {
      setError(null)
      
      // TEMPORARY: Mock profile update
      console.log('🔓 PROFILE UPDATE: Mock update successful', profileData)
      
      // Update the mock profile
      if (studentProfile) {
        const updatedProfile = { ...studentProfile, ...profileData }
        setStudentProfile(updatedProfile)
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update profile')
      throw error
    }
  }

  // Calculate isAuthenticated based on user state
  const isAuthenticated = !!user

  const value: AuthContextType = {
    user,
    studentProfile,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
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
