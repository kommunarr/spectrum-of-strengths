# Spectrum of Strengths

The code for the Spectrum of Strengths website.

## Project Documentation

- [Engineering guide](agents.md)
- [Remaining work](docs/remaining-work.md)
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

## Deferred Decisions

CMS, newsletter, and contact-provider choices are intentionally deferred. See
the [remaining work](docs/remaining-work.md) and [content management plan](docs/content-management.md)
before connecting any external service or publishing unapproved organization
content.
