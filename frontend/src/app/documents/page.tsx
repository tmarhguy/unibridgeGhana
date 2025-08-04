'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

interface DocumentType {
  id: string
  name: string
  description: string
  required: boolean
  maxSize: string
  acceptedFormats: string[]
  examples?: string[]
}

interface UploadedDocument {
  id: string
  documentTypeId: string
  fileName: string
  fileSize: number
  uploadDate: Date
  status: 'uploaded' | 'verified' | 'rejected'
  rejectionReason?: string
}

const DocumentUpload: React.FC = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([
    {
      id: '1',
      documentTypeId: 'wassce',
      fileName: 'WASSCE_Results_2023.pdf',
      fileSize: 2400000,
      uploadDate: new Date('2024-01-15'),
      status: 'verified'
    },
    {
      id: '2',
      documentTypeId: 'transcript',
      fileName: 'SHS_Transcript.pdf',
      fileSize: 1800000,
      uploadDate: new Date('2024-01-15'),
      status: 'uploaded'
    },
    {
      id: '3',
      documentTypeId: 'personal-statement',
      fileName: 'Personal_Statement.docx',
      fileSize: 950000,
      uploadDate: new Date('2024-01-16'),
      status: 'rejected',
      rejectionReason: 'Document exceeds word limit of 650 words'
    }
  ])

  const [dragOver, setDragOver] = useState<string>('')
  const [uploading, setUploading] = useState<string>('')
  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({})

  const documentTypes: DocumentType[] = [
    {
      id: 'wassce',
      name: 'WASSCE Results',
      description: 'Official WASSCE examination results',
      required: true,
      maxSize: '5MB',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      examples: ['WASSCE certificate', 'Statement of results']
    },
    {
      id: 'transcript',
      name: 'Academic Transcript',
      description: 'Complete academic record from senior high school',
      required: true,
      maxSize: '5MB',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      examples: ['Official transcript', 'Academic records']
    },
    {
      id: 'personal-statement',
      name: 'Personal Statement',
      description: 'Your personal statement or essay (max 650 words)',
      required: true,
      maxSize: '2MB',
      acceptedFormats: ['PDF', 'DOC', 'DOCX'],
      examples: ['Personal essay', 'Statement of purpose']
    },
    {
      id: 'recommendation',
      name: 'Letters of Recommendation',
      description: 'Letters from teachers, counselors, or employers',
      required: false,
      maxSize: '5MB',
      acceptedFormats: ['PDF', 'DOC', 'DOCX'],
      examples: ['Teacher recommendation', 'Counselor letter', 'Employer reference']
    },
    {
      id: 'certificates',
      name: 'Additional Certificates',
      description: 'Extra-curricular achievements, awards, certifications',
      required: false,
      maxSize: '10MB',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      examples: ['Awards', 'Certificates', 'Competition results']
    },
    {
      id: 'portfolio',
      name: 'Portfolio (Creative Programs)',
      description: 'Portfolio for art, design, or creative programs',
      required: false,
      maxSize: '20MB',
      acceptedFormats: ['PDF', 'JPG', 'PNG', 'ZIP'],
      examples: ['Art portfolio', 'Design work', 'Creative projects']
    }
  ]

  const handleFileSelect = (documentTypeId: string, files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    const documentType = documentTypes.find(dt => dt.id === documentTypeId)
    
    if (!documentType) return

    // Simulate upload process
    setUploading(documentTypeId)
    
    setTimeout(() => {
      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        documentTypeId,
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date(),
        status: 'uploaded'
      }

      setUploadedDocuments(prev => {
        // Remove existing document of same type
        const filtered = prev.filter(doc => doc.documentTypeId !== documentTypeId)
        return [...filtered, newDocument]
      })
      
      setUploading('')
    }, 2000)
  }

  const handleDragOver = (e: React.DragEvent, documentTypeId: string) => {
    e.preventDefault()
    setDragOver(documentTypeId)
  }

  const handleDragLeave = () => {
    setDragOver('')
  }

  const handleDrop = (e: React.DragEvent, documentTypeId: string) => {
    e.preventDefault()
    setDragOver('')
    handleFileSelect(documentTypeId, e.dataTransfer.files)
  }

  const getDocumentForType = (documentTypeId: string) => {
    return uploadedDocuments.find(doc => doc.documentTypeId === documentTypeId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'uploaded':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return '✓'
      case 'uploaded':
        return '⏳'
      case 'rejected':
        return '✗'
      default:
        return '○'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const requiredDocsCount = documentTypes.filter(dt => dt.required).length
  const uploadedRequiredDocs = documentTypes.filter(dt => 
    dt.required && getDocumentForType(dt.id)?.status !== 'rejected'
  ).length
  const verifiedDocs = uploadedDocuments.filter(doc => doc.status === 'verified').length

  return (
    <ProtectedRoute>
      <CommonAppLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Documents</h1>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {uploadedRequiredDocs}/{requiredDocsCount}
                  </div>
                  <div className="text-sm text-gray-600">Required Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {verifiedDocs}
                  </div>
                  <div className="text-sm text-gray-600">Verified Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {uploadedDocuments.filter(doc => doc.status === 'uploaded').length}
                  </div>
                  <div className="text-sm text-gray-600">Under Review</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Upload Sections */}
        <div className="space-y-6">
          {documentTypes.map((docType) => {
            const existingDoc = getDocumentForType(docType.id)
            const isUploading = uploading === docType.id
            const isDraggedOver = dragOver === docType.id

            return (
              <Card 
                key={docType.id} 
                className={`transition-all duration-200 ${
                  isDraggedOver ? 'border-blue-400 bg-blue-50' : ''
                } ${
                  existingDoc?.status === 'verified' ? 'border-green-200 bg-green-50' : ''
                } ${
                  existingDoc?.status === 'rejected' ? 'border-red-200 bg-red-50' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {docType.name}
                        {docType.required && <span className="text-red-500 ml-1">*</span>}
                      </CardTitle>
                      {existingDoc && (
                        <Badge className={getStatusColor(existingDoc.status)}>
                          {getStatusIcon(existingDoc.status)} {existingDoc.status.charAt(0).toUpperCase() + existingDoc.status.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>{docType.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                      isDraggedOver 
                        ? 'border-blue-400 bg-blue-50' 
                        : existingDoc 
                        ? 'border-gray-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, docType.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, docType.id)}
                  >
                    {isUploading ? (
                      <div className="space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-600">Uploading...</p>
                      </div>
                    ) : existingDoc ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <span className="text-2xl">{getStatusIcon(existingDoc.status)}</span>
                          <span className="font-medium">{existingDoc.fileName}</span>
                          <span className="text-gray-500">({formatFileSize(existingDoc.fileSize)})</span>
                        </div>
                        {existingDoc.status === 'rejected' && existingDoc.rejectionReason && (
                          <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
                            <p className="text-sm text-red-600">
                              <strong>Rejected:</strong> {existingDoc.rejectionReason}
                            </p>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRefs.current[docType.id]?.click()}
                          className="mt-2"
                        >
                          Replace File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-4xl text-gray-400">📄</div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Drop your file here or{' '}
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-700 underline"
                              onClick={() => fileInputRefs.current[docType.id]?.click()}
                            >
                              browse
                            </button>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Max {docType.maxSize} • {docType.acceptedFormats.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={(el) => {
                      fileInputRefs.current[docType.id] = el
                    }}
                    type="file"
                    accept={docType.acceptedFormats.map(format => `.${format.toLowerCase()}`).join(',')}
                    onChange={(e) => handleFileSelect(docType.id, e.target.files)}
                    className="hidden"
                  />

                  {/* Document Requirements */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>Accepted formats:</strong> {docType.acceptedFormats.join(', ')}</p>
                    <p><strong>Maximum size:</strong> {docType.maxSize}</p>
                    {docType.examples && (
                      <p><strong>Examples:</strong> {docType.examples.join(', ')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button 
            asChild
            variant="outline"
            className="flex-1"
          >
            <Link href="/common-application">
              ← Back to Application
            </Link>
          </Button>
          <Button 
            asChild
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            disabled={uploadedRequiredDocs < requiredDocsCount}
          >
            <Link href="/payments">
              Continue to Payment →
            </Link>
          </Button>
        </div>
      </div>
    </CommonAppLayout>
    </ProtectedRoute>
  )
}

export default DocumentUpload
