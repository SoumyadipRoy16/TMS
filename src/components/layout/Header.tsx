'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TMS
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/test" className="text-gray-700 hover:text-blue-600">
            Take Test
          </Link>
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
          <Link href="/" className="block py-2 px-4 text-sm hover:bg-gray-100">
            Home
          </Link>
          <Link
            href="/register"
            className="block py-2 px-4 text-sm hover:bg-gray-100"
          >
            Register
          </Link>
          <Link
            href="/dashboard"
            className="block py-2 px-4 text-sm hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/test"
            className="block py-2 px-4 text-sm hover:bg-gray-100"
          >
            Take Test
          </Link>
        </div>
      )}
    </header>
  )
}