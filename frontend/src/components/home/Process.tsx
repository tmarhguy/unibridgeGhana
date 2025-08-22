import { User, Building, Send } from 'lucide-react'

export function Process() {
  return (
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
  )
}
