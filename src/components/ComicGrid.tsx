'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/db'

interface Comic {
  id: string
  title: string
  coverImage?: string
  chapters: { title: string, chapterNum: number }[]
}

export function ComicGrid() {
  const [comics, setComics] = useState<Comic[]>([])

  useEffect(() => {
    async function fetchComics() {
      // Fetch comic data from the database
      setComics([{
        id: '1',
        title: 'Sample Comic',
        coverImage: '/path/to/image.jpg',
        chapters: [
          { title: 'Chapter 1', chapterNum: 1 },
          { title: 'Chapter 2', chapterNum: 2 }
        ]
      }])
    }

    fetchComics()
  }, [])

  if (comics.length === 0) return <div className="loading text-yellow-400">Loading comics...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
      {comics.map(comic => (
        <div key={comic.id} className="comic-card border border-yellow-400 p-4 rounded">
          <div className="comic-cover bg-gray-800 h-48 mb-4 flex items-center justify-center text-gray-500">
            {comic.coverImage ? <img src={comic.coverImage} alt={comic.title} className="h-full w-full object-cover" /> : 'No Cover Available'}
          </div>
          <div className="comic-info">
            <h3 className="comic-title text-yellow-400 text-lg font-bold mb-2">{comic.title}</h3>
            <ul className="comic-chapters">
              {comic.chapters.map(chapter => (
                <li key={chapter.chapterNum} className="flex justify-between items-center text-white">
                  <a href="#" className="chapter-link hover:text-yellow-400">{chapter.title}</a>
                  <span className="chapter-number text-sm">#{chapter.chapterNum}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
