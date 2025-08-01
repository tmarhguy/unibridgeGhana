'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import CommonAppLayout from '@/components/layout/CommonAppLayout'
import { ADVANCED_FILTERS, PAYMENT_CHANNELS, UNIVERSITY_ANALYTICS } from '@/data/enhanced-features'

// Icons (you can replace with actual icon library)
const SearchIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
const FilterIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707l-2 2A1 1 0 0111 21v-6.586a1 1 0 00-.293-.707L4.293 7.293A1 1 0 014 6.586V4z" /></svg>
const MobileIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
const BankIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
const LocationIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

export default function UniversityAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedRegion, setSelectedRegion] = useState('ALL')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ALL')

  return (
    <CommonAppLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ghana University Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive insights into {UNIVERSITY_ANALYTICS.total_institutions}+ tertiary institutions across Ghana
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{UNIVERSITY_ANALYTICS.total_institutions}</div>
              <div className="text-blue-100">Total Institutions</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{UNIVERSITY_ANALYTICS.breakdown.public}</div>
              <div className="text-green-100">Public Universities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{UNIVERSITY_ANALYTICS.breakdown.private}</div>
              <div className="text-purple-100">Private Universities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">10</div>
              <div className="text-orange-100">Regions Covered</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon />
                <Input
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Categories</option>
                {Object.entries(ADVANCED_FILTERS.categories).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Regions</option>
                {ADVANCED_FILTERS.regions.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.name} ({region.count})
                  </option>
                ))}
              </select>
              
              <select 
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Payment Methods</option>
                <option value="MOMO">Mobile Money</option>
                <option value="BANK">Bank Transfer</option>
                <option value="INTERNATIONAL">International</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterIcon />
                University Categories
              </CardTitle>
              <CardDescription>
                Distribution of institutions by type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(UNIVERSITY_ANALYTICS.breakdown).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      <span className="font-medium capitalize">{key.replace('_', ' ')}</span>
                    </div>
                    <Badge variant="secondary">{value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LocationIcon />
                Regional Distribution
              </CardTitle>
              <CardDescription>
                Universities across Ghana's regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(UNIVERSITY_ANALYTICS.regional_distribution).slice(0, 6).map(([region, count]) => (
                  <div key={region} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                      <span className="font-medium">{region.replace('_', ' ')}</span>
                    </div>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MobileIcon />
              Payment Channel Support
            </CardTitle>
            <CardDescription>
              Available payment methods for university applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mobile Money */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MobileIcon />
                  <h3 className="text-lg font-semibold">Mobile Money</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Supported Universities:</div>
                  <Badge className="bg-yellow-500 text-white">
                    {PAYMENT_CHANNELS.momo.supported_universities} institutions
                  </Badge>
                  <div className="text-xs text-gray-500 mt-2">
                    Providers: {PAYMENT_CHANNELS.momo.providers.join(', ')}
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <BankIcon />
                  <h3 className="text-lg font-semibold">Bank Transfer</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Supported Banks:</div>
                  <Badge className="bg-blue-500 text-white">
                    {PAYMENT_CHANNELS.banks.all_banks.length} major banks
                  </Badge>
                  <div className="text-xs text-gray-500 mt-2">
                    All local and international banks accepted
                  </div>
                </div>
              </div>

              {/* International */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold">International</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Currencies:</div>
                  <div className="flex gap-2">
                    {PAYMENT_CHANNELS.international.currencies.map((currency) => (
                      <Badge key={currency} variant="outline" className="text-purple-600 border-purple-300">
                        {currency}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    For international students
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Fee Ranges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Fee Analysis</CardTitle>
            <CardDescription>
              Fee distribution across different university categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {ADVANCED_FILTERS.application_fees.map((fee, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 mb-2">{fee.range}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{fee.count}</div>
                  <div className="text-sm text-gray-600">Universities</div>
                  {fee.universities && (
                    <div className="text-xs text-gray-500 mt-2">
                      Examples: {fee.universities.slice(0, 2).join(', ')}
                      {fee.universities.length > 2 && '...'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Establishment Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>University Establishment Timeline</CardTitle>
            <CardDescription>
              Growth of tertiary education in Ghana over the decades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(UNIVERSITY_ANALYTICS.establishment_timeline).map(([period, count]) => (
                <div key={period} className="text-center">
                  <div className="bg-gradient-to-t from-indigo-500 to-indigo-400 text-white rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold">{count}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">{period.replace('_', ' ')}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CommonAppLayout>
  )
}
