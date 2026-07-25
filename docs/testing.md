# Testing Strategy

The repository uses two layers of automated checks:

- `npm test` runs fast unit tests for route mapping and translation-key
  validation.
- `npm run test:browser` builds the production bundle, serves it under the
  configured `/spectrum-of-strengths/` base path, and exercises the site in
  Chromium.
- `npm run test:lighthouse` audits representative production routes and
  enforces measurable quality budgets for accessibility, performance, SEO, and
  best practices.

The browser suite covers:

- English and French navigation and language switching;
- newsletter dialog dismissal and focus return;
- responsive mobile-menu navigation, Escape dismissal, and focus return;
- mobile-viewport overflow checks across every published route;
- the contact form's honest disconnected state; and
- automated axe-core accessibility checks on every published English and
  French route.

The published-route checks are generated from the English locale's
`otherLanguage` route map rather than a second hard-coded test list. Each route
is checked for a localized document language, a non-empty page heading, a
non-empty title, horizontal overflow, failed resources, console errors, broken
internal hash routes, unsafe external links, and axe violations. This keeps
the checks focused on page contracts while allowing CMS-managed copy and page
headings to change.

Translation validation discovers content namespaces automatically. The
`otherLanguage` namespace is treated as routing data and is checked separately
for matching, reversible English/French route pairs.

Browser checks use semantic roles and labels so they validate user-visible
behaviour rather than implementation-specific CSS selectors. Automated
accessibility checks catch common DOM and ARIA regressions, but they do not
replace keyboard, zoom, screen-reader, contrast, or user testing.

GitHub Actions installs Chromium and runs the browser suite on pushes to
`main` and pull requests. Failed runs retain the Playwright HTML report for
diagnosis.

Lighthouse reports are also retained by the dedicated Lighthouse workflow.
