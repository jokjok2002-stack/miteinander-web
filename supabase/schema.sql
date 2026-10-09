-- In Supabase: SQL Editor öffnen, diesen Text einfügen und auf "Run" klicken.
-- Jede Person sieht und ändert nur ihre eigene Zeile.

create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

create policy "eigene Daten lesen" on public.user_state
  for select using (auth.uid() = user_id);
create policy "eigene Daten anlegen" on public.user_state
  for insert with check (auth.uid() = user_id);
create policy "eigene Daten ändern" on public.user_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "eigene Daten löschen" on public.user_state
  for delete using (auth.uid() = user_id);
