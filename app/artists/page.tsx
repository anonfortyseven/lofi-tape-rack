import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import artistsData from '@/data/artists.json'

export const metadata = {
  title: 'Artists | Drift Tapes',
  description: 'Discover our curated roster of lofi artists from around the world.',
}

export default function ArtistsPage() {
  const { artists } = artistsData

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Artists</h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Meet the producers behind the beats. From Tokyo jazz cafés to Berlin synth caves, 
              each artist brings their unique story and sound to Drift Tapes.
            </p>
          </div>

          {/* Artist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all"
              >
                {/* Artist Avatar */}
                <div 
                  className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-3xl font-bold"
                  style={{ 
                    background: `linear-gradient(135deg, ${artist.accentColor}, ${artist.secondaryColor})` 
                  }}
                >
                  <span className="text-white/90">
                    {artist.name.charAt(0)}
                  </span>
                </div>

                {/* Artist Info */}
                <h2 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors mb-1">
                  {artist.name}
                </h2>
                <p className="text-sm text-zinc-500 mb-3">{artist.origin}</p>
                
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${artist.accentColor}20`,
                      color: artist.accentColor
                    }}
                  >
                    {artist.genre}
                  </span>
                  {artist.subgenres.slice(0, 2).map((subgenre) => (
                    <span 
                      key={subgenre}
                      className="px-2 py-1 rounded-full text-xs text-zinc-400 bg-zinc-800"
                    >
                      {subgenre}
                    </span>
                  ))}
                </div>

                {/* Short Bio */}
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {artist.shortBio}
                </p>

                {/* Since Year */}
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    Active since {artist.founded}
                  </span>
                  <span className="text-amber-500 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    View Artist
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
