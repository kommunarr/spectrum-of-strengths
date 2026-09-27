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
- Place a documented need beside a proposed product or change and the social
  and economic value it might create; celebrate strengths as well as gaps.
- Focus on establishing relationships and due process in Canada before
  describing possible cross-border work as operational.
- Explain heritage and value language in plain English and French.
- Keep events, contact, volunteering, donations, and other operational
  features out of the first stage.
- Let visitors absorb information at a calm pace without relying on repeated
  clicking, and show that professional relationships take time to develop.

## Defaults used in the first-stage site

- Keep the current static Vite site and bilingual route structure. The first
  release does not add a CMS, a new account, or a third-party publishing
  service.
- Use Home, Foundations, Archive & journal, and Key terms as the main content
  areas. Keep Events and Contact available as clearly marked development
  pages; they do not advertise active events or accept messages.
- Present the four value ideas on Home and the five archive themes in separate
  slow carousels that change about every 28 seconds, with pause, previous, and
  next controls. Stop automatic rotation when a carousel receives keyboard
  focus or pointer hover. Honor reduced-motion preferences by showing each set
  together as a static card grid. Each page has only one rotating region.
- Describe relationship building as an intention and gradual process. Do not
  name national bodies, imply endorsement, or describe joint work as confirmed
  until the organization has approved details for public sharing.
- Keep the owner's specific claims about a Public Health Agency of Canada
  review, relationships with US organizations, and delays involving offices
  out of public copy until the underlying records, wording, and permission to
  identify others have been confirmed. The owner need only review a focused
  draft when one of those claims is ready to publish.
- Keep the existing brand logo and do not add unapproved photos or partner
  marks. Do not surface external social links until their current status is
  confirmed.
- Do not show newsletter, donation, join-us, or unconfirmed social calls to
  action. No form, registration, or payment flow is part of this release.
- Do not invent contributors, organizational history, services, outcomes, or
  partners. The first archive entry announces the opening of the public
  record and describes future work as intentions. Its publication date is the
  actual release day; no earlier source timestamp was invented.
- Use the [archive entry workflow](archive-entry-workflow.md) when preparing
  updates. It separates source dates from publication dates and defaults to
  summaries and source references for private correspondence; publish excerpts
  only when they are approved for sharing.
- Keep English and French page copy paired. French wording is prepared with
  the English copy, so the owner does not need to supply a translation. Ask for
  review only when a name, specialized term, personal account, or formal policy
  needs organizational confirmation.
- Let a technical maintainer handle routine text and layout changes. Use the
  repository history for rollback. The owner reviewed a short bilingual
  preview of the first full release. Do not add scheduling, editor roles, or a
  separate approval system until publishing frequency makes them useful.
- Keep owner review focused on factual claims, contributor consent, private
  records, and policy wording. The owner does not need to choose page layout,
  routine labels, or technical implementation details.

## Deferred questions and low-effort defaults

| Question to revisit | Default until it matters |
| --- | --- |
| Who edits the site? | A technical maintainer edits the existing locale files; no CMS account is needed yet. |
| Is a second approver required? | No separate approval step for routine copy. Confirm factual claims, names, permissions, and policies with the owner or source contributor. |
| Are previews, scheduling, and rollback needed? | Show the owner a short first-release preview, publish manually, use Git history for rollback, and skip scheduling. |
| Who reviews French? | Prepare both languages together in plain Canadian French; request owner or specialist review only for organization-specific language and formal policy. |
| Should both languages publish together? | Yes. Keep paired English/French content and do not silently fall back to the other language. |
| How are images managed? | Use the existing logo only. Add other images after rights, context, and alt text are known. |
| Should there be events, contact forms, registration, or a newsletter? | Keep these inactive until the organization has an owner, a real destination/provider, and approved privacy wording. |
| Should analytics be added? | No tracking by default. Revisit only if a concrete decision depends on usage data. |
| What happens to correspondence and personal stories? | Publish dated summaries and source context by default; require permission and redaction before publishing excerpts or identifiable stories. |
| Which domain and host are first? | Use the current GitHub Pages project URL and `/spectrum-of-strengths` base path. A custom domain can come later. |

## Owner notes awaiting source material

The maintainer can draft and translate these items when a source is available.
The owner need only supply a rough note, public link, or safe reference to a
private record, then confirm the specific wording proposed for publication.

| Item | Minimum needed before a public claim |
| --- | --- |
| Historical archive material | A record or public source, its date if known, and whether it may be shared. |
| Public Health Agency of Canada review | The exact record and wording that supports the review and “ambitious” description, plus permission to identify the agency in context. |
| US organizational relationships | Approved names and a description of the present relationship that each organization may be named in. |
| Correspondence about delays | Source dates and a factual timeline; review of any proposed attribution or institutional criticism before publication. The full private messages remain outside the repository. |

## Opening release decision

The existing GitHub Pages URL served a bilingual holding page with no forms or
donation/join links before the full first release on 2026-09-27. That release
includes one opening entry written in the organization's voice. It describes
the archive, evidence-led living lab, practical responses, and future community
centres as plans,
without naming a founder or partner or implying those services are operating.
The owner approved the entry and factual privacy/accessibility excerpts on
2026-09-26. The maintainer handles translation and implementation.

## Focused owner review for future public claims

For future public claims, prepare a short review summary covering only the
points that need the owner's knowledge:

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
