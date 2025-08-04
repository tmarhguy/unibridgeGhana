'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">💥</span>
                </div>
                <CardTitle className="text-2xl text-gray-900">Application Error</CardTitle>
                <CardDescription>
                  UniBridge Ghana encountered a critical error. Our team has been notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Button onClick={reset} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Restart Application
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'} 
                    variant="outline" 
                    className="w-full"
                  >
                    Go to Home Page
                  </Button>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">
                    If this problem persists, please contact our support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </body>
    </html>
  )
}
