'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/auth'
import { NavBar } from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient({})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-stone-300 text-stone-900 dark:bg-black`}
      >
        <AuthProvider>
          <NavBar />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
