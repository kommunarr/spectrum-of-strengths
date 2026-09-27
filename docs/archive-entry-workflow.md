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
- A timestamp can show when a record existed or a communication was sent. It
  does not by itself establish why a delay occurred, who caused it, or that a
  proposed response will work. Keep those claims tied to their own evidence.
- Cite public sources directly. For private correspondence, retain it outside
  the public site and keep its private reference label outside the repository.
  Publish a summary; quote or identify people only after sharing permission is
  confirmed.
- The technical maintainer prepares the English and French versions together.
  Keep the item as a draft if a fact, permission, or source date still needs
  confirmation.
- The technical maintainer handles categories, formatting, translation, and
  adding the entry. Ask the organization owner only to confirm factual claims,
  names, permissions, or organization-specific wording.

## Quick update handoff

Rough notes, voice-to-text, or a link are enough. The organization owner does
not need to choose a category, write a title or public summary, translate the
copy, or set a publication date.

```text
What happened? (rough notes are fine):
When? (source date/time; time zone if shown; leave blank if unknown):
Source? (public link or type of record):
Sharing status? (already public | permission confirmed | ask me | unsure):
Names, quotes, or personal details approved? (yes | no | unsure | not applicable):
Anything to keep private or explain:
```

Do not put private correspondence, attachments, personal details, or private
reference labels in the repository. Keep original records in the
organization's normal secure storage. For a private source, share only the
minimum source detail the maintainer needs to verify the date and facts.

## Maintainer prepares the entry

The maintainer assigns the category and status, creates a short title and
public summary, records the publication date when the item is published, and
prepares matching English and French copy. Use the source to distinguish a
plan, work underway, and a confirmed milestone. If one of those choices or a
public-sharing permission is unclear, keep the item unpublished and ask one
focused question. The owner reviews specific facts, names, permissions, and
organization-specific language rather than routine editorial fields.

For an entry about a social need and possible product or change, the maintainer
may also prepare three short statements together: the documented need, a
proposed response, and its potential social and economic value. Describe a
response as proposed until it exists, and a return as potential until it is
measured. Leave this trio out when the source does not support all three. The
opening announcement has no specific case to describe, so it does not use
these fields.

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
- need, proposedResponse, and potentialValue: optional paired statements for a
  specific documented case. Supply all three in both languages or omit all
  three; do not fill a missing field with a guess.
- sourceContext: optional approved public context or citation. Omit it when
  the source is private or no safe public context is available.
- sourceUrl: optional HTTPS link to a public source. Never link to private
  correspondence or a file that requires access to an internal account.

The site sorts entries by publication date, newest first.

The handoff template is an editorial aid, not a website form or publishing
system. The site has a prepared opening entry, but no CMS, scheduling, or
submission workflow.
