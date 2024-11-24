'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-background border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          TMS
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="text-foreground hover:text-primary">
            Home
          </Link>
          {!user ? (
            <>
              <Link href="/register" className="text-foreground hover:text-primary">
                Register
              </Link>
              <Link href="/login" className="text-foreground hover:text-primary">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link href="/test" className="text-foreground hover:text-primary">
                Take Test
              </Link>
              <Link
                href="/"
                className="text-foreground hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden">
          <Link href="/" className="block py-2 px-4 text-sm hover:bg-accent">
            Home
          </Link>
          {!user ? (
            <>
              <Link href="/register" className="block py-2 px-4 text-sm hover:bg-accent">
                Register
              </Link>
              <Link href="/login" className="block py-2 px-4 text-sm hover:bg-accent">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="block py-2 px-4 text-sm hover:bg-accent">
                Dashboard
              </Link>
              <Link href="/test" className="block py-2 px-4 text-sm hover:bg-accent">
                Take Test
              </Link>
              <Link
                href="/"
                className="block w-full text-left py-2 px-4 text-sm hover:bg-accent"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </Link>
            </>
          )}
          <div className="py-2 px-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}