'use client'

import React, { useState, useEffect } from 'react'
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
  type: string
  category: string
  region: string
  location: string
  establishedYear: number
  studentPopulation: number
  applicationFee: number
  programs: string[]
  admissionRequirements: {
    minWASSCE: string
    coreSubjects: string[]
    electiveRequirements: string
  }
  contactInfo: {
    website: string
    phone: string
    email: string
  }
  facilities: string[]
  rankings: {
    national?: number
    category?: number
  }
}

const UniversitySearch: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([])
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [myUniversityIds, setMyUniversityIds] = useState<Set<string>>(new Set(['ug', 'ashesi'])) // Mock data - would come from API

  // Function to add university to "My Universities"
  const addToMyUniversities = (university: University) => {
    setMyUniversityIds(prev => {
      const newSet = new Set(prev)
      newSet.add(university.id)
      return newSet
    })
    // In real app, this would also call an API to save to backend
    console.log(`Added ${university.name} to My Universities`)
  }

  // Function to remove university from "My Universities"
  const removeFromMyUniversities = (universityId: string) => {
    setMyUniversityIds(prev => {
      const newSet = new Set(prev)
      newSet.delete(universityId)
      return newSet
    })
    // In real app, this would also call an API to remove from backend
  }

  // Mock university data (in real app, this would come from API)
  useEffect(() => {
    const mockUniversities: University[] = [
      {
        id: 'ug',
        name: 'University of Ghana',
        shortName: 'UG',
        type: 'Public',
        category: 'Traditional University',
        region: 'Greater Accra',
        location: 'Legon, Accra',
        establishedYear: 1948,
        studentPopulation: 38000,
        applicationFee: 150,
        programs: ['Medicine', 'Engineering', 'Business', 'Law', 'Arts', 'Sciences', 'Agriculture'],
        admissionRequirements: {
          minWASSCE: 'C6',
          coreSubjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
          electiveRequirements: 'Minimum 3 elective subjects relevant to program'
        },
        contactInfo: {
          website: 'https://ug.edu.gh',
          phone: '+233 30 213 8100',
          email: 'info@ug.edu.gh'
        },
        facilities: ['Library', 'Hostels', 'Sports Complex', 'Medical Center', 'Research Centers'],
        rankings: {
          national: 1,
          category: 1
        }
      },
      {
        id: 'knust',
        name: 'Kwame Nkrumah University of Science and Technology',
        shortName: 'KNUST',
        type: 'Public',
        category: 'University of Science and Technology',
        region: 'Ashanti',
        location: 'Kumasi',
        establishedYear: 1952,
        studentPopulation: 42000,
        applicationFee: 200,
        programs: ['Engineering', 'Architecture', 'Sciences', 'Agriculture', 'Built Environment', 'Art'],
        admissionRequirements: {
          minWASSCE: 'C6',
          coreSubjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
          electiveRequirements: 'Strong performance in relevant science subjects'
        },
        contactInfo: {
          website: 'https://knust.edu.gh',
          phone: '+233 32 206 0331',
          email: 'info@knust.edu.gh'
        },
        facilities: ['Engineering Labs', 'Library', 'Hostels', 'Sports Complex', 'Teaching Hospital'],
        rankings: {
          national: 2,
          category: 1
        }
      },
      {
        id: 'ashesi',
        name: 'Ashesi University',
        shortName: 'Ashesi',
        type: 'Private',
        category: 'Private University',
        region: 'Eastern',
        location: 'Berekuso',
        establishedYear: 2002,
        studentPopulation: 3000,
        applicationFee: 300,
        programs: ['Computer Science', 'Business Administration', 'Engineering', 'Liberal Arts'],
        admissionRequirements: {
          minWASSCE: 'B3',
          coreSubjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
          electiveRequirements: 'Excellent performance in all subjects'
        },
        contactInfo: {
          website: 'https://ashesi.edu.gh',
          phone: '+233 30 291 2490',
          email: 'admissions@ashesi.edu.gh'
        },
        facilities: ['Modern Campus', 'Library', 'Hostels', 'Sports Facilities', 'Innovation Labs'],
        rankings: {
          national: 5,
          category: 1
        }
      },
      {
        id: 'ucc',
        name: 'University of Cape Coast',
        shortName: 'UCC',
        type: 'Public',
        category: 'Traditional University',
        region: 'Central',
        location: 'Cape Coast',
        establishedYear: 1962,
        studentPopulation: 45000,
        applicationFee: 120,
        programs: ['Education', 'Arts', 'Sciences', 'Business', 'Health Sciences', 'Agriculture'],
        admissionRequirements: {
          minWASSCE: 'C6',
          coreSubjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
          electiveRequirements: 'Minimum 3 elective subjects'
        },
        contactInfo: {
          website: 'https://ucc.edu.gh',
          phone: '+233 33 213 2440',
          email: 'info@ucc.edu.gh'
        },
        facilities: ['Library', 'Hostels', 'Sports Complex', 'Teaching Hospital', 'Research Centers'],
        rankings: {
          national: 3,
          category: 2
        }
      },
      {
        id: 'gimpa',
        name: 'Ghana Institute of Management and Public Administration',
        shortName: 'GIMPA',
        type: 'Public',
        category: 'Professional Institute',
        region: 'Greater Accra',
        location: 'Accra',
        establishedYear: 1961,
        studentPopulation: 15000,
        applicationFee: 180,
        programs: ['Public Administration', 'Management', 'Law', 'Technology', 'Liberal Studies'],
        admissionRequirements: {
          minWASSCE: 'C6',
          coreSubjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
          electiveRequirements: 'Good performance in relevant subjects'
        },
        contactInfo: {
          website: 'https://gimpa.edu.gh',
          phone: '+233 30 229 2040',
          email: 'info@gimpa.edu.gh'
        },
        facilities: ['Library', 'Computer Labs', 'Conference Facilities', 'Professional Development Centers'],
        rankings: {
          national: 8,
          category: 2
        }
      },
      {
        id: 'uds',
        name: 'University for Development Studies',
        shortName: 'UDS',
        type: 'Public',
        category: 'Traditional University',
        region: 'Northern',
        location: 'Tamale',
        establishedYear: 1992,
        studentPopulation: 35000,
        applicationFee: 100,
        programs: ['Agriculture', 'Medicine', 'Applied Sciences', 'Education', 'Planning', 'Earth Sciences'],
        admissionRequirements: {
          minWASSCE: 'C6',
          coreSubjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
          electiveRequirements: 'Performance in relevant subjects'
        },
        contactInfo: {
          website: 'https://uds.edu.gh',
          phone: '+233 37 202 9781',
          email: 'info@uds.edu.gh'
        },
        facilities: ['Library', 'Hostels', 'Research Stations', 'Teaching Hospital', 'Practical Labs'],
        rankings: {
          national: 6,
          category: 3
        }
      }
    ]
    
    setUniversities(mockUniversities)
    setFilteredUniversities(mockUniversities)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = universities

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Region filter
    if (selectedRegion) {
      filtered = filtered.filter(uni => uni.region === selectedRegion)
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(uni => uni.type === selectedType)
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(uni => uni.category === selectedCategory)
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'established':
          return b.establishedYear - a.establishedYear
        case 'students':
          return b.studentPopulation - a.studentPopulation
        case 'fee':
          return a.applicationFee - b.applicationFee
        case 'ranking':
          return (a.rankings.national || 99) - (b.rankings.national || 99)
        default:
          return 0
      }
    })

    setFilteredUniversities(filtered)
  }, [universities, searchTerm, selectedRegion, selectedType, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedRegion('')
    setSelectedType('')
    setSelectedCategory('')
    setSortBy('name')
  }

  const getTypeColor = (type: string) => {
    return type === 'Public' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
  }

  const regions = Array.from(new Set(universities.map(uni => uni.region))).sort()
  const types = Array.from(new Set(universities.map(uni => uni.type))).sort()
  const categories = Array.from(new Set(universities.map(uni => uni.category))).sort()

  return (
    <CommonAppLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect University</h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <Input
              placeholder="Search universities, programs, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="ranking">Sort by Ranking</option>
              <option value="established">Sort by Year</option>
              <option value="students">Sort by Size</option>
              <option value="fee">Sort by Fee</option>
            </select>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {filteredUniversities.length} of {universities.length} universities
              </span>
              {(searchTerm || selectedRegion || selectedType || selectedCategory) && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map(university => (
              <Card key={university.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{university.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {university.location} • Est. {university.establishedYear}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getTypeColor(university.type)}>
                        {university.type}
                      </Badge>
                      {university.rankings.national && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          #{university.rankings.national}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Programs Offered:</p>
                      <div className="flex flex-wrap gap-1">
                        {university.programs.slice(0, 3).map(program => (
                          <Badge key={program} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                        {university.programs.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{university.programs.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Students</p>
                        <p className="font-medium">{university.studentPopulation.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">App Fee</p>
                        <p className="font-medium">GHS {university.applicationFee}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild variant="outline" className="flex-1" size="sm">
                        <Link href={`/university-detail?id=${university.id}`}>
                          View Details
                        </Link>
                      </Button>
                      {myUniversityIds.has(university.id) ? (
                        <div className="flex gap-1 flex-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-emerald-600 border-emerald-600"
                            onClick={() => removeFromMyUniversities(university.id)}
                          >
                            ✓ Added
                          </Button>
                          <Link href="/my-universities" className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white" size="sm">
                              Apply
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" 
                          size="sm"
                          onClick={() => addToMyUniversities(university)}
                        >
                          + Add to My List
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUniversities.map(university => (
              <Card key={university.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
                        <Badge className={getTypeColor(university.type)}>
                          {university.type}
                        </Badge>
                        {university.rankings.national && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            #{university.rankings.national} Nationally
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Location</p>
                          <p className="text-gray-900">{university.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Students</p>
                          <p className="text-gray-900">{university.studentPopulation.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Application Fee</p>
                          <p className="text-gray-900">GHS {university.applicationFee}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Programs</p>
                        <div className="flex flex-wrap gap-2">
                          {university.programs.map(program => (
                            <Badge key={program} variant="outline">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-6">
                      <Button asChild variant="outline">
                        <Link href={`/university-detail?id=${university.id}`}>
                          View Details
                        </Link>
                      </Button>
                      {myUniversityIds.has(university.id) ? (
                        <div className="flex flex-col gap-2">
                          <Button 
                            variant="outline" 
                            className="text-emerald-600 border-emerald-600"
                            onClick={() => removeFromMyUniversities(university.id)}
                          >
                            ✓ Added to My List
                          </Button>
                          <Link href="/my-universities">
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
                              Go to My Universities
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                          onClick={() => addToMyUniversities(university)}
                        >
                          + Add to My Universities
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </CommonAppLayout>
  )
}

export default UniversitySearch
