'use client'

import { useAuth } from '@/context/auth'
import Link from 'next/link'
import { useState } from 'react'

export const NavBar: React.FC = () => {
  const { user, logout, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    // ログアウト後にメニューを閉じる
    setIsOpen(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <nav className="relative">
      <div className="flex justify-between items-center">
        <div className="p-2">
          <Link href="/">YourLogo</Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/accounts">Accounts</Link>
          <Link href="/transactions">Transactions</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white md:hidden">
          <Link href="/" className="block p-2">
            Home
          </Link>
          <Link href="/accounts" className="block p-2">
            Accounts
          </Link>
          <Link href="/transactions" className="block p-2">
            Transactions
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left p-2 text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="block p-2 text-blue-500">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
