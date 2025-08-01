'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Scholarship interface
interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  type: 'merit' | 'need' | 'partial' | 'full' | 'government'
  eligibility: string[]
  deadline: string
  universities: string[]
  description: string
  requirements: string[]
  applicationProcess: string
  coverage: string[]
  renewable: boolean
  contactInfo?: string
}

// Comprehensive scholarship data based on Ghana university research
const SCHOLARSHIPS_DATA: Scholarship[] = [
  // Government Scholarships
  {
    id: 'getfund',
    name: 'Ghana Education Trust Fund (GETFund)',
    provider: 'Government of Ghana',
    amount: 'Full tuition + allowances',
    type: 'government',
    eligibility: [
      'Ghanaian citizen',
      'Exceptional academic performance',
      'WASSCE aggregate 6-24',
      'Financial need demonstrated'
    ],
    deadline: '2025-04-30',
    universities: ['All public universities in Ghana'],
    description: 'Premier government scholarship covering full education costs for outstanding Ghanaian students.',
    requirements: [
      'WASSCE certificate with aggregate 6-24',
      'Birth certificate',
      'Financial status declaration',
      'District Assembly recommendation',
      'Medical certificate'
    ],
    applicationProcess: 'Apply through GETFund online portal with required documents',
    coverage: ['Tuition fees', 'Academic facility user fees', 'Residential facility fees', 'Monthly stipend'],
    renewable: true,
    contactInfo: 'getfund@gov.gh | +233-30-2665491'
  },

  {
    id: 'district_scholarship',
    name: 'District Assembly Scholarship',
    provider: 'Local District Assemblies',
    amount: 'GHS 2,000 - 5,000 per year',
    type: 'government',
    eligibility: [
      'Resident of sponsoring district',
      'Good academic standing',
      'Community service record',
      'Financial need'
    ],
    deadline: '2025-03-15',
    universities: ['All accredited universities'],
    description: 'Local government scholarship supporting students from specific districts.',
    requirements: [
      'District residency proof',
      'Academic transcripts',
      'Community service certificate',
      'Parental income statement'
    ],
    applicationProcess: 'Apply at local District Assembly office',
    coverage: ['Partial tuition', 'Books allowance'],
    renewable: true
  },

  // University-Specific Scholarships
  {
    id: 'ashesi_merit',
    name: 'Ashesi Merit Scholarship',
    provider: 'Ashesi University',
    amount: '50% - 100% tuition',
    type: 'merit',
    eligibility: [
      'Outstanding academic performance',
      'Leadership potential',
      'Community involvement',
      'Strong character references'
    ],
    deadline: '2025-02-28',
    universities: ['Ashesi University'],
    description: 'Comprehensive merit-based scholarship for exceptional students at Ashesi University.',
    requirements: [
      'SAT/WASSCE scores in top 10%',
      'Personal statement',
      'Two recommendation letters',
      'Leadership portfolio',
      'Interview'
    ],
    applicationProcess: 'Integrated with admission application on Ashesi portal',
    coverage: ['Tuition', 'Accommodation', 'Meals', 'Health insurance'],
    renewable: true,
    contactInfo: 'admissions@ashesi.edu.gh'
  },

  {
    id: 'lug_excellence',
    name: 'Lancaster University Ghana Excellence Award',
    provider: 'Lancaster University Ghana',
    amount: '£2,000 - £5,000',
    type: 'merit',
    eligibility: [
      'International/local students',
      'First-class admission grades',
      'Extra-curricular achievements',
      'Financial need consideration'
    ],
    deadline: '2025-03-31',
    universities: ['Lancaster University Ghana'],
    description: 'International standard scholarship for high-achieving students.',
    requirements: [
      'A-levels: AAB minimum',
      'WASSCE: Aggregate 8-12',
      'English proficiency proof',
      'Personal statement',
      'Academic references'
    ],
    applicationProcess: 'Online application through LUG admissions portal',
    coverage: ['Tuition discount', 'Study materials'],
    renewable: true,
    contactInfo: 'scholarships@lancaster.edu.gh'
  },

  {
    id: 'acity_scholarship',
    name: 'ACITY University Scholarship',
    provider: 'ACITY University College',
    amount: '25% - 75% tuition',
    type: 'merit',
    eligibility: [
      'Academic excellence',
      'IT/Business program students',
      'Leadership qualities',
      'Community service'
    ],
    deadline: '2025-04-15',
    universities: ['ACITY University College'],
    description: 'Technology-focused scholarship for students in IT and business programs.',
    requirements: [
      'Strong WASSCE results',
      'IT/Math background',
      'Personal statement',
      'Community service record'
    ],
    applicationProcess: 'Apply through ACITY student services',
    coverage: ['Tuition reduction', 'Lab access'],
    renewable: true
  },

  {
    id: 'knust_chancellor',
    name: 'KNUST Chancellor\'s Scholarship',
    provider: 'Kwame Nkrumah University of Science and Technology',
    amount: 'Full tuition + stipend',
    type: 'merit',
    eligibility: [
      'Top 1% WASSCE performers',
      'Science/Engineering programs',
      'Ghanaian citizen',
      'Rural background preferred'
    ],
    deadline: '2025-04-30',
    universities: ['KNUST'],
    description: 'Prestigious scholarship for top science and engineering students.',
    requirements: [
      'WASSCE aggregate 6-8',
      'Strong science/math grades',
      'Rural background documentation',
      'Character references'
    ],
    applicationProcess: 'Automatic consideration during admission + separate application',
    coverage: ['Full tuition', 'Accommodation', 'Monthly stipend', 'Research opportunities'],
    renewable: true,
    contactInfo: 'admissions@knust.edu.gh'
  },

  {
    id: 'ug_commonwealth',
    name: 'University of Ghana Commonwealth Scholarship',
    provider: 'University of Ghana + Commonwealth Foundation',
    amount: 'Full scholarship + living expenses',
    type: 'merit',
    eligibility: [
      'Exceptional academic merit',
      'Commonwealth country citizen',
      'Research potential',
      'Leadership qualities'
    ],
    deadline: '2025-01-31',
    universities: ['University of Ghana'],
    description: 'International scholarship for outstanding Commonwealth students.',
    requirements: [
      'First-class honors potential',
      'Research proposal',
      'Academic references',
      'English proficiency',
      'Medical examination'
    ],
    applicationProcess: 'Commonwealth Scholarship Commission application + UG endorsement',
    coverage: ['Full tuition', 'Living expenses', 'Travel costs', 'Research funding'],
    renewable: true,
    contactInfo: 'international@ug.edu.gh'
  },

  // Need-Based Scholarships
  {
    id: 'mastercard_foundation',
    name: 'Mastercard Foundation Scholars Program',
    provider: 'Mastercard Foundation',
    amount: 'Full scholarship + leadership development',
    type: 'need',
    eligibility: [
      'Academically qualified African students',
      'Demonstrated financial need',
      'Leadership potential',
      'Commitment to giving back'
    ],
    deadline: '2025-02-15',
    universities: ['Ashesi University', 'University of Ghana'],
    description: 'Comprehensive program combining education, leadership development, and career support.',
    requirements: [
      'African citizenship',
      'Strong academic record',
      'Financial need documentation',
      'Leadership essay',
      'Community service record'
    ],
    applicationProcess: 'Partner university application + Mastercard Foundation selection',
    coverage: ['Full tuition', 'Accommodation', 'Meals', 'Healthcare', 'Leadership training', 'Internships'],
    renewable: true,
    contactInfo: 'scholars@mastercardfdn.org'
  },

  // Professional Development Scholarships
  {
    id: 'gimpa_public_service',
    name: 'GIMPA Public Service Scholarship',
    provider: 'Ghana Institute of Management and Public Administration',
    amount: '30% - 60% tuition',
    type: 'government',
    eligibility: [
      'Public sector employees',
      '2+ years service',
      'Management/Admin programs',
      'Supervisor recommendation'
    ],
    deadline: '2025-05-31',
    universities: ['GIMPA'],
    description: 'Professional development scholarship for public sector workers.',
    requirements: [
      'Employment verification',
      'Supervisor endorsement',
      'Academic qualification',
      'Service record'
    ],
    applicationProcess: 'Through employer nomination + GIMPA application',
    coverage: ['Tuition reduction', 'Study materials'],
    renewable: true
  },

  // International Scholarships
  {
    id: 'chinese_government',
    name: 'Chinese Government Scholarship',
    provider: 'Chinese Government',
    amount: 'Full scholarship + living stipend',
    type: 'government',
    eligibility: [
      'Ghanaian citizen',
      'Good academic record',
      'Good health',
      'Under 35 years old'
    ],
    deadline: '2025-03-31',
    universities: ['University of Ghana (partner programs)'],
    description: 'Study opportunity in China with full financial support.',
    requirements: [
      'Graduation certificate',
      'Academic transcripts',
      'Health certificate',
      'Chinese language test (some programs)'
    ],
    applicationProcess: 'Chinese embassy application + university recommendation',
    coverage: ['Tuition', 'Accommodation', 'Monthly stipend', 'Medical insurance'],
    renewable: true,
    contactInfo: 'chinese.embassy.gh@mfa.gov.cn'
  }
]

const ScholarshipsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedProvider, setSelectedProvider] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('deadline')

  // Filter and sort scholarships
  const filteredAndSortedScholarships = React.useMemo(() => {
    let filtered = SCHOLARSHIPS_DATA.filter(scholarship => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.universities.some(uni => uni.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesType = selectedType === 'all' || scholarship.type === selectedType
      const matchesProvider = selectedProvider === 'all' || 
                             scholarship.provider.toLowerCase().includes(selectedProvider.toLowerCase())
      
      return matchesSearch && matchesType && matchesProvider
    })

    // Sort
    return filtered.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      } else if (sortBy === 'amount') {
        return a.amount.localeCompare(b.amount)
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }, [searchTerm, selectedType, selectedProvider, sortBy])

  // Get unique providers
  const providers = React.useMemo(() => {
    const allProviders = SCHOLARSHIPS_DATA.map(s => s.provider)
    return Array.from(new Set(allProviders)).sort()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'merit': return 'bg-blue-500 text-white'
      case 'need': return 'bg-green-500 text-white'
      case 'government': return 'bg-purple-500 text-white'
      case 'full': return 'bg-orange-500 text-white'
      case 'partial': return 'bg-gray-500 text-white'
      default: return 'bg-gray-400 text-white'
    }
  }

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 30 && daysUntil > 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Scholarship Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover funding opportunities for your university education in Ghana and abroad
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">
                {SCHOLARSHIPS_DATA.filter(s => s.type === 'merit').length}
              </div>
              <div className="text-blue-100 text-sm">Merit-Based</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">
                {SCHOLARSHIPS_DATA.filter(s => s.type === 'need').length}
              </div>
              <div className="text-green-100 text-sm">Need-Based</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">
                {SCHOLARSHIPS_DATA.filter(s => s.type === 'government').length}
              </div>
              <div className="text-purple-100 text-sm">Government</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">
                {SCHOLARSHIPS_DATA.filter(s => s.amount.includes('Full')).length}
              </div>
              <div className="text-orange-100 text-sm">Full Coverage</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">
                {SCHOLARSHIPS_DATA.filter(s => isDeadlineSoon(s.deadline)).length}
              </div>
              <div className="text-red-100 text-sm">Closing Soon</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="merit">Merit-Based</option>
                <option value="need">Need-Based</option>
                <option value="government">Government</option>
                <option value="partial">Partial</option>
                <option value="full">Full Coverage</option>
              </select>
              
              <select 
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Providers</option>
                {providers.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="amount">Sort by Amount</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{scholarship.name}</CardTitle>
                    <CardDescription className="text-base font-medium text-blue-600 mb-2">
                      {scholarship.provider}
                    </CardDescription>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(scholarship.type)}>
                        {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                      </Badge>
                      {scholarship.renewable && (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Renewable
                        </Badge>
                      )}
                      {isDeadlineSoon(scholarship.deadline) && (
                        <Badge className="bg-red-500 text-white">
                          Closing Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{scholarship.amount}</div>
                    <div className="text-sm text-gray-500">
                      Deadline: {formatDeadline(scholarship.deadline)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{scholarship.description}</p>
                
                <div className="space-y-4">
                  {/* Eligibility */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Eligibility Criteria</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {scholarship.eligibility.slice(0, 3).map((criteria, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {criteria}
                        </li>
                      ))}
                      {scholarship.eligibility.length > 3 && (
                        <li className="text-blue-600 text-sm">
                          +{scholarship.eligibility.length - 3} more criteria
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Coverage */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Coverage Includes</h4>
                    <div className="flex flex-wrap gap-2">
                      {scholarship.coverage.slice(0, 4).map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {scholarship.coverage.length > 4 && (
                        <Badge variant="outline" className="text-xs text-blue-600">
                          +{scholarship.coverage.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Universities */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Available At</h4>
                    <div className="text-sm text-gray-600">
                      {scholarship.universities.slice(0, 2).join(', ')}
                      {scholarship.universities.length > 2 && ` +${scholarship.universities.length - 2} more`}
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  {scholarship.contactInfo && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <h4 className="font-semibold text-blue-800 mb-1">Contact Information</h4>
                      <div className="text-sm text-blue-600">{scholarship.contactInfo}</div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedScholarships.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Scholarship Application Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-amber-700 mb-2">Before You Apply</h4>
                <ul className="text-sm text-amber-600 space-y-1">
                  <li>• Read all eligibility criteria carefully</li>
                  <li>• Gather required documents early</li>
                  <li>• Check application deadlines</li>
                  <li>• Contact scholarship providers for clarification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 mb-2">Application Process</h4>
                <ul className="text-sm text-amber-600 space-y-1">
                  <li>• Submit applications early</li>
                  <li>• Write compelling personal statements</li>
                  <li>• Get strong recommendation letters</li>
                  <li>• Keep copies of all documents</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 mb-2">After Selection</h4>
                <ul className="text-sm text-amber-600 space-y-1">
                  <li>• Maintain required academic standards</li>
                  <li>• Submit progress reports if required</li>
                  <li>• Participate in scholarship activities</li>
                  <li>• Express gratitude to providers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ScholarshipsPage
