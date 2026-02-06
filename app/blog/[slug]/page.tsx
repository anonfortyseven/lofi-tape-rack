import { Navbar } from '@/components/Navbar';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return { title: 'Post Not Found | Drift Tapes' };
  }
  
  return {
    title: `${post.title} | Drift Tapes Blog`,
    description: post.description,
  };
}

// Custom MDX components styled for the site
const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold text-white mt-6 mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-zinc-300 leading-relaxed mb-4" {...props}>{children}</p>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="text-amber-500 hover:text-amber-400 underline underline-offset-2" {...props}>{children}</a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-zinc-300" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-amber-500 pl-4 my-6 italic text-zinc-400" {...props}>{children}</blockquote>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-x-auto mb-4" {...props}>{children}</pre>
  ),
  hr: () => <hr className="border-zinc-800 my-8" />,
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} className="rounded-xl my-6 w-full" {...props} />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-amber-500/10 text-amber-500 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-zinc-400 mb-6">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-zinc-500 border-b border-zinc-800 pb-6">
              <span>By {post.author}</span>
              <span>•</span>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div 
              className="w-full h-64 sm:h-80 rounded-2xl bg-cover bg-center mb-8"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          )}

          {/* MDX Content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-sm">Enjoyed this post?</p>
                <p className="text-white font-medium">Share it with fellow lofi lovers</p>
              </div>
              <div className="flex gap-3">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://drifttapes.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
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
