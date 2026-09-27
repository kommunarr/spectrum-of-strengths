# Spectrum of Strengths

The code for the Spectrum of Strengths website.

## Project Documentation

- [Engineering guide](agents.md)
- [Remaining work](docs/remaining-work.md)
- [First-stage content and publishing decisions](docs/first-stage-decisions.md)
- [Archive and journal entry workflow](docs/archive-entry-workflow.md)
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

The current GitHub Pages address serves an older placeholder site. The
[opening release guide](docs/opening-release.md) describes the bilingual
holding page and the reviewed first release. `npm run deploy:holding` publishes
the temporary page; `npm run deploy` publishes the full application. Both
commands require authorized access to the `kommunarr/spectrum-of-strengths`
GitHub Pages repository.
