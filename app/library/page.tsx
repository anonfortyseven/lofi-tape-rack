import { Navbar } from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/library')
  }

  // Mock library data - replace with actual data from Supabase later
  const purchasedTapes: Array<{ id: string; title: string; artist: string; color: string }> = [
    // Empty for now - user hasn't purchased anything yet
  ]

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
            <p className="text-zinc-500">Your purchased tapes and downloads</p>
          </div>

          {purchasedTapes.length === 0 ? (
            // Empty state
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Your library is empty</h2>
              <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
                Browse our collection and grab some lofi tapes to start building your library.
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            // Library grid
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {purchasedTapes.map((tape, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tape.color} opacity-80`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-16 bg-zinc-900/80 rounded-lg flex items-center justify-center gap-3 shadow-xl">
                        <div className="w-6 h-6 border-2 border-zinc-600 rounded-full" />
                        <div className="w-6 h-6 border-2 border-zinc-600 rounded-full" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                        <svg className="w-6 h-6 text-zinc-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors">{tape.title}</h3>
                  <p className="text-sm text-zinc-500">{tape.artist}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
