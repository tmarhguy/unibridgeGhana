'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ELIGIBILITY_RULES } from '@/data/enhanced-features'

// Grade interfaces
interface WassceGrade {
  subject: string
  grade: string
  isCore: boolean
  isElective: boolean
}

interface EligibilityResult {
  university: string
  eligible: boolean
  reasons: string[]
  recommendations: string[]
  competitiveness: 'High' | 'Medium' | 'Low'
}

// WASSCE grading system
const GRADE_POINTS: { [key: string]: number } = {
  'A1': 1, 'B2': 2, 'B3': 3, 'C4': 4, 'C5': 5, 'C6': 6,
  'D7': 7, 'E8': 8, 'F9': 9
}

const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']

// Core and elective subjects
const CORE_SUBJECTS = [
  'Core Mathematics',
  'English Language', 
  'Integrated Science',
  'Social Studies'
]

const COMMON_ELECTIVES = [
  'Elective Mathematics',
  'Physics',
  'Chemistry', 
  'Biology',
  'Geography',
  'History',
  'Government',
  'Economics',
  'Literature in English',
  'French',
  'Visual Arts',
  'Music',
  'Physical Education',
  'Technical Drawing',
  'Food and Nutrition',
  'Management in Living'
]

// University requirements database
const UNIVERSITY_REQUIREMENTS = [
  {
    name: 'University of Ghana (UG)',
    type: 'public',
    maxAggregate: 24,
    minCore: 'C6',
    electiveSubjects: 3,
    specialRequirements: {
      'Medicine': { maxAggregate: 8, required: ['Physics', 'Chemistry', 'Biology'] },
      'Engineering': { maxAggregate: 12, required: ['Physics', 'Chemistry', 'Elective Mathematics'] },
      'Law': { maxAggregate: 15, required: ['Literature in English', 'History'] },
      'Business': { maxAggregate: 20, required: ['Elective Mathematics', 'Economics'] }
    }
  },
  {
    name: 'Kwame Nkrumah University of Science and Technology (KNUST)',
    type: 'public',
    maxAggregate: 24,
    minCore: 'C6',
    electiveSubjects: 3,
    specialRequirements: {
      'Medicine': { maxAggregate: 6, required: ['Physics', 'Chemistry', 'Biology'] },
      'Engineering': { maxAggregate: 12, required: ['Physics', 'Chemistry', 'Elective Mathematics'] },
      'Architecture': { maxAggregate: 15, required: ['Physics', 'Elective Mathematics', 'Technical Drawing'] },
      'Pharmacy': { maxAggregate: 10, required: ['Physics', 'Chemistry', 'Biology'] }
    }
  },
  {
    name: 'University of Cape Coast (UCC)',
    type: 'public',
    maxAggregate: 30,
    minCore: 'C6',
    electiveSubjects: 3,
    specialRequirements: {
      'Medicine': { maxAggregate: 12, required: ['Physics', 'Chemistry', 'Biology'] },
      'Education': { maxAggregate: 28, required: ['Elective Mathematics'] },
      'Business': { maxAggregate: 25, required: ['Economics', 'Elective Mathematics'] }
    }
  },
  {
    name: 'Ashesi University',
    type: 'private',
    maxAggregate: 36,
    minCore: 'C6',
    electiveSubjects: 3,
    specialRequirements: {
      'Computer Science': { maxAggregate: 18, required: ['Elective Mathematics', 'Physics'] },
      'Engineering': { maxAggregate: 18, required: ['Physics', 'Chemistry', 'Elective Mathematics'] },
      'Business': { maxAggregate: 24, required: ['Elective Mathematics', 'Economics'] }
    }
  },
  {
    name: 'Lancaster University Ghana (LUG)',
    type: 'private',
    maxAggregate: 30,
    minCore: 'C6',
    electiveSubjects: 3,
    specialRequirements: {
      'Computer Science': { maxAggregate: 20, required: ['Elective Mathematics', 'Physics'] },
      'Business': { maxAggregate: 25, required: ['Economics', 'Elective Mathematics'] },
      'Psychology': { maxAggregate: 24, required: ['Biology', 'Elective Mathematics'] }
    }
  },
  {
    name: 'Accra Technical University (ATU)',
    type: 'technical',
    maxAggregate: 36,
    minCore: 'C6',
    electiveSubjects: 3,
    specialRequirements: {
      'Civil Engineering': { maxAggregate: 30, required: ['Physics', 'Chemistry', 'Elective Mathematics'] },
      'Computer Science': { maxAggregate: 32, required: ['Elective Mathematics', 'Physics'] },
      'Business': { maxAggregate: 35, required: ['Economics', 'Elective Mathematics'] }
    }
  }
]

const EligibilityCheckerPage: React.FC = () => {
  const [coreGrades, setCoreGrades] = useState<{ [key: string]: string }>({
    'Core Mathematics': '',
    'English Language': '',
    'Integrated Science': '',
    'Social Studies': ''
  })
  
  const [electiveGrades, setElectiveGrades] = useState<{ [key: string]: string }>({})
  const [selectedElectives, setSelectedElectives] = useState<string[]>([])
  const [intendedProgram, setIntendedProgram] = useState<string>('')
  const [results, setResults] = useState<EligibilityResult[]>([])
  const [showResults, setShowResults] = useState(false)

  // Add elective subject
  const addElective = (subject: string) => {
    if (selectedElectives.length < 6 && !selectedElectives.includes(subject)) {
      setSelectedElectives([...selectedElectives, subject])
      setElectiveGrades({ ...electiveGrades, [subject]: '' })
    }
  }

  // Remove elective subject
  const removeElective = (subject: string) => {
    setSelectedElectives(selectedElectives.filter(s => s !== subject))
    const newElectiveGrades = { ...electiveGrades }
    delete newElectiveGrades[subject]
    setElectiveGrades(newElectiveGrades)
  }

  // Calculate aggregate
  const calculateAggregate = (includeElectives: string[] = []) => {
    const corePoints = Object.values(coreGrades)
      .map(grade => GRADE_POINTS[grade] || 9)
      .reduce((sum, points) => sum + points, 0)

    const electiveSubjectsToUse = includeElectives.length > 0 
      ? includeElectives 
      : selectedElectives.slice(0, 3)

    const electivePoints = electiveSubjectsToUse
      .map(subject => GRADE_POINTS[electiveGrades[subject]] || 9)
      .reduce((sum, points) => sum + points, 0)

    return corePoints + electivePoints
  }

  // Check eligibility
  const checkEligibility = () => {
    const eligibilityResults: EligibilityResult[] = []

    UNIVERSITY_REQUIREMENTS.forEach(university => {
      const aggregate = calculateAggregate()
      const reasons: string[] = []
      const recommendations: string[] = []
      let eligible = true

      // Check aggregate
      if (aggregate > university.maxAggregate) {
        eligible = false
        reasons.push(`Aggregate ${aggregate} exceeds maximum ${university.maxAggregate}`)
        recommendations.push(`Improve grades to reach aggregate ${university.maxAggregate} or below`)
      }

      // Check core subjects
      Object.entries(coreGrades).forEach(([subject, grade]) => {
        if (!grade || GRADE_POINTS[grade] > GRADE_POINTS[university.minCore]) {
          eligible = false
          reasons.push(`${subject}: ${grade || 'Missing'} (minimum required: ${university.minCore})`)
          recommendations.push(`Achieve at least ${university.minCore} in ${subject}`)
        }
      })

      // Check elective subjects count
      const validElectives = selectedElectives.filter(subject => 
        electiveGrades[subject] && GRADE_POINTS[electiveGrades[subject]] <= 6
      )
      
      if (validElectives.length < university.electiveSubjects) {
        eligible = false
        reasons.push(`Only ${validElectives.length} valid elective subjects (minimum: ${university.electiveSubjects})`)
        recommendations.push(`Add more elective subjects with grade C6 or better`)
      }

      // Check program-specific requirements
      if (intendedProgram && university.specialRequirements && university.specialRequirements[intendedProgram as keyof typeof university.specialRequirements]) {
        const programReq = university.specialRequirements[intendedProgram as keyof typeof university.specialRequirements]
        
        if (programReq && aggregate > programReq.maxAggregate) {
          eligible = false
          reasons.push(`${intendedProgram} requires aggregate ${programReq.maxAggregate} or better`)
        }

        if (programReq) {
          programReq.required.forEach((requiredSubject: string) => {
            const grade = electiveGrades[requiredSubject]
            if (!grade || GRADE_POINTS[grade] > 6) {
              eligible = false
              reasons.push(`${intendedProgram} requires ${requiredSubject} with grade C6 or better`)
              recommendations.push(`Take ${requiredSubject} and achieve at least C6`)
            }
          })
        }
      }

      // Determine competitiveness
      let competitiveness: 'High' | 'Medium' | 'Low' = 'Low'
      if (eligible) {
        if (aggregate <= university.maxAggregate * 0.5) {
          competitiveness = 'High'
        } else if (aggregate <= university.maxAggregate * 0.75) {
          competitiveness = 'Medium'
        }
      }

      // Add positive reasons for eligible candidates
      if (eligible) {
        reasons.push(`Meets all basic requirements`)
        if (aggregate <= university.maxAggregate * 0.6) {
          reasons.push(`Strong aggregate score`)
        }
      }

      eligibilityResults.push({
        university: university.name,
        eligible,
        reasons,
        recommendations,
        competitiveness
      })
    })

    setResults(eligibilityResults)
    setShowResults(true)
  }

  // Reset form
  const resetForm = () => {
    setCoreGrades({
      'Core Mathematics': '',
      'English Language': '',
      'Integrated Science': '',
      'Social Studies': ''
    })
    setElectiveGrades({})
    setSelectedElectives([])
    setIntendedProgram('')
    setResults([])
    setShowResults(false)
  }

  const currentAggregate = calculateAggregate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            University Eligibility Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check your WASSCE results against admission requirements for Ghana's top universities
          </p>
        </div>

        {!showResults ? (
          <div className="space-y-8">
            {/* Current Aggregate Display */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    Current Aggregate: {currentAggregate}
                  </div>
                  <div className="text-blue-100">
                    {currentAggregate <= 24 ? 'Excellent - Qualifies for most programs' :
                     currentAggregate <= 30 ? 'Good - Qualifies for many programs' :
                     currentAggregate <= 36 ? 'Fair - Some programs available' :
                     'Needs improvement for most programs'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Core Subjects (Required for All Universities)</CardTitle>
                <CardDescription>
                  All four core subjects must have grade C6 or better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CORE_SUBJECTS.map(subject => (
                    <div key={subject} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {subject} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={coreGrades[subject]}
                        onChange={(e) => setCoreGrades({
                          ...coreGrades,
                          [subject]: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Grade</option>
                        {GRADES.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Elective Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Elective Subjects</CardTitle>
                <CardDescription>
                  Add your elective subjects (minimum 3 required). Best 3 grades will be used for aggregate calculation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add Elective */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Add Elective Subject
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addElective(e.target.value)
                        e.target.value = ''
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Subject to Add</option>
                    {COMMON_ELECTIVES
                      .filter(subject => !selectedElectives.includes(subject))
                      .map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                  </select>
                </div>

                {/* Selected Electives */}
                <div className="space-y-4">
                  {selectedElectives.map(subject => (
                    <div key={subject} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">
                          {subject}
                        </label>
                      </div>
                      <div className="w-32">
                        <select
                          value={electiveGrades[subject] || ''}
                          onChange={(e) => setElectiveGrades({
                            ...electiveGrades,
                            [subject]: e.target.value
                          })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Grade</option>
                          {GRADES.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeElective(subject)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intended Program */}
            <Card>
              <CardHeader>
                <CardTitle>Intended Program (Optional)</CardTitle>
                <CardDescription>
                  Select your intended program to check program-specific requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <select
                  value={intendedProgram}
                  onChange={(e) => setIntendedProgram(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Program (Optional)</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Law">Law</option>
                  <option value="Business">Business Administration</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Education">Education</option>
                  <option value="Psychology">Psychology</option>
                </select>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={checkEligibility}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3"
                disabled={!Object.values(coreGrades).every(grade => grade) || selectedElectives.length < 3}
              >
                Check Eligibility
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="px-8 py-3"
              >
                Reset Form
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Eligibility Results</h2>
                  <div className="text-purple-100">
                    Your aggregate: {currentAggregate} | Program: {intendedProgram || 'General'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <Card key={index} className={`border-l-4 ${
                  result.eligible 
                    ? 'border-l-green-500 bg-green-50' 
                    : 'border-l-red-500 bg-red-50'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{result.university}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          result.eligible 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }>
                          {result.eligible ? 'Eligible' : 'Not Eligible'}
                        </Badge>
                        {result.eligible && (
                          <Badge className={
                            result.competitiveness === 'High' ? 'bg-blue-500 text-white' :
                            result.competitiveness === 'Medium' ? 'bg-yellow-500 text-white' :
                            'bg-gray-500 text-white'
                          }>
                            {result.competitiveness} Chance
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Reasons */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          {result.eligible ? 'Qualification Details' : 'Issues Found'}
                        </h4>
                        <ul className="text-sm space-y-1">
                          {result.reasons.map((reason, idx) => (
                            <li key={idx} className={`flex items-start gap-2 ${
                              result.eligible ? 'text-green-700' : 'text-red-700'
                            }`}>
                              <span className="mt-1">
                                {result.eligible ? '✓' : '✗'}
                              </span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendations */}
                      {result.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Recommendations</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {result.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setShowResults(false)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3"
              >
                Modify Results
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="px-8 py-3"
              >
                Start Over
              </Button>
            </div>

            {/* General Tips */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-800">Admission Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-2">For Eligible Universities</h4>
                    <ul className="text-sm text-indigo-600 space-y-1">
                      <li>• Apply early before deadlines</li>
                      <li>• Prepare for interviews if required</li>
                      <li>• Gather all required documents</li>
                      <li>• Consider backup options</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-2">For Competitive Programs</h4>
                    <ul className="text-sm text-indigo-600 space-y-1">
                      <li>• Highlight extracurricular activities</li>
                      <li>• Write compelling personal statements</li>
                      <li>• Get strong recommendation letters</li>
                      <li>• Consider alternative pathways</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-2">If Not Eligible</h4>
                    <ul className="text-sm text-indigo-600 space-y-1">
                      <li>• Consider WASSCE retakes</li>
                      <li>• Look at foundation programs</li>
                      <li>• Explore technical universities</li>
                      <li>• Consider private institutions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default EligibilityCheckerPage
