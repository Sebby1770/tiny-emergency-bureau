# Changelog

All notable changes to the Bureau of Tiny Emergencies project.

## 2026-07-05 v3

### Added

- **Campaign mode — Season 1: The Paperwork Uprising** — Toggle **Campaign** vs **Quick shift**; 3-act narrative across 6 shifts with recurring characters (Printer, Sock Union, Mayor's Hotline). Campaign state persisted in `localStorage` (`bureau-campaign-v1`). Between-shift story interludes react to your cumulative approve/deny/escalate ratio. Act 2 and Act 3 unlock campaign-only cases. Campaign progress bar in the top bar.
- **Decision ripple system** — Past decisions tag the world (`state.ripples`); later cases show dynamic modifier text appended to summaries. Visual ripple-pulse animation on the city canvas when a ripple is created.
- **Red Phone crisis mode** — Toggle **Red Phone Shift** for 15-second countdown timers per case. Timer bar on the case panel; timeout auto-escalates with chaos spike. Bonus stamps for fast correct decisions (matching risk-based best action within 8 seconds).
- **Clerk's journal** — Optional "Official reasoning" textarea before each decision. Eloquence scored 0–100 from word count, bureaucratic keywords, and decision-type alignment. Score shown on certificate; **Silver Tongue** badge at 80+ session average.
- **Interactive district map** — Five clickable districts overlaid on the city canvas (Toner District, Sock Quarter, Elevator Heights, Break Room, Scheduling Ward). Each shows a localized chaos popup based on current stats and ripples.
- **Certificate PNG export** — **Download PNG** button renders the certificate via manual canvas drawing (no external libraries). Saves as `bureau-certificate-{date}.png`.
- **Ghost clerk notes** — Optional note for the next clerk at shift end, saved to a `localStorage` queue. Rotating ghost notes from past sessions appear at shift start.

### Changed

- Mode strip now includes Quick shift, Campaign, Daily desk, and Red Phone toggles.
- Shift export summary includes journal eloquence and decision ripples.
- Hall of clerks and badges recognize crisis and eloquence achievements.

## 2026-07-05 v2

### Added

- **Service worker** (`sw.js`) — Caches static assets (`index.html`, `styles.css`, `script.js`, `config.js`, `manifest.json`) for offline play.
- **Mid-shift save state** — Game state saved to `localStorage` (`bureau-shift-state`) on every decision; resume prompt if saved state is less than 24 hours old.
- **Share shift** — Web Share API with clipboard fallback; shares rank, stamps, and verdict.
- **Touch controls** — Swipe right to approve, swipe left to deny on the case panel; subtle swipe hint on mobile.
- **Daily challenge** — "Daily desk" mode seeds case order from today's date; shows "Daily Challenge — Jul 5" label; stores daily best score locally.
- **Procedural cases** — `generateProceduralCase(seed)` injects 2–3 generated cases into each shift queue.
- **Supabase leaderboard** (optional) — `config.js` placeholders, SQL migration, and local **Hall of clerks** panel with remote or local top-5 fallback.
- **Ambient desk hum** — Separate settings toggle for looping low-frequency office atmosphere via Web Audio.

### Changed

- Shifts now have a defined queue (base cases + procedural cases) instead of infinite looping.
- Shift end screen shows verdict, score, and options to share or start a new shift.
- Export summary includes verdict, score, coffee breaks, and badges.

## 2026-07-05

### Added

- **Keyboard shortcuts** — `A` approve, `D` deny, `E` escalate, `S` scan, `C` coffee, `H` hotline, `P` panic, `?` help. Shortcuts are disabled while typing in form fields.
- **Settings drawer** — Gear button opens a panel with reduced motion, dark desk theme, and Web Audio sound effects. Preferences persist in `localStorage`.
- **First-visit tutorial** — Welcomes new clerks on first load; dismissal is remembered in `localStorage`.
- **Export shift summary** — Copies a markdown report of stats, rank, and decisions to the clipboard.
- **Desk utilities** — Scan (case clues), Coffee (morale boost), and Hotline (bureau advice) buttons with keyboard bindings.
- **Four new cases** — Stapler emotional damages, compliment-triggered fire alarm, judgmental parking meter, and nocturnal ceiling-fan poetry.
- **PWA support** — `manifest.json` with app metadata and inline SVG icons; `theme-color` meta tag in `index.html`.
- **Accessibility** — Skip link to current case, visible `:focus-visible` styles, and `aria-keyshortcuts` on action buttons.

### Changed

- Canvas animation respects the reduced-motion setting (less wobble, slower movement).
- Dark desk theme overrides color tokens for late-shift ambiance.