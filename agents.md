# Spectrum of Strengths Engineering Guide

## Project Purpose

This repository contains the Spectrum of Strengths public website. Treat it as
a real public-facing site for a Canadian organization serving autistic and
neurodivergent people and their communities. The site should feel calm,
credible, inclusive, easy to navigate, and safe to hand off to a non-specialist
maintainer.

The project is currently a static Vite application. Content, contact flows,
newsletter behavior, and deployment claims must reflect what the code actually
does. Never invent real people, events, partners, services, outcomes,
testimonials, statistics, user counts, or operational capabilities. If draft
content is needed, mark it clearly as draft or placeholder and keep it out of
production-facing claims until it is approved.

## Technology And Structure

- React 18 with TypeScript and Vite.
- React Router with History API routes in `src/App.tsx`; the production build
  renders each English and French route into its own HTML file.
- `react-i18next` with Canadian English and Canadian French resources under
  `src/locales/`.
- CSS is colocated with components and views. Preserve the existing component
  pattern: implementation file, stylesheet when needed, and `index.tsx`
  barrel export.
- Font Awesome is used for icons.
- The Vite base path is `/spectrum-of-strengths`; preserve it when changing
  routing or asset references.
- Shared page structure belongs in `src/components/Layout/`, navigation in
  `Header/` and `NavMenu/`, and page-specific behavior belongs in `src/views/`.

## Engineering Priorities

Prioritize work in this order:

1. Correctness and truthful user-facing behavior.
2. Accessibility and understandable navigation.
3. Privacy and safe handling of submitted information.
4. Maintainable content and translation workflows.
5. Responsive visual quality and performance.

Prefer a small, coherent change over a broad rewrite. Inspect the existing
implementation and current working-tree changes before editing. Do not discard
or reformat unrelated work.

## Content And Localization

- Put user-visible copy in the locale files rather than hard-coding it in JSX.
- Keep English and French translation keys aligned. A feature is incomplete if
  one language silently falls back to another or displays untranslated keys.
- Use Canadian spelling and terminology consistently.
- Keep claims specific and supportable. Content that has not been approved
  should be identified as draft content in the source and should not imply that
  a service, event, newsletter, or response process is currently operational.
- Avoid lorem ipsum in any demonstrable page. Use concise, meaningful copy or
  an explicitly labelled content placeholder.
- Treat translated HTML as a security and maintenance concern. Prefer structured
  React content; if HTML in translations is unavoidable, keep it tightly
  controlled and do not interpolate unsanitized user input into it.

## Accessibility Standards

Every page and interactive feature should be usable with a keyboard and a
screen reader.

- Use semantic landmarks and a logical heading hierarchy.
- Give every form control a visible, correctly associated label.
- Provide useful alternative text for informative images; use empty alt text for
  decorative images.
- Preserve visible focus, sufficient color contrast, and readable text sizing.
- Ensure dialogs can be opened, dismissed with Escape, and operated without a
  mouse; return focus to the triggering control when they close.
- Do not use color, hover, animation, or iconography as the only way to convey
  meaning.
- Respect `prefers-reduced-motion` for nonessential motion.
- External links should clearly behave as external links and use an appropriate
  `rel` value when opened in a new tab.
- Test narrow layouts, zoomed text, keyboard-only navigation, and the main
  English and French routes before considering a user-facing change complete.

## Forms, Email, And Privacy

The current contact and email-modal flows are client-side UI unless a real
backend or form provider is explicitly wired in. Do not claim that a message or
subscription was delivered when the browser has only changed local React
state. A success state must describe the actual behavior.

If a backend is added:

- Document the provider, failure behavior, data retention, and ownership.
- Validate input on the server as well as in the browser.
- Never log message bodies, email addresses, or other personal information in
  client-visible logs.
- Provide an honest privacy notice and a clear error state.
- Keep secrets out of the repository and out of client-side bundles.

## Routing And Deployment

- Add English and French routes together when a page is introduced.
- Add new page components to the route renderer in
  `scripts/render-route-content.mjs` and its metadata/path mapping in
  `scripts/generate-route-pages.mjs`.
- Preserve the `/spectrum-of-strengths` base path, direct route files, and
  redirects for older `#/...` bookmarks.
- Verify direct navigation and refresh behavior for every route in the built
  site, not only in the Vite development server.
- Do not commit generated `dist/` output unless the deployment process is
  intentionally changed to require it.
- Keep deployment configuration explicit and document any hosting assumptions.

## Validation

Run these commands from the repository root before handing off a change:

```bash
npm run lint
npm run build
```

Also perform a focused browser check with `npm run dev` or `npm run preview`:

- home, events, about, contact, privacy/terms, and accessibility pages;
- English and French navigation and page titles;
- mobile-width layout and keyboard navigation;
- form validation, modal dismissal, and honest success/error states;
- links, images, and the production base path.

If a command cannot be run, report that explicitly and describe the remaining
risk instead of treating the change as fully verified.

## Definition Of Done

A change is ready when it has a clear user-facing purpose, keeps both locales
coherent, passes lint and build, preserves the existing route/deployment
contract, improves or preserves accessibility, and does not overstate what the
site or organization currently does. Update the README when setup, deployment,
content ownership, or runtime behavior changes materially.

## Collaboration Rules

- Read the relevant files and git diff before making edits.
- Keep changes focused and explain meaningful architectural decisions in the
  code or documentation.
- Add a short comment only where the intent would otherwise be difficult to
  infer; do not narrate obvious code.
- Do not add fake analytics, fake testimonials, fake submissions, fake user
  metrics, or fabricated organizational history to make the site appear more
  established.
- Do not commit, push, or alter deployment credentials without explicit
  authorization.
