# Testing Strategy

The repository uses layered automated checks:

- `npm test` runs fast unit tests for route mapping and translation-key
  validation.
- `npm run test:browser` builds the production bundle, serves it under the
  configured `/spectrum-of-strengths/` base path, and exercises the site in
  Chromium.
- `npm run test:visual` compares screenshots of the shared shell at desktop
  and mobile sizes. Editorial page bodies are intentionally excluded.
- `npm run test:cross-browser` runs a small smoke suite in Chromium, Firefox,
  and WebKit.
- `npm run test:external-links` crawls rendered routes and checks HTTPS links.
  The scheduled workflow runs this separately from pull-request checks.
- `npm run test:lighthouse` audits representative production routes with
  Lighthouse directly. Accessibility and meta descriptions are required;
  performance, SEO, and best-practice budgets produce warnings.

The browser suite covers:

- English and French navigation and language switching;
- the absence of inactive newsletter/contact submission controls;
- responsive mobile-menu navigation, Escape dismissal, and focus return;
- mobile and narrow-viewport reflow checks across every published route;
- carousel pause on keyboard focus and pointer hover, manual navigation and
  announcements, and the reduced-motion static-card layout in both languages;
- semantic privacy/accessibility page sections and visible keyboard skip links
  with working focus movement in both languages;
- 200% text reflow across every route, plus keyboard menu activation;
- Chromium accessibility-tree names, descriptions, and carousel status
  exposure on English and French Home and Archive pages;
- the paired opening archive entry, hosting disclosure, and public URL metadata;
- localized recovery links for unknown hash routes and the bilingual static
  GitHub Pages 404 page;
- the Events and Contact in-development states; and
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
for matching, reversible English/French route pairs. It also checks archive
entry fields, matching entry IDs and shared metadata, valid dates, supported
categories/statuses, and valid HTTPS source URLs.

Browser checks use semantic roles and labels so they validate user-visible
behaviour rather than implementation-specific CSS selectors. Automated
accessibility checks catch common DOM and ARIA regressions, but they do not
replace keyboard, zoom, screen-reader, contrast, or user testing.

GitHub Actions installs Chromium and runs the browser suite on pushes to
`main` and pull requests. A separate cross-browser smoke job installs Firefox
and WebKit. Failed runs retain the Playwright HTML report for diagnosis.

Visual baselines can be refreshed intentionally with
`npm run test:visual:update`; review those changes as carefully as code.
The manual keyboard, zoom/reflow, and screen-reader checklist lives in
[accessibility-checklist.md](accessibility-checklist.md).

Lighthouse reports are also retained by the dedicated Lighthouse workflow.
