# Changelog

All notable changes to the portfolio website.

---

## [V3.1] — 2026-03-24

### Phase B: Production Infrastructure
- **Favicon**: SVG favicon with gold gradient "A" logo, linked in metadata
- **OG Image**: Static 1200x630 PNG generated via sharp (dark bg, name, title, gold accent)
- **robots.txt**: Allow all crawlers, reference sitemap
- **sitemap.xml**: All 8 production pages listed with lastmod dates
- **Custom 404**: Styled not-found page with gradient "404" and back-to-home CTA
- **JSON-LD**: Person schema (name, jobTitle, worksFor, sameAs) in layout head
- **Blog hidden from nav**: Removed "Writing" from navLinks until real articles exist (page still accessible at /blog)
- **CHANGELOG.md created**: This file, retroactive history below

### Phase A: Immediate UI Fixes
- **Name typography**: `clamp(2.75rem,7vw,6rem)` + `text-wrap: balance` — prevents mid-word breaks
- **Dark mode toggle**: Full implementation:
  - `globals.css` restructured: colors moved from `@theme` to `:root`/`.dark` CSS variables
  - Dark palette: warm stone (#0c0a09 bg, #fafaf9 text, #e7c67e gold accent)
  - `ThemeProvider` from `next-themes` in client-layout
  - Sun/Moon toggle component in navbar (desktop + mobile)
  - Card shadows disabled in dark mode (border-only)
  - Prose, scrollbar, selection, noise, glow all theme-aware
  - Status badge dark variants for hero section
  - Custom cursor hover color uses CSS variable

---

## [V3.0] — 2026-03-24

### Light Mode Redesign
- Complete palette shift from dark (V2) to warm off-white (#FAFAF8) + gold accent (#B8860B)
- All components updated to use CSS custom properties for theming
- `.card-surface` utility: shadow-based depth system for light backgrounds
- Noise overlay for texture, ambient radial glow

### Hero Redesign
- Two-column layout: content left, profile image right
- CharReveal character-by-character name animation
- WordReveal for tagline
- Mouse parallax on background orbs via GSAP quickTo
- Scroll parallax on image container
- Status badge ("Open to opportunities") with ping animation
- Credential line: "Lead AI Engineer at Phronesis Partners"

### KPI Metrics Redesign
- New impact-focused metrics: 48hrs→15min, 13+, 95%, 5 months
- Counter animation for numeric values
- Fade-in for text values

### Light Mode Fixes
- Replaced all `text-[var(--color-bg)]` with `text-white` across 6 files
- Fixed hardcoded V2 gold `rgba(231,198,126,...)` → V3 `rgba(184,134,11,...)`
- Fixed ScrollTrigger initialization for Next.js 16 + React 19

---

## [V2.0] — 2026-03-23

### Dark Theme Build
- Dark stone palette with warm gold accents
- GSAP animations: ScrollTrigger, character reveals, parallax
- Lenis smooth scroll
- Custom cursor with magnetic effects
- 7 home page sections: hero, metrics, projects, territories, timeline, CTA, footer
- Sub-pages: about, projects, blog, contact
- Data-driven: JSON files for profile, projects, skills, experience

---

## [V1.0] — 2026-03-22

### Initial Build
- Basic Next.js portfolio structure
- Rejected as too generic — did not reflect Anshit's positioning as a production AI engineer
