# Supabase leaderboard setup

Optional remote leaderboard for **Bureau of Tiny Emergencies**. The game works fully offline without Supabase.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open **SQL Editor** and run `migrations/001_leaderboard.sql`.

## 2. Configure the app

Edit `config.js` in the project root:

```js
window.BUREAU_CONFIG = {
  SUPABASE_URL: "https://YOUR_PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-key"
};
```

Find these values under **Project Settings → API**.

Leave them empty to use the local **Hall of clerks** fallback only.

## 3. How scores are submitted

When a shift ends, the app POSTs to:

```
POST {SUPABASE_URL}/rest/v1/leaderboard
```

Payload fields:

| Field | Description |
|-------|-------------|
| `player_name` | Defaults to `Anonymous Clerk` |
| `rank_title` | Final rank (e.g. Senior Stamp Wizard) |
| `stamps` | Stamps issued |
| `chaos`, `morale`, `forms` | Final stats |
| `verdict` | End-of-shift summary line |
| `mode` | `normal` or `daily` |
| `score` | Composite score for sorting |

## 4. Security notes

The migration enables open read/insert for a casual game leaderboard. For production, consider:

- Rate limiting via Edge Functions
- Authenticated users only
- Row validation triggers

## 5. Local fallback

If config is empty or the network fails, top scores are stored in `localStorage` under `bureau-local-leaderboard` and shown in the **Hall of clerks** panel.