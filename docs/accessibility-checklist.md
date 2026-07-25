# Manual accessibility checklist

Automated axe checks catch common DOM and ARIA regressions, but they cannot
replace manual review. Run this checklist before publishing a major content or
layout change.

## Keyboard-only review

- [ ] Tab order follows the visual reading order.
- [ ] The skip link appears on the first Tab press and moves focus to the main content.
- [ ] Every navigation item, language switcher, action button, and form control is reachable.
- [ ] The mobile menu opens and closes with Enter/Space and Escape.
- [ ] Focus returns to the menu trigger after the mobile menu closes.
- [ ] The newsletter dialog traps focus while open, closes with Escape, and returns focus to its trigger.
- [ ] No control requires a pointer, hover, or drag to operate.

## Zoom and reflow review

- [ ] At 200% browser zoom, content remains readable without accidental horizontal scrolling.
- [ ] At a narrow viewport, headings, form controls, links, and buttons do not overlap or clip.
- [ ] Focus indicators remain visible at every interactive control.
- [ ] Text can be resized without loss of content or functionality.

## Screen-reader review

- [ ] The page announces the correct language and one meaningful main heading.
- [ ] Header, navigation, main content, footer, and dialog landmarks have useful names.
- [ ] Images have meaningful alternative text or are correctly marked decorative.
- [ ] Form labels, required fields, validation/status messages, and errors are announced.
- [ ] External links are understandable from their accessible names and indicate a new tab where appropriate.
- [ ] Dynamic menu and dialog state changes are announced without requiring a page refresh.

Record the browser, assistive technology, viewport/zoom, route, and any
follow-up issue when a check fails.
