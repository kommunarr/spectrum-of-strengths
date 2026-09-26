# Media inventory

The first-stage site uses only its existing brand mark. No photographs, partner
logos, or contributor images are currently approved for publication.

| Asset | Use | Source dimensions | Source and accessibility |
| --- | --- | --- | --- |
| `src/assets/SpectrumOfStrengthsLogo.svg` | Header and footer logo | SVG, 200 × 100 | Existing brand asset retained by owner direction; original source details are not recorded in the repository. The shared `Logo` component provides translated organization-name alternative text. |
| `public/favicon.svg` | Browser tab icon | SVG, 100 × 100 viewBox | Existing project icon; source details are not recorded here. It is linked from `index.html` and is not used as in-page content. |

## When adding an image

- Confirm ownership or permission, intended context, and any required credit
  before adding the file. Do not add partner marks or identifiable personal
  photos without explicit approval.
- Prefer the original vector source for logos and simple graphics. Keep
  meaningful images as image assets rather than embedding important text in
  them.
- For photographs or complex illustrations, use compressed files sized for
  their largest display size and provide smaller responsive variants when the
  image is large or appears in multiple layouts.
- Include intrinsic width and height so the browser can reserve space before
  an image loads. Lazy-load images below the initial viewport; keep a main
  above-the-fold image eager.
- Write alternative text for the image's purpose in context. Use empty alt
  text for decorative images. Do not repeat nearby captions in the alt text.
- Add each published asset to this inventory with its source/permission,
  purpose, dimensions, and accessibility notes. Keep private source files and
  correspondence outside the repository.
