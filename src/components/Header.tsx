'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, Heart, Settings } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black border-b-2 border-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
            NEKO SCANS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link href="/browse" className="text-white hover:text-yellow-400 transition-colors">
              Browse
            </Link>
            <Link href="/favorites" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
              <Heart size={18} />
              Favorites
            </Link>
            <Link href="/admin" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
              <Settings size={18} />
              Admin
            </Link>
            <Link href="/profile" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
              <User size={18} />
              Profile
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-yellow-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-yellow-400/20 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link href="/browse" className="text-white hover:text-yellow-400 transition-colors">
                Browse
              </Link>
              <Link href="/favorites" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
                <Heart size={18} />
                Favorites
              </Link>
              <Link href="/admin" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
                <Settings size={18} />
                Admin
              </Link>
              <Link href="/profile" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2">
                <User size={18} />
                Profile
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
