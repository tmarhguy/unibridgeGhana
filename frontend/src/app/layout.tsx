import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UniBridge GH - Ghana Common Application Platform',
  description: 'Unified application platform for Ghanaian tertiary admissions',
  keywords: ['Ghana', 'University', 'Application', 'Education', 'Admissions'],
  authors: [{ name: 'UniBridge GH Team' }],
  manifest: '/manifest.json',
  themeColor: '#10b981',
  viewport: 'width=device-width, initial-scale=1',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-16x16.svg" type="image/svg+xml" sizes="16x16" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <ChatBot />
        </Providers>
      </body>
    </html>
  )
}
