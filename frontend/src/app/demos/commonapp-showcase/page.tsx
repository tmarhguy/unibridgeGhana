'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CommonAppShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            UniBridge - CommonApp Inspired Design
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            A complete redesign with green theme and professional CommonApp-style layout
          </p>
        </div>

        {/* Design Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Preview */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                🏠 Dashboard
              </h2>
              <p className="text-neutral-600 text-sm">
                Clean welcome interface with progress tracking and quick actions
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Application Progress</span>
                  <span className="text-sm font-medium">50%</span>
                </div>
                <div className="ca-progress-bar">
                  <div className="ca-progress-fill" style={{ width: '50%' }} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full mx-auto mb-1"></div>
                    <span className="text-xs">Profile</span>
                  </div>
                  <div className="text-center p-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full mx-auto mb-1"></div>
                    <span className="text-xs">Family</span>
                  </div>
                  <div className="text-center p-2">
                    <div className="w-6 h-6 border-2 border-dashed border-neutral-300 rounded-full mx-auto mb-1"></div>
                    <span className="text-xs">Testing</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard-new">
                  <Button variant="primary" size="sm" className="w-full">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Application Form Preview */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                📝 Application Form
              </h2>
              <p className="text-neutral-600 text-sm">
                Professional forms with CommonApp-style inputs and validation
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="ca-label">Legal first name *</label>
                  <input className="ca-input" value="Kwame" readOnly />
                </div>
                <div>
                  <label className="ca-label">Birth date *</label>
                  <input className="ca-input" type="date" value="2006-03-15" readOnly />
                </div>
                <div className="flex gap-4 mt-4">
                  <button className="ca-button-secondary text-xs px-3 py-1">
                    Cancel
                  </button>
                  <button className="ca-button-primary text-xs px-3 py-1">
                    Save & Continue
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/application-new">
                  <Button variant="primary" size="sm" className="w-full">
                    View Application Form
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Sidebar Preview */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 border-b border-purple-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                🔧 Sidebar Navigation
              </h2>
              <p className="text-neutral-600 text-sm">
                Collapsible sidebar with clear navigation and user info
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="ca-sidebar-item ca-sidebar-item-active">
                  <div className="w-4 h-4 bg-neutral-700 rounded"></div>
                  <span>Dashboard</span>
                </div>
                <div className="ca-sidebar-item">
                  <div className="w-4 h-4 bg-neutral-400 rounded"></div>
                  <span>My Application</span>
                </div>
                <div className="ca-sidebar-item">
                  <div className="w-4 h-4 bg-neutral-400 rounded"></div>
                  <span>My Colleges</span>
                </div>
                <div className="ca-sidebar-item">
                  <div className="w-4 h-4 bg-neutral-400 rounded"></div>
                  <span>College Search</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">KA</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">Kwame Asante</p>
                    <p className="text-xs text-neutral-600 truncate">ID: UB2025001</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Design System Preview */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 border-b border-green-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                🎨 Design System
              </h2>
              <p className="text-neutral-600 text-sm">
                Green theme with CommonApp typography and components
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="ca-status-complete">✓ Complete</div>
                  <div className="ca-status-incomplete">○ Incomplete</div>
                </div>
                <div className="space-y-2">
                  <Button variant="default" size="sm">Primary Button</Button>
                  <Button variant="outline" size="sm">Secondary Button</Button>
                  <Button variant="primary" size="sm">Green Button</Button>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  <div className="w-full h-8 bg-green-600 rounded text-xs text-white flex items-center justify-center">600</div>
                  <div className="w-full h-8 bg-green-500 rounded text-xs text-white flex items-center justify-center">500</div>
                  <div className="w-full h-8 bg-green-400 rounded text-xs text-white flex items-center justify-center">400</div>
                  <div className="w-full h-8 bg-green-300 rounded text-xs flex items-center justify-center">300</div>
                  <div className="w-full h-8 bg-green-100 rounded text-xs flex items-center justify-center">100</div>
                </div>
                <p className="text-xs text-neutral-600">
                  Inter font, 12px border radius, clean shadows
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Highlights */}
        <Card>
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              ✨ Key Features Implemented
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">🎨 Visual Design</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Green color theme (#16A34A)</li>
                  <li>• CommonApp-inspired layout</li>
                  <li>• Professional typography (Inter)</li>
                  <li>• Subtle shadows and borders</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">🚀 UX Patterns</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Collapsible sidebar navigation</li>
                  <li>• Progress tracking visualization</li>
                  <li>• Sticky action bars</li>
                  <li>• Preview modals with watermarks</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">📱 Responsive</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Mobile-first design</li>
                  <li>• Sidebar collapses on mobile</li>
                  <li>• Touch-friendly interactions</li>
                  <li>• Adaptive layouts</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-xl font-medium text-neutral-900 mb-4">
            🚀 Ready to explore the new design?
          </h3>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard-new">
              <Button variant="primary" size="lg">
                Try Dashboard
              </Button>
            </Link>
            <Link href="/application-new">
              <Button variant="outline" size="lg">
                Try Application Form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
