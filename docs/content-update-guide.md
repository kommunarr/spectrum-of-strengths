# Routine content update guide

The site is a static React/Vite application. A technical maintainer updates
content in the repository; the organization owner does not need a CMS account
or to edit code. For an archive or journal update, start with the
[quick update handoff](archive-entry-workflow.md).

## Where content lives

- Main page copy, navigation labels, and translations are in
  `src/locales/en-ca/translation.json` and
  `src/locales/fr-ca/translation.json`. Keep the same keys in both files.
- Home content uses `common.homePage`; Foundations uses
  `common.foundationsPage`; archive content and entries use
  `common.archivePage`; and definitions use `common.glossaryPage`.
- Events and Contact are development notices. Do not add event details or
  working forms until the organization has confirmed the information,
  workflow, owner, and privacy wording.
- The existing Spectrum of Strengths logo is the only approved brand image in
  the site. Get permission, context, and useful alternative text before adding
  other images or partner marks. See the [media inventory](media-inventory.md)
  for current assets and image guidance.

Keep drafts, private correspondence, attachments, and personal information out
of the repository. Use the archive workflow's secure-source guidance when a
public summary is based on private records.

## Prepare and preview a copy change

1. Update the English and French strings together. Keep wording factual and
   consistent, and ask the organization owner only about a specific factual,
   permission, or organization-specific question.
2. Run `npm run check:translations` to check key parity and archive-entry
   metadata.
3. Run `npm run dev` and follow the local URL printed in the terminal. Review
   the page in both languages, including mobile-width layout and keyboard
   navigation.
4. Before handing off a code change, run `npm run check`. It runs lint,
   translation/content checks, the existing unit tests, a production build,
   and the built-asset path check.

The English and French routes are paired through the language switcher. Check
both versions before publishing; never rely on a missing translation silently
falling back to the other language.

## Publish and roll back

The quality workflow checks pushes to `main` and pull requests; it does not
publish the site. The first public address is the existing GitHub Pages URL at
`https://kommunarr.github.io/spectrum-of-strengths/`. Use the
[opening release guide](opening-release.md) for the temporary holding page,
owner preview, and full-site deployment. A maintainer needs authorized GitHub
access to run either deploy command.

Git history records each content change. If a published change needs to be
reversed, use a new revert commit for the change being corrected, review both
languages again, and publish through the approved deployment path. Do not
rewrite shared history to roll back public content.
