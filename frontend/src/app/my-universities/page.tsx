'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import CommonAppLayout from '@/components/layout/CommonAppLayout'

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
        return 'bg-yellow-100 text-yellow-800'
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
    <CommonAppLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Universities</h1>
          <p className="text-gray-600 mb-6">
            Manage your university applications, track deadlines, and monitor your progress
          </p>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{myUniversities.length}</div>
                <div className="text-sm text-gray-600">Universities Added</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{submittedApplications}</div>
                <div className="text-sm text-gray-600">Applications Submitted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">GHS {totalApplicationFees}</div>
                <div className="text-sm text-gray-600">Total Application Fees</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {myUniversities.filter(uni => uni.decision === 'Admitted').length}
                </div>
                <div className="text-sm text-gray-600">Acceptances</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Types</option>
              <option value="public">Public Universities</option>
              <option value="private">Private Universities</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="fee">Sort by Application Fee</option>
              <option value="status">Sort by Status</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
          </div>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/university-search">
              + Add Universities
            </Link>
          </Button>
        </div>

        {/* Universities List */}
        <div className="space-y-4">
          {sortedAndFilteredUniversities.map((university) => {
            const daysUntilDeadline = getDaysUntilDeadline(university.deadline)
            const isDeadlineSoon = daysUntilDeadline <= 7 && daysUntilDeadline > 0
            const isOverdue = daysUntilDeadline < 0

            return (
              <Card key={university.id} className={`transition-all hover:shadow-md ${
                isDeadlineSoon ? 'border-orange-200 bg-orange-50' : 
                isOverdue ? 'border-red-200 bg-red-50' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{university.name}</CardTitle>
                        <Badge variant="outline" className={
                          university.type === 'Public' ? 'border-blue-200 text-blue-700' : 'border-purple-200 text-purple-700'
                        }>
                          {university.type}
                        </Badge>
                        {university.ranking && (
                          <Badge variant="outline" className="border-gray-200 text-gray-600">
                            #{university.ranking} in Ghana
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{university.location}</p>
                      {university.selectedProgram && (
                        <p className="text-sm font-medium text-gray-800">
                          Selected Program: {university.selectedProgram}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(university.applicationStatus)}>
                        {university.applicationStatus}
                      </Badge>
                      {university.decision && (
                        <Badge className={getDecisionColor(university.decision)} variant="outline">
                          {university.decision}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Application Fee</div>
                      <div className="font-semibold text-lg">GHS {university.applicationFee}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Deadline</div>
                      <div className={`font-semibold text-lg ${
                        isOverdue ? 'text-red-600' : isDeadlineSoon ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {university.deadline.toLocaleDateString()}
                        <div className="text-xs text-gray-500">
                          {isOverdue 
                            ? `${Math.abs(daysUntilDeadline)} days overdue`
                            : `${daysUntilDeadline} days left`
                          }
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Minimum Requirement</div>
                      <div className="font-semibold text-lg">{university.requirements.minimumGrade}</div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.requirements.requiredDocuments.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                    {university.requirements.additionalRequirements && (
                      <div className="mt-2">
                        <div className="text-sm text-gray-600">Additional Requirements:</div>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                          {university.requirements.additionalRequirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    {university.applicationStatus === 'Not Started' && (
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href={`/common-application?university=${university.id}`}>
                          Start Application
                        </Link>
                      </Button>
                    )}
                    {university.applicationStatus === 'In Progress' && (
                      <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href={`/common-application?university=${university.id}`}>
                          Continue Application
                        </Link>
                      </Button>
                    )}
                    {(university.applicationStatus === 'Submitted' || university.applicationStatus === 'Under Review' || university.applicationStatus === 'Decided') && (
                      <Button asChild variant="outline">
                        <Link href={`/applications/${university.id}`}>
                          View Application
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline">
                      <Link href={`/university-search?id=${university.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeUniversity(university.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
    </CommonAppLayout>
  )
}

export default MyUniversities
