'use client'

import React from 'react'
import Navigation from '../navigation/Navigation'
import { ProtectedRoute } from '../ProtectedRoute'

interface CommonAppLayoutProps {
  children: React.ReactNode
  requireAuth?: boolean
}

const CommonAppLayout: React.FC<CommonAppLayoutProps> = ({ children, requireAuth = true }) => {
  const content = (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pb-8">
        {children}
      </main>
    </div>
  )

  if (requireAuth) {
    return (
      <ProtectedRoute>
        {content}
      </ProtectedRoute>
    )
  }

  return content
}

export default CommonAppLayout
