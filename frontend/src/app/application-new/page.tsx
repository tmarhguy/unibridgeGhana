'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

// API client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

interface FormField {
  key: string
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number'
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  minLength?: number
  maxLength?: number
  description?: string
}

interface FormSection {
  id: string
  title: string
  description: string
  fields: FormField[]
}

interface ApplicationData {
  [key: string]: any
}

interface ValidationError {
  field: string
  code: string
  message: string
}

const APPLICATION_SECTIONS: FormSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic personal details and contact information',
    fields: [
      {
        key: 'first_name',
        type: 'text',
        label: 'First Name',
        required: true,
        placeholder: 'Enter your first name'
      },
      {
        key: 'last_name',
        type: 'text',
        label: 'Last Name',
        required: true,
        placeholder: 'Enter your last name'
      },
      {
        key: 'email',
        type: 'text',
        label: 'Email Address',
        required: true,
        placeholder: 'your.email@example.com'
      },
      {
        key: 'phone',
        type: 'text',
        label: 'Phone Number',
        required: true,
        placeholder: '+233 XX XXX XXXX'
      },
      {
        key: 'date_of_birth',
        type: 'date',
        label: 'Date of Birth',
        required: true
      },
      {
        key: 'nationality',
        type: 'select',
        label: 'Nationality',
        required: true,
        options: ['Ghanaian', 'Nigerian', 'Kenyan', 'Other']
      }
    ]
  },
  {
    id: 'academic',
    title: 'Academic Background',
    description: 'Your educational history and qualifications',
    fields: [
      {
        key: 'high_school',
        type: 'text',
        label: 'High School Name',
        required: true,
        placeholder: 'Enter your high school name'
      },
      {
        key: 'graduation_year',
        type: 'number',
        label: 'Graduation Year',
        required: true,
        placeholder: '2024'
      },
      {
        key: 'wassce_index',
        type: 'text',
        label: 'WASSCE Index Number',
        required: true,
        placeholder: '0123456789'
      },
      {
        key: 'wassce_year',
        type: 'number',
        label: 'WASSCE Year',
        required: true,
        placeholder: '2024'
      },
      {
        key: 'aggregate_score',
        type: 'number',
        label: 'WASSCE Aggregate Score',
        required: true,
        placeholder: '6'
      }
    ]
  },
  {
    id: 'essays',
    title: 'Essays & Personal Statement',
    description: 'Tell us about yourself and your goals',
    fields: [
      {
        key: 'personal_statement',
        type: 'textarea',
        label: 'Personal Statement',
        required: true,
        placeholder: 'Tell us about yourself, your academic interests, and why you want to study at this university...',
        minLength: 200,
        maxLength: 1000,
        description: 'Minimum 200 characters, maximum 1000 characters'
      },
      {
        key: 'why_university',
        type: 'textarea',
        label: 'Why This University?',
        required: true,
        placeholder: 'Explain why you chose this specific university and how it aligns with your goals...',
        minLength: 150,
        maxLength: 800,
        description: 'Minimum 150 characters, maximum 800 characters'
      },
      {
        key: 'career_goals',
        type: 'textarea',
        label: 'Career Goals',
        required: false,
        placeholder: 'Describe your career aspirations and how this program will help you achieve them...',
        maxLength: 600,
        description: 'Maximum 600 characters'
      }
    ]
  },
  {
    id: 'activities',
    title: 'Extracurricular Activities',
    description: 'Your involvement in clubs, sports, and community service',
    fields: [
      {
        key: 'leadership_roles',
        type: 'textarea',
        label: 'Leadership Roles',
        required: false,
        placeholder: 'Describe any leadership positions you held in school or community organizations...',
        maxLength: 500
      },
      {
        key: 'community_service',
        type: 'textarea',
        label: 'Community Service',
        required: false,
        placeholder: 'Describe your volunteer work and community involvement...',
        maxLength: 500
      },
      {
        key: 'awards_honors',
        type: 'textarea',
        label: 'Awards & Honors',
        required: false,
        placeholder: 'List any academic or extracurricular awards you received...',
        maxLength: 400
      }
    ]
  },
  {
    id: 'preferences',
    title: 'Program Preferences',
    description: 'Your academic interests and program choices',
    fields: [
      {
        key: 'first_choice_program',
        type: 'select',
        label: 'First Choice Program',
        required: true,
        options: [
          'Computer Science',
          'Engineering',
          'Business Administration',
          'Medicine',
          'Law',
          'Arts & Humanities',
          'Social Sciences',
          'Natural Sciences'
        ]
      },
      {
        key: 'second_choice_program',
        type: 'select',
        label: 'Second Choice Program',
        required: false,
        options: [
          'Computer Science',
          'Engineering',
          'Business Administration',
          'Medicine',
          'Law',
          'Arts & Humanities',
          'Social Sciences',
          'Natural Sciences'
        ]
      },
      {
        key: 'campus_preference',
        type: 'select',
        label: 'Campus Preference',
        required: true,
        options: ['Main Campus', 'City Campus', 'No Preference']
      }
    ]
  }
]

const ApplicationForm: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<ApplicationData>({})
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (Object.keys(formData).length === 0) return

    setAutoSaveStatus('saving')
    try {
      // In a real implementation, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setAutoSaveStatus('saved')
      setLastSaved(new Date())
    } catch (error) {
      setAutoSaveStatus('error')
      console.error('Auto-save failed:', error)
    }
  }, [formData])

  // Auto-save effect
  useEffect(() => {
    const timeoutId = setTimeout(autoSave, 2000) // Auto-save after 2 seconds of inactivity
    return () => clearTimeout(timeoutId)
  }, [formData, autoSave])

  // Calculate progress
  const calculateProgress = () => {
    const totalFields = APPLICATION_SECTIONS.flatMap(section => section.fields).length
    const completedFields = Object.keys(formData).length
    return Math.round((completedFields / totalFields) * 100)
  }

  // Validate current section
  const validateSection = (sectionIndex: number) => {
    const section = APPLICATION_SECTIONS[sectionIndex]
    const errors: ValidationError[] = []

    section.fields.forEach(field => {
      const value = formData[field.key]
      
      if (field.required && (!value || value.toString().trim() === '')) {
        errors.push({
          field: field.key,
          code: 'REQUIRED',
          message: `${field.label} is required`
        })
      }

      if (value && field.minLength && value.toString().length < field.minLength) {
        errors.push({
          field: field.key,
          code: 'MIN_LENGTH',
          message: `${field.label} must be at least ${field.minLength} characters`
        })
      }

      if (value && field.maxLength && value.toString().length > field.maxLength) {
        errors.push({
          field: field.key,
          code: 'MAX_LENGTH',
          message: `${field.label} must be no more than ${field.maxLength} characters`
        })
      }
    })

    setValidationErrors(errors)
    return errors.length === 0
  }

  // Handle field change
  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Navigate to next section
  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, APPLICATION_SECTIONS.length - 1))
    }
  }

  // Navigate to previous section
  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0))
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateSection(currentSection)) {
      return
    }

    setIsSubmitting(true)
    try {
      // In a real implementation, this would submit to the backend
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      // Navigate to success page
      router.push('/application-success')
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentSectionData = APPLICATION_SECTIONS[currentSection]
  const progress = calculateProgress()

  return (
    <ProtectedRoute>
      <CommonAppLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                University Application Form
              </h1>
              <p className="text-gray-600">
                Complete your application to {user?.firstName}'s selected universities
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Application Progress
                </span>
                <span className="text-sm text-gray-500">{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              {/* Auto-save status */}
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  autoSaveStatus === 'saved' ? 'bg-green-500' :
                  autoSaveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xs text-gray-500">
                  {autoSaveStatus === 'saved' && lastSaved ? 
                    `Last saved ${lastSaved.toLocaleTimeString()}` :
                    autoSaveStatus === 'saving' ? 'Saving...' : 'Save failed'
                  }
                </span>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="mb-8">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {APPLICATION_SECTIONS.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      index === currentSection
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle>{currentSectionData.title}</CardTitle>
                <CardDescription>{currentSectionData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentSectionData.fields.map((field) => {
                    const error = validationErrors.find(e => e.field === field.key)
                    
                    return (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key} className="text-sm font-medium">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        
                        {field.description && (
                          <p className="text-xs text-gray-500">{field.description}</p>
                        )}

                        {field.type === 'text' && (
                          <Input
                            id={field.key}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className={error ? 'border-red-500' : ''}
                          />
                        )}

                        {field.type === 'textarea' && (
                          <Textarea
                            id={field.key}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={4}
                            className={error ? 'border-red-500' : ''}
                          />
                        )}

                        {field.type === 'select' && (
                          <Select
                            value={formData[field.key] || ''}
                            onValueChange={(value) => handleFieldChange(field.key, value)}
                          >
                            <SelectTrigger className={error ? 'border-red-500' : ''}>
                              <SelectValue placeholder={field.placeholder || 'Select an option'} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {field.type === 'number' && (
                          <Input
                            id={field.key}
                            type="number"
                            value={formData[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className={error ? 'border-red-500' : ''}
                          />
                        )}

                        {field.type === 'date' && (
                          <Input
                            id={field.key}
                            type="date"
                            value={formData[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                            className={error ? 'border-red-500' : ''}
                          />
                        )}

                        {error && (
                          <p className="text-sm text-red-600">{error.message}</p>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevSection}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    {currentSection < APPLICATION_SECTIONS.length - 1 ? (
                      <Button onClick={nextSection}>
                        Next Section
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CommonAppLayout>
    </ProtectedRoute>
  )
}

export default ApplicationForm
