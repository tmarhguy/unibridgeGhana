import { Target, Search, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

export function Features() {
  return (
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
  )
}
