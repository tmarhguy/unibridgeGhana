'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CommonAppLayout from '@/components/layout/CommonAppLayout'

const UniversityDetail: React.FC = () => {
  const searchParams = useSearchParams()
  const universityId = searchParams.get('id')

  // Mock data - in real app this would come from API based on ID
  const university = {
    id: 'ug',
    name: 'University of Ghana',
    shortName: 'UG',
    type: 'Public',
    category: 'Research University',
    region: 'Greater Accra',
    location: 'Legon, Accra',
    establishedYear: 1948,
    studentPopulation: 40000,
    applicationFee: 220,
    programs: [
      'BSc Computer Science', 'BSc Mathematics', 'BA Economics', 'Medicine', 'Law',
      'Engineering', 'Agriculture', 'Social Sciences', 'Arts', 'Business Administration'
    ],
    admissionRequirements: {
      minWASSCE: 'Aggregate 24 or better',
      coreSubjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies'],
      electiveRequirements: '3 relevant elective subjects with grades C6 or better'
    },
    contactInfo: {
      website: 'www.ug.edu.gh',
      phone: '+233 30 213 7000',
      email: 'admissions@ug.edu.gh',
      address: 'University of Ghana, Legon, P.O. Box LG 25, Legon, Accra'
    },
    facilities: [
      'Modern Library Complex', 'Computer Labs', 'Research Centers', 'Medical Center',
      'Sports Complex', 'Student Hostels', 'Cafeterias', 'Auditoriums'
    ],
    rankings: {
      national: 1,
      category: 1
    },
    deadline: '15th April, 2025',
    specialPrograms: ['Medical School', 'Law School', 'Business School', 'Engineering'],
    internationalPrograms: true,
    scholarships: [
      'Merit-based Scholarships',
      'Need-based Financial Aid',
      'International Student Scholarships',
      'Research Assistantships'
    ],
    campusLife: {
      clubs: 50,
      sportsTeams: 15,
      dormitorySpaces: 8000,
      internationalStudents: 2000
    }
  }

  return (
    <CommonAppLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/university-search">
              ← Back to Search
            </Link>
          </Button>
        </div>

        {/* University Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{university.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{university.location}</p>
              <div className="flex gap-3">
                <Badge className="bg-blue-100 text-blue-800">{university.type}</Badge>
                <Badge className="bg-purple-100 text-purple-800">{university.category}</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">#{university.rankings.national} in Ghana</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                + Add to My Universities
              </Button>
              <Button asChild>
                <Link href="/common-application">
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Established</div>
                    <div className="font-semibold">{university.establishedYear}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Students</div>
                    <div className="font-semibold">{university.studentPopulation.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Application Fee</div>
                    <div className="font-semibold">GHS {university.applicationFee}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Deadline</div>
                    <div className="font-semibold">{university.deadline}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Programs</CardTitle>
                <CardDescription>Available undergraduate programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {university.programs.map((program, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span>{program}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Special Programs & Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {university.specialPrograms.map((program, index) => (
                    <Badge key={index} variant="outline" className="border-emerald-200 text-emerald-700">
                      {program}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campus Life */}
            <Card>
              <CardHeader>
                <CardTitle>Campus Life</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{university.campusLife.clubs}</div>
                    <div className="text-sm text-gray-600">Student Clubs</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{university.campusLife.sportsTeams}</div>
                    <div className="text-sm text-gray-600">Sports Teams</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{university.campusLife.dormitorySpaces.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Dorm Spaces</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{university.campusLife.internationalStudents.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">International Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Campus Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {university.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admission Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-2">Minimum WASSCE Grade</div>
                  <div className="text-gray-700">{university.admissionRequirements.minWASSCE}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-2">Core Subjects Required</div>
                  <ul className="space-y-1">
                    {university.admissionRequirements.coreSubjects.map((subject, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-2">Electives</div>
                  <div className="text-sm text-gray-700">{university.admissionRequirements.electiveRequirements}</div>
                </div>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Aid & Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {university.scholarships.map((scholarship, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">💰</span>
                      <span>{scholarship}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium text-gray-900">Website</div>
                  <a href={`https://${university.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {university.contactInfo.website}
                  </a>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <div className="text-gray-700">{university.contactInfo.phone}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-gray-700">{university.contactInfo.email}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Address</div>
                  <div className="text-gray-700 text-sm">{university.contactInfo.address}</div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href="/common-application">
                  Start Application
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/my-universities">
                  View My Universities
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CommonAppLayout>
  )
}

export default UniversityDetail
