# Spectrum of Strengths

The code for the Spectrum of Strengths website.

## Project Documentation

- [Engineering guide](agents.md)
- [Remaining work](docs/remaining-work.md)
- [Vision-aligned work catalog](docs/vision-roadmap.md)
- [First-stage content and publishing decisions](docs/first-stage-decisions.md)
- [Archive and journal entry workflow](docs/archive-entry-workflow.md)
- [Bilingual archive discoverability plan](docs/discoverability-plan.md)
- [Routine content update guide](docs/content-update-guide.md)
- [Opening release guide](docs/opening-release.md)
- [Content management research and migration plan](docs/content-management.md)

## Setup

```bash
npm ci
npm run setup:hooks
npm run dev
```

Before committing, run `npm run check`. The repository also installs local
pre-commit and pre-push hooks through `npm run prepare` when dependencies are
installed. GitHub Actions runs the same checks for pushes and pull requests.

To run the production browser suite locally, install Chromium with
`npx playwright install chromium`, then run `npm run test:browser`. See the
[testing strategy](docs/testing.md) for the covered user flows and the limits
of automated accessibility checks.

Run `npm run test:lighthouse` with Chrome installed to audit the production
build. It saves HTML and JSON reports under `lighthouse-reports/`, requires an
accessibility score of at least 0.95 and a passing meta-description audit, and
warns when performance, best-practice, or SEO scores fall below their budgets.
The Lighthouse runner requires Node.js 22.19 or newer.

## Deferred Decisions

CMS, newsletter, and contact-provider choices are intentionally deferred. See
the [remaining work](docs/remaining-work.md) and [content management plan](docs/content-management.md)
before connecting any external service or publishing unapproved organization
content.

The [public GitHub Pages site](https://kommunarr.github.io/spectrum-of-strengths/)
serves the full bilingual first release, published on 2026-09-27. The
[opening release guide](docs/opening-release.md) records the launch.
`npm run deploy` publishes approved application updates and requires authorized
access to the `kommunarr/spectrum-of-strengths` repository.

The production build renders the English and French page content into each
direct route file and generates a `sitemap.xml` from the locale data. The site
then hydrates those pages for navigation and carousel controls. Pages remain
readable with JavaScript disabled; a small fallback stylesheet shows the full
value cards and mobile navigation in that case. Approved archive entries get
stable direct URLs from their IDs. Older `#/...` bookmarks continue to open
their matching pages. Keep the `/spectrum-of-strengths/` base path when
adding routes or updating deployment configuration.
