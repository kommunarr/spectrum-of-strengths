# Archive and journal entry workflow

Use this short workflow when preparing a history, research, lived-experience,
gap, or progress update for the public archive. Entries are not submitted
through the website. A technical maintainer adds approved entries to the
English and French archivePage.entries arrays in the locale files.

## Defaults

- Keep the original record and the public summary separate. Do not add private
  correspondence, unpublished attachments, or personal information to the
  repository.
- Record the date and time shown by the source, including its time zone when
  available. For a source timestamp, use ISO 8601 with a time-zone offset. If
  only the date is known, use YYYY-MM-DD. Never guess or backfill a time.
- Distinguish a plan from work underway and from a completed, source-backed
  milestone. Use neutral, factual wording for institutional gaps and delays.
- Cite public sources directly. For private correspondence, retain it outside
  the public site and keep its private reference label outside the repository.
  Publish a summary; quote or identify people only after sharing permission is
  confirmed.
- Prepare English and French together. Keep the item as a draft if a fact,
  translation, permission, or source date still needs confirmation.
- The technical maintainer handles categories, formatting, translation, and
  adding the approved entry. Ask the organization owner only to confirm factual
  claims, names, permissions, or organization-specific wording.

## Copyable draft

```text
Working title (English):
Working title (French):

Category: heritage and systems | research and evidence | lived experience |
          gaps and responses | plans and progress
Status: planned | in progress | confirmed

Source date and time, as recorded:
Time zone, if known:
Public publication date: [maintainer fills in when publishing]

Public summary (English):
Public summary (French):

Public source context or citation (optional; no private reference):
Public source URL (optional; must not lead to a private record):
Sharing permission confirmed: yes | not applicable | no
Names and identifying details approved for publication: yes | no

Next step (optional, and only if actually planned):
```

## Before publishing

1. Confirm that the source supports each public statement and that the status
   label describes what has actually happened.
2. Remove email addresses, phone numbers, personal identifiers, and private
   attachments unless the organization has explicitly approved their release.
3. Confirm permission before publishing a quotation, identifiable story, or
   person's name. If permission is unclear, publish no quote or name.
4. Confirm that the English and French summaries say the same thing.
5. Add the entry to both archivePage.entries arrays in one change. Use the
   same id, category, status, publicationDate, and sourceDateTime in both
   languages; translate the title, summary, and public source context. Keep
   the publication date distinct from the source date.

Each published entry has these fields:

- id: a stable lowercase slug.
- publicationDate: an ISO date in YYYY-MM-DD format.
- sourceDateTime: an optional ISO 8601 timestamp with a time-zone offset. Use
  YYYY-MM-DD if the source gives only a date.
- category: heritage, research, experience, gaps, or progress.
- status: planned, inProgress, or confirmed.
- title and summary: the approved English or French copy for that locale.
- sourceContext: optional approved public context or citation. Omit it when
  the source is private or no safe public context is available.
- sourceUrl: optional HTTPS link to a public source. Never link to private
  correspondence or a file that requires access to an internal account.

The site sorts entries by publication date, newest first.

The draft template is an editorial aid, not a website form or publishing
system. The site currently has no archive entries, CMS, scheduling, or
submission workflow.
