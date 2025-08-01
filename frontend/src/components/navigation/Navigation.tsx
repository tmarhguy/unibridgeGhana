'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import NotificationDropdown from './NotificationDropdown'
import { 
  Home,
  FileText,
  PenTool,
  GraduationCap,
  Search,
  FolderOpen,
  CreditCard,
  BarChart3,
  User,
  LogOut,
  Settings,
  Save
} from 'lucide-react'

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigationTabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Application overview'
    },
    {
      id: 'common-app',
      label: 'Common Application',
      href: '/common-application',
      icon: FileText,
      description: 'Fill out your application'
    },
    {
      id: 'essays',
      label: 'Essay Center',
      href: '/essays',
      icon: PenTool,
      description: 'Write and edit your essays'
    },
    {
      id: 'my-universities',
      label: 'My Universities',
      href: '/my-universities',
      icon: GraduationCap,
      description: 'Manage your university list'
    },
    {
      id: 'university-search',
      label: 'Find Universities',
      href: '/university-search',
      icon: Search,
      description: 'Search and add universities'
    },
    {
      id: 'documents',
      label: 'Documents',
      href: '/documents',
      icon: FolderOpen,
      description: 'Upload required documents'
    },
    {
      id: 'payments',
      label: 'Payment Center',
      href: '/payments',
      icon: CreditCard,
      description: 'Manage application fees'
    },
    {
      id: 'analytics',
      label: 'Insights',
      href: '/analytics',
      icon: BarChart3,
      description: 'University analytics'
    }
  ]

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header */}
            {/* Main Header */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <div>
                  <div className="text-xl font-semibold tracking-tight">UniBridge Ghana</div>
                  <div className="text-sm text-slate-400">Common Application Platform</div>
                </div>
              </Link>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-6">
              {/* Application Status */}
              <div className="hidden md:flex items-center gap-3 text-sm">
                <span className="text-slate-300">2025 Application Cycle</span>
                <Badge className="bg-emerald-500 text-white border-0">Active</Badge>
              </div>

              {/* Notifications */}
              <NotificationDropdown />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
                    <div className="text-xs text-emerald-100">{user?.email}</div>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Account Settings
                    </Link>
                    <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Help & Support
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Main Navigation */}
            <nav className="flex space-x-0">
              {navigationTabs.map((tab) => {
                const isActive = pathname.startsWith(tab.href)
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`group relative flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors border-b-2 ${
                      isActive
                        ? 'text-emerald-400 border-emerald-400 bg-slate-700/50'
                        : 'text-slate-300 border-transparent hover:text-white hover:border-slate-500'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden lg:block">{tab.label}</span>
                    
                    {/* Tooltip for smaller screens */}
                    <div className="lg:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {tab.label}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="hidden md:flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </Button>
              <Button 
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Page Indicator */}
      <div className="bg-slate-700 border-b border-slate-600">
        <div className="max-w-7xl mx-auto px-6 py-2">
          {navigationTabs.map((tab) => {
            if (pathname.startsWith(tab.href)) {
              return (
                <div key={tab.id} className="flex items-center gap-2 text-sm text-slate-300">
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium text-slate-100">{tab.label}</span>
                  <span>•</span>
                  <span>{tab.description}</span>
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default Navigation
