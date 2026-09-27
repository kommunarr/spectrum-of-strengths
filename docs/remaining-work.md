# Remaining Work

This is the postlaunch backlog after reviewing the application, translations,
README, and project notes. Priority reflects public accuracy and maintenance
needs as the bilingual first release develops.

The first-stage site now has owner-directed Home and Foundations content, an
Archive & journal page with a published opening entry, plain-language
English/French key terms, and clearly marked Events and Contact development
pages. See [First-stage content and publishing decisions](first-stage-decisions.md) for
the defaults and questions intentionally deferred to reduce owner workload.

## P0: Public Integrity

### Current Public Content

- The owner approved the current identity, opening entry, and factual
  privacy/accessibility summaries on 2026-09-26. Recheck those statements only
  if their facts or public-sharing context change; the maintainer handles
  routine bilingual proofing and technical details.
- Confirm organization-specific facts, names, contact details, social links,
  and calls to action before those details are published or activated.
- Separate current services from future ideas. Do not publish a Zoom link,
  event, service, partner, outcome, or operating schedule until the organization
  has approved the claim and the maintenance owner is clear.
- GitHub Pages hosting is identified in the approved privacy summary. Future
  form providers and formal policy details are still deferred.

### Future Submission Workflows

The current public pages do not accept contact, event-registration, payment,
or newsletter submissions:

- There is no newsletter signup control or email-address field.
- `src/views/Contact/Contact.tsx` is an in-development notice with no form.
- `src/views/Events/Events.tsx` is an in-development notice with no event
  listings or registration.

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

Add provider error states only if a real contact or newsletter workflow is
approved and implemented.

## P1: Maintainable Site

### Content Management

The first-stage default is to keep content in the existing English and French
locale files and have a technical maintainer make routine updates. This avoids
new account setup and editor training while the publishing cadence is unknown.
Revisit a hosted CMS only if self-editing will save the organization time; the
tradeoffs are documented in [Content Management](content-management.md).

If content growth justifies a structured model later, start with:

- singleton pages: Home, Foundations, Privacy, and Accessibility;
- repeatable archive/journal entries with category, publication date, source
  context, and paired English/French copy;
- a plain-language glossary for heritage, systems, gaps, and value terms;
- approved media assets with alt text and usage notes if the organization later
  supplies them.

### Accessibility Maintenance

- Automated browser checks now cover policy-section structure, skip-link focus,
  reduced-motion layout, carousel announcements, and axe-core rules on every
  English and French route.
- The owner completed the accessibility review before publication and reported
  no actionable high or medium findings. Use the
  [manual accessibility checklist](accessibility-checklist.md) when new
  content or interactions are introduced; track any later findings by severity.

### Routing, SEO, And Deployment

- Preserve the published `/spectrum-of-strengths` base path. A custom domain
  can be considered later.
- Keep the translated title and page description aligned with each route.
- Recheck metadata, favicon, 404 behavior, and direct navigation on the live
  host after changes to routing or deployment.
- Prepare focused bilingual previews for future factual or permission-sensitive
  public changes.
- Keep secrets and provider configuration out of the client bundle. Public CMS
  read identifiers may be exposed only when the chosen provider explicitly
  supports that model.

### Test Coverage

- Keep the existing route/language and translation-key checks current as routes
  or locale structure changes.
- Keep browser coverage aligned with the development states and any future
  submission workflows.

## P2: Polish And Operations

- Add annotated screenshots to the [content update guide](content-update-guide.md)
  only if editing responsibility moves to a nontechnical maintainer.
- Add new approved assets to the [media inventory](media-inventory.md) when
  they are supplied; no additional images are currently approved.
- Decide whether analytics are needed. If they are, use a privacy-respecting
  provider and document consent requirements before adding tracking.
- Add a custom domain only after email, privacy, and deployment ownership are
  settled.

## Completed In This Pass

- Assigned quarterly public-content review to the technical maintainer, with
  review before each new archive entry and owner input only for factual or
  permission-sensitive changes.
- Added localized recovery links for unknown hash routes and a bilingual
  static GitHub Pages 404 page; its live-host behavior was verified at release.
- Refreshed the footer visual baselines for the current browser, and made
  Lighthouse CI install the same Chromium build used by browser checks.
- Replaced placeholder Home and About copy with the first-stage identity,
  foundations, and four-value framework supplied by the organization owner.
- Added an Archive & journal landing page and bilingual plain-language key
  terms without inventing archive entries, dates, contributors, or outcomes.
- Made the archive ready for paired English/French entries with publication
  and source timestamps, status, category, summary, and optional public source
  context or link. The organization opening entry was published with the
  2026-09-27 release date.
- Added paired English/French routes and brought Events and Contact into clear
  development states without submission or registration forms.
- Replaced unreviewed privacy/accessibility policy claims with concise current-
  state summaries and documented the review decisions still needed.
- Removed donation, newsletter, and unconfirmed social calls to action while
  those workflows are outside the first-stage scope.
- Added `npm run check:translations` to keep English and French content keys
  aligned.
- Added `npm run check` as the shared lint, translation, and build gate.
- Added installable `.githooks/pre-commit` and `.githooks/pre-push` checks.
- Added a GitHub Actions quality workflow for pushes to `main` and pull
  requests.
- Added a production build output check for generated assets under the
  configured `/spectrum-of-strengths/` base path.
- Added a Chromium browser suite for bilingual navigation, mobile-menu
  behavior, inactive submission controls, and automated axe-core checks.
- Added a CI workflow that runs the browser suite and retains its report.
- Added Lighthouse CI budgets and report artifacts for production performance,
  accessibility, best practices, and SEO.
- Added a skip-to-content link, semantic main/navigation landmarks, mobile
  menu keyboard behavior and focus restoration, and reduced-motion handling.
- Added the slow bilingual value carousel with pause and navigation controls,
  manual slide announcements, focus/hover pause, and a reduced-motion card
  layout.
- Added a bilingual accessibility-page explanation of the carousel's timing,
  controls, and reduced-motion layout.
- Added browser coverage for carousel controls, reduced motion, policy section
  structure, keyboard focus, and English/French announcements.
- Reviewed and refreshed desktop/mobile visual baselines for the current
  development-status badges and the removal of inactive calls to action.
- Fixed Home and Foundations links to use absolute localized routes; route
  checks now catch nested-path mistakes.
- Spaced and styled the Events and Contact development badges so they remain
  distinct from their navigation links.
- Simplified the archive update handoff so an owner can provide rough notes,
  source timing, and sharing status while the maintainer handles editorial
  fields and translation.
- Added a technical content update guide for the locale files, local preview,
  quality checks, deployment limits, and rollback.
- Added an inventory for the current logo and favicon plus image sizing,
  permission, and alternative-text guidance for future approved assets.
- Added screen-reader descriptions for the visible Events and Contact
  development statuses in both copies of the navigation.
- Removed simulated contact/newsletter success states and corrected malformed
  policy markup without adding external integrations.
- Published the bilingual holding page at the existing GitHub Pages address,
  replacing the older placeholder site without forms or donation/join links.
- Added the opening archive entry, GitHub Pages privacy disclosure, public URL
  metadata, and focused browser checks for those features.
- Published the full bilingual first release on 2026-09-27 after the owner's
  accessibility review. Verified all 16 direct routes, opening dates, metadata,
  language switch, favicon, and custom 404 response on the public host.

## Suggested Order

1. Maintain a quarterly public-content review and publish new archive records
   when their dates, sources, and sharing permissions are ready.
2. Revisit a CMS only if nontechnical self-editing is a real need. Do not add
   signup, contact, payment, or event providers before their workflows and
   privacy wording are approved.
3. Keep accessibility, route, SEO, and browser checks current for later content
   changes.
