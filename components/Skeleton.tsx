'use client'

// Skeleton loading components for visual polish

// Base skeleton with animated shimmer
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`bg-zinc-800 rounded-lg animate-pulse relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
    </div>
  )
}

// Album card skeleton for browse grid
export function AlbumCardSkeleton() {
  return (
    <div className="group">
      {/* Album Cover */}
      <div className="relative aspect-square mb-4">
        <Skeleton className="w-full h-full rounded-xl" />
        {/* Year badge placeholder */}
        <div className="absolute top-2 right-2">
          <Skeleton className="w-12 h-6 rounded-full" />
        </div>
      </div>

      {/* Album Info */}
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  )
}

// Multiple album cards for grid
export function AlbumGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <AlbumCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Artist card skeleton
export function ArtistCardSkeleton() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      {/* Avatar */}
      <Skeleton className="w-20 h-20 rounded-full mb-4" />

      {/* Name & Origin */}
      <Skeleton className="h-6 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-3" />
      
      {/* Genre Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Bio */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

// Multiple artist cards for grid
export function ArtistGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArtistCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Track list skeleton for album page
export function TrackListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className={`flex items-center gap-4 px-6 py-4 ${
            i !== count - 1 ? 'border-b border-zinc-800/50' : ''
          }`}
        >
          {/* Track Number */}
          <Skeleton className="w-8 h-5" />

          {/* Title */}
          <div className="flex-1">
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Duration */}
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  )
}

// Album detail header skeleton
export function AlbumHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-10">
      {/* Album Cover */}
      <div className="flex-shrink-0">
        <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-2xl" />
      </div>

      {/* Album Info */}
      <div className="flex-1">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-10 w-3/4 mb-2" />
        
        {/* Artist */}
        <Skeleton className="h-7 w-32 mb-4" />

        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />

        {/* Stats */}
        <div className="flex items-center gap-6 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-28 rounded-xl" />
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Full album page skeleton
export function AlbumPageSkeleton() {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-14" />
          <span className="text-zinc-600">/</span>
          <Skeleton className="h-4 w-24" />
          <span className="text-zinc-600">/</span>
          <Skeleton className="h-4 w-32" />
        </div>
      </nav>

      <AlbumHeaderSkeleton />

      <section className="mb-12">
        <Skeleton className="h-7 w-28 mb-4" />
        <TrackListSkeleton count={8} />
      </section>

      {/* Production Notes */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <Skeleton className="h-6 w-32 mb-3" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <Skeleton className="h-6 w-36 mb-3" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </section>

      {/* About Artist */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Skeleton
