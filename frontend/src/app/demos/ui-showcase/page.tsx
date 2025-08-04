'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UIShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UniBridge Ghana Enhanced UI Showcase
          </h1>
          <p className="text-xl text-gray-600">
            Explore the new user interface components based on the blueprint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enhanced Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                🏠 Enhanced Student Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                New dashboard with improved UX, progress tracking, and mobile-first design.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-6">
                <li>• Application status cards with progress indicators</li>
                <li>• Mobile bottom navigation</li>
                <li>• UniBridge brand colors and typography</li>
                <li>• Trust-building UI elements</li>
              </ul>
              <Link href="/dashboard-enhanced">
                <Button className="w-full bg-unibridge-primary hover:bg-unibridge-primary/90">
                  View Enhanced Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enhanced Onboarding */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                👋 Enhanced Onboarding Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Progressive disclosure onboarding with step-by-step guidance and celebrations.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-6">
                <li>• 4-step guided profile setup</li>
                <li>• Progress indicators and visual feedback</li>
                <li>• Contextual help and tips</li>
                <li>• Completion celebration</li>
              </ul>
              <Link href="/onboarding-enhanced">
                <Button className="w-full bg-unibridge-secondary hover:bg-unibridge-secondary/90">
                  Try Enhanced Onboarding
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enhanced Application Form */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                📝 Enhanced Application Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Multi-step application form with autosave, inline validation, and progress tracking.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-6">
                <li>• Progressive section navigation</li>
                <li>• Real-time validation and feedback</li>
                <li>• Auto-save functionality</li>
                <li>• WAEC integration placeholder</li>
              </ul>
              <Link href="/apply-enhanced">
                <Button className="w-full bg-unibridge-accent hover:bg-unibridge-accent/90 text-gray-900">
                  Try Enhanced Application
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* CommonApp-Inspired Layout */}
          <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                🏆 CommonApp-Inspired Layout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Professional application interface inspired by CommonApp's proven UX patterns.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-6">
                <li>• Sidebar navigation with progress tracking</li>
                <li>• Sticky header and action bar</li>
                <li>• Section completion indicators</li>
                <li>• Professional form layout</li>
                <li>• Real-time save status</li>
              </ul>
              <Link href="/commonapp-inspired">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  View CommonApp Style →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Design System */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                🎨 Design System Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Showcase of the UniBridge design system with colors, typography, and components.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-unibridge-primary rounded"></div>
                  <span className="text-sm">Primary Blue (#1e40af)</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-unibridge-secondary rounded"></div>
                  <span className="text-sm">Secondary Purple (#7c3aed)</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-unibridge-accent rounded"></div>
                  <span className="text-sm">Accent Gold (#f59e0b)</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                View Design System
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Implementation Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">✅ Completed</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Design system setup</li>
                    <li>• Enhanced dashboard</li>
                    <li>• Progressive onboarding</li>
                    <li>• Multi-step forms</li>
                    <li>• Mobile-first design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-600 mb-2">🚧 In Progress</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Essay writing center</li>
                    <li>• Payment integration UI</li>
                    <li>• University dashboard</li>
                    <li>• Analytics screens</li>
                    <li>• Document upload</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">📋 Planned</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Accessibility features</li>
                    <li>• Dark mode toggle</li>
                    <li>• PWA features</li>
                    <li>• Micro-interactions</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
