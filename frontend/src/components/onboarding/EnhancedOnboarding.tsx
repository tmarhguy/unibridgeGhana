'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  UserIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

const EnhancedOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Tell us about yourself",
      icon: <UserIcon className="w-6 h-6" />,
      completed: completedSteps.includes(1)
    },
    {
      id: 2,
      title: "Educational Background",
      description: "Your academic history",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      completed: completedSteps.includes(2)
    },
    {
      id: 3,
      title: "Interests & Goals",
      description: "What you want to study",
      icon: <HeartIcon className="w-6 h-6" />,
      completed: completedSteps.includes(3)
    },
    {
      id: 4,
      title: "Review & Complete",
      description: "Confirm your information",
      icon: <CheckCircleIcon className="w-6 h-6" />,
      completed: completedSteps.includes(4)
    }
  ]

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => [...prev, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      setCompletedSteps(prev => [...prev, currentStep])
      setShowSuccess(true)
      setTimeout(() => {
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }, 2000)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />
      case 2:
        return <EducationalBackgroundStep />
      case 3:
        return <InterestsStep />
      case 4:
        return <ReviewStep />
      default:
        return null
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-unibridge-primary via-unibridge-secondary to-unibridge-accent flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIconSolid className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Complete! 🎓</h2>
            <p className="text-gray-600 mb-6">
              Congratulations! Your profile is now set up and ready to go.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-unibridge-primary mr-2"></div>
                Taking you to your dashboard...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to UniBridge Ghana
            </h1>
            <p className="text-gray-600">
              Apply to multiple universities in one place
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Setup - Step {currentStep} of {steps.length}
            </h2>
            <Badge variant="outline">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          
          <Progress value={progress} className="mb-6" />
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={step.id > currentStep && !completedSteps.includes(step.id)}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                    ${step.completed ? 'bg-green-500 text-white' : 
                      step.id === currentStep ? 'bg-unibridge-primary text-white' : 
                      'bg-gray-200 text-gray-600'}
                    ${step.id <= currentStep || completedSteps.includes(step.id) ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                  `}
                >
                  {step.completed ? (
                    <CheckCircleIconSolid className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </button>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    step.id === currentStep ? 'text-unibridge-primary' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              {steps[currentStep - 1]?.icon}
              <span className="ml-2">{steps[currentStep - 1]?.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <BookmarkIcon className="w-4 h-4 mr-2" />
            Save for Later
          </Button>

          <Button
            onClick={handleNext}
            className="bg-unibridge-primary hover:bg-unibridge-primary/90 flex items-center"
          >
            {currentStep === steps.length ? 'Complete Setup' : 'Next'}
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Step Components
const PersonalInfoStep: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center">
        <UserIcon className="w-5 h-5 text-blue-600 mr-2" />
        <span className="text-sm font-medium text-blue-800">
          Tell us about your basic information
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">First Name *</label>
        <input 
          type="text" 
          placeholder="e.g., Kwame"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Last Name *</label>
        <input 
          type="text" 
          placeholder="e.g., Asante"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Email Address *</label>
        <input 
          type="email" 
          placeholder="e.g., kwame@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Phone Number *</label>
        <input 
          type="tel" 
          placeholder="e.g., +233 24 123 4567"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Date of Birth *</label>
        <input 
          type="date" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Gender</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    </div>
  </div>
)

const EducationalBackgroundStep: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center">
        <AcademicCapIcon className="w-5 h-5 text-green-600 mr-2" />
        <span className="text-sm font-medium text-green-800">
          Tell us about your education - e.g., Senior High School attended
        </span>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Senior High School *</label>
        <input 
          type="text" 
          placeholder="e.g., Achimota School"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Year of Completion *</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary">
            <option value="">Select year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">WAEC Index Number</label>
          <input 
            type="text" 
            placeholder="e.g., 1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
          />
          <p className="text-xs text-gray-500">
            We can fetch your results automatically if provided
          </p>
        </div>
      </div>
    </div>
  </div>
)

const InterestsStep: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center">
        <HeartIcon className="w-5 h-5 text-purple-600 mr-2" />
        <span className="text-sm font-medium text-purple-800">
          What are you passionate about studying?
        </span>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Preferred Field of Study *</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary">
          <option value="">Select field</option>
          <option value="engineering">Engineering & Technology</option>
          <option value="medicine">Medicine & Health Sciences</option>
          <option value="business">Business & Management</option>
          <option value="science">Natural Sciences</option>
          <option value="arts">Arts & Humanities</option>
          <option value="social-sciences">Social Sciences</option>
          <option value="education">Education</option>
          <option value="agriculture">Agriculture</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Career Goals</label>
        <textarea 
          placeholder="Tell us about your career aspirations..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unibridge-primary"
        />
      </div>
    </div>
  </div>
)

const ReviewStep: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center">
        <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-2" />
        <span className="text-sm font-medium text-blue-800">
          Review your information before completing setup
        </span>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Personal Information</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Review and confirm all your details are correct</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="confirm" className="rounded" />
        <label htmlFor="confirm" className="text-sm text-gray-700">
          I confirm all information is correct and complete
        </label>
      </div>
    </div>
  </div>
)

export default EnhancedOnboarding
