create table if not exists consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  type text,
  region text,
  message text,
  created_at timestamptz default now()
);

alter table consultations enable row level security;

create policy "anyone can insert" on consultations
  for insert to anon with check (true);
