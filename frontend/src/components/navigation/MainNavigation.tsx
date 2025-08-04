'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  description: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', description: 'Your application overview' },
  { label: 'My Application', href: '/common-application', description: 'Common App form' },
  { label: 'My Colleges', href: '/my-universities', description: 'Your university list' },
  { label: 'College Search', href: '/university-search', description: 'Find universities' },
  { label: 'Direct Admissions', href: '/universities', description: 'Apply directly' },
  { label: 'Financial Aid', href: '/scholarships', description: 'Find scholarships' },
]

export default function MainNavigation() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">UB</span>
            </div>
            <span className="font-bold text-xl text-gray-900">UniBridge Ghana</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={item.description}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (optional - could be implemented as dropdown) */}
      <div className="lg:hidden">
        <div className="px-4 py-2 space-y-1 bg-gray-50 border-t border-gray-200">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
