'use client'

import { useSearch } from '@/contexts/SearchContext'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export function SearchModal() {
  const { query, results, isOpen, setQuery, closeSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeSearch])

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) {
          // This would be called from parent, but we can't open from here
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={closeSearch}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-4 top-20 max-w-2xl mx-auto z-50 animate-fade-in-up">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-4 p-4 border-b border-zinc-800">
            <svg className="w-5 h-5 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artists, albums, tracks, moods..."
              className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-lg"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-zinc-800 text-zinc-500 text-xs rounded-md font-mono">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-zinc-400 mb-2">Search for anything</p>
                <p className="text-zinc-500 text-sm">
                  Artists, albums, moods, genres, years, track names...
                </p>
              </div>
            ) : query.length < 2 ? (
              <div className="p-8 text-center text-zinc-500">
                Type at least 2 characters to search
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-zinc-400 mb-2">No results found</p>
                <p className="text-zinc-500 text-sm">
                  Try different keywords or browse our catalog
                </p>
              </div>
            ) : (
              <div className="p-2">
                {/* Artists section */}
                {results.filter(r => r.type === 'artist').length > 0 && (
                  <div className="mb-4">
                    <p className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      Artists
                    </p>
                    {results.filter(r => r.type === 'artist').map((result) => (
                      <Link
                        key={result.id}
                        href={`/artists/${result.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors group"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                          style={{ 
                            background: `linear-gradient(135deg, ${result.gradient.primary}, ${result.gradient.secondary})` 
                          }}
                        >
                          <span className="text-white/90">{result.title.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white group-hover:text-amber-500 transition-colors truncate">
                            {result.title}
                          </p>
                          <p className="text-sm text-zinc-500 truncate">{result.subtitle}</p>
                        </div>
                        <div className="flex gap-1">
                          {result.matchedOn.map((match) => (
                            <span key={match} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                              {match}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Albums section */}
                {results.filter(r => r.type === 'album').length > 0 && (
                  <div>
                    <p className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      Albums
                    </p>
                    {results.filter(r => r.type === 'album').map((result) => (
                      <Link
                        key={result.id}
                        href={`/albums/${result.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors group"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: `linear-gradient(135deg, ${result.gradient.primary}, ${result.gradient.secondary})` 
                          }}
                        >
                          <div className="w-5 h-3 bg-zinc-900/50 rounded-sm flex items-center justify-center gap-0.5">
                            <div className="w-1.5 h-1.5 border border-zinc-600 rounded-full" />
                            <div className="w-1.5 h-1.5 border border-zinc-600 rounded-full" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white group-hover:text-amber-500 transition-colors truncate">
                            {result.title}
                          </p>
                          <p className="text-sm text-zinc-500 truncate">{result.subtitle}</p>
                        </div>
                        <div className="flex gap-1 flex-wrap justify-end max-w-[120px]">
                          {result.matchedOn.slice(0, 2).map((match) => (
                            <span key={match} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                              {match}
                            </span>
                          ))}
                          {result.matchedOn.length > 2 && (
                            <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                              +{result.matchedOn.length - 2}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="p-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↵</kbd>
                <span className="ml-1">Select</span>
              </span>
            </div>
            <span>
              {results.length > 0 && `${results.length} results`}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
