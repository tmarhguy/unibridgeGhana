import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Target, Search, Shield, User, Building, Send } from 'lucide-react'

// Core features for landing page
const CORE_FEATURES = [
  {
    title: 'One Application, Multiple Universities',
    description: 'Apply to all Ghana universities with a single common application',
    icon: Target,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: 'Smart University Matching',
    description: 'Find universities that match your grades and preferences',
    icon: Search,
    color: 'from-emerald-400 to-emerald-500'
  },
  {
    title: 'Secure & Simple',
    description: 'Upload documents once, track applications in real-time',
    icon: Shield,
    color: 'from-emerald-600 to-emerald-700'
  }
]

const QUICK_STATS = [
  { label: 'Universities', value: '100+', color: 'text-emerald-600' },
  { label: 'Regions', value: '10', color: 'text-emerald-600' },
  { label: 'Students', value: '1000+', color: 'text-emerald-600' },
  { label: 'Success Rate', value: '95%', color: 'text-emerald-600' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold text-gray-900">UniBridge Ghana</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-gray-900 font-semibold">UniBridge Ghana</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Gateway to
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent block">
              Ghana Universities
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Apply to multiple universities in Ghana with one common application. Streamlined admissions process 
            for Ghana&apos;s top tertiary institutions with real-time tracking and support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Your Application
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-colors"
              >
                Create Account
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {QUICK_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose UniBridge Ghana?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplifying university admissions for students across Ghana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_FEATURES.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Simple CTA */}
          <div className="text-center mt-12">
            <Link href="/common-application">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create Profile</h3>
              <p className="text-gray-600">Set up your academic profile and upload documents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Universities</h3>
              <p className="text-gray-600">Select from 100+ universities across Ghana</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit & Track</h3>
              <p className="text-gray-600">Apply with one click and track your progress</p>
            </div>
          </div>
        </div>
      </section>

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
