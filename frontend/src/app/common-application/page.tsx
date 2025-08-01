'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import { COMMON_APPLICATION_SECTIONS, UNIVERSITY_SUPPLEMENTS } from '@/data/common-app-model'

// Type definitions for form fields
interface BaseField {
  key: string
  type: string
  label: string
  required: boolean
}

interface SelectField extends BaseField {
  type: 'select'
  options: string[]
}

interface LongTextField extends BaseField {
  type: 'longtext'
  description?: string
  minLength?: number
  maxLength?: number
}

interface TextField extends BaseField {
  type: 'text' | 'date' | 'wassce_grid'
  placeholder?: string
  description?: string
}

type FormField = SelectField | LongTextField | TextField

// Application state interface
interface ApplicationState {
  commonApp: {
    personal: Record<string, any>
    academic: Record<string, any>
    essays: Record<string, any>
    activities: Record<string, any>
  }
  selectedUniversities: string[]
  supplements: Record<string, Record<string, any>>
  currentStep: number
}

const CommonApplicationPage: React.FC = () => {
  const [applicationState, setApplicationState] = useState<ApplicationState>({
    commonApp: {
      personal: {},
      academic: {},
      essays: {},
      activities: {}
    },
    selectedUniversities: [],
    supplements: {},
    currentStep: 1
  })

  const [activeSection, setActiveSection] = useState('personal')

  // Calculate completion percentages
  const getCommonAppCompletion = () => {
    const totalFields = Object.values(COMMON_APPLICATION_SECTIONS)
      .flatMap((section: any) => section.fields)
      .filter((field: any) => field.required).length
    
    const completedFields = Object.values(applicationState.commonApp)
      .flatMap((section: any) => Object.keys(section)).length
    
    return Math.round((completedFields / totalFields) * 100)
  }

  const getSupplementCompletion = (universityId: string) => {
    const supplement = UNIVERSITY_SUPPLEMENTS[universityId as keyof typeof UNIVERSITY_SUPPLEMENTS]
    if (!supplement) return 0
    
    const totalFields = supplement.sections
      .flatMap((section: any) => section.fields)
      .filter((field: any) => field.required).length
    
    const completedFields = Object.keys(applicationState.supplements[universityId] || {}).length
    
    return Math.round((completedFields / totalFields) * 100)
  }

  // Toggle university selection
  const toggleUniversity = (universityId: string) => {
    const newSelected = applicationState.selectedUniversities.includes(universityId)
      ? applicationState.selectedUniversities.filter(id => id !== universityId)
      : [...applicationState.selectedUniversities, universityId]
    
    setApplicationState(prev => ({
      ...prev,
      selectedUniversities: newSelected
    }))
  }

  const commonAppCompletion = getCommonAppCompletion()

  return (
    <CommonAppLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Modern Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>Dashboard</span>
            <span>→</span>
            <span>Applications</span>
            <span>→</span>
            <span className="text-gray-900 font-medium">Common Application</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Application Journey
              </h1>
              <p className="text-lg text-gray-600">
                Complete once, apply everywhere. A modern approach to university applications in Ghana.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Last saved</div>
                <div className="text-sm font-medium text-gray-900">2 minutes ago</div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Modern Progress Dashboard - UCAS-inspired */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Application Progress</h2>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {Math.round((commonAppCompletion + (applicationState.selectedUniversities.length * 10)) / 2)}% Complete
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    commonAppCompletion > 0 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {commonAppCompletion > 0 ? (
                      <span className="text-green-600 text-xs">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xs">○</span>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Personal Profile</h3>
                <p className="text-sm text-gray-600 mb-3">Basic information & academics</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${commonAppCompletion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{commonAppCompletion}% complete</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    applicationState.selectedUniversities.length > 0 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {applicationState.selectedUniversities.length > 0 ? (
                      <span className="text-green-600 text-xs">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xs">○</span>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">University Selection</h3>
                <p className="text-sm text-gray-600 mb-3">Choose your target institutions</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {applicationState.selectedUniversities.length} selected
                  </Badge>
                  {applicationState.selectedUniversities.length > 0 && (
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      Ready for supplements
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    applicationState.selectedUniversities.filter(id => getSupplementCompletion(id) === 100).length > 0 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {applicationState.selectedUniversities.filter(id => getSupplementCompletion(id) === 100).length > 0 ? (
                      <span className="text-green-600 text-xs">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xs">○</span>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Supplements</h3>
                <p className="text-sm text-gray-600 mb-3">School-specific requirements</p>
                <div className="space-y-1">
                  {applicationState.selectedUniversities.length > 0 ? (
                    applicationState.selectedUniversities.map(id => (
                      <div key={id} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 truncate">
                          {UNIVERSITY_SUPPLEMENTS[id as keyof typeof UNIVERSITY_SUPPLEMENTS]?.institution.split(' ')[0]}
                        </span>
                        <span className="text-gray-500">{getSupplementCompletion(id)}%</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">Select universities first</span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    applicationState.selectedUniversities.length > 0 && 
                    applicationState.selectedUniversities.every(id => getSupplementCompletion(id) === 100) && 
                    commonAppCompletion === 100 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {applicationState.selectedUniversities.length > 0 && 
                     applicationState.selectedUniversities.every(id => getSupplementCompletion(id) === 100) && 
                     commonAppCompletion === 100 ? (
                      <span className="text-green-600 text-xs">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xs">○</span>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Submit & Pay</h3>
                <p className="text-sm text-gray-600 mb-3">Review and send applications</p>
                {applicationState.selectedUniversities.length > 0 && (
                  <div className="text-xs">
                    <div className="text-gray-600">Total fees:</div>
                    <div className="font-semibold text-gray-900">
                      GHS {applicationState.selectedUniversities.reduce((total, id) => {
                        const supplement = UNIVERSITY_SUPPLEMENTS[id as keyof typeof UNIVERSITY_SUPPLEMENTS]
                        return total + (supplement?.fees.application_fee || 0)
                      }, 0)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modern Sidebar - Inspired by UCAS Track */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Application Sections</h3>
                <p className="text-sm text-gray-600">Complete all required sections</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Core Application */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">CORE</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">Core Application</h4>
                    </div>
                    
                    <div className="space-y-2 ml-11">
                      {Object.entries(COMMON_APPLICATION_SECTIONS).map(([key, section]) => {
                        const isActive = activeSection === key
                        const isComplete = Object.keys(applicationState.commonApp[key as keyof typeof applicationState.commonApp] || {}).length > 0
                        
                        return (
                          <button
                            key={key}
                            onClick={() => setActiveSection(key)}
                            className={`w-full text-left p-3 rounded-lg transition-all group ${
                              isActive 
                                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                : 'hover:bg-gray-50 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm font-medium">{section.title}</div>
                                <div className="text-xs text-gray-500 mt-1">{section.description}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isComplete && (
                                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 text-xs">✓</span>
                                  </div>
                                )}
                                {isActive && (
                                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* University Selection */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">UNI</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">Universities</h4>
                    </div>
                    
                    <div className="ml-11">
                      <button
                        onClick={() => setActiveSection('universities')}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          activeSection === 'universities' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium">Choose Universities</div>
                            <div className="text-xs text-gray-500 mt-1">Select institutions to apply to</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {applicationState.selectedUniversities.length}
                            </Badge>
                            {activeSection === 'universities' && (
                              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Supplements */}
                  {applicationState.selectedUniversities.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">SUP</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">Supplements</h4>
                      </div>
                      
                      <div className="space-y-2 ml-11">
                        {applicationState.selectedUniversities.map(universityId => {
                          const supplement = UNIVERSITY_SUPPLEMENTS[universityId as keyof typeof UNIVERSITY_SUPPLEMENTS]
                          const completion = getSupplementCompletion(universityId)
                          const isActive = activeSection === `supplement_${universityId}`
                          
                          return (
                            <button
                              key={universityId}
                              onClick={() => setActiveSection(`supplement_${universityId}`)}
                              className={`w-full text-left p-3 rounded-lg transition-all ${
                                isActive 
                                  ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                                  : 'hover:bg-gray-50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{supplement?.institution}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {supplement?.sections.length} sections required
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{completion}%</span>
                                  {completion === 100 && (
                                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                      <span className="text-green-600 text-xs">✓</span>
                                    </div>
                                  )}
                                  {isActive && (
                                    <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                                  )}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Modern Form Design */}
          <div className="lg:col-span-3">
            {/* Common Application Sections */}
            {Object.entries(COMMON_APPLICATION_SECTIONS).map(([key, section]) => (
              activeSection === key && (
                <div key={key} className="bg-white rounded-2xl border border-gray-200">
                  {/* Modern Section Header */}
                  <div className="p-8 border-b border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {key === 'personal' ? '👤' : key === 'academic' ? '📚' : key === 'essays' ? '✍️' : '🏆'}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                        <p className="text-gray-600">{section.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (Object.keys(applicationState.commonApp[key as keyof typeof applicationState.commonApp] || {}).length / section.fields.length) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {Object.keys(applicationState.commonApp[key as keyof typeof applicationState.commonApp] || {}).length} of {section.fields.length} completed
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.fields.map((field: any, index: number) => (
                        <div 
                          key={field.key} 
                          className={`space-y-4 ${
                            field.type === 'longtext' || field.type === 'wassce_grid' ? 'md:col-span-2' : ''
                          }`}
                        >
                          <label className="block">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-semibold text-gray-900">
                                {field.label}
                              </span>
                              {field.required && (
                                <Badge className="bg-red-100 text-red-800 text-xs px-2 py-1">
                                  Required
                                </Badge>
                              )}
                            </div>
                            
                            {field.type === 'text' && (
                              <Input
                                placeholder={field.label}
                                className="w-full h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            )}
                            
                            {field.type === 'longtext' && (
                              <div className="relative">
                                <textarea
                                  placeholder={field.description || field.label}
                                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                  rows={6}
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                  0 / 500 words
                                </div>
                              </div>
                            )}
                            
                            {field.type === 'select' && field.options && (
                              <select className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                                <option value="">Select {field.label}</option>
                                {field.options.map((option: string) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            )}
                            
                            {field.type === 'date' && (
                              <Input
                                type="date"
                                className="w-full h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            )}
                            
                            {field.type === 'wassce_grid' && (
                              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">W</span>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">WASSCE Results</h4>
                                    <p className="text-sm text-gray-600">Enter your subject grades (A1-F9)</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {['Core Mathematics', 'English Language', 'Integrated Science', 'Social Studies'].map(subject => (
                                    <div key={subject} className="bg-white p-4 rounded-lg border border-gray-200">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900">{subject}</span>
                                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                          <option value="">Grade</option>
                                          {['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'].map(grade => (
                                            <option key={grade} value={grade}>{grade}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {field.description && field.type !== 'wassce_grid' && (
                              <p className="text-sm text-gray-500 mt-2">{field.description}</p>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
                      <Button variant="outline" className="border-gray-300 text-gray-600">
                        Save as Draft
                      </Button>
                      <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8">
                        Continue →
                      </Button>
                    </div>
                  </div>
                </div>
              )
            ))}

            {/* University Selection - Modern Grid Layout */}
            {activeSection === 'universities' && (
              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">🏛️</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Select Universities</h2>
                      <p className="text-gray-600">Choose the institutions you want to apply to</p>
                    </div>
                  </div>
                  
                  {applicationState.selectedUniversities.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {applicationState.selectedUniversities.length} Universities Selected
                          </h4>
                          <p className="text-sm text-gray-600">
                            Total application fees: GHS {applicationState.selectedUniversities.reduce((total, id) => {
                              const supplement = UNIVERSITY_SUPPLEMENTS[id as keyof typeof UNIVERSITY_SUPPLEMENTS]
                              return total + (supplement?.fees.application_fee || 0)
                            }, 0)}
                          </p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          Ready for supplements
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(UNIVERSITY_SUPPLEMENTS).map(([universityId, supplement]) => {
                      const isSelected = applicationState.selectedUniversities.includes(universityId)
                      
                      return (
                        <div
                          key={universityId}
                          className={`relative group cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'transform scale-105' 
                              : 'hover:transform hover:scale-102'
                          }`}
                          onClick={() => toggleUniversity(universityId)}
                        >
                          <div className={`border-2 rounded-2xl p-6 transition-all ${
                            isSelected 
                              ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg' 
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          }`}>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">
                                  {supplement.institution}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                  {supplement.supplement_title}
                                </p>
                                
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-500">Fee:</span>
                                    <span className="font-semibold">
                                      {supplement.fees.currency} {supplement.fees.application_fee}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-500">Supplements:</span>
                                    <span className="font-semibold">
                                      {supplement.sections.length} sections
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'border-purple-500 bg-purple-500' 
                                    : 'border-gray-300 group-hover:border-purple-300'
                                }`}>
                                  {isSelected && (
                                    <span className="text-white text-sm">✓</span>
                                  )}
                                </div>
                                
                                {isSelected && (
                                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>📝</span>
                                <span>
                                  {supplement.sections.map(s => s.title).join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {applicationState.selectedUniversities.length} of {Object.keys(UNIVERSITY_SUPPLEMENTS).length} universities selected
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8"
                      disabled={applicationState.selectedUniversities.length === 0}
                    >
                      Continue to Supplements →
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* University Supplements - Enhanced Design */}
            {applicationState.selectedUniversities.map(universityId => (
              activeSection === `supplement_${universityId}` && (
                <div key={universityId} className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-8 border-b border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">📋</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {UNIVERSITY_SUPPLEMENTS[universityId as keyof typeof UNIVERSITY_SUPPLEMENTS]?.institution}
                        </h2>
                        <p className="text-gray-600">
                          {UNIVERSITY_SUPPLEMENTS[universityId as keyof typeof UNIVERSITY_SUPPLEMENTS]?.supplement_title}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Progress</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {getSupplementCompletion(universityId)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getSupplementCompletion(universityId)}%` }}
                        ></div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">
                        {UNIVERSITY_SUPPLEMENTS[universityId as keyof typeof UNIVERSITY_SUPPLEMENTS]?.sections.length} sections
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    {UNIVERSITY_SUPPLEMENTS[universityId as keyof typeof UNIVERSITY_SUPPLEMENTS]?.sections.map((section, sectionIndex) => (
                      <div key={section.id} className="mb-12 last:mb-0">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 font-bold">{sectionIndex + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                            <p className="text-gray-600 text-sm">
                              {section.fields.filter((f: any) => f.required).length} required fields
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 ml-14">
                          {section.fields.map((field: any, fieldIndex: number) => (
                            <div key={field.key} className="space-y-4">
                              <label className="block">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {field.label}
                                  </span>
                                  {field.required && (
                                    <Badge className="bg-red-100 text-red-800 text-xs px-2 py-1">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                                
                                {field.type === 'select' && field.options && (
                                  <select className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                                    <option value="">Select {field.label}</option>
                                    {field.options.map((option: string) => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                )}
                                
                                {field.type === 'longtext' && (
                                  <div className="relative">
                                    <textarea
                                      placeholder={field.description || field.label}
                                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                      rows={8}
                                    />
                                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                      {field.minLength && (
                                        <span className="text-xs text-gray-400">
                                          Min {field.minLength} chars
                                        </span>
                                      )}
                                      <span className="text-xs text-gray-400">0 words</span>
                                    </div>
                                  </div>
                                )}
                                
                                {field.description && (
                                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-3">
                                    <div className="flex items-start gap-3">
                                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs">i</span>
                                      </div>
                                      <p className="text-sm text-blue-800">{field.description}</p>
                                    </div>
                                  </div>
                                )}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
                      <Button variant="outline" className="border-gray-300 text-gray-600">
                        Save as Draft
                      </Button>
                      <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8">
                        Complete Supplement →
                      </Button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Modern Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Application Status</div>
                  <div className="text-xs text-gray-600">
                    Core: {commonAppCompletion}% • Universities: {applicationState.selectedUniversities.length} • Supplements: {applicationState.selectedUniversities.filter(id => getSupplementCompletion(id) === 100).length} complete
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Auto-saved 2 min ago</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[1,2,3,4].map((step) => (
                      <div key={step} className={`w-2 h-2 rounded-full ${
                        step === 1 && commonAppCompletion > 0 ? 'bg-blue-500' :
                        step === 2 && applicationState.selectedUniversities.length > 0 ? 'bg-purple-500' :
                        step === 3 && applicationState.selectedUniversities.some(id => getSupplementCompletion(id) > 0) ? 'bg-orange-500' :
                        step === 4 && applicationState.selectedUniversities.every(id => getSupplementCompletion(id) === 100) && commonAppCompletion === 100 ? 'bg-green-500' :
                        'bg-gray-300'
                      }`}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-gray-300 text-gray-600">
                  Save Draft
                </Button>
                <Button 
                  className={`px-8 text-white ${
                    commonAppCompletion === 100 && applicationState.selectedUniversities.length > 0 && applicationState.selectedUniversities.every(id => getSupplementCompletion(id) === 100)
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!(commonAppCompletion === 100 && applicationState.selectedUniversities.length > 0 && applicationState.selectedUniversities.every(id => getSupplementCompletion(id) === 100))}
                >
                  {commonAppCompletion === 100 && applicationState.selectedUniversities.length > 0 && applicationState.selectedUniversities.every(id => getSupplementCompletion(id) === 100)
                    ? 'Submit Applications'
                    : 'Complete Required Sections'
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for fixed bottom nav */}
        <div className="h-20"></div>
      </div>
    </CommonAppLayout>
  )
}

export default CommonApplicationPage
