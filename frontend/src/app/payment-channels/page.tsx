'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Payment Channel Interface
interface PaymentChannel {
  id: string
  name: string
  description: string
  university: string
  method: 'mobile_money' | 'bank' | 'ussd' | 'online'
  details: {
    code?: string
    provider?: string
    fees?: string
    instructions?: string
  }
}

// Sample comprehensive payment data
const PAYMENT_CHANNELS_DATA: PaymentChannel[] = [
  // University of Ghana
  {
    id: 'ug_momo',
    name: 'UG Mobile Money',
    description: 'Pay University of Ghana fees via mobile money',
    university: 'University of Ghana (UG)',
    method: 'mobile_money',
    details: {
      code: '*887*37#',
      provider: 'MTN/Vodafone/AirtelTigo',
      fees: 'Vendor code: 887',
      instructions: 'Dial *887*37# → Select University → Follow prompts'
    }
  },
  {
    id: 'ug_bank',
    name: 'UG Bank Transfer',
    description: 'Direct bank transfer to University of Ghana',
    university: 'University of Ghana (UG)',
    method: 'bank',
    details: {
      provider: 'All major banks',
      fees: 'Bank charges apply',
      instructions: 'Account: UG Student Fees Account at any local bank'
    }
  },
  
  // KNUST
  {
    id: 'knust_ussd',
    name: 'KNUST USSD Payment',
    description: 'Quick USSD payment for KNUST fees',
    university: 'Kwame Nkrumah University of Science and Technology (KNUST)',
    method: 'ussd',
    details: {
      code: '*415*55#',
      provider: 'MTN',
      fees: 'No additional charges',
      instructions: 'Dial *415*55# → Enter student ID → Amount → PIN'
    }
  },
  
  // University of Cape Coast
  {
    id: 'ucc_momo',
    name: 'UCC Mobile Money',
    description: 'Mobile money payments for University of Cape Coast',
    university: 'University of Cape Coast (UCC)',
    method: 'mobile_money',
    details: {
      code: '*887*9#',
      provider: 'All networks',
      fees: 'Standard MoMo charges',
      instructions: 'Dial *887*9# → Select UCC → Follow payment steps'
    }
  },
  
  // University of Health and Allied Sciences
  {
    id: 'uhas_ussd',
    name: 'UHAS Quick Pay',
    description: 'USSD payment system for UHAS',
    university: 'University of Health and Allied Sciences (UHAS)',
    method: 'ussd',
    details: {
      code: '*920*224*1#',
      provider: 'Vodafone',
      fees: 'Minimal charges',
      instructions: 'Dial *920*224*1# → Student details → Payment amount'
    }
  },
  
  // Ghana Communication Technology University
  {
    id: 'gctu_hybrid',
    name: 'GCTU Payment Hub',
    description: 'Multiple payment options for GCTU',
    university: 'Ghana Communication Technology University (GCTU)',
    method: 'online',
    details: {
      code: '*924*200*3#',
      provider: 'AirtelTigo/Online Portal',
      fees: 'Processing fee applies',
      instructions: 'Use USSD *924*200*3# or visit online portal'
    }
  },
  
  // Central University
  {
    id: 'central_momo',
    name: 'Central University MoMo',
    description: 'Mobile money for Central University',
    university: 'Central University',
    method: 'mobile_money',
    details: {
      code: '*887*9#',
      provider: 'All networks',
      fees: 'Standard charges',
      instructions: 'Use vendor code for Central University payments'
    }
  },
  
  // Private Universities with International Options
  {
    id: 'ashesi_intl',
    name: 'Ashesi International',
    description: 'International payment options for Ashesi',
    university: 'Ashesi University',
    method: 'online',
    details: {
      provider: 'Visa/Mastercard/Wire Transfer',
      fees: 'International transfer fees apply',
      instructions: 'Online portal supports USD, EUR, GBP payments'
    }
  },
  
  {
    id: 'lug_intl',
    name: 'Lancaster University Ghana',
    description: 'International student payment portal',
    university: 'Lancaster University Ghana (LUG)',
    method: 'online',
    details: {
      provider: 'International banking',
      fees: 'Currency conversion applies',
      instructions: 'Multi-currency support via secure online portal'
    }
  },
  
  // Technical Universities
  {
    id: 'atu_momo',
    name: 'ATU Mobile Pay',
    description: 'Accra Technical University mobile payments',
    university: 'Accra Technical University (ATU)',
    method: 'mobile_money',
    details: {
      provider: 'MTN/Vodafone',
      fees: 'Network charges apply',
      instructions: 'Contact ATU finance office for payment codes'
    }
  },
  
  // Additional universities
  {
    id: 'gimpa_bank',
    name: 'GIMPA Banking',
    description: 'GIMPA specialized payment channels',
    university: 'Ghana Institute of Management and Public Administration (GIMPA)',
    method: 'bank',
    details: {
      provider: 'CBG Bank/Ecobank preferred',
      fees: 'Institutional rates',
      instructions: 'Special arrangement with partner banks'
    }
  }
]

const PaymentChannelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string>('all')
  const [selectedUniversity, setSelectedUniversity] = useState<string>('all')

  // Filter and search logic
  const filteredChannels = useMemo(() => {
    return PAYMENT_CHANNELS_DATA.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           channel.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           channel.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesMethod = selectedMethod === 'all' || channel.method === selectedMethod
      
      const matchesUniversity = selectedUniversity === 'all' || 
                               channel.university.toLowerCase().includes(selectedUniversity.toLowerCase())
      
      return matchesSearch && matchesMethod && matchesUniversity
    })
  }, [searchTerm, selectedMethod, selectedUniversity])

  // Get unique universities for filter
  const universities = useMemo(() => {
    const uniqueUniversities = Array.from(new Set(PAYMENT_CHANNELS_DATA.map(channel => channel.university)))
    return uniqueUniversities.sort()
  }, [])

  // Method color mapping
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'mobile_money': return 'bg-green-500 text-white'
      case 'ussd': return 'bg-blue-500 text-white'
      case 'bank': return 'bg-purple-500 text-white'
      case 'online': return 'bg-orange-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mobile_money':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      case 'ussd':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
      case 'bank':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      case 'online':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" /></svg>
      default:
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            University Payment Channels
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to paying application and tuition fees at Ghana's universities
          </p>
        </div>

        {/* Compact Quick Stats */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="font-semibold text-green-600">{PAYMENT_CHANNELS_DATA.filter(c => c.method === 'mobile_money').length}</div>
                <div className="text-gray-500">Mobile</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{PAYMENT_CHANNELS_DATA.filter(c => c.method === 'ussd').length}</div>
                <div className="text-gray-500">USSD</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">{PAYMENT_CHANNELS_DATA.filter(c => c.method === 'bank').length}</div>
                <div className="text-gray-500">Bank</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-orange-600">{PAYMENT_CHANNELS_DATA.filter(c => c.method === 'online').length}</div>
                <div className="text-gray-500">Online</div>
              </div>
            </div>
            <div className="text-gray-600">
              {PAYMENT_CHANNELS_DATA.length} payment methods available
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  placeholder="Search payment channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select 
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payment Methods</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="ussd">USSD Codes</option>
                <option value="bank">Bank Transfer</option>
                <option value="online">Online Portal</option>
              </select>
              
              <select 
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Universities</option>
                {universities.map((university) => (
                  <option key={university} value={university}>
                    {university.length > 40 ? `${university.substring(0, 40)}...` : university}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Payment Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <Card key={channel.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{channel.name}</CardTitle>
                  <Badge className={getMethodColor(channel.method)}>
                    <div className="flex items-center gap-1">
                      {getMethodIcon(channel.method)}
                      <span className="capitalize">{channel.method.replace('_', ' ')}</span>
                    </div>
                  </Badge>
                </div>
                <CardDescription className="text-sm font-medium text-blue-600">
                  {channel.university}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                
                <div className="space-y-3">
                  {channel.details.code && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-700 mb-1">Payment Code</div>
                      <div className="font-mono text-lg font-bold text-blue-600">{channel.details.code}</div>
                    </div>
                  )}
                  
                  {channel.details.provider && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Provider</div>
                      <div className="text-gray-600">{channel.details.provider}</div>
                    </div>
                  )}
                  
                  {channel.details.fees && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Fees</div>
                      <div className="text-gray-600">{channel.details.fees}</div>
                    </div>
                  )}
                  
                  {channel.details.instructions && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Instructions</div>
                      <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                        {channel.details.instructions}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Use This Payment Method
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredChannels.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.071-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payment channels found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-800">Need Help with Payments?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Mobile Money Tips</h4>
                <ul className="text-sm text-indigo-600 space-y-1">
                  <li>• Ensure you have sufficient balance before initiating payment</li>
                  <li>• Keep your transaction ID for reference</li>
                  <li>• Check network-specific codes for best rates</li>
                  <li>• Contact university finance office if payment fails</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Bank Transfer Guide</h4>
                <ul className="text-sm text-indigo-600 space-y-1">
                  <li>• Use student ID as payment reference</li>
                  <li>• Keep bank receipt for verification</li>
                  <li>• Allow 1-2 business days for processing</li>
                  <li>• Submit payment proof to admissions office</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PaymentChannelsPage
