# Opening release guide

The public address is `https://kommunarr.github.io/spectrum-of-strengths/`.
It currently serves the bilingual holding page. The organization owner chose
two publication steps: that short holding page, then the full site with one
opening journal entry after preview review.

## Temporary holding page

`holding/index.html` is self-contained and shows English and French together.
It states that the public home is being prepared. It has no forms, analytics,
donation link, join link, or launch date. The page is marked `noindex` while it
is temporary.

For later holding-page changes, review `holding/index.html` in both languages
at desktop and mobile widths, run `npm run deploy:holding` with authorized
GitHub access, and confirm the public address shows both languages and the
privacy note.

The deployment command updates the published `gh-pages` branch. A push to
`main` alone does not publish the site.

## Full first release

- Add one English/French archive entry announcing that Spectrum of Strengths
  has opened its public record. It speaks for the organization, without naming
  a founder or partner. The archive, living lab, practical responses, and
  future community centres are stated as intentions, not operating services.
- Use the `progress` category and `confirmed` status for the public opening.
  Set `publicationDate` to the date the full site actually goes live. Omit
  `sourceDateTime` because there is no separate dated source record.
- Update the privacy summary for GitHub Pages hosting and review the
  accessibility summary against completed checks. Keep English and French
  paired. Do not activate contact, event registration, newsletters, payments,
  analytics, social links, or partner claims.
- Add generic canonical and social metadata for the GitHub Pages project URL.
  The hash router continues to supply localized page titles and descriptions
  inside the browser. No social-card image is approved yet.

The maintainer prepares the full bilingual preview and a short owner review
of the opening entry and privacy/accessibility wording. The owner confirms
those factual statements before the full release is published. The maintainer
checks the local production build, browser routes, accessibility, and both
language versions, then runs `npm run deploy` with authorized GitHub access.
After deployment, confirm the public Home, Archive, Privacy, Accessibility,
and language-switch routes and remove the temporary `noindex` page from the
public site.

If publication happens on a later day than the preview, update both archive
entry dates to that actual publication day, rebuild, and review the rendered
dates before deploying.

## Current release status

- On 2026-09-26, the organization owner approved the opening entry and the
  factual privacy/accessibility summaries in the bilingual review packet.
- The holding page and full-site code are committed. Local project, browser,
  Lighthouse, and external-link checks passed. The owner review does not
  approve a provisional publication date as an actual release date.
- Keyboard focus order and accessible names were inspected in English and
  French. Reflow at a 640 px viewport was reviewed. An actual screen-reader
  pass and live-host checks remain before the full release.
- On 2026-09-26, the bilingual holding page replaced the older public site.
  The live HTML matches `holding/index.html`, shows both languages and the
  GitHub Pages privacy note, and has no old join or donation controls.
- On 2026-09-27, an additional keyboard review found and fixed a skip-link
  focus issue. Browser checks now exercise skip-link activation in both
  languages, mobile-menu Enter/Space/Escape behavior, and 200% text reflow
  across every route. The functional browser checks pass. The available
  environment has no screen reader, so the actual assistive-technology pass
  is still required before the full release. The opening entry retains its
  provisional date until the full site is published.
- Chromium accessibility-tree checks cover English and French Home and Archive:
  landmarks, named navigation, the development status on event links, manual
  carousel status announcements, quiet automatic rotation, and the static
  archive layout under reduced motion. These checks inspect what the browser
  exposes to assistive technology; they cannot confirm how a screen reader
  speaks it or how a person experiences the controls.

## September 2026 holding-page publication record

The source and dependency update was pushed to `main` at `89b9b4b`. The
approved holding page was pushed to `gh-pages` at `af2832e`. Its eight older
deployment commits now have descriptive messages in place of “Updates”; their
file trees were preserved. The holding-page tip contains only `index.html`
and `.nojekyll`. The full site remains unpublished until the remaining
accessibility review is complete and the opening entry's publication date is
set to the actual full-site release day.
