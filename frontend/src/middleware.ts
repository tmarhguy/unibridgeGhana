import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/common-application',
  '/my-universities',
  '/documents',
  '/payments',
  '/scholarships',
  '/analytics',
  '/onboarding'
]

// Routes that should redirect to dashboard if user is already authenticated
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Simple token check - in a real app, you'd validate the JWT properly
  // For now, we'll rely on client-side authentication checks in ProtectedRoute components
  // This middleware provides basic routing protection
  
  // Allow all requests to pass through initially
  // The ProtectedRoute components will handle the actual authentication checks
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
