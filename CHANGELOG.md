# Changelog

All notable changes to the Bureau of Tiny Emergencies project.

## 2026-07-05

### Added

- **Keyboard shortcuts** — `A` approve, `D` deny, `E` escalate, `S` scan, `C` coffee, `H` hotline, `P` panic, `?` help. Shortcuts are disabled while typing in form fields.
- **Settings drawer** — Gear button opens a panel with reduced motion, dark desk theme, and Web Audio sound effects. Preferences persist in `localStorage`.
- **First-visit tutorial modal** — Welcomes new clerks on first load; dismissal is remembered in `localStorage`.
- **Export shift summary** — Copies a markdown report of stats, rank, and decisions to the clipboard.
- **Desk utilities** — Scan (case clues), Coffee (morale boost), and Hotline (bureau advice) buttons with keyboard bindings.
- **Four new cases** — Stapler emotional damages, compliment-triggered fire alarm, judgmental parking meter, and nocturnal ceiling-fan poetry.
- **PWA support** — `manifest.json` with app metadata and inline SVG icons; `theme-color` meta tag in `index.html`.
- **Accessibility** — Skip link to current case, visible `:focus-visible` styles, and `aria-keyshortcuts` on action buttons.

### Changed

- Canvas animation respects the reduced-motion setting (less wobble, slower movement).
- Dark desk theme overrides color tokens for late-shift ambiance.