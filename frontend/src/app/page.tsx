import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Feature cards data with enhanced icons
const ENHANCED_FEATURES = [
  {
    title: 'Common Application',
    description: 'Apply to multiple universities with one application - fill once, submit everywhere',
    href: '/common-application',
    icon: '📋',
    color: 'from-emerald-500 to-emerald-600',
    stats: 'One App, Many Schools'
  },
  {
    title: 'University Search', 
    description: 'Advanced search and filtering for Ghana universities',
    href: '/university-search',
    icon: '🔍',
    color: 'from-blue-500 to-blue-600',
    stats: 'Smart Filtering'
  },
  {
    title: 'Document Upload',
    description: 'Secure document management for your applications',
    href: '/documents',
    icon: '📄',
    color: 'from-cyan-500 to-cyan-600',
    stats: 'Verified Uploads'
  },
  {
    title: 'Payment Center',
    description: 'Pay application fees with MoMo, cards, and bank transfers',
    href: '/payments',
    icon: '💳',
    color: 'from-green-500 to-green-600',
    stats: '15+ Payment Options'
  },
  {
    title: 'Student Dashboard',
    description: 'Track applications, notifications, and profile in one place',
    href: '/dashboard-new',
    icon: '📊',
    color: 'from-purple-500 to-purple-600',
    stats: 'Real-time Updates'
  },
  {
    title: 'Analytics Dashboard', 
    description: 'Comprehensive insights into Ghana university landscape',
    href: '/analytics',
    icon: '📈',
    color: 'from-indigo-500 to-indigo-600',
    stats: '10 Regions Covered'
  },
  {
    title: 'Scholarship Directory',
    description: 'Find funding opportunities from government and private sources',
    href: '/scholarships',
    icon: '🎓',
    color: 'from-orange-500 to-orange-600',
    stats: '20+ Scholarships'
  },
  {
    title: 'Eligibility Checker',
    description: 'Check your WASSCE results against university admission requirements',
    href: '/eligibility-checker',
    icon: '✅',
    color: 'from-pink-500 to-pink-600',
    stats: 'Smart Matching'
  }
]

const QUICK_STATS = [
  { label: 'Universities', value: '100+', color: 'text-blue-600' },
  { label: 'Regions', value: '10', color: 'text-green-600' },
  { label: 'Features', value: '8', color: 'text-purple-600' },
  { label: 'Students', value: '1000+', color: 'text-orange-600' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
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
            Apply to multiple universities with one common application. Streamlined admissions process 
            for Ghana&apos;s top tertiary institutions with real-time tracking and support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/common-application">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Common Application
              </Button>
            </Link>
            <Link href="/university-search">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-colors"
              >
                Browse Universities
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

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete University Application Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to apply, track, and manage your university applications in Ghana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENHANCED_FEATURES.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-gray-600 mb-3 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-medium rounded-full`}>
                      {feature.stats}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students using UniBridge to access Ghana&apos;s top universities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/common-application">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-white text-emerald-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Your Application
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 transition-colors"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="text-xl font-bold">UniBridge</span>
              </div>
              <p className="text-gray-400">
                Connecting students to Ghana&apos;s top universities through simplified applications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/common-application" className="hover:text-white">Common Application</Link></li>
                <li><Link href="/university-search" className="hover:text-white">University Search</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/documents" className="hover:text-white">Document Upload</Link></li>
                <li><Link href="/payments" className="hover:text-white">Payment Center</Link></li>
                <li><Link href="/eligibility-checker" className="hover:text-white">Eligibility Checker</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/scholarships" className="hover:text-white">Scholarships</Link></li>
                <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
                <li><Link href="/payment-channels" className="hover:text-white">Payment Guide</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UniBridge Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
