'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const CommonAppDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
              ← Back to Home
            </Button>
          </Link>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Common Application
            <span className="block text-emerald-600 text-3xl mt-2">for Ghana Universities</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            The revolutionary way to apply to universities in Ghana. Fill out your information once, 
            then submit to multiple universities with their specific requirements.
          </p>

          <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              🎯 How It Works: The Common App Advantage
            </h3>
            <p className="text-emerald-700">
              Instead of filling out separate applications for each university, complete ONE common application 
              with your personal details, academics, and essays. Then add each university's specific supplements. 
              Submit to multiple schools simultaneously.
            </p>
          </div>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Complete Common App</h3>
              <p className="text-sm text-blue-600">
                Fill personal info, academics, essays, and activities once
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">Select Universities</h3>
              <p className="text-sm text-purple-600">
                Choose which Ghana universities you want to apply to
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-b from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="font-semibold text-orange-800 mb-2">Complete Supplements</h3>
              <p className="text-sm text-orange-600">
                Answer each university's specific questions and requirements
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-b from-green-50 to-green-100 border-green-200">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                4️⃣
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Submit All</h3>
              <p className="text-sm text-green-600">
                Review and submit to multiple universities simultaneously
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
            <CardHeader>
              <CardTitle className="text-white text-2xl">For Students</CardTitle>
              <CardDescription className="text-emerald-100">
                Save time and reduce stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>70% reduction in redundant data entry</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Apply to multiple universities efficiently</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Track all applications in one dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Reduce application errors and omissions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardHeader>
              <CardTitle className="text-white text-2xl">For Universities</CardTitle>
              <CardDescription className="text-blue-100">
                Streamlined admissions process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Standardized core application data</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Custom supplements for specific needs</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Improved data quality and completeness</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>Increased applicant pool accessibility</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Participating Universities */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gray-900">Participating Universities</CardTitle>
            <CardDescription className="text-lg">
              Apply to these top Ghana universities through our Common Application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-b from-red-50 to-red-100 rounded-lg">
                <div className="text-3xl mb-2">🏛️</div>
                <h4 className="font-semibold text-red-800">University of Ghana</h4>
                <p className="text-sm text-red-600">Legon</p>
                <Badge className="mt-2 bg-red-500 text-white">Available</Badge>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
                <div className="text-3xl mb-2">⚙️</div>
                <h4 className="font-semibold text-blue-800">KNUST</h4>
                <p className="text-sm text-blue-600">Kumasi</p>
                <Badge className="mt-2 bg-blue-500 text-white">Available</Badge>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
                <div className="text-3xl mb-2">💼</div>
                <h4 className="font-semibold text-purple-800">Ashesi University</h4>
                <p className="text-sm text-purple-600">Berekuso</p>
                <Badge className="mt-2 bg-purple-500 text-white">Available</Badge>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="font-semibold text-green-800">University of Cape Coast</h4>
                <p className="text-sm text-green-600">Cape Coast</p>
                <Badge className="mt-2 bg-green-500 text-white">Available</Badge>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                + Many more universities joining the Common Application platform
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your University Applications?</h2>
              <p className="text-xl text-emerald-100 mb-8">
                Join thousands of students using the Common Application to apply to Ghana universities efficiently.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/common-application">
                  <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                    Start Your Application
                  </Button>
                </Link>
                <Link href="/universities">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 text-lg">
                    Browse Universities
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t border-emerald-400">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-emerald-100">Application</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Multiple</div>
                    <div className="text-emerald-100">Universities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">70%</div>
                    <div className="text-emerald-100">Time Saved</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CommonAppDemo
