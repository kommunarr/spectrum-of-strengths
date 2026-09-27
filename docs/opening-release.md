# Opening release guide

The public address is `https://kommunarr.github.io/spectrum-of-strengths/`.
It currently serves an older placeholder site. The organization owner chose
two publication steps: a short bilingual holding page, then the full site with
one opening journal entry after preview review.

## Temporary holding page

`holding/index.html` is self-contained and shows English and French together.
It states that the public home is being prepared. It has no forms, analytics,
donation link, join link, or launch date. The page is marked `noindex` while it
is temporary.

1. Open `holding/index.html` locally and review both language sections at
   desktop and mobile widths. Check the external GitHub Pages information link.
2. Commit the reviewed page and run `npm run deploy:holding` using authorized
   access to the existing GitHub Pages repository.
3. Open the public address and confirm the older placeholder copy and controls
   have been replaced. Check that both languages and the privacy note appear.

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
- This workspace cannot publish yet: GitHub write access is being arranged,
  and its system SSH configuration is rejected by OpenSSH. The older public
  site remains online until the holding page is successfully deployed.
