# Vita Clinic demo — design QA

final result: passed

## Comparison target

- Source visual truth: `artifacts/design-qa/00-landing-source.png`
- Source: the existing Vita Clinic landing at the start of this pass. It is the product's design-system reference, not a same-layout mock for the new application screens.
- Implementations:
  - Booking: `artifacts/design-qa/16-booking-service-after-image-fix.png`
  - Client dashboard: `artifacts/design-qa/05-client-overview.png`
  - Admin owner: `artifacts/design-qa/07-admin-owner.png`
  - Admin worker: `artifacts/design-qa/10-admin-worker-after-crop-fix.png`
- Mobile evidence:
  - `artifacts/design-qa/11-booking-mobile.png`
  - `artifacts/design-qa/13-client-mobile-after-scrollbar-fix.png`
  - `artifacts/design-qa/14-admin-mobile-owner.png`
  - `artifacts/design-qa/15-landing-mobile.png`
- Side-by-side comparison evidence:
  - `artifacts/design-qa/comparison-booking-final.png`
  - `artifacts/design-qa/comparison-client.png`
  - `artifacts/design-qa/comparison-admin-owner.png`
  - `artifacts/design-qa/comparison-admin-worker.png`

## Viewport and normalization

- Desktop browser viewport request: 1440 × 900 CSS px.
- Desktop screenshots: 1425 × 891 px where the browser reserved scrollbar space; client overview captured at 1440 × 900 px.
- Mobile browser viewport request: 390 × 844 CSS px.
- Mobile page client area and screenshots: 375 × 812 px.
- Screenshot density: 72 DPI metadata, browser device scale effectively 1×.
- Side-by-side comparisons normalize both images to 1440 × 900 with a cover fit before placing them on a 2880 × 900 canvas.
- State: light theme, Serbian Latin copy, seeded demo data, no authentication.

## Full-view comparison

- Typography: the new screens reuse Bodoni Moda for display hierarchy and Inter for application text. Headline scale, tight display leading, restrained uppercase eyebrows, and lighter UI copy preserve the landing's editorial character.
- Spacing and layout: the landing's generous shell spacing becomes a denser but still breathable application rhythm. Booking uses a 39/61 split, while client and admin use persistent sidebars with consistent page gutters. Card radius and border treatments remain intentionally quiet.
- Colors and tokens: wine, blush, marble, ink, muted and gold tokens are used consistently. Green and amber appear only as semantic status colors.
- Images: all visible photography comes from the supplied Vita assets. Doctor crops were corrected to keep faces visible. No placeholder imagery, emoji, handcrafted SVG art or custom icon drawings were added.
- Copy: all product copy reads as a standalone clinic experience. Demo-only behavior is described plainly; no backend or medical claim is implied.
- Icons: Lucide icons use one restrained stroke family and consistent 14–20 px sizing.

## Focused state evidence

- Booking service selection: `01-booking-service.png`
- Booking time selection and disabled slots: `02-booking-time.png`
- Booking details and populated fields: `03-booking-details.png`
- Booking success: `04-booking-success.png`
- Client message state: `06-client-messages.png`
- Admin worker role: `10-admin-worker-after-crop-fix.png`

These focused captures were used because form controls, selection states, booking completion, messaging, and role-aware navigation are too small to judge reliably only from the full-view comparisons.

## Interaction and resilience checks

- Booking was completed from service selection through date/time, populated details, confirmation and success.
- Client sidebar navigation was tested from overview to messages.
- Admin role switching was tested from owner to worker and verified to replace both navigation and dashboard content.
- Landing, booking, client and admin routes returned HTTP 200.
- Mobile landing, booking, client and admin were checked at the same narrow viewport.
- No horizontal page overflow was found at mobile width.
- Browser console check returned no warnings or errors.
- Production build completed successfully.

## Comparison history

### Pass 1

- [P2] Worker profile portrait was cropped too high, hiding most of the face.
  - Fix: adjusted doctor-image focal positions to 50% / 28%.
  - Post-fix evidence: `10-admin-worker-after-crop-fix.png`.
- [P2] Mobile client and admin navigation exposed the native horizontal scrollbar, making the shell look unfinished.
  - Fix: added a reusable hidden-scrollbar utility while preserving horizontal touch scrolling.
  - Post-fix evidence: `13-client-mobile-after-scrollbar-fix.png` and `14-admin-mobile-owner.png`.
- [P2] Booking sidebar used a marketing image with baked-in copy, causing text duplication behind the new headline.
  - Fix: replaced it with the clean Vita hero poster and retained the wine overlay.
  - Post-fix evidence: `16-booking-service-after-image-fix.png` and `comparison-booking-final.png`.

### Pass 2

- No remaining P0, P1 or P2 findings.
- Residual P3: the Next.js development indicator is visible in development screenshots. It is absent from the production build and does not affect the demo content.

## Final assessment

The new flows intentionally extend the landing rather than copy its layout. They match its typography, palette, photography and calm premium tone, while adopting the density needed for booking and dashboard work. Core demo navigation and state changes are complete, responsive, and free of blocking visual issues.
