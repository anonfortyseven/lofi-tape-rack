import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'

export default function Home() {
  const { artists } = artistsData
  const { albums } = albumsData
  
  // Get featured albums (latest from different artists)
  const featuredAlbums = albums
    .sort((a, b) => b.year - a.year)
    .slice(0, 8)
  
  // Get featured artists (mix of styles)
  const featuredArtists = artists.slice(0, 6)

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        {/* VHS scan lines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-sm text-zinc-400">
                Now featuring: {artists.length} artists • {albums.length} albums
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight">
              Lofi beats for<br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                your soul
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Premium cassette tapes and digital downloads. Curated lofi music from artists around the world—
              from Tokyo jazz cafés to Berlin synth caves.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/artists"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14.5c-2.78 0-5.15.98-7.55 3.02L7 20H2v-5l2.43 2.43C6.48 15.47 9.08 14 12 14.5z"/>
                  <circle cx="12" cy="8" r="5"/>
                </svg>
                Meet the Artists
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all border border-zinc-700"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Artists Section */}
        <section className="py-16 px-4 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Featured Artists</h2>
                <p className="text-zinc-500">Meet the producers behind the beats</p>
              </div>
              <Link href="/artists" className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center gap-1">
                View all artists
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredArtists.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.slug}`}
                  className="group text-center"
                >
                  <div 
                    className="w-full aspect-square rounded-2xl mb-3 flex items-center justify-center text-4xl font-bold transition-transform group-hover:scale-105"
                    style={{ 
                      background: `linear-gradient(135deg, ${artist.accentColor}, ${artist.secondaryColor})` 
                    }}
                  >
                    <span className="text-white/90">{artist.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors text-sm truncate">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-zinc-500 truncate">{artist.genre}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Releases Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Latest Tapes</h2>
                <p className="text-zinc-500">Fresh drops from our catalog</p>
              </div>
              <Link href="/browse" className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center gap-1">
                Browse all
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredAlbums.map((album) => {
                const artist = artists.find(a => a.id === album.artistId)
                return (
                  <Link key={album.id} href={`/albums/${album.slug}`} className="group">
                    <div 
                      className="relative aspect-square rounded-xl overflow-hidden mb-4"
                      style={{ 
                        background: artist 
                          ? `linear-gradient(135deg, ${artist.accentColor}80, ${artist.secondaryColor}80)` 
                          : 'linear-gradient(135deg, #9333EA80, #06B6D480)'
                      }}
                    >
                      {/* Cassette tape icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-16 bg-zinc-900/80 rounded-lg flex items-center justify-center gap-3 shadow-xl">
                          <div className="w-6 h-6 border-2 border-zinc-600 rounded-full" />
                          <div className="w-6 h-6 border-2 border-zinc-600 rounded-full" />
                        </div>
                      </div>
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                          <svg className="w-6 h-6 text-zinc-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      {/* Year badge */}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded-full text-xs text-white/80">
                        {album.year}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors truncate">
                      {album.title}
                    </h3>
                    <p className="text-sm text-zinc-500 truncate">{album.artistName}</p>
                    <p className="text-sm font-medium text-amber-500 mt-1">${album.price}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Genre Showcase */}
        <section className="py-16 px-4 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">Explore by Mood</h2>
              <p className="text-zinc-500">Find the perfect sound for every moment</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { mood: 'Late Night', color: '#7C3AED', description: 'For the 3 AM hours' },
                { mood: 'Rainy Day', color: '#3B82F6', description: 'Cozy and contemplative' },
                { mood: 'Study Session', color: '#059669', description: 'Focus and flow' },
                { mood: 'Sunrise', color: '#F59E0B', description: 'Fresh starts' },
              ].map((genre) => (
                <div
                  key={genre.mood}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  <div 
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${genre.color}20` }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: genre.color }}
                    />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{genre.mood}</h3>
                  <p className="text-sm text-zinc-500">{genre.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Drift Tapes?</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">
                We&apos;re not just another music platform. We&apos;re a community of lofi lovers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  ),
                  title: 'Curated Quality',
                  description: `Every artist is handpicked. ${artists.length} producers, ${albums.length} albums—no filler, only vibes.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  ),
                  title: 'Own Forever',
                  description: 'Buy once, keep forever. Download your tapes in lossless quality.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Support Artists',
                  description: '80% of every sale goes directly to the creators. Real support, real impact.',
                },
              ].map((feature, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to drift?</h2>
                <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                  Join thousands of lofi lovers. Get exclusive drops, early access, and member-only tapes.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">
                  DRIFT<span className="text-amber-500">TAPES</span>
                </span>
              </div>
              <div className="flex items-center gap-8">
                <Link href="/artists" className="text-zinc-500 hover:text-white text-sm transition-colors">Artists</Link>
                <Link href="/about" className="text-zinc-500 hover:text-white text-sm transition-colors">About</Link>
                <Link href="/terms" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</Link>
                <Link href="/privacy" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy</Link>
              </div>
              <p className="text-zinc-600 text-sm">© 2025 Drift Tapes. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
