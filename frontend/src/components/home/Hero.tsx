import Link from 'next/link'
import { Button } from '@/components/ui/button'

const QUICK_STATS = [
  { label: 'Universities', value: '100+', color: 'text-emerald-600' },
  { label: 'Regions', value: '10', color: 'text-emerald-600' },
  { label: 'Students', value: '1000+', color: 'text-emerald-600' },
  { label: 'Success Rate', value: '95%', color: 'text-emerald-600' }
]

export function Hero() {
  return (
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
  )
}
