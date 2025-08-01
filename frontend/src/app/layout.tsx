import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

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
  },
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
        </Providers>
      </body>
    </html>
  )
}
