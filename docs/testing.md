# Testing Strategy

The repository uses two layers of automated checks:

- `npm test` runs fast unit tests for route mapping and translation-key
  validation.
- `npm run test:browser` builds the production bundle, serves it under the
  configured `/spectrum-of-strengths/` base path, and exercises the site in
  Chromium.

The browser suite covers:

- English and French navigation and language switching;
- newsletter dialog dismissal and focus return;
- the contact form's honest disconnected state; and
- automated axe-core accessibility checks on representative English and
  French routes.

Browser checks use semantic roles and labels so they validate user-visible
behaviour rather than implementation-specific CSS selectors. Automated
accessibility checks catch common DOM and ARIA regressions, but they do not
replace keyboard, zoom, screen-reader, contrast, or user testing.

GitHub Actions installs Chromium and runs the browser suite on pushes to
`main` and pull requests. Failed runs retain the Playwright HTML report for
diagnosis.
