-- Execute uma única vez no SQL Editor do seu projeto Supabase.
create table if not exists public.marketing_workspace (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  revision bigint not null default 0,
  updated_at timestamptz not null default now()
);
insert into public.marketing_workspace(id,data,revision)
values (1,'{}'::jsonb,0)
on conflict (id) do nothing;

alter table public.marketing_workspace enable row level security;
revoke all on public.marketing_workspace from anon, authenticated;
-- Nenhuma policy pública: somente a função Netlify com service_role pode acessar.
