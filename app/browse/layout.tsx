import { Metadata } from 'next'
import albumsData from '@/data/albums.json'
import artistsData from '@/data/artists.json'

export const metadata: Metadata = {
  title: 'Browse Lofi Music',
  description: `Browse ${albumsData.albums.length} lofi albums from ${artistsData.artists.length} artists. Filter by mood, genre, artist, or year. Find the perfect beats for studying, working, or relaxing.`,
  keywords: ['browse lofi', 'lofi albums', 'lofi music download', 'study beats', 'chill music', 'filter lofi', 'lofi by mood'],
  alternates: {
    canonical: 'https://drifttapes.com/browse',
  },
  openGraph: {
    title: 'Browse Lofi Music | Drift Tapes',
    description: 'Explore our full catalog of lofi albums. Filter by mood, genre, artist, or year.',
    url: 'https://drifttapes.com/browse',
  },
}

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
