'use client'

import { useState, useEffect } from 'react'

interface Comic {
  id: string
  title: string
}

export function AddChapterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [comics, setComics] = useState<Comic[]>([])
  const [formData, setFormData] = useState({
    title: '',
    chapterNum: '',
    comicId: '',
    pages: '',
    publishedAt: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [loadingComics, setLoadingComics] = useState(true)

  useEffect(() => {
    fetchComics()
  }, [])

  const fetchComics = async () => {
    try {
      const response = await fetch('/api/comics')
      if (response.ok) {
        const data = await response.json()
        setComics(data.comics || [])
      }
    } catch (error) {
      console.error('Error fetching comics:', error)
    } finally {
      setLoadingComics(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          chapterNum: parseFloat(formData.chapterNum),
          pages: formData.pages 
            ? formData.pages.split('\n').map(p => p.trim()).filter(p => p)
            : [],
          publishedAt: formData.publishedAt || undefined
        }),
      })

      if (response.ok) {
        const newChapter = await response.json()
        setMessage(`Successfully created chapter: ${newChapter.title}`)
        setFormData({
          title: '',
          chapterNum: '',
          comicId: formData.comicId, // Keep the same comic selected
          pages: '',
          publishedAt: ''
        })
        onSuccess?.()
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error}`)
      }
    } catch (err) {
      console.error('Failed to create chapter:', err)
      setMessage('Failed to create chapter. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Add New Chapter</h2>
      
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
          <label className="block text-gray-300 mb-2">Select Manga *</label>
          {loadingComics ? (
            <div className="text-gray-400">Loading manga list...</div>
          ) : (
            <select
              required
              value={formData.comicId}
              onChange={(e) => setFormData(prev => ({ ...prev, comicId: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="">Choose a manga...</option>
              {comics.map(comic => (
                <option key={comic.id} value={comic.id}>
                  {comic.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Chapter Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="Enter chapter title"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Chapter Number *</label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.chapterNum}
            onChange={(e) => setFormData(prev => ({ ...prev, chapterNum: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
            placeholder="1, 1.5, 2, etc."
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Page URLs (one per line)</label>
          <textarea
            value={formData.pages}
            onChange={(e) => setFormData(prev => ({ ...prev, pages: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none h-32"
            placeholder={`https://example.com/page1.jpg
https://example.com/page2.jpg
https://example.com/page3.jpg`}
          />
          <p className="text-sm text-gray-400 mt-1">
            Enter each page image URL on a new line
          </p>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Published Date (optional)</label>
          <input
            type="datetime-local"
            value={formData.publishedAt}
            onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
          />
          <p className="text-sm text-gray-400 mt-1">
            Leave empty to use current date/time
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.comicId}
          className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Chapter'}
        </button>
      </form>
    </div>
  )
}
