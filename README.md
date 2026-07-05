# Bureau of Tiny Emergencies

A funny, interactive static website built with plain HTML, CSS, and JavaScript.

You play the desk clerk for a tiny municipal emergency bureau. Approve, deny, or escalate absurd case files, stamp certificates, copy official nonsense, and watch the animated city respond as chaos, morale, and paperwork shift.

## Features

- **12 absurd case files** with unique approve/deny/escalate outcomes
- **Live city canvas** — buildings wobble with chaos, papers fly on every stamp
- **Desk utilities** — Scan cases for clues, take coffee breaks, call the hotline
- **Keyboard shortcuts** — Full desk control without touching the mouse
- **Settings drawer** — Reduced motion, dark desk theme, sound effects (persisted locally)
- **First-visit tutorial** — Onboarding modal for new clerks
- **Export shift summary** — Copy a markdown report of your session to the clipboard
- **PWA-ready** — Installable via `manifest.json`

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

## Files

- `index.html` — App structure, modals, settings drawer, accessibility markup
- `styles.css` — Responsive illustrated interface, dark theme, focus styles
- `script.js` — Cases, scoring, canvas animation, clipboard, keyboard shortcuts, settings
- `manifest.json` — PWA manifest for installable desk experience
- `CHANGELOG.md` — Version history

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Settings

Click the gear icon in the top bar to open the settings drawer:

- **Reduced motion** — Calms stamp animations and city wobble
- **Dark desk theme** — Late-shift paperwork ambiance
- **Sound effects** — Web Audio beeps for stamps, decisions, and desk tools

Settings are saved to `localStorage` and restored on reload.