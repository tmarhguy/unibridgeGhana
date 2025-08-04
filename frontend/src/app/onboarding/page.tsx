'use client'

import EnhancedOnboarding from '@/components/onboarding/EnhancedOnboarding'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function EnhancedOnboardingPage() {
  return (
    <ProtectedRoute>
      <EnhancedOnboarding />
    </ProtectedRoute>
  )
}
