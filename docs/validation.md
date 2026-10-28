# Cloud validation

Validated in `/workspace/my-first-website` with Node 24.19.0, npm 11.9.0 and system Chromium.

Passed:

- Production build: Next.js generated all public routes and technical endpoints successfully.
- Strict TypeScript, ESLint, Prettier formatting, and Git whitespace checks.
- Eight Playwright browser tests against the production server: all 14 public routes with unique titles/descriptions/canonicals; unknown route behavior; desktop keyboard services navigation; mobile menu/Escape/focus and routing; theme persistence and local-time Auto mode; animation pause and reduced-motion behavior; invalid/valid inquiry handling with mailto-only delivery; sitemap/robots/social card; homepage internal links; runtime/hydration console checks; light/dark screenshots at 375, 768 and 1440px.
- Additional 320px viewport check: document width equals viewport width, no horizontal overflow.
- Manual screenshot review of desktop light and mobile dark layouts. Missing decorative glyphs were corrected with a licensed local symbol subset.
- `npm audit --omit=dev --audit-level=high`: zero production dependency vulnerabilities at validation time.

Initial browser failures were test assumptions (root canonical normalization and Next.js's additional route-announcer alert), corrected before the passing final run. No application assertions were disabled.

Network limitations: reference website and Playwright browser CDN return proxy HTTP 403. Existing system Chromium supplies browser testing; no network policy was broadened. Initial npm cache writes outside writable roots were resolved using `/tmp/nexovate-npm`.

Remaining release review: real origin, final logo assets, legal/hosting details, public mailbox ownership and live booking configuration. Email composition is tested; actual email delivery and real appointment booking are intentionally not implemented or claimed. Full assistive-technology testing and cross-browser Safari/Firefox testing remain for launch review.
