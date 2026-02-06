// JSON-LD Structured Data Components for SEO

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema (site-wide)
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Drift Tapes",
    "url": "https://drifttapes.com",
    "logo": "https://drifttapes.com/logo.png",
    "description": "Premium lofi music store featuring curated beats from independent artists worldwide.",
    "sameAs": [
      "https://twitter.com/drifttapes",
      "https://instagram.com/drifttapes",
      "https://youtube.com/@drifttapes"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@drifttapes.com",
      "contactType": "customer service"
    }
  };

  return <JsonLd data={data} />;
}

// MusicGroup Schema (per artist)
interface ArtistJsonLdProps {
  artist: {
    name: string;
    slug: string;
    genre: string;
    origin: string;
    founded: string;
    shortBio: string;
    socialHandle?: string | null | undefined;
    website?: string | null | undefined;
  };
  albums: Array<{
    title: string;
    slug: string;
    year: number;
  }>;
}

export function ArtistJsonLd({ artist, albums }: ArtistJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": artist.name,
    "url": `https://drifttapes.com/artists/${artist.slug}`,
    "genre": artist.genre,
    "foundingLocation": {
      "@type": "Place",
      "name": artist.origin
    },
    "foundingDate": artist.founded,
    "description": artist.shortBio,
    "album": albums.map(album => ({
      "@type": "MusicAlbum",
      "name": album.title,
      "url": `https://drifttapes.com/albums/${album.slug}`,
      "datePublished": album.year.toString()
    })),
    ...(artist.website && {
      "sameAs": [
        artist.website.startsWith('http') ? artist.website : `https://${artist.website}`
      ]
    })
  };

  return <JsonLd data={data} />;
}

// MusicAlbum Schema (per album)
interface AlbumJsonLdProps {
  album: {
    title: string;
    slug: string;
    artistName: string;
    artistId: string;
    year: number;
    description: string;
    price: number;
    tracks: Array<{
      number: number;
      title: string;
      duration: string;
    }>;
  };
  artistSlug: string;
}

export function AlbumJsonLd({ album, artistSlug }: AlbumJsonLdProps) {
  // Convert duration "3:24" to ISO 8601 "PT3M24S"
  const parseDuration = (duration: string): string => {
    const [min, sec] = duration.split(':').map(Number);
    return `PT${min}M${sec}S`;
  };

  const data = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": album.title,
    "url": `https://drifttapes.com/albums/${album.slug}`,
    "datePublished": album.year.toString(),
    "description": album.description,
    "numTracks": album.tracks.length,
    "byArtist": {
      "@type": "MusicGroup",
      "name": album.artistName,
      "url": `https://drifttapes.com/artists/${artistSlug}`
    },
    "track": album.tracks.map(track => ({
      "@type": "MusicRecording",
      "name": track.title,
      "position": track.number,
      "duration": parseDuration(track.duration)
    })),
    "offers": {
      "@type": "Offer",
      "price": album.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://drifttapes.com/albums/${album.slug}`
    }
  };

  return <JsonLd data={data} />;
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://drifttapes.com${item.href}`
    }))
  };

  return <JsonLd data={data} />;
}

// WebSite Schema (for sitelinks search box)
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Drift Tapes",
    "url": "https://drifttapes.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://drifttapes.com/browse?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLd data={data} />;
}

// MusicStore Schema (for the business)
export function MusicStoreJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MusicStore",
    "name": "Drift Tapes",
    "url": "https://drifttapes.com",
    "logo": "https://drifttapes.com/logo.png",
    "description": "Premium lofi music downloads and cassette tapes. Curated beats from independent artists worldwide.",
    "priceRange": "$9-$15",
    "paymentAccepted": "Credit Card",
    "currenciesAccepted": "USD"
  };

  return <JsonLd data={data} />;
}
