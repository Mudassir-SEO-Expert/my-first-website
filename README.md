# Nexovate public website

A responsive agency website built with Next.js App Router, React, TypeScript and Tailwind CSS. All development runs in the cloud checkout; no laptop tools or storage are needed.

## Cloud development

Use the existing isolated checkout at `/workspace/my-first-website`; do not create an additional worktree unless requested. Node 24 and npm 11 were used.

```sh
cd /workspace/my-first-website
npm --cache /tmp/nexovate-npm ci --no-audit --no-fund
npm run dev
```

The site uses port 3000. Live processes must be restarted in new cloud tasks. No database, API credentials or email provider is needed. Copy `.env.example` to `.env.local` only when changing the public site origin; never commit secrets.

## Validation

```sh
npm run lint
npm run build
npm run typecheck
npm run start
# In a second cloud shell, while the production server runs:
npm run test:e2e
```

Browser tests default to the cloud image’s `/usr/bin/chromium`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to another installed Chromium executable when needed. The Playwright browser download domain is blocked in this environment, so the preinstalled system browser is used. Test reports and screenshots are ignored outputs. Tests target the local running server; do not run them against production.

## Deployment for review

Use any Node-compatible Next.js hosting platform. Install using `npm ci`, set the verified owned `NEXT_PUBLIC_SITE_URL` to the HTTPS site origin, then run `npm run build` and `npm run start`. This variable is consumed at build time by metadata and crawler routes. No deployment provider or production settings were changed. Review the [launch checklist](docs/launch-checklist.md) before public release.

## Contact behavior

The form validates locally and provides an email draft link to the authorized account. No message is transmitted by the form and no appointment is booked. The user must send the email from their own email application. Scheduling days, call duration and live booking provider remain unconfirmed.

## Structure and documentation

- `app/`: static public pages, service routes, crawler metadata and social card.
- `components/`: shared server-rendered design components and small client interaction boundaries.
- `lib/content.ts`: service, concept, FAQ and original article content.
- `lib/integrations.ts`: server-only interfaces for future integrations; no keys or database required.
- [Architecture audit](docs/architecture-audit.md)
- [Sitemap and page/component wireframes](docs/sitemap-and-wireframes.md)
- [Implementation plan](docs/implementation-plan.md)
- [Launch content checklist](docs/launch-checklist.md)

Theme choices are Auto, Light and Dark. Auto follows the visitor’s local day (07:00–19:00) and night, not server time. Theme and animation preferences persist locally; operating-system reduced-motion preferences are respected. No external fonts, analytics, trackers or client project assets are used.
