'use client'

import { Navbar } from '@/components/Navbar'
import { useCart } from '@/contexts/CartContext'
import { useAudioPlayer, Track } from '@/contexts/AudioPlayerContext'
import Link from 'next/link'
import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'

const { artists } = artistsData
const { albums } = albumsData

// Extract unique values for filters
const allGenres = [...new Set(artists.map(a => a.genre))]
const allMoods = [...new Set(albums.flatMap(a => a.tags))]
const allYears = [...new Set(albums.map(a => a.year))].sort((a, b) => b - a)

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'title-az' | 'title-za'
type ViewMode = 'grid' | 'list'

export default function BrowsePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem, isInCart } = useCart()
  const { playTrack } = useAudioPlayer()
  
  // Initialize filter states from URL params
  const [selectedArtist, setSelectedArtist] = useState<string>(searchParams.get('artist') || '')
  const [selectedGenre, setSelectedGenre] = useState<string>(searchParams.get('genre') || '')
  const [selectedMood, setSelectedMood] = useState<string>(searchParams.get('mood') || '')
  const [selectedYear, setSelectedYear] = useState<string>(searchParams.get('year') || '')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)
  
  // View mode with localStorage persistence - initialize lazily
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lofi-browse-view-mode') as ViewMode
      if (saved === 'grid' || saved === 'list') return saved
    }
    return 'grid'
  })
  
  // Keyboard navigation state
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const albumRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Save view mode to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('lofi-browse-view-mode', mode)
  }
  
  // Update URL when filters change
  const updateURL = useCallback((artist: string, genre: string, mood: string, year: string) => {
    const params = new URLSearchParams()
    if (artist) params.set('artist', artist)
    if (genre) params.set('genre', genre)
    if (mood) params.set('mood', mood)
    if (year) params.set('year', year)
    
    const queryString = params.toString()
    router.push(queryString ? `/browse?${queryString}` : '/browse', { scroll: false })
  }, [router])
  
  // Filter change handlers that update URL and reset keyboard selection
  const handleArtistChange = (value: string) => {
    setSelectedArtist(value)
    setSelectedIndex(-1)
    updateURL(value, selectedGenre, selectedMood, selectedYear)
  }
  
  const handleGenreChange = (value: string) => {
    setSelectedGenre(value)
    setSelectedIndex(-1)
    updateURL(selectedArtist, value, selectedMood, selectedYear)
  }
  
  const handleMoodChange = (value: string) => {
    setSelectedMood(value)
    setSelectedIndex(-1)
    updateURL(selectedArtist, selectedGenre, value, selectedYear)
  }
  
  const handleYearChange = (value: string) => {
    setSelectedYear(value)
    setSelectedIndex(-1)
    updateURL(selectedArtist, selectedGenre, selectedMood, value)
  }

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => {
          const next = Math.min(prev + 1, filteredAlbums.length - 1)
          albumRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          return next
        })
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => {
          const next = Math.max(prev - 1, 0)
          albumRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          return next
        })
      } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < filteredAlbums.length) {
        e.preventDefault()
        router.push(`/albums/${filteredAlbums[selectedIndex].slug}`)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredAlbums, selectedIndex, router])
  
  const clearFilters = () => {
    setSelectedArtist('')
    setSelectedGenre('')
    setSelectedMood('')
    setSelectedYear('')
    setSelectedIndex(-1)
    router.push('/browse', { scroll: false })
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
            <p className="text-xs text-zinc-600 mt-2">
              Use <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">j</kbd> / <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">k</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Enter</kbd> to view
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white mb-4"
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

            {/* Filter Chips */}
            <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Artists */}
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">Artist</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleArtistChange('')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      !selectedArtist 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {artists.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={() => handleArtistChange(selectedArtist === artist.id ? '' : artist.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedArtist === artist.id 
                          ? 'bg-amber-500 text-black' 
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {artist.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genres */}
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">Genre</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleGenreChange('')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      !selectedGenre 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {allGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(selectedGenre === genre ? '' : genre)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedGenre === genre 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Moods */}
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">Mood</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleMoodChange('')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      !selectedMood 
                        ? 'bg-cyan-500 text-black' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {allMoods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => handleMoodChange(selectedMood === mood ? '' : mood)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedMood === mood 
                          ? 'bg-cyan-500 text-black' 
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Years */}
              <div>
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">Year</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleYearChange('')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      !selectedYear 
                        ? 'bg-green-500 text-black' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {allYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(selectedYear === String(year) ? '' : String(year))}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedYear === String(year) 
                          ? 'bg-green-500 text-black' 
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters Summary & Clear */}
              {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-zinc-500">{activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active</span>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Controls Bar: Sort & View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-zinc-500">
              Showing {filteredAlbums.length} of {albums.length} albums
            </p>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-zinc-700 text-white' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-zinc-700 text-white' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                  title="List view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                  </svg>
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
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

          {/* Albums Display */}
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
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredAlbums.map((album, index) => {
                const artist = artists.find(a => a.id === album.artistId)
                const inCart = isInCart(album.id)
                const isSelected = index === selectedIndex
                
                return (
                  <div 
                    key={album.id} 
                    className="group album-card"
                    ref={el => { albumRefs.current[index] = el }}
                  >
                    {/* Album Cover */}
                    <div className={`relative aspect-square mb-4 ${isSelected ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-zinc-950 rounded-xl' : ''}`}>
                      <Link href={`/albums/${album.slug}`}>
                        <div 
                          className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg cover-glow"
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
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center interactive-scale shadow-lg"
                          title="Play preview"
                        >
                          <svg className="w-5 h-5 text-zinc-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleAddToCart(album)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center interactive-scale shadow-lg ${
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
          ) : (
            /* List View */
            <div className="space-y-2">
              {filteredAlbums.map((album, index) => {
                const artist = artists.find(a => a.id === album.artistId)
                const inCart = isInCart(album.id)
                const isSelected = index === selectedIndex
                
                return (
                  <div 
                    key={album.id}
                    ref={el => { albumRefs.current[index] = el }}
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isSelected 
                        ? 'bg-zinc-800 ring-2 ring-amber-500' 
                        : 'bg-zinc-900/50 hover:bg-zinc-900'
                    }`}
                  >
                    {/* Album Cover - Small */}
                    <Link href={`/albums/${album.slug}`} className="shrink-0">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg"
                        style={{ 
                          background: artist 
                            ? `linear-gradient(135deg, ${artist.accentColor}80, ${artist.secondaryColor}80)` 
                            : 'linear-gradient(135deg, #9333EA80, #06B6D480)'
                        }}
                      >
                        {/* Mini cassette */}
                        <div className="w-8 h-5 bg-zinc-900/70 rounded flex items-center justify-center gap-1">
                          <div className="w-2 h-2 border border-zinc-600 rounded-full" />
                          <div className="w-2 h-2 border border-zinc-600 rounded-full" />
                        </div>
                      </div>
                    </Link>

                    {/* Album Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/albums/${album.slug}`}>
                        <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors truncate">
                          {album.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 text-sm">
                        <Link 
                          href={`/artists/${artist?.slug}`}
                          className="text-zinc-500 hover:text-zinc-400 transition-colors"
                        >
                          {album.artistName}
                        </Link>
                        <span className="text-zinc-700">•</span>
                        <span className="text-zinc-600">{album.year}</span>
                        <span className="text-zinc-700">•</span>
                        <span className="text-zinc-600">{album.tracks.length} tracks</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {album.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-500 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <span className="text-lg font-bold text-amber-500">${album.price}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handlePlayPreview(album)}
                        className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
                        title="Play preview"
                      >
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleAddToCart(album)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          inCart 
                            ? 'bg-amber-500 text-black' 
                            : 'bg-zinc-800 text-white hover:bg-zinc-700'
                        }`}
                        title={inCart ? 'In cart' : 'Add to cart'}
                        disabled={inCart}
                      >
                        {inCart ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </button>
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
