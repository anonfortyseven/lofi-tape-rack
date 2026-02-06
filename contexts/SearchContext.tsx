'use client'

import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'

interface SearchResult {
  type: 'artist' | 'album'
  id: string
  slug: string
  title: string
  subtitle: string
  matchedOn: string[]
  gradient: {
    primary: string
    secondary: string
  }
}

interface SearchContextType {
  query: string
  results: SearchResult[]
  isSearching: boolean
  isOpen: boolean
  setQuery: (query: string) => void
  search: (query: string) => SearchResult[]
  clearSearch: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Build searchable index
const buildSearchIndex = () => {
  const artists = artistsData.artists.map(artist => ({
    type: 'artist' as const,
    id: artist.id,
    slug: artist.slug,
    name: artist.name.toLowerCase(),
    genre: artist.genre.toLowerCase(),
    subgenres: artist.subgenres.map(s => s.toLowerCase()),
    origin: artist.origin.toLowerCase(),
    bio: artist.shortBio.toLowerCase(),
    original: artist,
  }))

  const albums = albumsData.albums.map(album => {
    const artist = artistsData.artists.find(a => a.id === album.artistId)
    return {
      type: 'album' as const,
      id: album.id,
      slug: album.slug,
      title: album.title.toLowerCase(),
      artistName: album.artistName.toLowerCase(),
      mood: album.mood.toLowerCase(),
      tags: album.tags.map(t => t.toLowerCase()),
      description: album.description.toLowerCase(),
      year: album.year.toString(),
      tracks: album.tracks.map(t => t.title.toLowerCase()),
      artist,
      original: album,
    }
  })

  return { artists, albums }
}

const searchIndex = buildSearchIndex()

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQueryState] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const search = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery || searchQuery.length < 2) return []
    
    const q = searchQuery.toLowerCase().trim()
    const results: SearchResult[] = []
    const seen = new Set<string>()

    // Search artists
    searchIndex.artists.forEach(artist => {
      const matchedOn: string[] = []
      
      if (artist.name.includes(q)) matchedOn.push('name')
      if (artist.genre.includes(q)) matchedOn.push('genre')
      if (artist.subgenres.some(s => s.includes(q))) matchedOn.push('subgenre')
      if (artist.origin.includes(q)) matchedOn.push('location')
      
      if (matchedOn.length > 0 && !seen.has(`artist-${artist.id}`)) {
        seen.add(`artist-${artist.id}`)
        results.push({
          type: 'artist',
          id: artist.id,
          slug: artist.slug,
          title: artist.original.name,
          subtitle: `${artist.original.origin} • ${artist.original.genre}`,
          matchedOn,
          gradient: {
            primary: artist.original.accentColor,
            secondary: artist.original.secondaryColor,
          },
        })
      }
    })

    // Search albums
    searchIndex.albums.forEach(album => {
      const matchedOn: string[] = []
      
      if (album.title.includes(q)) matchedOn.push('title')
      if (album.artistName.includes(q)) matchedOn.push('artist')
      if (album.mood.includes(q)) matchedOn.push('mood')
      if (album.tags.some(t => t.includes(q))) matchedOn.push('tag')
      if (album.year === q) matchedOn.push('year')
      if (album.tracks.some(t => t.includes(q))) matchedOn.push('track')
      
      if (matchedOn.length > 0 && !seen.has(`album-${album.id}`)) {
        seen.add(`album-${album.id}`)
        results.push({
          type: 'album',
          id: album.id,
          slug: album.slug,
          title: album.original.title,
          subtitle: `${album.original.artistName} • ${album.original.year}`,
          matchedOn,
          gradient: {
            primary: album.artist?.accentColor || '#9333EA',
            secondary: album.artist?.secondaryColor || '#06B6D4',
          },
        })
      }
    })

    // Sort by relevance (more match types = more relevant)
    results.sort((a, b) => {
      const aScore = a.matchedOn.length + (a.matchedOn.includes('name') || a.matchedOn.includes('title') ? 2 : 0)
      const bScore = b.matchedOn.length + (b.matchedOn.includes('name') || b.matchedOn.includes('title') ? 2 : 0)
      return bScore - aScore
    })

    return results.slice(0, 20) // Limit results
  }, [])

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery)
    setIsSearching(true)
    // Simulate brief search delay for UX
    setTimeout(() => setIsSearching(false), 50)
  }, [])

  const clearSearch = useCallback(() => {
    setQueryState('')
  }, [])

  const openSearch = useCallback(() => setIsOpen(true), [])
  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQueryState('')
  }, [])
  const toggleSearch = useCallback(() => {
    setIsOpen(prev => {
      if (prev) setQueryState('')
      return !prev
    })
  }, [])

  const results = useMemo(() => search(query), [search, query])

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        isSearching,
        isOpen,
        setQuery,
        search,
        clearSearch,
        openSearch,
        closeSearch,
        toggleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
