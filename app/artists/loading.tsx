import { Navbar } from '@/components/Navbar'
import { ArtistGridSkeleton } from '@/components/Skeleton'

export default function ArtistsLoading() {
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
            <div className="h-10 w-32 bg-zinc-800 rounded-lg animate-pulse mb-4" />
            <div className="h-5 w-full max-w-xl bg-zinc-800/50 rounded-lg animate-pulse mb-2" />
            <div className="h-5 w-96 bg-zinc-800/50 rounded-lg animate-pulse" />
          </div>

          {/* Artist Grid Skeleton */}
          <ArtistGridSkeleton count={6} />
        </div>
      </main>
    </div>
  )
}
