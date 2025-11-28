import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Dynamically import components
const Hero = dynamic(() => import('@/components/home/Hero').then(mod => mod.Hero))
const Features = dynamic(() => import('@/components/home/Features').then(mod => mod.Features))
const Process = dynamic(() => import('@/components/home/Process').then(mod => mod.Process))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold text-gray-900">UniBridge Ghana</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all hover:scale-105">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Hero />
      <Features />
      <Process />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold">UniBridge Ghana</span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link href="/login" className="hover:text-white">Apply</Link>
              <Link href="/login" className="hover:text-white">Universities</Link>
              <Link href="/login" className="hover:text-white">Scholarships</Link>
              <Link href="/login" className="hover:text-white">Dashboard</Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2025 UniBridge Ghana. Connecting students to their future.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
