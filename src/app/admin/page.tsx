'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { AddMangaForm } from '@/components/admin/AddMangaForm'
import { AddChapterForm } from '@/components/admin/AddChapterForm'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('manga')
  const [dbStatus, setDbStatus] = useState<{
    status: string;
    message: string;
    comicCount?: number;
    error?: string;
    timestamp: string;
  } | null>(null)
  const [testingDb, setTestingDb] = useState(false)

  const testDatabase = async () => {
    setTestingDb(true)
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      setDbStatus(data)
    } catch (error) {
      setDbStatus({
        status: 'error',
        message: 'Failed to test database connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setTestingDb(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Admin Panel</h1>
        
        {/* Database Status Section */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">Database Status</h2>
          <button
            onClick={testDatabase}
            disabled={testingDb}
            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 disabled:opacity-50 mb-4"
          >
            {testingDb ? 'Testing...' : 'Test Database Connection'}
          </button>
          
          {dbStatus && (
            <div className={`p-4 rounded ${
              dbStatus.status === 'success' 
                ? 'bg-green-900 text-green-300' 
                : 'bg-red-900 text-red-300'
            }`}>
              <p><strong>Status:</strong> {dbStatus.status}</p>
              <p><strong>Message:</strong> {dbStatus.message}</p>
              {dbStatus.comicCount !== undefined && (
                <p><strong>Comics in database:</strong> {dbStatus.comicCount}</p>
              )}
              {dbStatus.error && (
                <p><strong>Error:</strong> {dbStatus.error}</p>
              )}
              <p><strong>Timestamp:</strong> {dbStatus.timestamp}</p>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('manga')}
            className={`px-6 py-3 rounded font-bold ${
              activeTab === 'manga'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Add Manga
          </button>
          <button
            onClick={() => setActiveTab('chapter')}
            className={`px-6 py-3 rounded font-bold ${
              activeTab === 'chapter'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Add Chapter
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {activeTab === 'manga' && (
            <AddMangaForm onSuccess={() => {
              // Optionally refresh data or show success message
              console.log('Manga created successfully')
            }} />
          )}
          
          {activeTab === 'chapter' && (
            <AddChapterForm onSuccess={() => {
              // Optionally refresh data or show success message
              console.log('Chapter created successfully')
            }} />
          )}
        </div>
      </main>
    </div>
  )
}
