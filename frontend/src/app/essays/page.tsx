'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import EssayEditor from '@/components/features/EssayEditor'

interface Essay {
  id: string
  type: 'personal_statement' | 'why_university' | 'leadership' | 'challenge'
  title: string
  universityName?: string
  content: string
  wordCount: number
  status: 'not_started' | 'in_progress' | 'completed' | 'reviewed'
  lastModified: Date
  required: boolean
}

const EssayWritingCenter: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState<string | null>(null)
  const [essays, setEssays] = useState<Essay[]>([
    {
      id: 'common_personal',
      type: 'personal_statement',
      title: 'Common Application Personal Statement',
      content: '',
      wordCount: 0,
      status: 'not_started',
      lastModified: new Date(),
      required: true
    },
    {
      id: 'ug_why',
      type: 'why_university',
      title: 'Why University of Ghana?',
      universityName: 'University of Ghana',
      content: '',
      wordCount: 0,
      status: 'not_started',
      lastModified: new Date(),
      required: true
    },
    {
      id: 'knust_why',
      type: 'why_university',
      title: 'Why KNUST?',
      universityName: 'KNUST',
      content: '',
      wordCount: 0,
      status: 'not_started',
      lastModified: new Date(),
      required: true
    },
    {
      id: 'ashesi_leadership',
      type: 'leadership',
      title: 'Leadership Experience',
      universityName: 'Ashesi University',
      content: '',
      wordCount: 0,
      status: 'not_started',
      lastModified: new Date(),
      required: true
    },
    {
      id: 'challenge_essay',
      type: 'challenge',
      title: 'Overcoming Challenges',
      content: '',
      wordCount: 0,
      status: 'not_started',
      lastModified: new Date(),
      required: false
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not_started': return '⭕'
      case 'in_progress': return '🔄'
      case 'completed': return '✅'
      case 'reviewed': return '🎯'
      default: return '⭕'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-100 text-gray-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'reviewed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSaveEssay = (essayId: string, content: string, title: string) => {
    setEssays(prev => prev.map(essay => 
      essay.id === essayId 
        ? {
            ...essay,
            content,
            title: title || essay.title,
            wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length,
            status: content.length > 50 ? 'in_progress' : 'not_started',
            lastModified: new Date()
          }
        : essay
    ))
  }

  const selectedEssayData = essays.find(essay => essay.id === selectedEssay)

  const completedEssays = essays.filter(essay => essay.status === 'completed').length
  const totalRequired = essays.filter(essay => essay.required).length
  const overallProgress = Math.round((completedEssays / totalRequired) * 100)

  return (
    <CommonAppLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedEssay ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Essay Writing Center</h1>
              <p className="text-gray-600 mb-6">
                Craft compelling essays for your university applications. Get writing tips, examples, and real-time feedback.
              </p>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{essays.length}</div>
                    <div className="text-sm text-gray-600">Total Essays</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{completedEssays}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{totalRequired}</div>
                    <div className="text-sm text-gray-600">Required</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{overallProgress}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Overall Progress</h3>
                    <span className="text-sm text-gray-600">{completedEssays} of {totalRequired} required essays completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Essays List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {essays.map(essay => (
                <Card 
                  key={essay.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => setSelectedEssay(essay.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <span className="text-xl">{getStatusIcon(essay.status)}</span>
                          {essay.title}
                          {essay.required && (
                            <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                              Required
                            </Badge>
                          )}
                        </CardTitle>
                        {essay.universityName && (
                          <CardDescription className="mt-1">
                            for {essay.universityName}
                          </CardDescription>
                        )}
                      </div>
                      <Badge className={getStatusColor(essay.status)}>
                        {essay.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Essay Type Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📝 {essay.type.replace('_', ' ')}</span>
                        <span>📊 {essay.wordCount} words</span>
                        <span>🕒 {essay.lastModified.toLocaleDateString()}</span>
                      </div>

                      {/* Content Preview */}
                      {essay.content ? (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {essay.content.slice(0, 150)}...
                          </p>
                        </div>
                      ) : (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700">
                            Click to start writing this essay
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button className="w-full" variant={essay.content ? "outline" : "default"}>
                        {essay.content ? '✏️ Continue Writing' : '🚀 Start Writing'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Writing Resources */}
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Writing Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Essay Guides</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• How to write a personal statement</li>
                      <li>• "Why this university?" essay tips</li>
                      <li>• Common essay mistakes to avoid</li>
                      <li>• Examples from successful applicants</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Writing Tools</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Word count and character tracker</li>
                      <li>• Auto-save functionality</li>
                      <li>• Writing prompts and examples</li>
                      <li>• Grammar and style suggestions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Review & Feedback</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Share with counselors</li>
                      <li>• Peer review system</li>
                      <li>• Professional editing services</li>
                      <li>• University-specific feedback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Essay Editor */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedEssay(null)}
                className="mb-4"
              >
                ← Back to Essays
              </Button>
            </div>

            {selectedEssayData && (
              <EssayEditor
                essayType={selectedEssayData.type}
                universityName={selectedEssayData.universityName}
                initialContent={selectedEssayData.content}
                onSave={(content, title) => handleSaveEssay(selectedEssayData.id, content, title)}
                autoSave={true}
              />
            )}
          </>
        )}
      </div>
    </CommonAppLayout>
  )
}

export default EssayWritingCenter
