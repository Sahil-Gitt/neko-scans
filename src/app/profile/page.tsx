import { Header } from '@/components/Header'
import { User, Settings, BookOpen, Heart } from 'lucide-react'

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <User className="text-yellow-400" size={32} />
          <h1 className="text-3xl font-bold text-yellow-400">Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User size={20} />
              User Information
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm">Username</label>
                <p className="text-white">Reader#001</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white">reader@nekoscans.com</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Member Since</label>
                <p className="text-white">January 2024</p>
              </div>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={20} />
              Reading Stats
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Comics Read</span>
                <span className="text-white">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chapters Read</span>
                <span className="text-white">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Favorites</span>
                <span className="text-white">8</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gray-900 p-6 rounded-lg md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings size={20} />
              Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Reading Mode</label>
                <select className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-yellow-400 outline-none">
                  <option>Single Page</option>
                  <option>Double Page</option>
                  <option>Continuous Scroll</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Theme</label>
                <select className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-yellow-400 outline-none">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>Auto</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
