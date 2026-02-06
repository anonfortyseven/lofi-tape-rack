'use client'

import { Navbar } from '@/components/Navbar'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useCart } from '@/contexts/CartContext'
import { useAudioPlayer, Track } from '@/contexts/AudioPlayerContext'
import Link from 'next/link'

interface AlbumData {
  id: string
  title: string
  slug: string
  artistId: string
  artistName: string
  year: number
  mood: string
  description: string
  tags: string[]
  price: number
  sunoPrompt: string
  coverArtPrompt: string
  tracks: Array<{
    number: number
    title: string
    duration: string
  }>
}

interface ArtistData {
  id: string
  name: string
  slug: string
  origin: string
  genre: string
  shortBio: string
  accentColor: string
  secondaryColor: string
}

interface Props {
  album: AlbumData
  artist: ArtistData
}

export default function AlbumClient({ album, artist }: Props) {
  const { addItem, isInCart, openCart } = useCart()
  const { playTrack, playAlbum, currentTrack, isPlaying, addToQueue } = useAudioPlayer()

  // Calculate total duration
  const totalMinutes = album.tracks.reduce((acc, track) => {
    const [min, sec] = track.duration.split(':').map(Number)
    return acc + min + sec / 60
  }, 0)
  const hours = Math.floor(totalMinutes / 60)
  const mins = Math.round(totalMinutes % 60)
  const totalDuration = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`

  const inCart = isInCart(album.id)

  const handleAddToCart = () => {
    addItem({
      id: album.id,
      type: 'album',
      title: album.title,
      artistName: album.artistName,
      artistSlug: artist.slug,
      albumSlug: album.slug,
      price: album.price,
      coverGradient: {
        primary: artist.accentColor,
        secondary: artist.secondaryColor,
      },
    })
    openCart()
  }

  const createTrack = (trackData: typeof album.tracks[0]): Track => ({
    id: `${album.id}-${trackData.number}`,
    title: trackData.title,
    artistName: album.artistName,
    albumTitle: album.title,
    albumSlug: album.slug,
    duration: trackData.duration,
    coverGradient: {
      primary: artist.accentColor,
      secondary: artist.secondaryColor,
    },
  })

  const handlePlayAlbum = () => {
    const tracks = album.tracks.map(createTrack)
    playAlbum(tracks, 0)
  }

  const handlePlayTrack = (trackData: typeof album.tracks[0]) => {
    const track = createTrack(trackData)
    playTrack(track, true)
  }

  const handleAddToQueue = (trackData: typeof album.tracks[0]) => {
    const track = createTrack(trackData)
    addToQueue(track)
  }

  const isCurrentTrack = (trackData: typeof album.tracks[0]) => {
    return currentTrack?.id === `${album.id}-${trackData.number}`
  }

  const breadcrumbItems = [
    { name: 'Browse', href: '/browse' },
    { name: artist.name, href: `/artists/${artist.slug}` },
    { name: album.title, href: `/albums/${album.slug}` },
  ]

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
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Album Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Album Cover */}
            <div className="flex-shrink-0">
              <div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${artist.accentColor}, ${artist.secondaryColor})` 
                }}
              >
                {/* Cassette decoration */}
                <div className="w-32 h-20 bg-zinc-900/70 rounded-lg flex items-center justify-center gap-4 shadow-xl">
                  <div className={`w-8 h-8 border-2 border-zinc-600 rounded-full ${isPlaying && currentTrack?.albumSlug === album.slug ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                  <div className={`w-8 h-8 border-2 border-zinc-600 rounded-full ${isPlaying && currentTrack?.albumSlug === album.slug ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                </div>
                
                {/* VHS noise overlay */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
              </div>
            </div>

            {/* Album Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-medium">
                  {album.year}
                </span>
                {album.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {album.title}
              </h1>
              
              <Link 
                href={`/artists/${artist.slug}`}
                className="text-xl text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-2 mb-4"
              >
                {artist.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>

              <p className="text-zinc-400 mb-6 leading-relaxed">
                {album.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-zinc-500 mb-6">
                <span>{album.tracks.length} tracks</span>
                <span>{totalDuration}</span>
                <span className="capitalize">{album.mood}</span>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-3xl font-bold text-white">${album.price}</span>
                
                {inCart ? (
                  <button 
                    onClick={openCart}
                    className="bg-amber-500 text-black font-semibold px-8 py-3 rounded-xl flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    In Cart
                  </button>
                ) : (
                  <button 
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                )}

                <button 
                  onClick={handlePlayAlbum}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Play All
                </button>

                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Track List */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Track List</h2>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              {album.tracks.map((track, index) => {
                const isCurrent = isCurrentTrack(track)
                
                return (
                  <div 
                    key={track.number}
                    className={`flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-colors group ${
                      index !== album.tracks.length - 1 ? 'border-b border-zinc-800/50' : ''
                    } ${isCurrent ? 'bg-amber-500/10' : ''}`}
                  >
                    {/* Track Number / Play */}
                    <div className="w-8 text-center">
                      {isCurrent && isPlaying ? (
                        <div className="flex items-center justify-center gap-0.5">
                          <div className="w-1 h-3 bg-amber-500 rounded-full animate-pulse" />
                          <div className="w-1 h-4 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <>
                          <span className={`text-sm group-hover:hidden ${isCurrent ? 'text-amber-500' : 'text-zinc-500'}`}>
                            {track.number}
                          </span>
                          <button 
                            onClick={() => handlePlayTrack(track)}
                            className="hidden group-hover:block text-amber-500"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate transition-colors ${
                        isCurrent ? 'text-amber-500' : 'text-white group-hover:text-amber-500'
                      }`}>
                        {track.title}
                      </p>
                    </div>

                    {/* Add to queue */}
                    <button
                      onClick={() => handleAddToQueue(track)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-white transition-all"
                      title="Add to queue"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>

                    {/* Duration */}
                    <div className="text-zinc-500 text-sm">
                      {track.duration}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Production Notes */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Suno Prompt (for transparency) */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Sound Profile
              </h3>
              <p className="text-zinc-400 text-sm font-mono bg-zinc-800/50 p-4 rounded-lg">
                {album.sunoPrompt}
              </p>
            </div>

            {/* Cover Art Description */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Visual Direction
              </h3>
              <p className="text-zinc-400 text-sm font-mono bg-zinc-800/50 p-4 rounded-lg">
                {album.coverArtPrompt}
              </p>
            </div>
          </section>

          {/* About the Artist */}
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">About the Artist</h3>
            <div className="flex items-start gap-4">
              <Link href={`/artists/${artist.slug}`}>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 transition-transform hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${artist.accentColor}, ${artist.secondaryColor})` 
                  }}
                >
                  <span className="text-white/90">{artist.name.charAt(0)}</span>
                </div>
              </Link>
              <div className="flex-1">
                <Link 
                  href={`/artists/${artist.slug}`}
                  className="text-lg font-semibold text-white hover:text-amber-500 transition-colors"
                >
                  {artist.name}
                </Link>
                <p className="text-sm text-zinc-500 mb-2">{artist.origin} • {artist.genre}</p>
                <p className="text-zinc-400 text-sm line-clamp-3">{artist.shortBio}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
