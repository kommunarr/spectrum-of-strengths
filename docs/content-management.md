# Content Management And Translation Plan

Research snapshot: 2026-07-16.

## Requirements

The site needs more than a translation library. A sustainable handoff requires:

- a browser-based editor who does not need to edit React or JSON;
- structured fields for pages, events, links, media, and SEO metadata;
- English and French content that can be edited as related translations;
- a visible draft/review/publish workflow;
- previewing before publication;
- required-field and link validation;
- media alt text and ownership notes;
- role-based access and account ownership that can survive a handoff;
- rollback/history when a content change is wrong;
- a build or webhook path that updates the public site after publishing.

The current `react-i18next` setup is appropriate for UI labels and route
navigation. It is not, by itself, a content-management system. Long-form page
copy is currently split between JSX and locale JSON, which makes content
editing and translation review unnecessarily technical.

## Options Considered

### Decap CMS

[Decap's i18n support](https://decapcms.org/docs/i18n/) can expose related
locales side by side and persist content in multiple folders, multiple files,
or one file. Its [editorial workflow](https://decapcms.org/docs/editorial-workflows/)
can create draft branches and pull requests, and its
[deploy-preview support](https://decapcms.org/docs/deploy-preview-links/) can
show unpublished content when the hosting platform reports preview statuses.

Advantages:

- fits a Git-backed static site well;
- content remains in the repository and is easy to version and back up;
- no separate content database is required;
- structured collections can be designed around the site's page and event
  model.

Costs and risks:

- authentication is the hard part for a nontechnical editor;
- the GitHub backend usually needs an OAuth proxy and a GitHub account;
- Netlify's [Git Gateway is deprecated](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/),
  so it should not be selected for a new implementation;
- editors are still indirectly changing repository files, so the deployment
  and preview pipeline must be reliable;
- content and translation conventions need to be carefully modeled to avoid
  raw JSON/YAML complexity.

Decap is a strong choice if the project moves to a hosting/authentication setup
that supports its GitHub workflow and the maintainer is comfortable with a
review-oriented publishing process. It is not the lowest-friction choice for a
nontechnical person on a GitHub Pages-only deployment.

### Sanity

[Sanity Studio](https://www.sanity.io/docs/studio) is an open-source,
schema-driven editing environment that can be hosted by Sanity or deployed
separately. Sanity recommends the
[`@sanity/document-internationalization` plugin](https://www.sanity.io/docs/studio/localization)
for related translated documents and an internationalized-array approach for
translated fields. It also provides [roles](https://www.sanity.io/docs/content-lake/roles-concepts),
preview/visual editing, history, and [webhooks](https://www.sanity.io/docs/http-reference/webhooks)
for triggering a site rebuild.

Advantages:

- a nontechnical maintainer edits structured documents in a hosted Studio;
- pages, events, settings, and media can have explicit schemas;
- translations can be represented as related documents rather than hidden
  filename conventions;
- roles, history, preview, and webhooks support a real editorial workflow;
- the frontend can remain React/Vite, although it must consume published CMS
  content.

Costs and risks:

- requires a hosted project and a new account/ownership decision;
- requires replacing the current local translation/content approach with a
  data-fetching and build strategy;
- preview and draft content need a deliberate design so private draft data is
  never exposed in the public build;
- provider availability, quotas, and future pricing should be reviewed before
  committing the organization to it.

### Contentful

[Contentful content models](https://www.contentful.com/developers/docs/concepts/data-model/)
provide structured entries and assets, while its
[localization model](https://www.contentful.com/developers/docs/references/content-delivery-api/localization/)
supports locale-specific fields and fallback behavior. It also supports
editor roles and permissions, including content-type and environment controls
where the account plan allows them; see the
[roles documentation](https://www.contentful.com/help/roles/).

Advantages:

- mature hosted editorial UI for nontechnical maintainers;
- strong content modeling, media, locales, fallbacks, and permissions;
- a clean API boundary between the CMS and the Vite frontend;
- environments can support staging and production content workflows.

Costs and risks:

- the frontend still needs a CMS client, build/revalidation strategy, and
  preview design;
- the organization takes on a third-party platform dependency;
- advanced roles/environments may depend on plan level;
- it can be more platform than this small site needs.

## Recommendation

For the eventual handoff, use **Sanity or Contentful rather than a custom CMS**.
Sanity is the better first candidate when flexible schemas, related
translations, and preview workflows matter most. Contentful is the better
candidate if the maintainer values a more conventional hosted editorial
interface and the organization is comfortable with its platform model.

Keep Decap as the lower-cost alternative only if the project deliberately
stays Git-backed and can solve authentication, preview deployments, and
nontechnical access without relying on deprecated Git Gateway.

Do not implement all three. Build a small proof of concept with one approved
provider before migrating every page.

## Proposed Content Model

### Page

- stable slug and page type;
- English and French title, summary, and body;
- published/unpublished status;
- SEO title and description;
- optional hero image with alt text;
- translation group and translation status;
- last reviewed date and content owner.

### Event

- title and short description in both languages;
- start/end date and timezone;
- location or external URL;
- registration/contact instructions;
- status: draft, upcoming, past, or cancelled;
- optional image with alt text;
- translation readiness and last reviewed date.

### Site Settings

- organization display name;
- public contact email;
- social links;
- donation CTA visibility and destination;
- newsletter CTA visibility;
- privacy/accessibility contact details.

The React application should render these structures with reusable components.
The CMS should not expose arbitrary HTML to the editor when a constrained rich
text or block field can express the same content safely.

## Translation Workflow

1. An editor creates or updates the English source content.
2. The CMS marks the French translation as needing review.
3. A translator creates or updates the related French content.
4. The preview shows both language routes before publication.
5. Publishing is blocked or visibly warned when a required translation is
   missing or stale.
6. The published site never silently substitutes English for required French
   public content.

Machine translation may help produce a draft, but it should never be treated as
the final French copy without human review. Keep translation status in the
content model so the editor does not need to remember it informally.

## Newsletter And Contact Integrations

### Newsletter

Use a mailing-list provider, not a generic client-side email sender. A provider
such as [Brevo's sign-up forms](https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo)
can provide an embedded/hosted form, contact-list storage, consent fields, and
double opt-in. The current modal can remain visually similar while delegating
subscription, confirmation, unsubscribe, and list management to that provider.

For a Canadian organization, confirm the consent and message policy before
launch. The [CRTC CASL guidance](https://crtc.gc.ca/eng/com500/guide.htm)
describes consent, sender identification, unsubscribe mechanisms, and keeping
consent records for commercial electronic messages. This is an implementation
requirement, not merely copywriting.

### Contact

[EmailJS documents a browser-only flow](https://www.emailjs.com/docs/introduction/how-does-emailjs-work/)
that sends through a configured email service without a custom server. It can
be reasonable for a low-volume contact form if CAPTCHA, rate limiting, privacy
disclosure, provider limits, and failure handling are acceptable. It should not
be used as the newsletter's subscriber database.

An alternative is a host-integrated form or a small serverless endpoint. Choose
that when the organization needs reliable submission storage, auditability,
attachments, spam controls, or more control over personal information.

## Migration Sequence

1. Choose the content provider, email provider, hosting target, and account
   owner.
2. Define and approve the Page, Event, and Site Settings schemas.
3. Build one Home page in the CMS with English/French content and preview it in
   both routes.
4. Add a deployment webhook or build trigger and verify rollback behavior.
5. Migrate About and Events, then legal/accessibility pages after their text is
   approved.
6. Replace the simulated newsletter/contact flows and update privacy/consent
   text.
7. Write the maintainer guide and have a nontechnical person perform a full
   edit, translation, preview, publish, and rollback exercise.
