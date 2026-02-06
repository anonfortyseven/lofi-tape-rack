import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Drift Tapes - our mission to bring premium lofi music to listeners worldwide while supporting independent artists. 80% of every sale goes directly to creators.',
  keywords: ['about drift tapes', 'lofi music store', 'support artists', 'independent music'],
  alternates: {
    canonical: 'https://drifttapes.com/about',
  },
  openGraph: {
    title: 'About | Drift Tapes',
    description: 'Our mission: bring premium lofi music to listeners worldwide while supporting independent artists.',
    url: 'https://drifttapes.com/about',
  },
}

export default function AboutPage() {
  const { artists } = artistsData
  const { albums } = albumsData
  
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
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-amber-500">Drift Tapes</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              A home for lofi music lovers and the artists who create the sounds that define our nights, study sessions, and quiet moments.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-16">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-amber-500 mb-1">{artists.length}</p>
              <p className="text-sm text-zinc-500">Artists</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-amber-500 mb-1">{albums.length}</p>
              <p className="text-sm text-zinc-500">Albums</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-amber-500 mb-1">80%</p>
              <p className="text-sm text-zinc-500">To Artists</p>
            </div>
          </div>

          {/* Story */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Drift Tapes was born from late nights and a love for the sounds that make those hours special. We started as a small collective of music lovers who noticed something: the lofi community was vibrant, creative, and growing—but artists weren&apos;t getting their fair share.
              </p>
              <p>
                Streaming platforms pay fractions of a cent. Independent artists were creating masterpieces that soundtracked millions of study sessions, but couldn&apos;t afford to keep creating. We wanted to change that.
              </p>
              <p>
                So we built Drift Tapes. A place where you can buy music you love and know that 80% of your purchase goes directly to the creator. No middlemen taking most of the cut. Just direct support for the artists who make the music that helps you focus, relax, and drift.
              </p>
              <p>
                Today, we&apos;re home to {artists.length} incredible artists from around the world—from Tokyo jazz cafés to Berlin synth caves, from São Paulo botecos to Portland forest studios. Each one hand-picked. Each one supported by a community that values what they create.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">What We Believe</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Artists First</h3>
                <p className="text-zinc-400 text-sm">
                  Creators deserve to be paid fairly. That&apos;s why 80% of every sale goes directly to the artist. No exceptions.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Quality Over Quantity</h3>
                <p className="text-zinc-400 text-sm">
                  We don&apos;t accept everyone. Every artist is hand-picked based on quality, authenticity, and contribution to the lofi community.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Own Your Music</h3>
                <p className="text-zinc-400 text-sm">
                  When you buy from Drift Tapes, you own it forever. Download in lossless quality. No subscriptions, no DRM.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Global Community</h3>
                <p className="text-zinc-400 text-sm">
                  Lofi knows no borders. We feature artists from every continent, united by their love for chill beats.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">The Team</h2>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <p className="text-zinc-300 leading-relaxed mb-6">
                Drift Tapes is run by a small, distributed team of music lovers. We don&apos;t have a fancy office—just laptops, good headphones, and a shared Discord where we argue about which albums to feature next.
              </p>
              <p className="text-zinc-400 text-sm">
                Want to join us? We&apos;re always looking for people who share our passion. Drop us a line at{' '}
                <a href="mailto:hello@drifttapes.com" className="text-amber-500 hover:text-amber-400 transition-colors">
                  hello@drifttapes.com
                </a>
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to explore?</h2>
                <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                  Discover {albums.length} albums from {artists.length} artists. Find your new favorite tape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/browse"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
                  >
                    Browse Tapes
                  </Link>
                  <Link
                    href="/artists"
                    className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-zinc-700"
                  >
                    Meet the Artists
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                DRIFT<span className="text-amber-500">TAPES</span>
              </span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/artists" className="text-zinc-500 hover:text-white text-sm transition-colors">Artists</Link>
              <Link href="/about" className="text-zinc-500 hover:text-white text-sm transition-colors">About</Link>
              <Link href="/terms" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</Link>
              <Link href="/privacy" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy</Link>
            </div>
            <p className="text-zinc-600 text-sm">© 2025 Drift Tapes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
