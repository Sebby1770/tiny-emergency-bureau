-- Bureau of Tiny Emergencies — leaderboard table
-- Run in Supabase SQL editor or via CLI migration

create table if not exists public.leaderboard (
  id bigint generated always as identity primary key,
  player_name text not null default 'Anonymous Clerk',
  rank_title text not null,
  stamps integer not null default 0,
  chaos integer not null default 0,
  morale integer not null default 0,
  forms integer not null default 0,
  verdict text not null,
  mode text not null default 'normal',
  score integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists leaderboard_score_idx on public.leaderboard (score desc, created_at desc);
create index if not exists leaderboard_mode_idx on public.leaderboard (mode, score desc);

alter table public.leaderboard enable row level security;

-- Allow anonymous inserts and reads for the public leaderboard
create policy "Anyone can read leaderboard"
  on public.leaderboard for select
  using (true);

create policy "Anyone can insert scores"
  on public.leaderboard for insert
  with check (true);