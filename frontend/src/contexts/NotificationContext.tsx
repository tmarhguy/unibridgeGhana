'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionLabel?: string
  urgent?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Application Deadline Approaching',
      message: 'Your University of Ghana application deadline is in 5 days',
      timestamp: new Date(),
      read: false,
      urgent: true,
      actionUrl: '/my-universities',
      actionLabel: 'View Application'
    },
    {
      id: '2',
      type: 'info',
      title: 'Essay Auto-saved',
      message: 'Your personal statement has been automatically saved',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      actionUrl: '/essays',
      actionLabel: 'Continue Writing'
    },
    {
      id: '3',
      type: 'success',
      title: 'Document Uploaded',
      message: 'Your WASSCE certificate has been successfully uploaded',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      read: true,
      actionUrl: '/documents',
      actionLabel: 'View Documents'
    }
  ])

  const addNotification = (newNotification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    setNotifications(prev => [notification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const unreadCount = notifications.filter(notif => !notif.read).length

  // Auto-add deadline notifications
  useEffect(() => {
    const checkDeadlines = () => {
      // This would integrate with actual application data
      // For now, we'll simulate deadline checks
      const today = new Date()
      const oneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      
      // Example: Check if any deadlines are approaching
      // In real implementation, this would check actual application deadlines
    }

    checkDeadlines()
    const interval = setInterval(checkDeadlines, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
