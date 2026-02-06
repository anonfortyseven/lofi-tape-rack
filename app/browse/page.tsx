'use client'

import { Navbar } from '@/components/Navbar'
import { useCart } from '@/contexts/CartContext'
import { useAudioPlayer, Track } from '@/contexts/AudioPlayerContext'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'

const { artists } = artistsData
const { albums } = albumsData

// Extract unique values for filters
const allGenres = [...new Set(artists.map(a => a.genre))]
const allMoods = [...new Set(albums.flatMap(a => a.tags))]
const allYears = [...new Set(albums.map(a => a.year))].sort((a, b) => b - a)

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'title-az' | 'title-za'

export default function BrowsePage() {
  const { addItem, isInCart } = useCart()
  const { playTrack } = useAudioPlayer()
  
  // Filter states
  const [selectedArtist, setSelectedArtist] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort albums
  const filteredAlbums = useMemo(() => {
    let result = [...albums]
    
    // Apply filters
    if (selectedArtist) {
      result = result.filter(a => a.artistId === selectedArtist)
    }
    if (selectedGenre) {
      const artistsInGenre = artists.filter(a => a.genre === selectedGenre).map(a => a.id)
      result = result.filter(a => artistsInGenre.includes(a.artistId))
    }
    if (selectedMood) {
      result = result.filter(a => a.tags.includes(selectedMood))
    }
    if (selectedYear) {
      result = result.filter(a => a.year === parseInt(selectedYear))
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year)
        break
      case 'oldest':
        result.sort((a, b) => a.year - b.year)
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'title-az':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-za':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
    
    return result
  }, [selectedArtist, selectedGenre, selectedMood, selectedYear, sortBy])

  const clearFilters = () => {
    setSelectedArtist('')
    setSelectedGenre('')
    setSelectedMood('')
    setSelectedYear('')
  }

  const activeFilterCount = [selectedArtist, selectedGenre, selectedMood, selectedYear].filter(Boolean).length

  const handleAddToCart = (album: typeof albums[0]) => {
    const artist = artists.find(a => a.id === album.artistId)
    addItem({
      id: album.id,
      type: 'album',
      title: album.title,
      artistName: album.artistName,
      artistSlug: artist?.slug || '',
      albumSlug: album.slug,
      price: album.price,
      coverGradient: {
        primary: artist?.accentColor || '#9333EA',
        secondary: artist?.secondaryColor || '#06B6D4',
      },
    })
  }

  const handlePlayPreview = (album: typeof albums[0]) => {
    const artist = artists.find(a => a.id === album.artistId)
    const firstTrack = album.tracks[0]
    
    const track: Track = {
      id: `${album.id}-${firstTrack.number}`,
      title: firstTrack.title,
      artistName: album.artistName,
      albumTitle: album.title,
      albumSlug: album.slug,
      duration: firstTrack.duration,
      coverGradient: {
        primary: artist?.accentColor || '#9333EA',
        secondary: artist?.secondaryColor || '#06B6D4',
      },
    }
    
    playTrack(track, true)
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Browse Tapes</h1>
            <p className="text-zinc-400">
              Explore our collection of {albums.length} albums from {artists.length} artists
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-black text-xs font-bold rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Filters */}
            <div className={`flex flex-col lg:flex-row gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Artist filter */}
              <select
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
              >
                <option value="">All Artists</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>{artist.name}</option>
                ))}
              </select>

              {/* Genre filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
              >
                <option value="">All Genres</option>
                {allGenres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              {/* Mood filter */}
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
              >
                <option value="">All Moods</option>
                {allMoods.map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>

              {/* Year filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
              >
                <option value="">All Years</option>
                {allYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="lg:ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full lg:w-auto px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-az">Title: A-Z</option>
                <option value="title-za">Title: Z-A</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-zinc-500 mb-6">
            Showing {filteredAlbums.length} of {albums.length} albums
          </p>

          {/* Albums Grid */}
          {filteredAlbums.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No albums found</h3>
              <p className="text-zinc-500 mb-6">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAlbums.map((album) => {
                const artist = artists.find(a => a.id === album.artistId)
                const inCart = isInCart(album.id)
                
                return (
                  <div key={album.id} className="group">
                    {/* Album Cover */}
                    <div className="relative aspect-square mb-4">
                      <Link href={`/albums/${album.slug}`}>
                        <div 
                          className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg transition-transform group-hover:scale-[1.02]"
                          style={{ 
                            background: artist 
                              ? `linear-gradient(135deg, ${artist.accentColor}80, ${artist.secondaryColor}80)` 
                              : 'linear-gradient(135deg, #9333EA80, #06B6D480)'
                          }}
                        >
                          {/* Cassette decoration */}
                          <div className="w-20 h-12 bg-zinc-900/70 rounded-lg flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-zinc-600 rounded-full" />
                            <div className="w-5 h-5 border-2 border-zinc-600 rounded-full" />
                          </div>
                          
                          {/* VHS overlay */}
                          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
                        </div>
                      </Link>

                      {/* Hover overlay with actions */}
                      <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => handlePlayPreview(album)}
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                          title="Play preview"
                        >
                          <svg className="w-5 h-5 text-zinc-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleAddToCart(album)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${
                            inCart 
                              ? 'bg-amber-500 text-black' 
                              : 'bg-zinc-800 text-white hover:bg-zinc-700'
                          }`}
                          title={inCart ? 'In cart' : 'Add to cart'}
                          disabled={inCart}
                        >
                          {inCart ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Year badge */}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white/80">
                        {album.year}
                      </div>
                    </div>

                    {/* Album Info */}
                    <Link href={`/albums/${album.slug}`}>
                      <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors truncate">
                        {album.title}
                      </h3>
                    </Link>
                    <Link 
                      href={`/artists/${artist?.slug}`}
                      className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors truncate block"
                    >
                      {album.artistName}
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-amber-500">${album.price}</span>
                      <div className="flex gap-1">
                        {album.tags.slice(0, 1).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
