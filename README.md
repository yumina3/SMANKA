# Website Profil SMA Negeri 1 Kajen

Website profil sekolah dengan panel admin, dibangun dengan Next.js App Router,
JavaScript, Tailwind CSS, dan Supabase sebagai basis data.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Konfigurasi

Salin `.env.example` menjadi `.env.local` lalu isi:

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | ya | Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ya | Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | tidak | Hanya untuk seed/migrasi lokal |
| `DATABASE_URL` | tidak | Port 6543 (transaction pooler) |

## Basis Data

Jalankan berurutan di Supabase → SQL Editor:

1. `supabase/migrations/0001_init.sql` — tabel, RLS, dan kebijakan akses
2. `supabase/migrations/0002_storage_berita.sql` — bucket gambar berita
3. `supabase/seed.sql` — data contoh

Akun admin dibuat lewat Supabase → Authentication → Users (email + password).

## Struktur

```
src/app/(site)/   halaman publik (beranda, about, akademik, berita, kesiswaan)
src/app/admin/    panel admin (dilindungi Supabase Auth)
src/components/   komponen publik dan admin
src/lib/          akses data Supabase, auth, format, storage
supabase/         migrasi SQL dan data seed
```

## Skrip

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi |
| `npm start` | Jalankan hasil build |
| `npm run lint` | ESLint |

## Catatan

Halaman publik yang menampilkan data dinamis (`/berita/[id]`) dirender di
server, sedangkan daftar berita, kalender, dan agenda di panel admin memakai
Supabase client di browser sehingga membutuhkan sesi admin yang aktif.
