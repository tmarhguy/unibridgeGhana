'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  BookmarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

interface Section {
  id: string
  label: string
  done: boolean
  current?: boolean
  required: boolean
}

const CommonAppStyleLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true)

  const sections: Section[] = [
    { id: "dashboard", label: "Dashboard", done: true, required: false },
    { id: "profile", label: "Profile", done: true, required: true },
    { id: "family", label: "Family", done: false, current: true, required: true },
    { id: "education", label: "Education", done: false, required: true },
    { id: "testing", label: "Testing", done: false, required: true },
    { id: "activities", label: "Activities", done: false, required: false },
    { id: "writing", label: "Writing", done: false, required: true },
    { id: "courses", label: "Courses & Grades", done: false, required: true },
    { id: "my-colleges", label: "My Colleges", done: false, required: true },
    { id: "review", label: "Review and Submit", done: false, required: true },
  ]

  const completedSections = sections.filter(s => s.done).length
  const totalSections = sections.length
  const progressPercentage = Math.round((completedSections / totalSections) * 100)

  const handleInputChange = () => {
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    setHasUnsavedChanges(false)
    // Simulate save
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-unibridge-primary to-unibridge-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="font-semibold text-gray-900">UniBridge</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-neutral-500">
              {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
            </span>
            <div className="w-2 h-2 rounded-full bg-green-500 hidden sm:block"></div>
            <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
              Kwame A.
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <nav className={`
          lg:block ${isSidebarOpen ? 'block' : 'hidden'}
          lg:sticky lg:top-20 lg:h-fit
        `}>
          <Card className="p-4">
            {/* Progress Overview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Overall Progress</span>
                <span className="text-sm text-gray-600">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-100">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-unibridge-primary to-unibridge-secondary transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                {completedSections} of {totalSections} sections completed
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`
                    w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-left transition-colors
                    ${section.current ? 
                      'bg-unibridge-primary text-white' : 
                      'hover:bg-neutral-50 text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                      ${section.done ? 'bg-green-500' : 
                        section.current ? 'bg-white text-unibridge-primary' : 
                        'bg-gray-200'
                      }
                    `}>
                      {section.done ? (
                        <CheckIcon className="w-3 h-3 text-white" />
                      ) : (
                        <div className={`w-2 h-2 rounded-full ${
                          section.current ? 'bg-unibridge-primary' : 'bg-gray-400'
                        }`} />
                      )}
                    </div>
                    <span className="font-medium">{section.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {section.required && (
                      <span className={`text-xs ${section.current ? 'text-blue-100' : 'text-red-500'}`}>
                        *
                      </span>
                    )}
                    {section.done && (
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Tips Section */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <span className="text-white text-xs">💡</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-900">Tip</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Complete your profile first to auto-fill future sections and save time.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </nav>

        {/* Main Content Area */}
        <main className="space-y-6">
          {/* Form Section */}
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>Profile</span>
                <span>→</span>
                <span>Family Information</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Family</h1>
              <p className="mt-1 text-sm text-gray-600">
                Tell us about your family background. Fields marked with * are required.
              </p>
            </div>

            <form className="space-y-6" onChange={handleInputChange}>
              {/* Household Section */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Household Information
                </h3>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of people in household *
                    </label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary">
                      <option value="">Select number</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6+">6 or more</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Household income (optional)
                    </label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary">
                      <option value="">Prefer not to answer</option>
                      <option value="low">Below GH₵ 10,000</option>
                      <option value="medium">GH₵ 10,000 - GH₵ 50,000</option>
                      <option value="high">Above GH₵ 50,000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Parent/Guardian Information
                </h3>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian 1 Name *
                    </label>
                    <input 
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship *
                    </label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary">
                      <option value="">Select relationship</option>
                      <option value="mother">Mother</option>
                      <option value="father">Father</option>
                      <option value="guardian">Guardian</option>
                      <option value="stepmother">Stepmother</option>
                      <option value="stepfather">Stepfather</option>
                      <option value="grandparent">Grandparent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input 
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary"
                      placeholder="e.g., Teacher, Farmer, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Education Level
                    </label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary">
                      <option value="">Select level</option>
                      <option value="no-formal">No formal education</option>
                      <option value="primary">Primary education</option>
                      <option value="jhs">Junior High School</option>
                      <option value="shs">Senior High School</option>
                      <option value="vocational">Vocational/Technical</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelors">Bachelor's degree</option>
                      <option value="masters">Master's degree</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input 
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary"
                    placeholder="parent@example.com"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    We may send important updates about your application to this email.
                  </p>
                </div>
              </div>

              {/* Second Parent/Guardian (Optional) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">
                    Parent/Guardian 2 (Optional)
                  </h3>
                  <button 
                    type="button"
                    className="text-sm text-unibridge-primary hover:text-unibridge-primary/80"
                  >
                    + Add second parent/guardian
                  </button>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Emergency Contact
                </h3>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency contact name *
                    </label>
                    <input 
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number *
                    </label>
                    <input 
                      type="tel"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-unibridge-primary focus:ring-1 focus:ring-unibridge-primary"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Card>

          {/* Additional sections can be added here */}
        </main>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-0 z-30 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {hasUnsavedChanges ? (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Unsaved changes</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">All changes saved</span>
              </>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <BookmarkIcon className="w-4 h-4" />
              Save
            </Button>
            <Button 
              size="sm"
              className="bg-unibridge-primary hover:bg-unibridge-primary/90"
            >
              Continue to Education →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonAppStyleLayout
