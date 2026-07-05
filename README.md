# Bureau of Tiny Emergencies

A funny, interactive static website built with plain HTML, CSS, and JavaScript.

You play the desk clerk for a tiny municipal emergency bureau. Approve, deny, or escalate absurd case files, stamp certificates, copy official nonsense, and watch the animated city respond as chaos, morale, and paperwork shift.

## Features

- **12 absurd case files** plus **2–3 procedural cases** per shift with unique outcomes
- **Live city canvas** — buildings wobble with chaos, papers fly on every stamp
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

## Files

- `index.html` — App structure, modals, settings drawer, accessibility markup
- `styles.css` — Responsive illustrated interface, dark theme, focus styles
- `script.js` — Cases, scoring, canvas animation, clipboard, keyboard shortcuts, settings
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

- **Reduced motion** — Calms stamp animations and city wobble
- **Dark desk theme** — Late-shift paperwork ambiance
- **Sound effects** — Web Audio beeps for stamps, decisions, and desk tools
- **Ambient desk hum** — Low looping office atmosphere (separate from sound effects)

Settings are saved to `localStorage` and restored on reload.

## Daily challenge

Click **Daily desk** in the top bar to start a shift with today's seeded case order. The label shows the current date (e.g. "Daily Challenge — Jul 5"). Your best score for each day is stored locally.

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

Each shift processes a queue of base cases plus procedurally generated emergencies. When the queue is complete:

1. A verdict and score are calculated
2. Scores are saved locally (and to Supabase if configured)
3. You can **Share shift**, **Export shift summary**, or **Start new shift**

Progress is auto-saved after every decision so you can resume within 24 hours.