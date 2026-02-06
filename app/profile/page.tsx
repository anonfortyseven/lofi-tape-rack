import { Navbar } from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/profile')
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-zinc-500">Manage your account and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{user.email}</h2>
                <p className="text-sm text-zinc-500">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-zinc-400 cursor-not-allowed"
                />
                <p className="text-xs text-zinc-600 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Account Type</label>
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-lg text-sm font-medium">
                    Free Account
                  </span>
                  <button className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-zinc-500">Get notified about new releases</p>
                </div>
                <button className="w-12 h-6 bg-amber-500 rounded-full relative transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Marketing Emails</p>
                  <p className="text-sm text-zinc-500">Receive promotional content</p>
                </div>
                <button className="w-12 h-6 bg-zinc-700 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-400 rounded-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-zinc-900/50 border border-red-900/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
            <p className="text-zinc-500 text-sm mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium px-4 py-2 rounded-lg text-sm transition-colors border border-red-500/20">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
