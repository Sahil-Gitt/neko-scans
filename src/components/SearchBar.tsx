'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for comics..."
            className="w-full bg-gray-900 border-2 border-yellow-400 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300 transition-colors"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" size={20} />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition-colors font-medium"
        >
          Search
        </button>
      </form>
    </div>
  )
}
