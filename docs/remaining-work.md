# Remaining Work

This is the current implementation backlog after reviewing the application,
translations, README, and project notes. Priority reflects what must be true
before the site should be treated as a dependable public site, not what would
make the demo look more elaborate.

The first-stage site now has owner-directed Home and Foundations content, an
Archive & journal landing page, plain-language English/French key terms, and
clearly marked Events and Contact development pages. See
[First-stage content and publishing decisions](first-stage-decisions.md) for
the defaults and questions intentionally deferred to reduce owner workload.

## P0: Public Integrity

### Review Current Public Content

- Review the first-stage English and French narrative and value definitions
  before public deployment.
- Confirm organization-specific facts, names, contact details, social links,
  and calls to action before those details are published or activated.
- Separate current services from future ideas. Do not publish a Zoom link,
  event, service, partner, outcome, or operating schedule until the organization
  has approved the claim and the maintenance owner is clear.
- Review the concise privacy and accessibility summaries with the
  organization's responsible person. Provider, hosting, and formal policy
  details are deliberately not asserted until confirmed.

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

### Accessibility Remediation

- Add focused browser/DOM validation for policy markup and the remaining
  heading-order, landmark, visible-focus, contrast, zoom, reduced-motion, and
  screen-reader checks in both languages.
- Verify heading order, landmarks, link names, visible focus, contrast, zoom,
  reduced motion, carousel controls, and screen-reader announcements in both
  languages.

### Routing, SEO, And Deployment

- Decide whether the final public URL is GitHub Pages, a custom domain, or
  another host. Preserve the `/spectrum-of-strengths` base path until that is
  decided.
- Keep the translated title and page description aligned with each route.
- Add canonical URL and Open Graph/Twitter metadata once the public domain is
  known; confirm the favicon and 404 experience on the final host.
- Test refresh and direct navigation for every English and French route on the
  actual host.
- Add a deployment preview path for content changes before publishing them.
- Keep secrets and provider configuration out of the client bundle. Public CMS
  read identifiers may be exposed only when the chosen provider explicitly
  supports that model.

### Test Coverage

- Keep the existing route/language and translation-key checks current as routes
  or locale structure changes.
- Add an archive-rendering check when the first journal entries are added.
- Keep browser coverage aligned with the development states and any future
  submission workflows.
- Add browser coverage for carousel pause, manual navigation, reduced-motion
  layout, and automatic-rotation pause on focus and hover.
- Add an accessibility check to the browser test path.
- Add a production build smoke test that verifies generated asset paths under
  the configured base path.

## P2: Polish And Operations

- Add annotated screenshots to the [content update guide](content-update-guide.md)
  if they would help onboard a nontechnical maintainer.
- Refresh the desktop and mobile visual baselines after the first-stage header
  and footer changes are reviewed.
- Add image sizing/compression rules and a small media inventory.
- Decide whether analytics are needed. If they are, use a privacy-respecting
  provider and document consent requirements before adding tracking.
- Add a custom domain only after email, privacy, and deployment ownership are
  settled.
- Add a content review cadence and an owner for stale events, external links,
  policies, and contact information.

## Completed In This Pass

- Replaced placeholder Home and About copy with the first-stage identity,
  foundations, and four-value framework supplied by the organization owner.
- Added an Archive & journal landing page and bilingual plain-language key
  terms without inventing archive entries, dates, contributors, or outcomes.
- Made the archive ready for paired English/French entries with publication
  and source timestamps, status, category, summary, and optional public source
  context or link. It remains empty until approved content is available.
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
  controls, and reduced-motion layout; the full statement still needs review.
- Simplified the archive update handoff so an owner can provide rough notes,
  source timing, and sharing status while the maintainer handles editorial
  fields and translation.
- Added a technical content update guide for the locale files, local preview,
  quality checks, deployment limits, and rollback.
- Added screen-reader descriptions for the visible Events and Contact
  development statuses in both copies of the navigation.
- Removed simulated contact/newsletter success states and corrected malformed
  policy markup without adding external integrations.

## Suggested Order

1. Review the first-stage English/French copy and the concise privacy and
   accessibility summaries.
2. Confirm ownership of the public domain and host before adding deployment-
   specific metadata or provider details.
3. Use the [archive entry workflow](archive-entry-workflow.md) to prepare the
   first bilingual entry once its source, dates, and sharing permissions are
   known.
4. Revisit a CMS only if nontechnical self-editing is a real need. Do not add
   signup, contact, payment, or event providers before their workflows and
   privacy wording are approved.
5. Complete focused accessibility, route, SEO, and browser review before public
   launch.
