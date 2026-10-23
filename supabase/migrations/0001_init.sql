-- =============================================================
-- Skema database Website Profil SMA Negeri 1 Kajen
-- Jalankan di Supabase -> SQL Editor (atau `supabase db push`).
-- =============================================================

-- ---------- Helper: trigger updated_at ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Profil sekolah (satu baris) ----------
create table if not exists public.profil_sekolah (
  id                smallint primary key default 1 check (id = 1),
  nama              text not null default 'SMA Negeri 1 Kajen',
  slogan            text not null default '',
  alamat            text not null default '',
  telepon           text not null default '',
  email             text not null default '',
  visi              text not null default '',
  misi              text[] not null default '{}',
  sambutan_teks     text not null default '',
  sambutan_nama     text not null default '',
  sambutan_jabatan  text not null default '',
  sambutan_gambar   text not null default '/sambutan.jpg',
  sejarah           jsonb not null default '[]'::jsonb,
  fasilitas         text[] not null default '{}',
  ekstrakurikuler   text[] not null default '{}',
  prestasi          jsonb not null default '[]'::jsonb,
  program_unggulan  jsonb not null default '[]'::jsonb,
  kelas             text[] not null default '{}',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists trg_profil_sekolah_updated on public.profil_sekolah;
create trigger trg_profil_sekolah_updated
before update on public.profil_sekolah
for each row execute function public.set_updated_at();

-- ---------- Berita ----------
create table if not exists public.berita (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  judul       text not null,
  tanggal     date not null default current_date,
  ringkasan   text not null default '',
  isi         text[] not null default '{}',
  gambar      text not null default '',
  kategori    text not null default 'Kegiatan',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_berita_tanggal on public.berita (tanggal desc);
create index if not exists idx_berita_kategori on public.berita (kategori);

drop trigger if exists trg_berita_updated on public.berita;
create trigger trg_berita_updated
before update on public.berita
for each row execute function public.set_updated_at();

-- ---------- Guru & staf ----------
create table if not exists public.guru (
  id          uuid primary key default gen_random_uuid(),
  nip         text not null unique,
  nama        text not null,
  mapel       text not null default '',
  jabatan     text not null default 'Guru',
  status      text not null default 'Aktif',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_guru_updated on public.guru;
create trigger trg_guru_updated
before update on public.guru
for each row execute function public.set_updated_at();

-- ---------- Siswa ----------
create table if not exists public.siswa (
  id             uuid primary key default gen_random_uuid(),
  nis            text not null unique,
  nama           text not null,
  kelas          text not null default '',
  jenis_kelamin  text not null default 'L' check (jenis_kelamin in ('L', 'P')),
  status         text not null default 'Aktif',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_siswa_kelas on public.siswa (kelas);

drop trigger if exists trg_siswa_updated on public.siswa;
create trigger trg_siswa_updated
before update on public.siswa
for each row execute function public.set_updated_at();

-- ---------- Agenda ----------
create table if not exists public.agenda (
  id          uuid primary key default gen_random_uuid(),
  tanggal     date not null,
  nama        text not null,
  jam         text not null default '',
  lokasi      text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_agenda_tanggal on public.agenda (tanggal);

drop trigger if exists trg_agenda_updated on public.agenda;
create trigger trg_agenda_updated
before update on public.agenda
for each row execute function public.set_updated_at();

-- ---------- Kalender akademik ----------
create table if not exists public.kalender_akademik (
  id          uuid primary key default gen_random_uuid(),
  mulai       date not null,
  selesai     date,
  nama        text not null,
  jenis       text not null default 'Kegiatan',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_kalender_mulai on public.kalender_akademik (mulai);

drop trigger if exists trg_kalender_updated on public.kalender_akademik;
create trigger trg_kalender_updated
before update on public.kalender_akademik
for each row execute function public.set_updated_at();

-- ---------- Kesiswaan: organisasi ----------
create table if not exists public.kesiswaan_organisasi (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  nama          text not null,
  nama_panjang  text not null default '',
  deskripsi     text not null default '',
  struktur      text[] not null default '{}',
  tugas         text[] not null default '{}',
  urutan        int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_kesiswaan_organisasi_updated on public.kesiswaan_organisasi;
create trigger trg_kesiswaan_organisasi_updated
before update on public.kesiswaan_organisasi
for each row execute function public.set_updated_at();

-- ---------- Kesiswaan: ekstrakurikuler ----------
create table if not exists public.kesiswaan_ekskul (
  id          uuid primary key default gen_random_uuid(),
  nama        text not null,
  caption     text not null default '',
  urutan      int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_kesiswaan_ekskul_updated on public.kesiswaan_ekskul;
create trigger trg_kesiswaan_ekskul_updated
before update on public.kesiswaan_ekskul
for each row execute function public.set_updated_at();

-- ---------- Kesiswaan: tata tertib ----------
create table if not exists public.kesiswaan_tata_tertib (
  id          uuid primary key default gen_random_uuid(),
  jenis       text not null check (jenis in ('kewajiban', 'larangan')),
  teks        text not null,
  urutan      int not null default 0,
  created_at  timestamptz not null default now()
);

-- =============================================================
-- Row Level Security
-- =============================================================
alter table public.profil_sekolah          enable row level security;
alter table public.berita                  enable row level security;
alter table public.guru                    enable row level security;
alter table public.siswa                   enable row level security;
alter table public.agenda                  enable row level security;
alter table public.kalender_akademik        enable row level security;
alter table public.kesiswaan_organisasi     enable row level security;
alter table public.kesiswaan_ekskul         enable row level security;
alter table public.kesiswaan_tata_tertib    enable row level security;

-- ---------- Baca publik (konten website) ----------
drop policy if exists "profil_baca_publik" on public.profil_sekolah;
create policy "profil_baca_publik" on public.profil_sekolah
  for select to anon, authenticated using (true);

drop policy if exists "berita_baca_publik" on public.berita;
create policy "berita_baca_publik" on public.berita
  for select to anon, authenticated using (true);

drop policy if exists "agenda_baca_publik" on public.agenda;
create policy "agenda_baca_publik" on public.agenda
  for select to anon, authenticated using (true);

drop policy if exists "kalender_baca_publik" on public.kalender_akademik;
create policy "kalender_baca_publik" on public.kalender_akademik
  for select to anon, authenticated using (true);

drop policy if exists "organisasi_baca_publik" on public.kesiswaan_organisasi;
create policy "organisasi_baca_publik" on public.kesiswaan_organisasi
  for select to anon, authenticated using (true);

drop policy if exists "ekskul_baca_publik" on public.kesiswaan_ekskul;
create policy "ekskul_baca_publik" on public.kesiswaan_ekskul
  for select to anon, authenticated using (true);

drop policy if exists "tata_tertib_baca_publik" on public.kesiswaan_tata_tertib;
create policy "tata_tertib_baca_publik" on public.kesiswaan_tata_tertib
  for select to anon, authenticated using (true);

-- Guru boleh dibaca publik (halaman profil), siswa TIDAK (data pribadi).
drop policy if exists "guru_baca_publik" on public.guru;
create policy "guru_baca_publik" on public.guru
  for select to anon, authenticated using (true);

-- ---------- Tulis hanya admin terautentikasi ----------
do $$
declare
  t text;
begin
  foreach t in array array[
    'profil_sekolah', 'berita', 'guru', 'siswa', 'agenda',
    'kalender_akademik', 'kesiswaan_organisasi', 'kesiswaan_ekskul',
    'kesiswaan_tata_tertib'
  ] loop
    execute format('drop policy if exists "%s_tulis_admin" on public.%I', t, t);
    execute format(
      'create policy "%s_tulis_admin" on public.%I for all to authenticated using (true) with check (true)',
      t, t
    );
  end loop;
end;
$$;

-- Siswa: hanya admin yang boleh membaca (tambahan setelah policy publik guru).
drop policy if exists "siswa_baca_admin" on public.siswa;
create policy "siswa_baca_admin" on public.siswa
  for select to authenticated using (true);
