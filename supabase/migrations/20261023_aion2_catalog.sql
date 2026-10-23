-- Independent, versioned AION 2 game-data catalog.
-- Public reads are enabled; writes require service role or a separate admin workflow.
create table if not exists public.game_data_snapshots (
 id uuid primary key default gen_random_uuid(),
 source_key text not null,
 source_url text not null,
 client_version text,
 region text not null default 'Global',
 fetched_at timestamptz not null default now(),
 reviewed_at timestamptz,
 status text not null default 'pending' check (status in ('pending','reviewed','rejected')),
 notes text,
 unique (source_key,region,client_version)
);
create table if not exists public.game_entities (
 id uuid primary key default gen_random_uuid(),
 snapshot_id uuid not null references public.game_data_snapshots(id) on delete cascade,
 entity_type text not null check(entity_type in ('class','skill','specialization','stigma','board','node','item','item_set','stat','collectible')),
 game_id text not null,
 class_id text,
 parent_game_id text,
 name text not null,
 data jsonb not null default '{}'::jsonb,
 icon_path text,
 verified boolean not null default false,
 created_at timestamptz not null default now(),
 unique(snapshot_id,entity_type,game_id)
);
create index if not exists game_entities_type_class_idx on public.game_entities(entity_type,class_id);
create index if not exists game_entities_parent_idx on public.game_entities(parent_game_id);
create index if not exists game_entities_data_gin on public.game_entities using gin(data);
alter table public.game_data_snapshots enable row level security;
alter table public.game_entities enable row level security;
drop policy if exists "Read reviewed snapshots" on public.game_data_snapshots;
create policy "Read reviewed snapshots" on public.game_data_snapshots for select to anon, authenticated using (status='reviewed');
drop policy if exists "Read reviewed entities" on public.game_entities;
create policy "Read reviewed entities" on public.game_entities for select to anon, authenticated using (verified and exists(select 1 from public.game_data_snapshots s where s.id=snapshot_id and s.status='reviewed'));
-- No public insert/update/delete policies. Use privileged, audited import jobs.
