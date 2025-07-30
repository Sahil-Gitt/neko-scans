import { ComicGrid } from '@/components/ComicGrid'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'

export default function Browse() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Browse Comics</h1>
        <SearchBar />
        <ComicGrid />
      </main>
    </div>
  )
}
