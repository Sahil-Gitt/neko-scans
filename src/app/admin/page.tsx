import { Header } from '@/components/Header'

export default function Admin() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Admin Panel</h1>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-300">Admin functionality coming soon...</p>
        </div>
      </main>
    </div>
  )
}
