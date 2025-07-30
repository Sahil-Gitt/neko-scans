import { Header } from '@/components/Header'
import { Heart } from 'lucide-react'

export default function Favorites() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="text-yellow-400" size={32} />
          <h1 className="text-3xl font-bold text-yellow-400">My Favorites</h1>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-lg text-center">
          <Heart className="mx-auto mb-4 text-gray-600" size={64} />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-400">
            Start adding comics to your favorites by clicking the heart icon on any comic.
          </p>
        </div>
      </main>
    </div>
  )
}
