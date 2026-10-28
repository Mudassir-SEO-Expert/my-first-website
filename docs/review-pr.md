## What this changes

Builds the README-only repository into Nexovate’s responsive public agency website using Next.js App Router, TypeScript and Tailwind. Adds all 14 public pages, reusable service/content components, original CSS/SVG artwork, labelled concept projects, factual agency copy, useful editorial articles and honest case-study empty states.

Navigation supports keyboard, mobile and Escape interactions. Auto/Light/Dark themes use visitor-local day/night, persist locally and initialize before paint. Decorative animation includes persistent pause and reduced-motion support. Contact validates locally and prepares a reviewable email draft to the approved account; it never claims delivery or an appointment booking.

Includes route metadata, canonical/social URLs, sitemap/robots, accurate Organization JSON-LD, server-only future integration interfaces, architecture audit, sitemap/wireframes, implementation plan, deployment README and launch checklist.

## Validation

- Production build, strict TypeScript, ESLint and Prettier pass.
- Eight Playwright tests pass against the production server, including all 14 routes, navigation, inquiry validation, themes, motion, internal links, crawler endpoints and runtime errors.
- Screenshot QA at 375/768/1440px in light and dark, plus a 320px overflow check.
- Production dependency audit: zero vulnerabilities.

## Before public launch

Review the actual owned site origin, final authorized logo assets, hosting/legal details and mailbox ownership. Booking days/duration/provider remain unconfirmed. The requested unverified public mailbox is not used. No client names, testimonials, employer work, fabricated results or US office claims are published. See docs/launch-checklist.md and docs/validation.md.

No production deployment, settings change or merge is included. Cloud setup/start instructions were saved separately as an environment configuration draft.
