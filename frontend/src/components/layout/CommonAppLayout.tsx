'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  DocumentTextIcon, 
  AcademicCapIcon, 
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Card } from '@/components/ui/card'

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  count?: number
}

interface CommonAppLayoutProps {
  children: React.ReactNode
  activeItem?: string
  userName?: string
  userId?: string
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
  { id: 'application', label: 'My Application', icon: DocumentTextIcon, href: '/common-application' },
  { id: 'colleges', label: 'My Colleges', icon: AcademicCapIcon, href: '/my-universities' },
  { id: 'search', label: 'College Search', icon: MagnifyingGlassIcon, href: '/university-search' },
  { id: 'admissions', label: 'Direct Admissions', icon: DocumentCheckIcon, href: '/universities' },
  { id: 'financial', label: 'Financial Aid', icon: CurrencyDollarIcon, href: '/scholarships' },
]

const BOTTOM_ITEMS: SidebarItem[] = [
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
  { id: 'signout', label: 'Sign out', icon: ArrowRightOnRectangleIcon, href: '/signout' },
]

export default function CommonAppLayout({ 
  children, 
  activeItem,
  userName = 'Student',
  userId = 'ID: 12345'
}: CommonAppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  // Auto-detect active item based on current path
  const currentActiveItem = activeItem || (() => {
    if (pathname === '/dashboard') return 'dashboard'
    if (pathname === '/common-application') return 'application'
    if (pathname === '/my-universities') return 'colleges'
    if (pathname === '/university-search') return 'search'
    if (pathname === '/universities') return 'admissions'
    if (pathname === '/scholarships') return 'financial'
    return 'dashboard'
  })()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">UB</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">UniBridge</span>
          </div>
        )}
        
        {/* Desktop collapse toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          )}
        </button>
        
        {/* Mobile close button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = currentActiveItem === item.id
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`ca-sidebar-item ${isActive ? 'ca-sidebar-item-active' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 px-3 py-4">
        {/* Settings and Sign out */}
        <div className="space-y-1 mb-4">
          {BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="ca-sidebar-item"
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="flex-1">{item.label}</span>}
              </Link>
            )
          })}
        </div>

        {/* User info */}
        {!sidebarCollapsed && (
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {userId}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-lg lg:static lg:inset-auto lg:z-auto lg:shadow-md
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64 transition-all duration-300 ease-in-out
        rounded-r-xl lg:rounded-r-none
      `}>
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">UB</span>
            </div>
            <span className="font-semibold text-gray-900">UniBridge</span>
          </div>
          
          <div className="w-8 h-8" /> {/* Spacer for centering */}
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
