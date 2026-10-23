-- =============================================================
-- Storage: bucket publik untuk gambar berita.
-- Jalankan lewat `supabase db push` atau SQL Editor.
-- =============================================================

insert into storage.buckets (id, name, public)
values ('berita', 'berita', true)
on conflict (id) do update set public = true;

-- Baca publik untuk gambar berita.
drop policy if exists "berita_gambar_baca_publik" on storage.objects;
create policy "berita_gambar_baca_publik" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'berita');

-- Unggah/ubah/hapus hanya admin terautentikasi.
drop policy if exists "berita_gambar_tulis_admin" on storage.objects;
create policy "berita_gambar_tulis_admin" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'berita');

drop policy if exists "berita_gambar_ubah_admin" on storage.objects;
create policy "berita_gambar_ubah_admin" on storage.objects
  for update to authenticated
  using (bucket_id = 'berita')
  with check (bucket_id = 'berita');

drop policy if exists "berita_gambar_hapus_admin" on storage.objects;
create policy "berita_gambar_hapus_admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'berita');
