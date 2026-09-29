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

## Keep a private source register

The maintainer keeps a small register alongside the organization's secure
originals, outside this repository. One row per source is enough:

| Field | What to record privately |
| --- | --- |
| Source reference | A stable internal label and where the original is stored. Never put a private storage path, correspondence ID, or access link in the public entry. |
| Source timing | The date or timestamp shown by the original, including its time zone when available; leave unknown values blank. |
| Provenance | Who supplied it and whether it is a public record, private correspondence, or a contributor account. |
| Sharing permission | What may be summarized, quoted, named, or shown as an image, who granted permission, and when. Record restrictions as well as approvals. |
| Public use | The approved public citation or context and the stable IDs of entries based on this source. |
| Preservation | Where a backed-up copy is held and who can access it. Keep the backup separate from the published site. |

This is a private working register, not a request for the owner to fill in a
spreadsheet. The owner can still send rough notes or a link; the maintainer
records the details that are actually known and asks only about missing facts
or permissions needed for a proposed public claim.

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
  YYYY-MM-DD if the source gives only a date. The site displays date-only
  sources in the visitor's selected language and preserves full timestamp
  text, including its time-zone offset.
- category: heritage, research, experience, gaps, or progress.
- status: planned, inProgress, or confirmed.
- title and summary: the approved English or French copy for that locale. The
  summary appears on Home, in the archive list, and at the start of the entry.
- body: optional array of plain-text paragraphs for a fuller record. It appears
  only on the entry's own page; provide a corresponding body in both languages
  or omit it in both. Keep source claims supported and do not add HTML.
- need, proposedResponse, and potentialValue: optional paired statements for a
  specific documented case. Supply all three in both languages or omit all
  three; do not fill a missing field with a guess.
- sourceContext: optional approved public context or citation. Omit it when
  the source is private or no safe public context is available.
- sourceUrl: optional HTTPS link to a public source. Never link to private
  correspondence or a file that requires access to an internal account. Use
  the corresponding English or French public source URL in each locale when
  the publisher provides both; the URLs need not be identical.

The site sorts entries by publication date, newest first, then by stable ID
when multiple entries share a date. Home uses the first entry in that order.
Each approved entry also receives an English URL under `/archive/<id>/` and a
French URL under `/fr/archives/<id>/`. Keep the ID stable after publication so
shared links continue to work. The entry title and summary supply the page's
initial HTML and social metadata in each language.

The handoff template is an editorial aid, not a website form or publishing
system. The site has a published opening entry, but no CMS, scheduling, or
submission workflow.

## Correcting a published entry

1. Check the original source and decide whether the change is a typo, a
   clearer translation, or a correction that changes the meaning of a public
   claim. Ask the owner or contributor only if the underlying fact or sharing
   permission is uncertain.
2. Update English and French together. Preserve the entry ID and original
   publication date so existing links and the chronology remain accurate.
3. For a material factual correction, add a dated, plain-language correction
   note in both versions of the entry explaining what changed. If the current
   entry structure cannot display that note clearly, add the display field
   before publishing the correction. Do not silently replace a material
   claim or pretend the correction was part of the original publication.
4. Keep the original source and private verification notes outside the
   repository. Git history records the site edit but does not replace a
   visitor-facing correction note.
5. Review the paired pages and their summaries, then publish through the
   normal deployment path. Update or remove related claims elsewhere on the
   site at the same time.
