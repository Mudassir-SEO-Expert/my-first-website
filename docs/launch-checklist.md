# Launch content and integration checklist

- [ ] Owner reviews copy, service scope and brand presentation.
- [ ] Replace temporary typographic logo with authorized supplied logo/banner assets, preserving accessible names and contrast. No parent-chat files exist in this checkout.
- [ ] Set NEXT_PUBLIC_SITE_URL to the verified owned production HTTPS origin before build. Localhost is development-only, not a claimed brand domain.
- [ ] Confirm ownership before displaying or routing enquiries to Nexovate@gmail.com. It is not used by this implementation.
- [ ] Confirm continued public use of approved opmudassir882@gmail.com. Current flow opens a draft in the visitor’s email app and requires them to send it.
- [ ] Confirm booking days, duration and real scheduling URL. Desired window: America/New_York 09:00–17:00, with DST handled by the eventual booking provider. No instant booking is currently offered.
- [ ] If replacing mailto: configure server-only provider credentials through secure deployment settings; validate input server-side, add rate limiting/abuse controls, consent/retention rules, provider failure states and real delivery tests. Never add fake success responses.
- [ ] Review hosting provider log retention, processing arrangements and jurisdiction-specific legal requirements; update privacy policy and terms with professional advice as appropriate.
- [ ] Publish case studies, testimonials and work only after documented permission and verification. Existing concepts are not client work. Employer work is excluded.
- [ ] Verify canonical/social URLs, indexing settings, sitemap and HTTPS on the chosen preview/production host.
- [ ] Review keyboard, screen-reader, reduced-motion and light/dark experiences with real users where practical.
- [ ] Review and merge PR before any production deployment. No deployment is part of this change.
