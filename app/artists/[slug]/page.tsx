import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArtistJsonLd } from '@/components/JsonLd'
import { Waveform } from '@/components/Waveform'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'
import React from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

const baseUrl = 'https://drifttapes.com'

// Helper to parse duration string to seconds
function parseDuration(duration: string): number {
  const parts = duration.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  return 0
}

// Helper to format seconds to readable string
function formatRuntime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes} min`
}

// Equipment icon mapping
function getEquipmentIcon(equipment: string): React.ReactNode {
  const lower = equipment.toLowerCase()
  
  // Keyboards/Synths
  if (lower.includes('piano') || lower.includes('rhodes') || lower.includes('keyboard') || lower.includes('juno') || lower.includes('prophet') || lower.includes('moog') || lower.includes('sh-101')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
      </svg>
    )
  }
  
  // Samplers/MPC
  if (lower.includes('mpc') || lower.includes('sp-404') || lower.includes('sp-303') || lower.includes('sampler') || lower.includes('op-1')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8h2v2H8V8zM14 8h2v2h-2V8zM8 14h2v2H8v-2zM14 14h2v2h-2v-2z" />
      </svg>
    )
  }
  
  // Turntables/Vinyl
  if (lower.includes('technics') || lower.includes('turntable') || lower.includes('vinyl') || lower.includes('45s') || lower.includes('record')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
      </svg>
    )
  }
  
  // Tape/Recording
  if (lower.includes('tascam') || lower.includes('portastudio') || lower.includes('4-track') || lower.includes('tape') || lower.includes('vhs')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth={1.5} />
        <circle cx="8" cy="12" r="2" strokeWidth={1.5} />
        <circle cx="16" cy="12" r="2" strokeWidth={1.5} />
      </svg>
    )
  }
  
  // Microphones/Recording
  if (lower.includes('shure') || lower.includes('mic') || lower.includes('field recorder') || lower.includes('zoom') || lower.includes('apogee')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    )
  }
  
  // Guitar/Strings
  if (lower.includes('guitar') || lower.includes('ukulele') || lower.includes('acoustic') || lower.includes('nylon')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    )
  }
  
  // Software/DAW
  if (lower.includes('ableton') || lower.includes('logic') || lower.includes('macbook') || lower.includes('laptop') || lower.includes('software') || lower.includes('midi')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
  
  // Interface/Focusrite
  if (lower.includes('focusrite') || lower.includes('scarlett') || lower.includes('interface')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
  
  // Default generic equipment icon
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artist = artistsData.artists.find(a => a.slug === slug)
  
  if (!artist) {
    return { 
      title: 'Artist Not Found',
      description: 'The requested artist could not be found.',
    }
  }
  
  const artistAlbums = albumsData.albums.filter(album => album.artistId === artist.id)
  
  return {
    title: `${artist.name} - ${artist.genre} Artist`,
    description: `${artist.shortBio} Explore ${artistAlbums.length} albums from ${artist.name}, featuring ${artist.subgenres.slice(0, 3).join(', ')}.`,
    keywords: [
      artist.name,
      artist.genre,
      'lofi artist',
      ...artist.subgenres,
      ...artist.influences.slice(0, 3),
      'lofi music',
      'beats',
    ],
    openGraph: {
      title: `${artist.name} | Drift Tapes`,
      description: artist.shortBio,
      url: `${baseUrl}/artists/${artist.slug}`,
      siteName: 'Drift Tapes',
      type: 'profile',
      images: [
        {
          url: `/og/artists/${artist.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${artist.name} - ${artist.genre}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artist.name} | Drift Tapes`,
      description: artist.shortBio,
    },
    alternates: {
      canonical: `${baseUrl}/artists/${artist.slug}`,
    },
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

  // Calculate artist statistics
  const totalTracks = artistAlbums.reduce((sum, album) => sum + album.tracks.length, 0)
  const totalRuntimeSeconds = artistAlbums.reduce((sum, album) => {
    return sum + album.tracks.reduce((trackSum, track) => trackSum + parseDuration(track.duration), 0)
  }, 0)
  const totalRuntime = formatRuntime(totalRuntimeSeconds)

  // Find similar artists (same genre, excluding current artist)
  const similarArtists = artistsData.artists
    .filter(a => a.id !== artist.id && a.genre === artist.genre)
    .slice(0, 3)

  // If not enough same-genre artists, fill with artists sharing subgenres
  if (similarArtists.length < 3) {
    const additionalArtists = artistsData.artists
      .filter(a => 
        a.id !== artist.id && 
        a.genre !== artist.genre &&
        !similarArtists.some(s => s.id === a.id) &&
        a.subgenres.some(sub => artist.subgenres.includes(sub))
      )
      .slice(0, 3 - similarArtists.length)
    similarArtists.push(...additionalArtists)
  }

  // If still not enough, add random artists
  if (similarArtists.length < 3) {
    const remainingArtists = artistsData.artists
      .filter(a => 
        a.id !== artist.id && 
        !similarArtists.some(s => s.id === a.id)
      )
      .slice(0, 3 - similarArtists.length)
    similarArtists.push(...remainingArtists)
  }

  const breadcrumbItems = [
    { name: 'Artists', href: '/artists' },
    { name: artist.name, href: `/artists/${artist.slug}` },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <ArtistJsonLd 
        artist={artist} 
        albums={artistAlbums.map(a => ({ 
          title: a.title, 
          slug: a.slug, 
          year: a.year 
        }))} 
      />

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
          <Breadcrumbs items={breadcrumbItems} />

          {/* Artist Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Avatar with Waveform */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
              <div 
                className="w-full h-full rounded-2xl flex items-center justify-center text-5xl md:text-7xl font-bold overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${artist.accentColor}, ${artist.secondaryColor})` 
                }}
              >
                <span className="text-white/90 relative z-10">
                  {artist.name.charAt(0)}
                </span>
              </div>
              {/* Waveform overlay */}
              <div className="absolute bottom-2 left-2 right-2 h-8 opacity-60">
                <Waveform 
                  barCount={20} 
                  color="rgba(255,255,255,0.8)" 
                  isPlaying={true}
                />
              </div>
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
              
              {/* Artist Statistics */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-zinc-300">{artistAlbums.length} albums</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                  </svg>
                  <span className="text-zinc-300">{totalTracks} tracks</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-zinc-300">{totalRuntime} total runtime</span>
                </div>
              </div>
              
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

            {/* Equipment with Icons */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Equipment
              </h3>
              <div className="flex flex-wrap gap-2">
                {artist.equipment.map((item) => (
                  <span 
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 bg-zinc-800"
                  >
                    <span className="text-amber-500">
                      {getEquipmentIcon(item)}
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Discography */}
          <section className="mb-12">
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

          {/* Similar Artists */}
          {similarArtists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Similar Artists</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarArtists.map((similarArtist) => (
                  <Link
                    key={similarArtist.id}
                    href={`/artists/${similarArtist.slug}`}
                    className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all hover:bg-zinc-900/70"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                        style={{ 
                          background: `linear-gradient(135deg, ${similarArtist.accentColor}, ${similarArtist.secondaryColor})` 
                        }}
                      >
                        <span className="text-white/90">
                          {similarArtist.name.charAt(0)}
                        </span>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors truncate">
                          {similarArtist.name}
                        </h3>
                        <p className="text-sm text-zinc-500 truncate">{similarArtist.origin}</p>
                        <span 
                          className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs"
                          style={{ 
                            backgroundColor: `${similarArtist.accentColor}20`,
                            color: similarArtist.accentColor
                          }}
                        >
                          {similarArtist.genre}
                        </span>
                      </div>
                      
                      {/* Arrow */}
                      <svg 
                        className="w-5 h-5 text-zinc-600 group-hover:text-amber-500 transition-colors flex-shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
