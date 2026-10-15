# Website role and archive work list

Active workstream: clarify the relationship between the bilingual public-record
site and the newer Foundation site, then make the record useful. This is a
planning list, not authorization to publish private correspondence, claims
about named institutions, or a new relationship description.

Reviewed 2026-10-15: the [bilingual site](https://kommunarr.github.io/spectrum-of-strengths/),
the [Foundation site](https://spectrumofstrengthsfoundation.com/), this
repository's content and media inventory, and the
[vision roadmap](docs/vision-roadmap.md). The Foundation homepage was reviewed
as a statement made by that site; its organizational claims were not
independently verified.

## Findings that determine the order

1. The bilingual site has one published opening entry. Its archive currently
   describes the intended subjects more than it records the history and
   community work that the creator wants it to preserve. Additional entries
   are the largest content improvement, but require source material and
   sharing permission.
2. Both sites use the Spectrum of Strengths name and discuss mission and
   systems work. Neither homepage links to the other or explains their
   relationship. The bilingual site describes services and programs as future
   plans; the Foundation site describes an active Living Lab and public
   recognition. Those statements may concern different activities or stages,
   so the wording needs a focused owner review before we reconcile it.
3. The bilingual site's direct routes, French version, accessible carousel
   controls, reduced-motion layout, and development notices already serve
   clear purposes. The approved accessibility review found no actionable high
   or medium issue. A full redesign has no comparable evidence of benefit.
4. In the reviewed desktop capture, the Home hero occupies most of the first
   screen, while the value carousel and latest entry are farther down. Whether
   to change that hierarchy is a design choice best made after real records
   give visitors something concrete to follow.

“Objective” below means the benefit follows from an observable gap in clarity,
accuracy, or content. It does not mean the public wording is approved.
“Mixed” means a clear goal has several reasonable design solutions.
“Opinionated” means the change is mainly a visual or editorial preference.

## Ranked tasks

| Rank / ID | Improvement | Status | Prerequisites | Narrow path scope and execution | Acceptance conditions |
| --- | --- | --- | --- | --- | --- |
| 1 / SOS-001 | **Objective, high impact:** prepare the first own-history or community-work record from a safe source, with date, provenance, status, and permission. Use the [archive workflow](docs/archive-entry-workflow.md); a rough note or link is enough from the creator. | Parked: source material and sharing status needed. | None. | Draft outside public content; serial because facts and permissions govern copy. | A short English/French draft identifies what happened, what is planned, source timing, and what may be shared. Private originals remain outside Git. No public claim is added yet. |
| 2 / SOS-002 | **Objective, high impact:** make a two-site role and claim review packet. Propose a plain English/French sentence for this site's historical role, identify any current-state wording that may be stale, and ask only the minimum factual questions. | Ready. | None. | `docs/site-role-review.md`; serial editorial work. Do not reproduce private messages in the public repository. | Packet distinguishes observed website claims from verified facts, contains a neutral bilingual proposal, and presents at most three focused owner questions. |
| 3 / SOS-003 | **Objective, high impact:** confirm how the two sites may name and link to each other and which current activities are established. | Parked: creator decision. | SOS-002. | Decision recorded in `docs/site-role-review.md`; serial. | Owner confirms the relationship, preferred site names, public link wording, and any current-state corrections. A lack of reply is not approval. |
| 4 / SOS-004 | **Objective, high impact:** publish a modest bilingual role cue and link, then reconcile affected Home, Foundations, archive, metadata, and development wording. Preserve the historic record and current/future distinction. | Parked: public wording decision. | SOS-003. | `src/locales/`, relevant `src/views/`, route metadata generator if needed, focused browser coverage; serial because the pages and locale files overlap. | A visitor can understand this site's role and reach the other site; both languages identify an English-only destination if applicable. No unverified program, partnership, endorsement, or funding claim appears. Existing routes and accessibility remain sound. |
| 5 / SOS-005 | **Objective, high impact:** publish the first approved, source-backed entry about the organization's own history or community work. | Parked: approved SOS-001 draft. | SOS-001; SOS-003 if the entry describes the relationship between sites. | Paired `src/locales/` entries, archive documentation, focused route/browser coverage; serial with SOS-004 because they edit the same content files. | Both languages have one stable dated entry with an accurate status, appropriate source context, and a direct URL; publication and source dates are distinct. Owner reviews only facts and sharing permissions. |
| 6 / SOS-006 | **Objective, medium impact:** decide whether the already drafted [2024 federal autism-policy entry](docs/archive-candidates/2024-autism-strategy.md) fits this particular heritage archive. Publish it only if it does. | Parked: creator fit decision. | None; independent of the own-history record. | Existing candidate brief, then paired `src/locales/` entries and route checks if approved; serial with other locale edits. | The decision is recorded. If published, the entry describes the public policy document without implying organizational participation or endorsement. |
| 7 / SOS-007 | **Mixed, medium impact:** revisit Home and Archive hierarchy after at least two substantive entries exist. Make the dated record easier to find and reduce repeated abstract explanations where the real entries can do the work. | Deferred: content trigger. | SOS-005 or equivalent second substantive entry. | `src/views/Home/`, `src/views/Archive/`, both locales, visual/browser coverage; serial due shared page content. | Direct entry links stay visible and understandable on desktop and mobile; the page remains usable with reduced motion and without JavaScript. Compare a focused preview with the current layout before choosing a design. |
| 8 / SOS-008 | **Mixed, lower immediate impact:** add a short story path or related-entry links when at least three meaningful records connect history, need, response, or later progress. Add filters or search only if browsing becomes cumbersome. | Deferred: archive size and relationships trigger. | SOS-005 and additional approved records. | Archive data, views, route checks; serial. | Each connection is editorially defensible, all entries retain stable direct links, and visitors can still browse in date order. |
| 9 / SOS-009 | **Opinionated, lower immediate impact:** add real archival photographs, documents, or diagrams to make the history more tangible. | Deferred: approved assets and rights. | Source provenance, display permission, alt text, and agreed context. | `public/` or `src/assets/`, media inventory, responsive image styling; can run separately from editorial drafting only after assets are approved. | Every new image serves a documented story, has usage rights and suitable accessible text, and loads efficiently at mobile sizes. |
| 10 / SOS-010 | **Opinionated, lowest immediate impact:** adjust carousel pacing, placement, or visual style from creator and visitor feedback after the site has more real content. | Deferred: specific feedback. | SOS-007 or concrete feedback. | Home/Archive carousel views and CSS, accessibility/browser coverage; serial due shared interaction patterns. | Motion remains optional and controllable; keyboard focus, pointer hover, and reduced-motion behavior continue to follow the [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/). |

## Small decisions and parked choices

- Keep the current Git-backed bilingual workflow while one technical
  maintainer can publish updates. A CMS, contact form, registration, donation
  flow, analytics, or custom domain belongs to the existing
  [operational backlog](docs/remaining-work.md) and needs a real owner or use
  case before it enters this workstream.
- Keep the pause/resume control for automatic carousels. The W3C pattern calls
  for it, and the site already has a reduced-motion static view. A preference
  for smaller controls can be addressed within that requirement.
- Do not merge the two websites or redirect this site's address based only on
  shared branding. That is a separate strategic choice requiring an explicit
  decision about ownership, preservation, and the public record.
- Do not turn planned meetings, requested letters, possible grants, or named
  relationships into completed milestones. A later entry can describe the
  actual outcome after source and public-sharing review.

## Validation when executing the list

For public changes, review English and French together, verify source and
permission notes outside the repository, run the repository's required checks,
inspect desktop/mobile and keyboard behavior, and check the live direct routes
after an authorized deploy. Keep unrelated working-tree files out of commits.
For this planning phase, no public site files or deployment are changed.

Ready now: SOS-002. SOS-001 and SOS-006 are independent editorial tracks once
their source or fit decision arrives. SOS-004 and SOS-005 both edit locale
files, so complete them serially. Visual tasks remain conditional and do not
block factual work.
