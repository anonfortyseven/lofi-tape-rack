import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const artist = artistsData.artists.find(a => a.slug === slug)
  
  if (!artist) {
    return { title: 'Artist Not Found | Drift Tapes' }
  }
  
  return {
    title: `${artist.name} | Drift Tapes`,
    description: artist.shortBio,
  }
}

export async function generateStaticParams() {
  return artistsData.artists.map((artist) => ({
    slug: artist.slug,
  }))
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params
  const artist = artistsData.artists.find(a => a.slug === slug)
  
  if (!artist) {
    notFound()
  }

  const artistAlbums = albumsData.albums.filter(album => album.artistId === artist.id)

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Dynamic ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[128px] opacity-20"
          style={{ backgroundColor: artist.accentColor }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[128px] opacity-20"
          style={{ backgroundColor: artist.secondaryColor }}
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/artists" className="text-zinc-500 hover:text-white transition-colors">
                  Artists
                </Link>
              </li>
              <li className="text-zinc-600">/</li>
              <li className="text-zinc-400">{artist.name}</li>
            </ol>
          </nav>

          {/* Artist Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Avatar */}
            <div 
              className="w-32 h-32 md:w-48 md:h-48 rounded-2xl flex items-center justify-center text-5xl md:text-7xl font-bold flex-shrink-0"
              style={{ 
                background: `linear-gradient(135deg, ${artist.accentColor}, ${artist.secondaryColor})` 
              }}
            >
              <span className="text-white/90">
                {artist.name.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${artist.accentColor}20`,
                    color: artist.accentColor
                  }}
                >
                  {artist.genre}
                </span>
                <span className="text-zinc-500 text-sm">Since {artist.founded}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {artist.name}
              </h1>
              
              <p className="text-zinc-400 text-lg mb-4">{artist.origin}</p>
              
              {/* Subgenres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {artist.subgenres.map((subgenre) => (
                  <span 
                    key={subgenre}
                    className="px-3 py-1 rounded-full text-sm text-zinc-400 bg-zinc-800/50"
                  >
                    {subgenre}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {artist.socialHandle && (
                  <span className="text-sm text-zinc-500">
                    {artist.socialHandle}
                  </span>
                )}
                {artist.website && (
                  <span className="text-sm text-zinc-500">
                    {artist.website}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">About</h2>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {artist.bio}
              </p>
            </div>
          </section>

          {/* Sound & Style */}
          <section className="mb-12 grid md:grid-cols-2 gap-6">
            {/* Signature Sound */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Signature Sound
              </h3>
              <p className="text-zinc-400">{artist.signature}</p>
            </div>

            {/* Art Style */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Visual Aesthetic
              </h3>
              <p className="text-zinc-400">{artist.artStyle}</p>
            </div>
          </section>

          {/* Influences & Equipment */}
          <section className="mb-12 grid md:grid-cols-2 gap-6">
            {/* Influences */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Influences</h3>
              <div className="flex flex-wrap gap-2">
                {artist.influences.map((influence) => (
                  <span 
                    key={influence}
                    className="px-3 py-1 rounded-lg text-sm text-zinc-300 bg-zinc-800"
                  >
                    {influence}
                  </span>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Equipment</h3>
              <div className="flex flex-wrap gap-2">
                {artist.equipment.map((item) => (
                  <span 
                    key={item}
                    className="px-3 py-1 rounded-lg text-sm text-zinc-300 bg-zinc-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Discography */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Discography</h2>
              <span className="text-zinc-500">{artistAlbums.length} releases</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artistAlbums.map((album) => (
                <Link
                  key={album.id}
                  href={`/albums/${album.slug}`}
                  className="group"
                >
                  {/* Album Cover Placeholder */}
                  <div 
                    className="aspect-square rounded-xl mb-3 flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${artist.accentColor}80, ${artist.secondaryColor}80)` 
                    }}
                  >
                    {/* Cassette decoration */}
                    <div className="w-16 h-10 bg-zinc-900/60 rounded-md flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-zinc-600 rounded-full" />
                      <div className="w-4 h-4 border-2 border-zinc-600 rounded-full" />
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-zinc-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-medium text-white group-hover:text-amber-500 transition-colors text-sm truncate">
                    {album.title}
                  </h3>
                  <p className="text-xs text-zinc-500">{album.year}</p>
                  <p className="text-xs font-medium text-amber-500 mt-1">${album.price}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
