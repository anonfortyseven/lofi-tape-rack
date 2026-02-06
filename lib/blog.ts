import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
  
  const posts = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'Drift Tapes',
      tags: data.tags || [],
      coverImage: data.coverImage,
    };
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Drift Tapes',
    tags: data.tags || [],
    coverImage: data.coverImage,
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  
  return fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}
