'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

interface University {
  id: string
  name: string
  shortName: string
  type: 'Public' | 'Private'
  location: string
  applicationFee: number
  deadline: Date
  applicationStatus: 'Not Started' | 'In Progress' | 'Submitted' | 'Under Review' | 'Decided'
  decision?: 'Admitted' | 'Rejected' | 'Waitlisted'
  programs: string[]
  selectedProgram?: string
  requirements: {
    minimumGrade: string
    requiredDocuments: string[]
    additionalRequirements?: string[]
  }
  logoUrl?: string
  website: string
  ranking?: number
}

// Compact University Card Component
interface UniversityCardProps {
  university: University
  daysUntilDeadline: number
  isDeadlineSoon: boolean
  isOverdue: boolean
  onRemove: () => void
  getStatusColor: (status: string) => string
  getDecisionColor: (decision: string | undefined) => string
}

const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  daysUntilDeadline,
  isDeadlineSoon,
  isOverdue,
  onRemove,
  getStatusColor,
  getDecisionColor
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`bg-white border rounded-lg transition-all hover:shadow-sm border-gray-200`}>
      {/* Compact Header - Always Visible */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{university.name}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-100 bg-gray-50">
          <div className="pt-3 space-y-3">
            {/* Status Information */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge className={`${getStatusColor(university.applicationStatus)} text-xs`}>
                {university.applicationStatus}
              </Badge>
              {university.decision && (
                <Badge className={`${getDecisionColor(university.decision)} text-xs`} variant="outline">
                  {university.decision}
                </Badge>
              )}
              {(isDeadlineSoon || isOverdue) && (
                <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                  isOverdue ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {isOverdue 
                    ? `${Math.abs(daysUntilDeadline)} days overdue`
                    : `${daysUntilDeadline} days left`
                  }
                </span>
              )}
            </div>

            {/* University Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="ml-1 font-medium">{university.location}</span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className={`ml-1 font-medium ${
                  university.type === 'Public' ? 'text-blue-700' : 'text-purple-700'
                }`}>
                  {university.type}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Fee:</span>
                <span className="ml-1 font-medium text-gray-900">GHS {university.applicationFee}</span>
              </div>
              <div>
                <span className="text-gray-600">Deadline:</span>
                <span className={`ml-1 font-medium ${
                  isOverdue ? 'text-red-600' : isDeadlineSoon ? 'text-orange-600' : 'text-gray-900'
                }`}>
                  {university.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Program & Requirements */}
            {university.selectedProgram && (
              <div className="text-sm">
                <span className="text-gray-600">Program:</span>
                <span className="ml-1 font-medium text-gray-900">{university.selectedProgram}</span>
              </div>
            )}
            
            <div className="text-sm">
              <span className="text-gray-600">Min Grade:</span>
              <span className="ml-1 font-medium text-gray-900">{university.requirements.minimumGrade}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex gap-2">
                {university.applicationStatus === 'Not Started' && (
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 px-3 text-xs">
                    <Link href={`/common-application?university=${university.id}`}>
                      Start Application
                    </Link>
                  </Button>
                )}
                {university.applicationStatus === 'In Progress' && (
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8 px-3 text-xs">
                    <Link href={`/common-application?university=${university.id}`}>
                      Continue
                    </Link>
                  </Button>
                )}
                {(university.applicationStatus === 'Submitted' || university.applicationStatus === 'Under Review' || university.applicationStatus === 'Decided') && (
                  <Button asChild size="sm" variant="outline" className="h-8 px-3 text-xs">
                    <Link href={`/applications/${university.id}`}>
                      View Application
                    </Link>
                  </Button>
                )}
                <Button asChild size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Link href={`/university-search?id=${university.id}`}>
                    Details
                  </Link>
                </Button>
              </div>
              
              <Button 
                size="sm"
                variant="outline" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove()
                }}
              >
                ×
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const MyUniversities: React.FC = () => {
  const [sortBy, setSortBy] = useState<'deadline' | 'fee' | 'status' | 'alphabetical'>('deadline')
  const [filterBy, setFilterBy] = useState<'all' | 'public' | 'private'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in real app this would come from API
  const [myUniversities, setMyUniversities] = useState<University[]>([
    {
      id: 'ug',
      name: 'University of Ghana',
      shortName: 'UG',
      type: 'Public',
      location: 'Legon, Accra',
      applicationFee: 220,
      deadline: new Date('2025-04-15'),
      applicationStatus: 'In Progress',
      programs: ['BSc Computer Science', 'BSc Mathematics', 'BA Economics'],
      selectedProgram: 'BSc Computer Science',
      requirements: {
        minimumGrade: 'Aggregate 24',
        requiredDocuments: ['WASSCE Results', 'Transcript', 'Personal Statement'],
        additionalRequirements: ['Credits in Core Math and English']
      },
      website: 'ug.edu.gh',
      ranking: 1
    },
    {
      id: 'knust',
      name: 'Kwame Nkrumah University of Science & Technology',
      shortName: 'KNUST',
      type: 'Public',
      location: 'Kumasi',
      applicationFee: 290,
      deadline: new Date('2025-03-31'),
      applicationStatus: 'Not Started',
      programs: ['BSc Computer Engineering', 'BSc Electrical Engineering', 'BSc Mechanical Engineering'],
      requirements: {
        minimumGrade: 'Aggregate 20',
        requiredDocuments: ['WASSCE Results', 'Transcript', 'Personal Statement', 'Portfolio (Engineering)'],
        additionalRequirements: ['Strong Math and Science grades']
      },
      website: 'knust.edu.gh',
      ranking: 2
    },
    {
      id: 'ashesi',
      name: 'Ashesi University',
      shortName: 'Ashesi',
      type: 'Private',
      location: 'Berekuso',
      applicationFee: 150,
      deadline: new Date('2025-05-01'),
      applicationStatus: 'Submitted',
      decision: 'Admitted',
      programs: ['BSc Computer Science', 'BSc Business Administration', 'BSc Engineering'],
      selectedProgram: 'BSc Computer Science',
      requirements: {
        minimumGrade: 'C6 in 6 subjects',
        requiredDocuments: ['WASSCE Results', 'Personal Essay', 'Recommendation Letters'],
        additionalRequirements: ['SAT scores (optional)', 'Interview may be required']
      },
      website: 'ashesi.edu.gh',
      ranking: 3
    },
    {
      id: 'ucc',
      name: 'University of Cape Coast',
      shortName: 'UCC',
      type: 'Public',
      location: 'Cape Coast',
      applicationFee: 220,
      deadline: new Date('2025-04-30'),
      applicationStatus: 'Under Review',
      programs: ['BSc Information Technology', 'BA Communication Studies', 'BSc Psychology'],
      selectedProgram: 'BSc Information Technology',
      requirements: {
        minimumGrade: 'Aggregate 30',
        requiredDocuments: ['WASSCE Results', 'Transcript', 'Personal Statement'],
      },
      website: 'ucc.edu.gh',
      ranking: 4
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Submitted':
        return 'bg-green-100 text-green-800'
      case 'Under Review':
        return 'bg-blue-100 text-blue-800'
      case 'Decided':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDecisionColor = (decision: string | undefined) => {
    switch (decision) {
      case 'Admitted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Waitlisted':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return ''
    }
  }

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const sortedAndFilteredUniversities = myUniversities
    .filter(uni => {
      const matchesFilter = filterBy === 'all' || uni.type.toLowerCase() === filterBy
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           uni.location.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return a.deadline.getTime() - b.deadline.getTime()
        case 'fee':
          return a.applicationFee - b.applicationFee
        case 'status':
          return a.applicationStatus.localeCompare(b.applicationStatus)
        case 'alphabetical':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const removeUniversity = (id: string) => {
    setMyUniversities(prev => prev.filter(uni => uni.id !== id))
  }

  const totalApplicationFees = myUniversities.reduce((sum, uni) => sum + uni.applicationFee, 0)
  const submittedApplications = myUniversities.filter(uni => 
    uni.applicationStatus === 'Submitted' || uni.applicationStatus === 'Under Review' || uni.applicationStatus === 'Decided'
  ).length

  return (
    <ProtectedRoute>
      <CommonAppLayout>
      <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Universities</h1>
          <p className="text-gray-600 mb-6">
            Manage your university applications, track deadlines, and monitor your progress
          </p>


        </div>

        {/* Controls - Compact Layout */}
        <div className="flex items-center gap-2 justify-between bg-gray-50 p-2 rounded-lg mb-4">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 w-32"
            />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'public' | 'private')}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'deadline' | 'fee' | 'status' | 'alphabetical')}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="deadline">By Deadline</option>
              <option value="status">By Status</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1 h-auto">
            <Link href="/university-search">
              + Add
            </Link>
          </Button>
        </div>

        {/* Universities List */}
        <div className="space-y-2">
          {sortedAndFilteredUniversities.map((university) => {
            const daysUntilDeadline = getDaysUntilDeadline(university.deadline)
            const isDeadlineSoon = daysUntilDeadline <= 7 && daysUntilDeadline > 0
            const isOverdue = daysUntilDeadline < 0

            return (
              <UniversityCard 
                key={university.id}
                university={university}
                daysUntilDeadline={daysUntilDeadline}
                isDeadlineSoon={isDeadlineSoon}
                isOverdue={isOverdue}
                onRemove={() => removeUniversity(university.id)}
                getStatusColor={getStatusColor}
                getDecisionColor={getDecisionColor}
              />
            )
          })}
        </div>

        {sortedAndFilteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterBy !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start building your college list by adding universities you\'re interested in.'
              }
            </p>
            <Button asChild>
              <Link href="/university-search">
                Browse Universities
              </Link>
            </Button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-between items-center p-6 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Ready to submit your applications?</h3>
            <p className="text-sm text-gray-600">Make sure all your applications are complete before submitting.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/documents">
                Upload Documents
              </Link>
            </Button>
            <Button asChild>
              <Link href="/payments">
                Review & Pay Fees
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </CommonAppLayout>
    </ProtectedRoute>
  )
}

export default MyUniversities
