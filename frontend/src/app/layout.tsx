import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UniBridge GH - Ghana Common Application Platform',
  description: 'Unified application platform for Ghanaian tertiary admissions',
  keywords: ['Ghana', 'University', 'Application', 'Education', 'Admissions'],
  authors: [{ name: 'UniBridge GH Team' }],
  openGraph: {
    title: 'UniBridge GH',
    description: 'Unified application platform for Ghanaian tertiary admissions',
    type: 'website',
    siteName: 'UniBridge Ghana',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UniBridge GH',
    description: 'Unified application platform for Ghanaian tertiary admissions',
  },
  icons: {
    icon: [
      { url: '/icon?<generated>', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon?<generated>', type: 'image/png', sizes: '180x180' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <ChatBot />
        </Providers>
      </body>
    </html>
  )
}
