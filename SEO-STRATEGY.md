# Drift Tapes - SEO Strategy

## Goal
Capture organic traffic from people searching for lofi music, study beats, and related keywords. Build authority in the lofi/chill music niche through content + technical SEO.

---

## Target Keywords

### Primary (High Intent)
- "lofi music download"
- "buy lofi beats"
- "lofi music license"
- "royalty free lofi"
- "lofi beats for videos"
- "study music download"

### Secondary (Discovery)
- "best lofi artists"
- "lofi music for studying"
- "chill beats playlist"
- "relaxing music for work"
- "lo-fi hip hop"
- "ambient study music"

### Long-tail (Blog Content)
- "how to make lofi beats"
- "best lofi music for coding"
- "lofi vs ambient music difference"
- "history of lofi hip hop"
- "why lofi helps you focus"
- "lofi music for sleep vs study"

---

## Technical SEO (Phase 1)

### Already Planned
- [x] Dynamic sitemap.xml
- [x] robots.txt
- [x] Meta tags per page
- [x] Open Graph images

### Additional
- [ ] JSON-LD structured data (MusicGroup, MusicAlbum, MusicRecording schemas)
- [ ] Canonical URLs
- [ ] Breadcrumb navigation with schema
- [ ] Fast Core Web Vitals (already good with Next.js static)
- [ ] Mobile-first responsive (already done)
- [ ] Internal linking strategy

---

## Content SEO (Phase 2)

### Blog System
Create `/blog` with MDX support for rich content.

#### Content Pillars

**1. Artist Spotlights** (weekly)
- Deep dives into each artist's story, process, influences
- Keywords: "[artist name] lofi", "lofi artists like [X]"
- Internal links to artist pages + albums

**2. Mood/Use Case Guides** (evergreen)
- "Best Lofi Music for Studying" → links to study-tagged albums
- "Lofi Beats for Coding Sessions"
- "Relaxing Music for Work From Home"
- "Lofi for Sleep: Our Top Picks"

**3. Educational Content** (authority building)
- "What is Lofi Music? A Complete Guide"
- "The History of Lo-Fi Hip Hop"
- "Why Lofi Music Helps You Focus (The Science)"
- "How Lofi Artists Create That Vintage Sound"
- "Lofi vs Chillhop vs Vaporwave: What's the Difference?"

**4. Curated Lists** (link bait + social shares)
- "50 Best Lofi Albums of 2025"
- "10 Underrated Lofi Artists You Need to Know"
- "The Ultimate Lofi Study Playlist"

**5. Behind the Scenes**
- Equipment breakdowns
- Sample sources and techniques
- Studio tours (written)

---

## Page-Level SEO

### Homepage
- H1: "Lofi Music Downloads | Premium Beats from Independent Artists"
- Meta: "Discover and download premium lofi music from independent artists worldwide. High-quality study beats, chill hip hop, and ambient music."

### Artist Pages
- H1: "[Artist Name] - [Genre] | Drift Tapes"
- Meta: "Explore [Artist Name]'s lofi discography. [Short bio]. Download high-quality beats from [origin]."
- Include: bio, discography, influences, equipment

### Album Pages
- H1: "[Album Title] by [Artist Name]"
- Meta: "[Album description]. [Track count] tracks, [total runtime]. Download in lossless quality."
- Include: full track listing, tags, related albums

### Browse Page
- H1: "Browse Lofi Music | [X] Albums from [Y] Artists"
- Filterable content with URL state (/browse?mood=study&genre=jazz)
- Each filter combination = indexable page

### Blog Posts
- Semantic HTML (proper heading hierarchy)
- Table of contents for long posts
- Related posts section
- Author attribution
- Publish dates + last updated

---

## Structured Data

### Organization (site-wide)
```json
{
  "@type": "Organization",
  "name": "Drift Tapes",
  "url": "https://drifttapes.com",
  "logo": "https://drifttapes.com/logo.png",
  "sameAs": ["social links"]
}
```

### MusicGroup (per artist)
```json
{
  "@type": "MusicGroup",
  "name": "Neon Tanaka",
  "genre": "Lofi",
  "foundingLocation": "Tokyo, Japan",
  "album": [...]
}
```

### MusicAlbum (per album)
```json
{
  "@type": "MusicAlbum",
  "name": "City Rain",
  "byArtist": {"@type": "MusicGroup", "name": "Neon Tanaka"},
  "numTracks": 8,
  "datePublished": "2024"
}
```

### BlogPosting (per article)
Standard Article schema with author, dates, images

---

## Internal Linking Strategy

1. **Artist → Albums**: Every artist page links to all their albums
2. **Album → Artist**: Every album links back to artist
3. **Album → Related**: "You might also like" section
4. **Blog → Products**: Every blog post links to relevant artists/albums
5. **Homepage → Featured**: Rotating featured content
6. **Breadcrumbs**: On all deep pages

---

## Content Calendar (First Month)

### Week 1: Foundation
- [ ] Launch blog system
- [ ] "What is Lofi Music?" pillar post (2000+ words)
- [ ] 5 artist spotlight posts (one per featured artist)

### Week 2: Use Cases
- [ ] "Best Lofi for Studying" guide
- [ ] "Lofi for Work From Home" guide
- [ ] "Lofi for Sleep" guide

### Week 3: Education
- [ ] "History of Lofi Hip Hop"
- [ ] "Why Lofi Helps You Focus"

### Week 4: Lists
- [ ] "Top 10 Lofi Albums on Drift Tapes"
- [ ] "5 Underrated Lofi Artists"

---

## Implementation Priority

1. **Tonight**: Add JSON-LD structured data to existing pages
2. **Tonight**: Create /blog route with MDX support
3. **Tonight**: Write 3 seed articles (pillar content)
4. **This Week**: Complete artist spotlights
5. **Ongoing**: 2-3 blog posts per week

---

## Measurement

Track in Google Search Console:
- Impressions by query
- Click-through rates
- Average position
- Pages indexed

Target metrics (3 months):
- 50+ pages indexed
- 1000+ monthly organic impressions
- Top 20 for "lofi music download"
- Top 10 for long-tail keywords
