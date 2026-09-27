# Manual accessibility checklist

Automated axe checks catch common DOM and ARIA regressions, but they cannot
replace manual review. Run this checklist before publishing a major content or
layout change.

## Keyboard-only review

- [ ] Tab order follows the visual reading order.
- [ ] The skip link appears on the first Tab press and moves focus to the main content.
- [ ] Every navigation item and language switcher is reachable.
- [ ] Navigation links marked as in development announce that status to screen readers.
- [ ] The mobile menu opens and closes with Enter/Space and Escape.
- [ ] Focus returns to the menu trigger after the mobile menu closes.
- [ ] No control requires a pointer, hover, or drag to operate.
- [ ] The value carousel can be paused and navigated with the keyboard; focus
      stops automatic rotation.
- [ ] Pointer hover pauses carousel rotation, and rotation resumes when the pointer leaves.

## Zoom and reflow review

- [ ] At 200% browser zoom, content remains readable without accidental horizontal scrolling.
- [ ] At a narrow viewport, headings and links do not overlap or clip.
- [ ] Focus indicators remain visible at every interactive control.
- [ ] Text can be resized without loss of content or functionality.

## Screen-reader review

- [ ] The page announces the correct language and one meaningful main heading.
- [ ] Header, navigation, main content, and footer landmarks have useful names.
- [ ] Images have meaningful alternative text or are correctly marked decorative.
- [ ] External links are understandable from their accessible names and indicate a new tab where appropriate.
- [ ] Dynamic menu state changes are announced without requiring a page refresh.
- [ ] Manually selected carousel slides are announced, while automatic slide
      changes do not interrupt reading.
- [ ] With reduced motion enabled, all four value cards are available without
      automatic rotation.

Record the browser, assistive technology, viewport/zoom, route, and any
follow-up issue when a check fails.
