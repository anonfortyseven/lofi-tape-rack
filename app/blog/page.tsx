import { Navbar } from '@/components/Navbar';
import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Drift Tapes',
  description: 'Stories, artist spotlights, and behind-the-scenes from the world of lofi music.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              The <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Stories, artist spotlights, production tips, and behind-the-scenes from the world of lofi music.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
              <p className="text-zinc-500">
                We&apos;re working on some great content. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Cover Image Placeholder */}
                    {post.coverImage ? (
                      <div 
                        className="w-full sm:w-48 h-32 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${post.coverImage})` }}
                      />
                    ) : (
                      <div className="w-full sm:w-48 h-32 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">
                          {index % 4 === 0 ? '🎵' : index % 4 === 1 ? '🎧' : index % 4 === 2 ? '📻' : '🎹'}
                        </span>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <time className="text-sm text-zinc-500">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        {post.tags.length > 0 && (
                          <>
                            <span className="text-zinc-700">•</span>
                            <span className="text-sm text-amber-500">{post.tags[0]}</span>
                          </>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2 truncate">
                        {post.title}
                      </h2>
                      
                      <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span>By {post.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                DRIFT<span className="text-amber-500">TAPES</span>
              </span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/artists" className="text-zinc-500 hover:text-white text-sm transition-colors">Artists</Link>
              <Link href="/blog" className="text-zinc-500 hover:text-white text-sm transition-colors">Blog</Link>
              <Link href="/about" className="text-zinc-500 hover:text-white text-sm transition-colors">About</Link>
              <Link href="/terms" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</Link>
            </div>
            <p className="text-zinc-600 text-sm">© 2025 Drift Tapes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
