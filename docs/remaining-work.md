# Remaining Work

This is the current implementation backlog after reviewing the application,
translations, README, and project notes. Priority reflects what must be true
before the site should be treated as a dependable public site, not what would
make the demo look more elaborate.

## P0: Public Integrity

### Approve And Replace Content

- Replace the lorem ipsum on the Home and About pages with approved English
  content, then obtain an approved French translation.
- Confirm the organization's current description, audience, contact address,
  event information, social links, and any donation or join-us call to action.
- Separate current services from future ideas. Do not publish a Zoom link,
  event, service, partner, outcome, or operating schedule until the organization
  has approved the claim and the maintenance owner is clear.
- Replace hard-coded English event labels and event copy with localized,
  structured content.
- Review the terms, privacy, copyright, and accessibility copy with the
  organization's responsible person. Content in those pages is currently
  presented as authoritative policy text.

### Make Forms Honest And Functional

The current client-side flows intentionally do not send or store submissions:

- `src/components/EmailModal/EmailModal.component.tsx` explains that the
  newsletter is not connected and accepts no email address.
- `src/views/Contact/Contact.tsx` prevents the browser's default submission and
  reports that the message was not sent or stored.

Choose and configure the providers before changing the success copy:

- Newsletter: use a real email-list provider with an embedded or hosted signup
  form, consent record, double opt-in, and provider-managed unsubscribe links.
- Contact: use a provider that forwards or stores contact submissions and
  exposes an honest failure state. EmailJS can work for browser-side email
  delivery, but it is not a substitute for a subscriber list.
- Add a honeypot or CAPTCHA/rate-limiting strategy appropriate to the chosen
  provider.
- Update the privacy notice and consent language to describe the provider and
  data handling.

The email modal now has a native dialog lifecycle, Escape/backdrop dismissal,
and focus return. A provider error state remains part of the integration work.

## P1: Maintainable Site

### Content Management

Move public content out of JSX and translation blobs into a structured content
model that a nontechnical maintainer can edit. The recommended approach is
documented in [Content Management](content-management.md). Do not build a CMS
integration until the organization chooses a provider and confirms who owns the
account.

The initial content model should cover:

- singleton pages: Home, About, Terms/Privacy, Accessibility;
- repeatable Events with title, description, dates, status, location, links,
  image, and English/French translation state;
- site settings: contact email, social links, CTA visibility, and organization
  display name;
- media assets with alt text and usage notes;
- translation status and a publish rule that prevents an accidentally missing
  required French page.

### Accessibility Remediation

- Add focused browser/DOM validation for policy markup and the remaining
  heading-order, landmark, visible-focus, contrast, zoom, reduced-motion, and
  screen-reader checks in both languages.
- Verify heading order, landmarks, link names, visible focus, contrast, zoom,
  reduced motion, and screen-reader announcements in both languages.

### Routing, SEO, And Deployment

- Decide whether the final public URL is GitHub Pages, a custom domain, or
  another host. Preserve the `/spectrum-of-strengths` base path until that is
  decided.
- Add canonical URL, description, Open Graph/Twitter metadata, favicon, and a
  useful 404 experience once the public domain is known.
- Test refresh and direct navigation for every English and French route on the
  actual host.
- Add a deployment preview path for content changes before publishing them.
- Keep secrets and provider configuration out of the client bundle. Public CMS
  read identifiers may be exposed only when the chosen provider explicitly
  supports that model.

### Test Coverage

- Add unit tests for route/language mapping and the translation validator.
- Add browser tests for navigation, language switching, dialog behavior, and
  form success/failure states.
- Add an accessibility check to the browser test path.
- Add a production build smoke test that verifies generated asset paths under
  the configured base path.

## P2: Polish And Operations

- Replace the remaining stale README TODOs with approved ownership and content
  workflow instructions.
- Add a short maintainer guide with screenshots for editing, translating,
  previewing, publishing, and rolling back content.
- Add image sizing/compression rules and a small media inventory.
- Decide whether analytics are needed. If they are, use a privacy-respecting
  provider and document consent requirements before adding tracking.
- Add a custom domain only after email, privacy, and deployment ownership are
  settled.
- Add a content review cadence and an owner for stale events, external links,
  policies, and contact information.

## Completed In This Pass

- Added `npm run check:translations` to keep English and French content keys
  aligned.
- Added `npm run check` as the shared lint, translation, and build gate.
- Added installable `.githooks/pre-commit` and `.githooks/pre-push` checks.
- Added a GitHub Actions quality workflow for pushes to `main` and pull
  requests.
- Added a skip-to-content link, semantic main/navigation landmarks, mobile menu
  keyboard behavior, dialog focus return, responsive dialog sizing, and
  accessible social-icon naming.
- Removed simulated contact/newsletter success states and corrected malformed
  policy markup without adding external integrations.

## Suggested Order

1. Get approved organization content and decide what is genuinely public now.
2. Choose the CMS and email providers, including account ownership and consent
   language.
3. Convert the current pages into the content model and add an editor preview.
4. Connect the newsletter and contact flows, including failure states and
   privacy documentation.
5. Complete accessibility, route, SEO, and browser validation.
6. Hand off the maintainer guide and verify that a nontechnical editor can make
   and preview an English/French update without changing source code.
