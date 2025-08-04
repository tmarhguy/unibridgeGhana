'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignOutPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate sign out process
    const signOut = async () => {
      // Clear any stored authentication data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        sessionStorage.clear()
      }
      
      // Wait a moment to show the message
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }

    signOut()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">Signing Out</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600">
              You are being signed out securely...
            </p>
            <p className="text-sm text-gray-500">
              You will be redirected to the login page shortly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
