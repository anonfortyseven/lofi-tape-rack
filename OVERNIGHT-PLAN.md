# Lofi Tape Rack - Overnight Build Plan

## Session: 2026-02-05 10 PM - 8 AM

### Mission: SEO-First Build
Build with organic search traffic as a primary goal. Every page, every component should be optimized for discoverability.

**SEO Strategy Doc:** SEO-STRATEGY.md

### Focus: 5 Artists Only
Per John's request, focus the site on 5 core artists (defer music generation):
1. Neon Tanaka - Tokyo jazz lofi
2. Dusty Summers - LA vinyl/soul lofi
3. moss.garden - Portland nature ambient
4. Vinyl Monk - Detroit jazz hop (anonymous)
5. Golden Hour Tapes - Melbourne acoustic/sunrise

### Excluding from active roster (for now):
- Velvet Dreams, Binary Sunset, Café Morena, sleepyhead., The Rainy Window

---

## Priority Tasks (No Auth/Payment)

### Phase 1: Data Cleanup (Hour 1)
- [ ] Update artists.json to feature only 5 core artists prominently
- [ ] Update albums.json to match (filter or mark featured)
- [ ] Add "featured" flag to data structures

### Phase 2: Homepage Polish (Hour 2)
- [ ] Show only 5 featured artists in hero section
- [ ] Add animated cassette tape component
- [ ] Improve "Explore by Mood" section with real filter links
- [ ] Add testimonials/social proof section

### Phase 3: Artist Pages Enhancement (Hour 3)
- [ ] Add waveform visualization placeholder
- [ ] Add album artwork generation via Imagen (cassette tape art per album)
- [ ] Add "Similar Artists" section
- [ ] Improve equipment/influences display

### Phase 4: Album Pages (Hour 4)
- [ ] Enhance album detail page with full track listing
- [ ] Add track preview functionality (mock audio for now)
- [ ] Add "You might also like" recommendations
- [ ] Track duration display improvements

### Phase 5: Browse Experience (Hour 5)
- [ ] Improve filter UI/UX
- [ ] Add infinite scroll or pagination
- [ ] Add quick preview on hover
- [ ] Add keyboard shortcuts (j/k navigation, space to play)

### Phase 6: Components Polish (Hour 6)
- [ ] Enhance AudioPlayer with visualization
- [ ] Add mini-player mode
- [ ] Improve CartDrawer animations
- [ ] Add toast notifications for add-to-cart

### Phase 7: Visual Polish (Hour 7)
- [ ] Generate album cover images using Imagen API
- [ ] Add loading skeletons
- [ ] Improve responsive design
- [ ] Add page transitions/animations

### Phase 4.5: Blog Content (Hour 4.5) — NEW
- [ ] Create /content/blog/ directory
- [ ] Write "What is Lofi Music?" pillar post (2500+ words)
- [ ] Write "Best Lofi for Studying" guide (1500+ words)
- [ ] Write Neon Tanaka artist spotlight (1000+ words)
- [ ] Write Dusty Summers artist spotlight (1000+ words)
- [ ] Write "Lofi vs Chillhop vs Vaporwave" comparison (1200+ words)

### Phase 8: SEO & Technical (Hour 8)
- [ ] Add JSON-LD structured data (Organization, MusicGroup, MusicAlbum schemas)
- [ ] Set up MDX blog system with Next.js
- [ ] Create dynamic sitemap.ts (pages + blog + artists + albums)
- [ ] Add breadcrumb navigation with schema markup
- [ ] Add canonical URLs to all pages
- [ ] Create Open Graph images
- [ ] robots.txt
- [ ] Lighthouse audit and fixes

---

## Technical Notes

- Project: /Volumes/T9/Lofi Tape Rack/lofi-store/
- Stack: Next.js 16, TypeScript, Tailwind CSS
- Deploy: Not yet on Vercel (local dev only)
- Auth/Payment: Deferred - Supabase + Stripe later

## API Keys Available
- Gemini (for Imagen album art): AIzaSyBN_zZU9J5pBRSOLRIUsGeUFwPjFvNRHU4
- Suno (music - ON HOLD): 8c8c7e3f3ed4097ef80a23332fd221ea

---

## Current Status
- Build: ✅ Clean (26 pages)
- Components: AudioPlayer, CartDrawer, Navbar, SearchModal, ProtectedRoute
- Data: 10 artists, ~50 albums
