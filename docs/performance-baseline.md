# Performance lab baseline

Measured 2026-10-16 against the local production build from commit `5ab9403`.
Lighthouse 13.5.0 ran in Chrome for Testing 153 through the repository's
`test:lighthouse` and `test:lighthouse:mobile` commands. Both use Lighthouse's
standard desktop or mobile configuration. These are **single-run lab results**,
not field Core Web Vitals or a guarantee of what visitors experience.

| Route | Profile | Performance | Accessibility | Best practices | SEO | LCP | Total blocking time | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home, English | Desktop | 100 | 100 | 100 | 100 | 0.369 s | 0 ms | 0 |
| Events, English | Desktop | 100 | 100 | 100 | 100 | 0.364 s | 0 ms | 0 |
| Home, French | Desktop | 100 | 100 | 100 | 100 | 0.366 s | 0 ms | 0 |
| Events, French | Desktop | 100 | 100 | 100 | 100 | 0.363 s | 0 ms | 0 |
| Home, English | Mobile | 99 | 100 | 100 | 100 | 1.658 s | 40 ms | < 0.001 |
| Events, English | Mobile | 99 | 100 | 100 | 100 | 1.655 s | 9 ms | 0 |
| Home, French | Mobile | 99 | 100 | 100 | 100 | 1.658 s | 18 ms | < 0.001 |
| Events, French | Mobile | 99 | 100 | 100 | 100 | 1.655 s | 13 ms | < 0.001 |

The production JavaScript bundle was 408.62 kB before compression, or about
131.52 kB gzip. Lighthouse estimated 54–56 KiB of unused JavaScript on these
pages. This is a potential code-splitting opportunity, but the measured scores
and blocking times do not justify changing the site's hydration and route
loading solely for that estimate. Revisit it if later content or interactions
cause a reproducible slowdown.

The original desktop runner set a desktop score profile but inherited mobile
throttling and a mobile user agent. Its earlier scores were discarded. The
runner now uses Lighthouse's desktop configuration explicitly and offers a
separate mobile command; reports use distinct filenames under the ignored
`lighthouse-reports/` directory.

To repeat the lab check with Playwright Chromium installed:

```bash
npm run test:lighthouse
npm run test:lighthouse:mobile
```

Scores can vary between runs and machines. Compare the same route and profile
under similar conditions, and use real-user data if the site ever has enough
traffic to support that analysis. Automated accessibility scores do not replace
manual accessibility review. See the [Lighthouse emulation guide](https://github.com/GoogleChrome/lighthouse/blob/main/docs/emulation.md)
for the profiles and [web.dev's lab versus field explanation](https://web.dev/articles/lab-and-field-data-differences)
for the measurement limit.
