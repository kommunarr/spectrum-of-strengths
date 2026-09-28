# Discoverability plan for the bilingual archive

The current GitHub Pages site uses fragment routes such as `#/archive` and
`#/fr/archives`. The home page has a public canonical URL and social metadata,
but fragment routes all share the same server response. [Google Search Central
recommends URL paths instead of fragments for distinct page
content](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#use-the-history-api-instead-of-fragments).
This is a discoverability risk as the archive grows, not evidence that the
current site is absent from search results.

## Target

Keep the current GitHub Pages address and bilingual content workflow. Give
each public page a stable path, including `/spectrum-of-strengths/archive/`
and `/spectrum-of-strengths/fr/archives/`. Keep the English home page at
`/spectrum-of-strengths/` and the French home page at
`/spectrum-of-strengths/fr/`. The owner does not need to choose a domain,
CMS, or search provider for this work.

## Implementation sequence

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

The route migration is a separate release from routine archive copy updates.
It should be completed before treating individual archive entries as
search-discoverable pages. [Google's JavaScript SEO guide](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
provides the rationale for paths, server responses, and initial metadata.
