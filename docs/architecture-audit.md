# Architecture audit

The initial checkout was a clean README-only repository at d8c8ca6. No existing application, assets, integrations, CI or agent instructions were found. Node 24 is available in cloud. The reference website returned an environment proxy HTTP 403; no text, assets or design were copied from it.

## Decisions

- Next.js 16 App Router, React 19, strict TypeScript and Tailwind 4. The npm lockfile is authoritative. Build uses webpack for predictable cloud behavior.
- Server-rendered public pages share content in `lib/content.ts`, visual components in `components/site.tsx`, and interactive boundaries in `components/controls.tsx`.
- `[slug]` is an explicit static allowlist, not an arbitrary CMS route. Service pages use their own static route and shared template. Unknown paths return 404.
- Local system text fonts and a small licensed DejaVu symbol subset avoid third-party font requests and missing arrow glyphs. Original CSS/SVG visuals avoid large image downloads. The typographic mark is temporary pending supplied brand assets.
- Theme boot script executes before paint; Auto uses visitor-local 07:00–19:00 light and other hours dark, checked every minute. Manual choice persists. Reduced motion overrides animation, with persistent pause control.
- Inquiry validation runs locally and creates a reviewable mailto link to the approved account. No delivery claim, booking API or data storage exists. Future delivery needs server validation and abuse protection.
- Future database/content and delivery ports are server-only (`lib/integrations.ts`). No Supabase dependency, auth, keys or database are required now.
- Titles, descriptions, canonicals, social cards, sitemap, robots, semantic landmarks and factual Organization structured data are provided. Configure the real owned origin before launch.

## Risk and review

No client results, testimonials, awards or employer work are published. Concepts are explicitly labelled. No US office is claimed. Booking days/duration and the proposed public mailbox ownership are unconfirmed. Legal text requires launch review and hosting-specific details. Do not merge or deploy production without review.
