# Engineering case study

## Project and constraints

Spectrum of Strengths needed a calm English/French site to introduce its
heritage, systems thinking, and developing public record. The first stage had
one approved opening entry and no active event registration, contact intake,
donation flow, or community-centre program through this site. The site therefore
had to present a clear direction without implying those functions already
existed. Its two language versions also needed stable URLs that could be shared
and revisited.

The project runs on GitHub Pages, with React, TypeScript, Vite, and
`react-i18next`. The public site has no application server or content API.
Editors currently make reviewed changes in the repository; a future CMS is a
separate decision.

## Design and engineering choices

| Need | Implemented choice | Evidence |
| --- | --- | --- |
| Read each language directly | Generate HTML for every English and French route, with localized initial content, title, description, canonical URL, and alternate-language metadata. Preserve older fragment bookmarks. | [Route generator](../scripts/generate-route-pages.mjs), [route mapping](../src/utils/routeMapping.ts), [browser coverage](../tests/browser/site.spec.ts) |
| Keep the record readable and shareable | Render archive entries at stable bilingual paths and provide a sitemap. Main content is available before hydration and with JavaScript disabled. | [Archive routes](../src/utils/archiveEntryRoutes.ts), [route renderer](../scripts/render-route-content.mjs), [build output check](../scripts/check-build-output.mjs) |
| Support a calm, self-running introduction | Rotate four value ideas automatically, with small pause and direction controls. Stop rotation on focus or hover and show a static layout for reduced motion. | [Home implementation](../src/views/Home/Home.tsx), [browser and accessibility coverage](../tests/browser/site.spec.ts) |
| Avoid unsupported claims | Label events, contact, volunteering, and donations as later-stage work. Keep organizational claims in reviewed, dated copy rather than presenting plans as live services. | [Content decisions](first-stage-decisions.md), [opening release record](opening-release.md) |
| Make changes safe to publish | Check translation parity, routes, content fields, accessibility, responsive behavior, browser compatibility, and representative Lighthouse routes in CI. | [Testing strategy](testing.md), [quality workflow](../.github/workflows/quality.yml), [browser workflow](../.github/workflows/browser.yml), [Lighthouse workflow](../.github/workflows/lighthouse.yml) |

## Demonstrable result

The bilingual first release went live on **2026-09-27**. The current production
build generates **18 direct route pages** and a sitemap. The repository has
automated checks for all published routes in both languages, plus desktop and
mobile visual baselines. The owner reported completing a manual accessibility
review with no actionable high or medium findings before release. These are
release and test results, not a claim of formal accessibility certification or
measured community impact.

The [live site](https://kommunarr.github.io/spectrum-of-strengths/),
[desktop screenshot](screenshots/home-desktop.png), and
[French mobile screenshot](screenshots/home-mobile-fr.png) provide a quick visual
review. The [testing guide](testing.md) gives commands and describes what the
automated checks cannot establish.

## Current limits and next meaningful work

The archive has one opening entry. More historical or community records require
a shareable source and factual review; new organizational status claims require
confirmation. The site has no working form backend, publishing interface, or
visitor analytics. Those additions should follow an actual organizational need
and an owner for the resulting data and workflow.

Technical improvements that can proceed independently include periodically
repeating the [performance lab baseline](performance-baseline.md), comparing
mobile and desktop results, and addressing any reproducible regression. If the
archive grows, its browsing structure can be revisited using real entries
instead of placeholder content. A [two-minute walkthrough](demo-walkthrough.md)
shows the implemented experience without adding a self-promotional page to the
organization's website.
