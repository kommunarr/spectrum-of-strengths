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
- A specific archive case can show the documented need, proposed response,
  and potential shared value together. The [archive entry workflow](archive-entry-workflow.md)
  explains when to include those optional fields.
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

## Review cadence

The technical maintainer owns routine site review until the organization names
a different maintainer. Review the public site every three months and before
each new archive entry. Check that current and planned activities are described
accurately, both languages agree, external links still work, and the privacy
and accessibility summaries match the site's actual behavior. Remove or update
any time-sensitive information that has become stale. The weekly external-link
workflow is a prompt to investigate failures, not a substitute for this review.

Ask the owner only when a factual claim, relationship, permission, contributor
story, or operational status needs confirmation. Events and Contact remain
development notices until the organization assigns an owner and approves real
workflows. No analytics or custom domain is needed for this first release.

## Publish and roll back

The quality workflow checks pushes to `main` and pull requests; it does not
publish the site. The public address is the existing GitHub Pages URL at
`https://kommunarr.github.io/spectrum-of-strengths/`. Use `npm run deploy` to
publish an approved site update, then check the live English and French routes
that changed. The [opening release guide](opening-release.md) records the
holding-page stage and full-site launch. Deployment requires authorized GitHub
access.

Git history records each content change. If a published change needs to be
reversed, use a new revert commit for the change being corrected, review both
languages again, and publish through the approved deployment path. Do not
rewrite shared history to roll back public content.
