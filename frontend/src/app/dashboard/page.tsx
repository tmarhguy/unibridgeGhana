'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deadline",
      title: "Application Deadline Approaching",
      message: "Your KNUST application deadline is in 5 days",
      date: "2024-12-20",
      urgent: true,
      read: false
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Scheduled",
      message: "Ashesi University has scheduled your interview for January 5th",
      date: "2024-12-18",
      urgent: false,
      read: false
    },
    {
      id: 3,
      type: "document",
      title: "Documents Received",
      message: "University of Ghana has received your transcripts",
      date: "2024-12-16",
      urgent: false,
      read: true
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Confirmed",
      message: "Application fee payment for UG has been processed successfully",
      date: "2024-12-15",
      urgent: false,
      read: true
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  // Mock student data with enhanced information
  const studentData = {
    name: "Kwame Asante",
    email: "kwame.asante@email.com",
    phone: "+233 24 123 4567",
    dateOfBirth: "2005-03-15",
    location: "Accra, Ghana",
    profilePicture: "/api/placeholder/64/64",
    wassce: {
      year: "2024",
      indexNumber: "0123456789",
      subjects: [
        { name: "Core Mathematics", grade: "B3", points: 60 },
        { name: "English Language", grade: "B2", points: 65 },
        { name: "Integrated Science", grade: "B3", points: 60 },
        { name: "Social Studies", grade: "C4", points: 55 },
        { name: "Physics", grade: "B2", points: 65 },
        { name: "Chemistry", grade: "B3", points: 60 },
        { name: "Biology", grade: "C4", points: 55 },
        { name: "Elective Mathematics", grade: "B3", points: 60 }
      ],
      aggregate: 6 // Best 6 subjects
    },
    applications: [
      {
        id: 1,
        university: "University of Ghana",
        program: "Computer Science",
        status: "Under Review",
        submittedDate: "2024-12-15",
        deadline: "2025-01-15",
        fee: 150,
        feePaid: true,
        progress: 85,
        requirements: {
          personalStatement: "completed",
          transcripts: "completed", 
          recommendations: "pending",
          interview: "not_required"
        },
        lastUpdate: "Documents under review",
        applicationNumber: "UG-CS-2025-001234"
      },
      {
        id: 2,
        university: "KNUST",
        program: "Mechanical Engineering",
        status: "Documents Required",
        submittedDate: "2024-12-10",
        deadline: "2025-01-20",
        fee: 200,
        feePaid: true,
        progress: 65,
        requirements: {
          personalStatement: "completed",
          transcripts: "completed",
          recommendations: "required",
          interview: "pending"
        },
        lastUpdate: "Waiting for recommendation letters",
        applicationNumber: "KNUST-ME-2025-005678"
      },
      {
        id: 3,
        university: "Ashesi University",
        program: "Business Administration",
        status: "Interview Scheduled",
        submittedDate: "2024-12-08",
        deadline: "2025-01-10",
        fee: 300,
        feePaid: true,
        progress: 95,
        requirements: {
          personalStatement: "completed",
          transcripts: "completed",
          recommendations: "completed",
          interview: "scheduled"
        },
        lastUpdate: "Interview scheduled for Jan 5, 2025",
        applicationNumber: "ASH-BA-2025-009876",
        interviewDate: "2025-01-05",
        interviewTime: "10:00 AM",
        interviewType: "Virtual"
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      case 'Documents Required': return 'bg-blue-100 text-blue-800'
      case 'Interview Scheduled': return 'bg-green-100 text-green-800'
      case 'Accepted': return 'bg-emerald-100 text-emerald-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ProtectedRoute>
      <CommonAppLayout>
      <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {user?.firstName || 'Student'}!
          </h1>
          <p className="text-sm text-gray-600">
            Track your applications, manage deadlines, and stay updated on your university journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-100" onClick={() => window.location.href = '/my-universities'}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">My Universities</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">4</p>
                <p className="text-xs text-emerald-600">3 deadlines approaching</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-100" onClick={() => setActiveTab('applications')}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">Applications</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{studentData.applications.length}</p>
                <p className="text-xs text-green-600">+1 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">Under Review</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {studentData.applications.filter(app => app.status === 'Under Review').length}
                </p>
                <p className="text-xs text-blue-600">Processing</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">Interviews</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {studentData.applications.filter(app => app.status === 'Interview Scheduled').length}
                </p>
                <p className="text-xs text-green-600">1 upcoming</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-100" onClick={() => setActiveTab('payments')}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  GHS {studentData.applications.reduce((sum, app) => sum + app.fee, 0)}
                </p>
                <p className="text-xs text-green-600">All paid</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'applications', label: 'Applications', icon: '📋' },
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* My Universities Quick Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Universities</CardTitle>
                  <CardDescription>Your selected universities and application deadlines</CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/my-universities">
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: 'University of Ghana', deadline: 'April 15', status: 'In Progress', daysLeft: 45 },
                    { name: 'KNUST', deadline: 'March 31', status: 'Not Started', daysLeft: 30 },
                    { name: 'Ashesi University', deadline: 'May 1', status: 'Submitted', daysLeft: 61 },
                    { name: 'University of Cape Coast', deadline: 'April 30', status: 'Under Review', daysLeft: 60 }
                  ].map((uni, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-3 hover:border-gray-200 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">{uni.name}</h4>
                        <Badge className={`text-xs px-2 py-1 ${
                          uni.status === 'Submitted' ? 'bg-green-100 text-green-800' :
                          uni.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          uni.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {uni.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Deadline: {uni.deadline}</div>
                        <div className={uni.daysLeft <= 14 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
                          {uni.daysLeft} days left
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" className="flex-1 text-sm">
                    <Link href="/university-search">
                      + Add Universities
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm">
                    <Link href="/my-universities">
                      Manage My List
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Essays Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Essay Progress</CardTitle>
                  <CardDescription>Your application essays and personal statements</CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/essays">
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Personal Statement', status: 'in_progress', wordCount: 423, university: 'Common App' },
                    { title: 'Why University of Ghana?', status: 'completed', wordCount: 587, university: 'UG' },
                    { title: 'Leadership Experience', status: 'not_started', wordCount: 0, university: 'Ashesi' },
                    { title: 'Why KNUST?', status: 'not_started', wordCount: 0, university: 'KNUST' }
                  ].map((essay, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-3 hover:border-gray-200 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">{essay.title}</h4>
                          <p className="text-xs text-gray-500">for {essay.university}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{essay.wordCount} words</span>
                          <Badge className={`text-xs px-2 py-1 ${
                            essay.status === 'completed' ? 'bg-green-100 text-green-800' :
                            essay.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {essay.status === 'not_started' ? 'Not Started' :
                             essay.status === 'in_progress' ? 'In Progress' : 'Completed'}
                          </Badge>
                        </div>
                      </div>
                      {essay.status === 'in_progress' && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((essay.wordCount / 650) * 100, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" className="flex-1 text-sm">
                    <Link href="/essays">
                      Continue Writing
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-purple-600 hover:bg-purple-700 text-sm">
                    <Link href="/essays">
                      Writing Center
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Applications */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Track the status of your university applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentData.applications.map(app => (
                      <div key={app.id} className="border border-gray-100 rounded-lg p-3 hover:border-gray-200 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{app.university}</h4>
                            <p className="text-xs text-gray-600">{app.program}</p>
                          </div>
                          <Badge className={getStatusColor(app.status) + ' text-xs px-2 py-1'}>
                            {app.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>Submitted: {app.submittedDate}</span>
                          <span>Deadline: {app.deadline}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{app.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Link href="/common-application">
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm">
                        Start New Application
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications & Deadlines */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated on your applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`border-l-4 pl-3 py-2 rounded-r-lg ${
                        notification.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 text-sm">{notification.title}</h5>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                          </div>
                          {notification.urgent && (
                            <Badge className="bg-red-100 text-red-800 ml-2 text-xs px-2 py-1">Urgent</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
              <div className="flex gap-3">
                <Link href="/university-search">
                  <Button variant="outline">
                    🔍 Browse Universities
                  </Button>
                </Link>
                <Link href="/common-application">
                  <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
                    ➕ New Application
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentData.applications.map(app => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{app.university}</CardTitle>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="font-medium">{app.program}</span>
                      <span className="text-xs text-gray-500">#{app.applicationNumber}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{app.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Requirements Checklist */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">Requirements</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <span className={app.requirements.personalStatement === 'completed' ? '✅' : '⏳'}>
                              {app.requirements.personalStatement === 'completed' ? '✅' : '⏳'}
                            </span>
                            <span>Statement</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={app.requirements.transcripts === 'completed' ? '✅' : '⏳'}>
                              {app.requirements.transcripts === 'completed' ? '✅' : '⏳'}
                            </span>
                            <span>Transcripts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={app.requirements.recommendations === 'completed' ? '✅' : app.requirements.recommendations === 'pending' ? '⏳' : '⭕'}>
                              {app.requirements.recommendations === 'completed' ? '✅' : app.requirements.recommendations === 'pending' ? '⏳' : '⭕'}
                            </span>
                            <span>Letters</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={app.requirements.interview === 'completed' ? '✅' : app.requirements.interview === 'scheduled' ? '📅' : app.requirements.interview === 'not_required' ? '⚪' : '⏳'}>
                              {app.requirements.interview === 'completed' ? '✅' : app.requirements.interview === 'scheduled' ? '📅' : app.requirements.interview === 'not_required' ? '⚪' : '⏳'}
                            </span>
                            <span>Interview</span>
                          </div>
                        </div>
                      </div>

                      {/* Interview Details */}
                      {app.interviewDate && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="text-sm">
                            <p className="font-medium text-green-800">Interview Scheduled</p>
                            <p className="text-green-600">{app.interviewDate} at {app.interviewTime}</p>
                            <p className="text-green-600">Type: {app.interviewType}</p>
                          </div>
                        </div>
                      )}

                      {/* Key Information */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Deadline</p>
                          <p className="font-medium text-red-600">{app.deadline}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fee Status</p>
                          <p className={`font-medium ${app.feePaid ? 'text-green-600' : 'text-red-600'}`}>
                            {app.feePaid ? '✅ Paid' : '❌ Pending'}
                          </p>
                        </div>
                      </div>

                      {/* Last Update */}
                      <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                        <strong>Last Update:</strong> {app.lastUpdate}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 text-xs">
                          📄 View Details
                        </Button>
                        {!app.feePaid && (
                          <Link href="/payments" className="flex-1">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs">
                              💳 Pay Fee
                            </Button>
                          </Link>
                        )}
                        {app.requirements.recommendations === 'required' && (
                          <Link href="/documents" className="flex-1">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs">
                              📁 Upload
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Application Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(studentData.applications.reduce((sum, app) => sum + app.progress, 0) / studentData.applications.length)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {studentData.applications.filter(app => app.feePaid).length}
                    </div>
                    <div className="text-sm text-gray-600">Fees Paid</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {studentData.applications.filter(app => app.status === 'Documents Required').length}
                    </div>
                    <div className="text-sm text-gray-600">Pending Documents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {studentData.applications.filter(app => app.interviewDate).length}
                    </div>
                    <div className="text-sm text-gray-600">Interviews Scheduled</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input defaultValue={studentData.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input defaultValue={studentData.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input defaultValue={studentData.phone} />
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>

              {/* WASSCE Results */}
              <Card>
                <CardHeader>
                  <CardTitle>WASSCE Results</CardTitle>
                  <CardDescription>Year: {studentData.wassce.year} | Index: {studentData.wassce.indexNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentData.wassce.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                        <Badge className={`${
                          ['A1', 'B2', 'B3'].includes(subject.grade) ? 'bg-green-100 text-green-800' :
                          ['C4', 'C5', 'C6'].includes(subject.grade) ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subject.grade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <div className="flex gap-3">
                <Button variant="outline" onClick={markAllAsRead}>
                  ✅ Mark All Read
                </Button>
                <Button variant="outline">
                  ⚙️ Settings
                </Button>
              </div>
            </div>

            {/* Notification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {notifications.filter(n => !n.read && n.urgent).length}
                  </div>
                  <div className="text-sm text-gray-600">Urgent</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {notifications.filter(n => !n.read).length}
                  </div>
                  <div className="text-sm text-gray-600">Unread</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {notifications.length}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              {notifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                    !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          notification.type === 'deadline' ? 'bg-red-100' :
                          notification.type === 'interview' ? 'bg-green-100' :
                          notification.type === 'payment' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          <span className="text-xl">
                            {notification.type === 'deadline' ? '⏰' :
                             notification.type === 'interview' ? '🎤' : 
                             notification.type === 'payment' ? '�' : '�📄'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📅 {notification.date}</span>
                            <span>{notification.read ? '✅ Read' : '📩 Unread'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {notification.urgent && (
                          <Badge className="bg-red-100 text-red-800">🚨 Urgent</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notifications.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🔔</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
      </div>
    </CommonAppLayout>
    </ProtectedRoute>
  )
}

export default StudentDashboard
