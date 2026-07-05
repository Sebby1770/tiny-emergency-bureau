# Bureau of Tiny Emergencies

A funny, interactive static website built with plain HTML, CSS, and JavaScript.

You play the desk clerk for a tiny municipal emergency bureau. Approve, deny, or escalate absurd case files, stamp certificates, copy official nonsense, and watch the animated city respond as chaos, morale, and paperwork shift.

## Features

- **Career stats dashboard** — Lifetime shifts, stamps, decisions, best score, and badges (`bureau-career-v1`)
- **Achievement gallery** — 18 unlockable honors with hints; full-screen grid with animations
- **Bureau Radio** — Rotating news headlines with typewriter effect (ripples, chaos, campaign, decisions)
- **Desk customization** — Clerk name on certificates; four theme presets (Classic, Midnight, Mint, Sunbleached)
- **Audit Week hard mode** — Forms drain every 10s, +15 case risk, rising chaos; survival badge
- **Challenge codes** — 6-character shareable codes at shift end; load a friend's code to compare scores
- **Evidence sketch viewer** — Procedural per-case doodle canvas; click to enlarge
- **12 absurd case files** plus **2–3 procedural cases** per shift with unique outcomes
- **Campaign mode — Season 1: The Paperwork Uprising** — 6-shift narrative with 3 acts, recurring characters, ratio-based interludes, and act-exclusive cases
- **Decision ripples** — Past stamps tag the world; later cases gain dynamic summary modifiers and city pulse animations
- **Red Phone crisis mode** — 15-second timers per case, auto-escalate on timeout, bonus stamps for fast correct calls
- **Clerk's journal** — Optional official reasoning scored for bureaucratic eloquence (Silver Tongue badge at 80+ avg)
- **Interactive district map** — Click five city districts for localized chaos reports
- **Certificate PNG export** — Download stamped certificates as PNG (manual canvas, no libraries)
- **Ghost clerk notes** — Leave notes for future clerks; rotating messages greet new shifts
- **Live city canvas** — Buildings wobble with chaos, papers fly on every stamp
- **Desk utilities** — Scan cases for clues, take coffee breaks, call the hotline
- **Keyboard shortcuts** — Full desk control without touching the mouse
- **Touch controls** — Swipe right to approve, left to deny (mobile)
- **Daily challenge** — Seeded case order from today's date with local best-score tracking
- **Mid-shift resume** — Progress auto-saved on every decision (24-hour window)
- **Share shift** — Web Share API or clipboard fallback with rank and verdict
- **Hall of clerks** — Local top scores; optional Supabase remote leaderboard
- **Settings drawer** — Reduced motion, dark desk theme, sound effects, ambient hum
- **First-visit tutorial** — Onboarding modal for new clerks
- **Export shift summary** — Copy a markdown report of your session
- **Offline PWA** — Service worker caches static assets for offline play

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `A` | Approve current case |
| `D` | Deny current case |
| `E` | Escalate current case |
| `S` | Scan case file |
| `C` | Coffee break |
| `H` | Call hotline |
| `P` | Pull panic lever |
| `?` | Open help modal |
| `Esc` | Close modals and settings |

Shortcuts are disabled while typing in form fields.

On mobile, swipe **right** to approve and **left** to deny on the case panel.

Click districts on the city canvas for localized chaos reports.

## Shift modes

| Mode | Description |
|------|-------------|
| **Quick shift** | Standard shuffled queue of base + procedural cases |
| **Campaign** | Season 1 story across 6 shifts; progress saved in `bureau-campaign-v1` |
| **Daily desk** | Today's seeded case order with local best-score tracking |
| **Red Phone** | Overlay: 15s timer per case (toggle anytime) |
| **Audit Week** | Overlay: forms drain, +15 risk, slow chaos rise (toggle anytime) |

## Career & achievements

Click the **dossier** icon in the top bar for lifetime stats. Click the **★** icon for the achievement gallery. Badges unlock during play and persist in your career record. At least 18 honors are available, including shift feats (Silver Tongue, Speed demon) and career milestones (Bureau veteran, Stamp collector).

## Challenge codes

When a shift ends, a 6-character challenge code appears. Share it with a friend; they can paste it into **Load a friend's challenge** on their shift-end screen to see if they beat your score.

## Desk themes

Open **Settings** to set your clerk name and pick a desk theme:

| Theme | Vibe |
|-------|------|
| **Classic** | Default bureau paperwork warmth |
| **Midnight** | Dark late-shift ambiance |
| **Mint** | Cool green administrative calm |
| **Sunbleached** | Faded afternoon ledger tones |

## Files

- `index.html` — App structure, modals, settings drawer, accessibility markup
- `styles.css` — Responsive illustrated interface, dark theme, focus styles
- `script.js` — Cases, scoring, canvas animation, campaign, ripples, crisis timers, journal
- `config.js` — Optional Supabase leaderboard configuration
- `sw.js` — Service worker for offline static asset caching
- `manifest.json` — PWA manifest for installable desk experience
- `supabase/` — Leaderboard SQL migration and setup docs
- `CHANGELOG.md` — Version history

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server (recommended for service worker):

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Settings

Click the gear icon in the top bar to open the settings drawer:

- **Clerk name** — Printed on certificates and filed with leaderboard scores
- **Desk theme** — Classic, Midnight, Mint, or Sunbleached presets
- **Reduced motion** — Calms stamp animations and city wobble
- **Dark desk theme** — Legacy toggle (syncs with Midnight preset)
- **Sound effects** — Web Audio beeps for stamps, decisions, and desk tools
- **Ambient desk hum** — Low looping office atmosphere (separate from sound effects)

Settings are saved to `localStorage` and restored on reload.

## Daily challenge

Click **Daily desk** in the top bar to start a shift with today's seeded case order. The label shows the current date (e.g. "Daily Challenge — Jul 5"). Your best score for each day is stored locally.

## Campaign

Click **Campaign** to begin or resume Season 1. Complete 6 shifts across 3 acts. Between shifts, story interludes react to whether you've approved, denied, or escalated most often. Act 2 and Act 3 add exclusive cases involving the Printer, Sock Union, and Mayor's Hotline.

## Leaderboard (optional)

To enable the remote **Hall of clerks** leaderboard, see `supabase/README.md` and fill in `config.js`:

```js
window.BUREAU_CONFIG = {
  SUPABASE_URL: "https://YOUR_PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-key"
};
```

Leave empty to use the local fallback only.

## Shift flow

Each shift processes a queue of base cases plus procedurally generated emergencies (and campaign-exclusive cases in Campaign mode). When the queue is complete:

1. A verdict and score are calculated
2. Scores are saved locally (and to Supabase if configured)
3. You can copy a **challenge code**, leave a **ghost note**, **Share shift**, **Export shift summary**, **Download certificate PNG**, or **Start new shift**
4. In Campaign mode, continue through interludes until Season 1 concludes

Progress is auto-saved after every decision so you can resume within 24 hours.