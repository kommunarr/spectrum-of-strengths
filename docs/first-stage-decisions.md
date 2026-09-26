# First-stage content and publishing decisions

This note records the direction supplied by the organization owner and the
defaults used to move the first-stage site forward with little administrative
work. It is a working editorial brief, not approval of legal or policy claims.

## Direction from the organization owner

- Establish Spectrum of Strengths as a public record and brand grounded in
  heritage, history, tradition, dignity, and visionary leadership.
- Use “We are the Spectrum” and describe the work through value capture,
  transformation, creation, and preservation.
- Build toward a historical archive and living journal about systems, research,
  social need, lived experience, gaps, responses, and organizational progress.
- Explain heritage and value language in plain English and French.
- Keep events, contact, volunteering, donations, and other operational
  features out of the first stage.

## Defaults used in the first-stage site

- Keep the current static Vite site and bilingual route structure. The first
  release does not add a CMS, a new account, or a third-party publishing
  service.
- Use Home, Foundations, Archive & journal, and Key terms as the main content
  areas. Keep Events and Contact available as clearly marked development
  pages; they do not advertise active events or accept messages.
- Present the four value ideas in a slow carousel that changes about every 28
  seconds, with pause, previous, and next controls. Stop automatic rotation
  when the carousel receives keyboard focus or pointer hover. Honor
  reduced-motion preferences by showing all four ideas together as a static
  card grid.
- Keep the existing brand logo and do not add unapproved photos or partner
  marks. Do not surface external social links until their current status is
  confirmed.
- Do not show newsletter, donation, join-us, or unconfirmed social calls to
  action. No form, registration, or payment flow is part of this release.
- Do not invent contributors, organizational history, services, outcomes,
  partners, or archive entries. The archive starts with its scope and an honest
  empty state; no dates are backfilled.
- Use the [archive entry workflow](archive-entry-workflow.md) when preparing
  updates. It separates source dates from publication dates and defaults to
  summaries and source references for private correspondence; publish excerpts
  only when they are approved for sharing.
- Keep English and French page copy paired. French wording is prepared with
  the English copy, so the owner does not need to supply a translation. Ask for
  review only when a name, specialized term, personal account, or formal policy
  needs organizational confirmation.
- Let a technical maintainer handle routine text and layout changes. Use the
  repository history for rollback. Do not add scheduling, editor roles, or a
  separate approval system until publishing frequency makes them useful.
- Keep owner review focused on factual claims, contributor consent, private
  records, and policy wording. The owner does not need to choose page layout,
  routine labels, or technical implementation details.

## Deferred questions and low-effort defaults

| Question to revisit | Default until it matters |
| --- | --- |
| Who edits the site? | A technical maintainer edits the existing locale files; no CMS account is needed yet. |
| Is a second approver required? | No separate approval step for routine copy. Confirm factual claims, names, permissions, and policies with the owner or source contributor. |
| Are previews, scheduling, and rollback needed? | Use the current build/review workflow and Git history; publish manually and skip scheduling. |
| Who reviews French? | Prepare both languages together in plain Canadian French; request owner or specialist review only for organization-specific language and formal policy. |
| Should both languages publish together? | Yes. Keep paired English/French content and do not silently fall back to the other language. |
| How are images managed? | Use the existing logo only. Add other images after rights, context, and alt text are known. |
| Should there be events, contact forms, registration, or a newsletter? | Keep these inactive until the organization has an owner, a real destination/provider, and approved privacy wording. |
| Should analytics be added? | No tracking by default. Revisit only if a concrete decision depends on usage data. |
| What happens to correspondence and personal stories? | Publish dated summaries and source context by default; require permission and redaction before publishing excerpts or identifiable stories. |
| Which domain and host are final? | Keep the current configured base path and translated page descriptions; defer canonical and social-card metadata until deployment ownership is confirmed. |

## Focused owner review before public launch

Before public launch, prepare a short review summary covering only the points
that need the owner's knowledge:

- Does the organization description, slogan, and audience reflect the intended
  identity?
- Do the four value definitions and key heritage terms preserve their intended
  meaning?
- Are any factual claims, names, permissions, or policy statements incorrect?
- Do the privacy and accessibility summaries accurately describe the site's
  current behavior?

The technical maintainer handles routine bilingual proofing, labels, and layout.
The owner can provide corrections in plain notes; they do not need to rewrite
the copy or translate it. Later updates should require owner input only for the
specific deferred items above that become active.
