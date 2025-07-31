'use client'

import { useState } from 'react'

export function AddMangaForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    coverImage: '',
    status: 'ONGOING',
    genres: '',
    tags: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/comics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          genres: formData.genres.split(',').map(g => g.trim()).filter(g => g),
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        }),
      })

      if (response.ok) {
        const newComic = await response.json()
        setMessage(`Successfully created manga: ${newComic.title}`)
        setFormData({
          title: '',
          description: '',
          author: '',
          coverImage: '',
          status: 'ONGOING',
          genres: '',
          tags: ''
        })
        onSuccess?.()
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error}`)
      }
    } catch (err) {
      console.error('Failed to create manga:', err)
      setMessage('Failed to create manga. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Add New Manga</h2>
      
      {message && (
        <div className={`p-3 rounded mb-4 ${
          message.startsWith('Successfully') 
            ? 'bg-green-900 text-green-300' 
            : 'bg-red-900 text-red-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="Enter manga title"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none h-24"
            placeholder="Enter manga description"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Cover Image URL</label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
          >
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="HIATUS">Hiatus</option>
            <option value="DROPPED">Dropped</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Genres (comma-separated)</label>
          <input
            type="text"
            value={formData.genres}
            onChange={(e) => setFormData(prev => ({ ...prev, genres: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="Action, Adventure, Comedy"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="Shounen, Fantasy, School"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Manga'}
        </button>
      </form>
    </div>
  )
}
