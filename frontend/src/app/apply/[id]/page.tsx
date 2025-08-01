"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BookOpen, 
  ArrowLeft, 
  Save, 
  Send, 
  Upload,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react"

// Mock form definition - this would come from the backend
const mockFormDefinition = {
  id: 1,
  universityId: 1,
  universityName: "University of Ghana",
  programName: "Computer Science",
  sections: [
    {
      id: "personal",
      title: "Personal Information",
      description: "Basic information about yourself",
      fields: [
        {
          id: "fullName",
          type: "text",
          label: "Full Name",
          required: true,
          placeholder: "Enter your full name as it appears on official documents"
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          required: true,
          placeholder: "your.email@example.com"
        },
        {
          id: "phone",
          type: "tel",
          label: "Phone Number",
          required: true,
          placeholder: "+233 XX XXX XXXX"
        },
        {
          id: "dateOfBirth",
          type: "date",
          label: "Date of Birth",
          required: true
        }
      ]
    },
    {
      id: "academic",
      title: "Academic Background",
      description: "Your educational history and achievements",
      fields: [
        {
          id: "currentSchool",
          type: "text",
          label: "Current School",
          required: true,
          placeholder: "Name of your current institution"
        },
        {
          id: "gradeLevel",
          type: "select",
          label: "Current Grade Level",
          required: true,
          options: [
            { value: "shs3", label: "SHS 3" },
            { value: "alevel", label: "A-Level" },
            { value: "ib", label: "IB Diploma" },
            { value: "other", label: "Other" }
          ]
        },
        {
          id: "expectedGraduation",
          type: "month",
          label: "Expected Graduation",
          required: true
        },
        {
          id: "gpa",
          type: "number",
          label: "Current GPA/Aggregate",
          required: false,
          placeholder: "Your current academic standing"
        }
      ]
    },
    {
      id: "program",
      title: "Program Selection",
      description: "Choose your preferred program and provide motivation",
      fields: [
        {
          id: "primaryProgram",
          type: "select",
          label: "Primary Program Choice",
          required: true,
          options: [
            { value: "computer-science", label: "Computer Science" },
            { value: "engineering", label: "Engineering" },
            { value: "business", label: "Business Administration" },
            { value: "medicine", label: "Medicine" }
          ]
        },
        {
          id: "alternativeProgram",
          type: "select",
          label: "Alternative Program Choice",
          required: false,
          options: [
            { value: "computer-science", label: "Computer Science" },
            { value: "engineering", label: "Engineering" },
            { value: "business", label: "Business Administration" },
            { value: "medicine", label: "Medicine" }
          ]
        },
        {
          id: "motivation",
          type: "textarea",
          label: "Why do you want to study this program?",
          required: true,
          placeholder: "Explain your motivation and career goals (minimum 200 words)",
          minLength: 200
        }
      ]
    },
    {
      id: "documents",
      title: "Supporting Documents",
      description: "Upload required documents for your application",
      fields: [
        {
          id: "transcript",
          type: "file",
          label: "Academic Transcript",
          required: true,
          accept: ".pdf,.jpg,.jpeg,.png",
          description: "Upload your most recent academic transcript"
        },
        {
          id: "personalStatement",
          type: "file",
          label: "Personal Statement",
          required: true,
          accept: ".pdf,.doc,.docx",
          description: "A 500-word personal statement (PDF or Word document)"
        },
        {
          id: "recommendation",
          type: "file",
          label: "Letter of Recommendation",
          required: false,
          accept: ".pdf,.doc,.docx",
          description: "Optional: Letter from a teacher or counselor"
        }
      ]
    }
  ]
}

export default function ApplicationFormPage() {
  const router = useRouter()
  const params = useParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})

  const universityId = params?.id as string
  const formDefinition = mockFormDefinition // In real app, fetch based on universityId

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ""
      }))
    }
  }

  const handleFileUpload = (fieldId: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fieldId]: file
    }))
    handleInputChange(fieldId, file.name)
  }

  const validateSection = (sectionIndex: number) => {
    const section = formDefinition.sections[sectionIndex]
    const newErrors: Record<string, string> = {}

    section.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`
      }
      
      if (field.type === 'textarea' && 'minLength' in field && field.minLength) {
        const value = formData[field.id] || ""
        if (value.length < field.minLength) {
          newErrors[field.id] = `${field.label} must be at least ${field.minLength} characters`
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateSection(currentSection)) {
      if (currentSection < formDefinition.sections.length - 1) {
        setCurrentSection(currentSection + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement actual save to backend
      console.log("Saving draft:", { formData, uploadedFiles })
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Show success message
    } catch (error) {
      console.error("Save failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async () => {
    // Validate all sections
    let allValid = true
    for (let i = 0; i < formDefinition.sections.length; i++) {
      if (!validateSection(i)) {
        allValid = false
        setCurrentSection(i) // Go to first invalid section
        break
      }
    }

    if (!allValid) return

    setIsSubmitting(true)
    try {
      // TODO: Implement actual submission to backend
      console.log("Submitting application:", { formData, uploadedFiles })
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to success page
      router.push("/application-submitted")
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: any) => {
    const value = formData[field.id] || ""
    const error = errors[field.id]

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
      case "month":
      case "number":
        return (
          <div key={field.id} className="space-y-3">
            <Label htmlFor={field.id} className="text-base font-semibold text-gray-900 flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-2 text-lg">*</span>}
            </Label>
            <div className="relative">
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={`h-12 text-base border-2 transition-all duration-200 ${
                  error 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                } rounded-xl`}
              />
              {value && (
                <CheckCircle className="absolute right-3 top-3 h-6 w-6 text-green-500" />
              )}
            </div>
            {field.placeholder && (
              <p className="text-sm text-gray-500 mt-1">{field.placeholder}</p>
            )}
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-3">
            <Label htmlFor={field.id} className="text-base font-semibold text-gray-900 flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-2 text-lg">*</span>}
            </Label>
            <div className="relative">
              <select
                id={field.id}
                value={value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={`w-full h-12 px-4 text-base border-2 rounded-xl bg-white transition-all duration-200 ${
                  error 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
              >
                <option value="" className="text-gray-400">Select {field.label}</option>
                {field.options?.map((option: any) => (
                  <option key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
              {value && (
                <CheckCircle className="absolute right-3 top-3 h-6 w-6 text-green-500" />
              )}
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="space-y-3">
            <Label htmlFor={field.id} className="text-base font-semibold text-gray-900 flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-2 text-lg">*</span>}
            </Label>
            <div className="relative">
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                rows={8}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl resize-none transition-all duration-200 ${
                  error 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
              />
              {value && (
                <CheckCircle className="absolute right-3 top-3 h-6 w-6 text-green-500" />
              )}
            </div>
            <div className="flex items-center justify-between">
              {'minLength' in field && field.minLength && (
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    value.length >= field.minLength ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <p className={`text-sm ${
                    value.length >= field.minLength ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {value.length}/{field.minLength} characters minimum
                  </p>
                </div>
              )}
              <p className="text-sm text-gray-400">
                {value.length} characters
              </p>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        )

      case "file":
        return (
          <div key={field.id} className="space-y-3">
            <Label htmlFor={field.id} className="text-base font-semibold text-gray-900 flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-2 text-lg">*</span>}
            </Label>
            <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 ${
              error 
                ? "border-red-300 bg-red-50" 
                : uploadedFiles[field.id]
                ? "border-green-300 bg-green-50"
                : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
            }`}>
              <input
                id={field.id}
                type="file"
                accept={'accept' in field ? field.accept : undefined}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleFileUpload(field.id, file)
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center">
                {uploadedFiles[field.id] ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800 text-lg">File Uploaded Successfully</p>
                      <p className="text-green-600 text-sm mt-1">{uploadedFiles[field.id].name}</p>
                      <p className="text-green-500 text-xs mt-1">
                        {(uploadedFiles[field.id].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-200 text-green-700 hover:bg-green-100"
                      onClick={(e) => {
                        e.preventDefault()
                        // Trigger file input
                        document.getElementById(field.id)?.click()
                      }}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Upload {field.label}</p>
                      {'description' in field && field.description && (
                        <p className="text-gray-600 text-sm mt-2">{field.description}</p>
                      )}
                      <p className="text-blue-600 text-sm mt-2 font-medium">
                        Click to browse or drag and drop
                      </p>
                      {'accept' in field && field.accept && (
                        <p className="text-gray-400 text-xs mt-1">
                          Supported formats: {field.accept.replace(/\./g, '').toUpperCase()}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const currentSectionData = formDefinition.sections[currentSection]
  const progress = ((currentSection + 1) / formDefinition.sections.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.back()}
                className="flex items-center hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-blue-600">
                    UniBridge GH
                  </span>
                  <p className="text-sm text-gray-600">University Application Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Auto-saved</p>
                <p className="text-xs text-gray-500">All changes saved automatically</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="border-blue-200 hover:bg-blue-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Header */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">UG</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      {formDefinition.universityName}
                    </h1>
                    <p className="text-lg text-gray-600">Application for {formDefinition.programName}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Draft Saved
                      </span>
                      <span className="text-sm text-gray-500">Last updated: Just now</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Application ID</p>
                <p className="font-mono text-lg font-bold text-gray-900">#APP-2024-001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Application Progress</h3>
                <p className="text-sm text-gray-600">
                  Section {currentSection + 1} of {formDefinition.sections.length} • {Math.round(progress)}% Complete
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              {/* Progress milestones */}
              <div className="absolute top-0 w-full h-3 flex justify-between">
                {formDefinition.sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 -mt-0.5 ${
                      index < currentSection 
                        ? 'bg-green-500 border-green-500' 
                        : index === currentSection 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Sections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {formDefinition.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                    index === currentSection
                      ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md"
                      : index < currentSection
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      index === currentSection ? 'text-blue-700' : 
                      index < currentSection ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      Step {index + 1}
                    </span>
                    {index < currentSection && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {index === currentSection && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 ${
                    index === currentSection ? 'text-blue-900' : 
                    index < currentSection ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h4>
                  <p className={`text-xs ${
                    index === currentSection ? 'text-blue-600' : 
                    index < currentSection ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {section.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{currentSectionData.title}</h2>
                  <p className="text-blue-100">{currentSectionData.description}</p>
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <p className="text-white font-semibold">Step {currentSection + 1}</p>
                  <p className="text-blue-100 text-sm">of {formDefinition.sections.length}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-8">
                {currentSectionData.fields.map(renderField)}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="h-12 px-6 border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous Section
            </Button>

            <div className="flex items-center space-x-3">
              {/* Section indicators */}
              <div className="flex space-x-2">
                {formDefinition.sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index < currentSection 
                        ? 'bg-green-500' 
                        : index === currentSection 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {currentSection === formDefinition.sections.length - 1 ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-200"
                >
                  Continue to Next Section
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            variant="default"
            size="lg"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white"
          >
            <FileText className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
