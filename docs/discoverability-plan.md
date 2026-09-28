# Discoverability plan for the bilingual archive

At planning time, the GitHub Pages site used fragment routes such as `#/archive`
and `#/fr/archives`. Those routes shared the same server response. [Google Search Central
recommends URL paths instead of fragments for distinct page
content](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#use-the-history-api-instead-of-fragments).
This was a discoverability risk as the archive grew, not evidence that the
site was absent from search results.

## Implemented 2026-09-28

The published site now uses direct English and French paths for all 16 public
routes. The build generates a separate initial HTML file for each route with
its page language, translated title and description, canonical URL, social
metadata, and English/French alternates. It also generates a sitemap containing
those canonical routes. Existing fragment bookmarks redirect to the matching
path, and unknown server paths keep the bilingual static 404 response.

The route checks, external-link monitor, Lighthouse URLs, and maintainer guides
now use direct paths. Quality, browser, and Lighthouse CI passed for the final
route commit. Live direct English and French paths, the sitemap, and GitHub
Pages publication were checked after deployment.

Individual archive entries still share the archive page URL. Give approved
entries their own paths when there are enough entries to make individual
discovery useful.

## Original target

Keep the current GitHub Pages address and bilingual content workflow. Give
each public page a stable path, including `/spectrum-of-strengths/archive/`
and `/spectrum-of-strengths/fr/archives/`. Keep the English home page at
`/spectrum-of-strengths/` and the French home page at
`/spectrum-of-strengths/fr/`. The owner does not need to choose a domain,
CMS, or search provider for this work.

## Original implementation sequence

1. Change the React router to use the History API with
   `/spectrum-of-strengths` as its basename. Keep the existing English and
   French route names and language-switch mappings.
2. Generate an `index.html` in the production output for each published route.
   Each file should load the same app bundle but have its own language,
   translated title and description, canonical URL, and social-preview title,
   description, and URL. Generate these from the locale route/content data so
   the copies cannot drift. The root file remains the English home page.
3. Make direct navigation and refresh work on GitHub Pages by serving those
   route files at their paths. Keep the bilingual static 404 page for paths
   that are not published routes. Do not turn unknown paths into a successful
   home-page response.
4. Preserve existing `#/...` bookmarks by mapping known fragment routes to
   their new paths before the app mounts. Unknown fragment routes should reach
   the site's localized recovery page. Keep this compatibility step until old
   links are no longer in use.
5. Give each approved archive entry its own stable, shareable path when the
   journal has more entries. Derive its path from the existing stable entry ID,
   and publish entry-level metadata only from approved English/French copy.
   A source timestamp remains separate from the publication date.
6. After the path migration, generate a sitemap with only the canonical public
   paths, including English/French alternates. Update internal links,
   deployment documentation, the link monitor, and route checks together.

## Release checks

- Open every English and French path directly and refresh it on GitHub Pages.
- Confirm old fragment bookmarks still arrive at the matching content.
- Inspect each path's initial HTML for the correct title, language, canonical
  URL, and social metadata; do not rely only on JavaScript changes after load.
- Confirm unknown paths receive the static 404 response and language choices.
- Review keyboard navigation, language switching, mobile layout, and the
  archive's date/source distinction after the router change.

The route migration was a separate release from routine archive copy updates.
Individual archive entries should receive their own paths before treating them
as separately search-discoverable pages. [Google's JavaScript SEO guide](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
provides the rationale for paths, server responses, and initial metadata.
