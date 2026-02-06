import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import artistsData from '@/data/artists.json'
import albumsData from '@/data/albums.json'
import { AlbumJsonLd } from '@/components/JsonLd'
import AlbumClient from './AlbumClient'

type Props = {
  params: Promise<{ slug: string }>
}

const baseUrl = 'https://drifttapes.com'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const album = albumsData.albums.find(a => a.slug === slug)
  
  if (!album) {
    return {
      title: 'Album Not Found',
      description: 'The requested album could not be found.',
    }
  }
  
  const artist = artistsData.artists.find(a => a.id === album.artistId)
  const trackCount = album.tracks.length
  const totalMinutes = album.tracks.reduce((acc, track) => {
    const [min, sec] = track.duration.split(':').map(Number)
    return acc + min + sec / 60
  }, 0)
  const hours = Math.floor(totalMinutes / 60)
  const mins = Math.round(totalMinutes % 60)
  const totalDuration = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`
  
  return {
    title: `${album.title} by ${album.artistName}`,
    description: `${album.description} ${trackCount} tracks, ${totalDuration}. Download in lossless quality from Drift Tapes.`,
    keywords: [
      album.title,
      album.artistName,
      'lofi album',
      'lofi music',
      ...album.tags,
      album.mood,
      'download',
    ],
    openGraph: {
      title: `${album.title} by ${album.artistName}`,
      description: album.description,
      url: `${baseUrl}/albums/${album.slug}`,
      siteName: 'Drift Tapes',
      type: 'music.album',
      images: [
        {
          url: `/og/albums/${album.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${album.title} - Album Cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${album.title} by ${album.artistName}`,
      description: album.description,
    },
    alternates: {
      canonical: `${baseUrl}/albums/${album.slug}`,
    },
    other: {
      'music:musician': `${baseUrl}/artists/${artist?.slug || ''}`,
      'music:release_date': album.year.toString(),
      'music:song_count': trackCount.toString(),
    },
  }
}

export async function generateStaticParams() {
  return albumsData.albums.map((album) => ({
    slug: album.slug,
  }))
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params
  const album = albumsData.albums.find(a => a.slug === slug)
  
  if (!album) {
    notFound()
  }

  const artist = artistsData.artists.find(a => a.id === album.artistId)
  
  if (!artist) {
    notFound()
  }

  return (
    <>
      <AlbumJsonLd album={album} artistSlug={artist.slug} />
      <AlbumClient album={album} artist={artist} />
    </>
  )
}
