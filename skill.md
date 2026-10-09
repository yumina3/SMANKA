---
name: build-sma-website
description: Membangun dan merevisi website profil SMA Negeri 1 Kajen (Next.js App Router, JavaScript, Tailwind, tema gelap liquid glass). Gunakan saat user minta membuat project, halaman, komponen, atau memperbaiki UI website sekolah ini, atau menyebut PRD, SRS, DESIGN, tugas Next.js SMA. Mengatur kapan dan bagaimana skill ponytail, caveman, rtk, find-skills, setup-matt-pocock-skills, dan design-taste-frontend dipakai.
---

# Build SMA Website

Skill pengatur (orkestrator) untuk tugas kuliah: website profil SMA statis. Skill ini **tidak menggantikan** skill lain. Ia hanya menentukan urutan, batas, dan siapa yang menang kalau ada konflik.

## 1. Sumber kebenaran (urutan prioritas)

Kalau dua sumber bertabrakan, yang nomor kecil menang.

1. **Ketentuan tugas dosen** (ringkasan di bagian 3).
2. `docs/SRS.md`: aturan (BR), validasi (VL), behaviour (BH).
3. `docs/PRD.md`: fitur, struktur project, model data.
4. `docs/DESIGN.md`: palet, tipografi, efek `.liquid-glass`, layout halaman.
5. Skill `ponytail` dan `design-taste-frontend`.
6. Skill `caveman` dan `rtk` hanya memengaruhi cara menjawab dan menjalankan perintah, tidak boleh mengubah isi kode atau konten.

Baca ketiga dokumen di `docs/` sebelum menulis kode. Jangan mengarang aturan di luar dokumen itu.

## 2. Peran tiap skill

| Skill | Dipakai untuk | Batas |
|---|---|---|
| `setup-matt-pocock-skills` | Konfigurasi repo sekali di awal | Hanya dijalankan user lewat `/setup-matt-pocock-skills`; agent tidak menjalankannya sendiri |
| `rtk` | Memadatkan output perintah shell | Hook hanya menangkap Bash; Read, Grep, Glob bawaan tidak terkompresi |
| `caveman` | Memadatkan **kata-kata agent** di chat | Tidak boleh menyentuh kode, isi file, konten website, komentar, atau commit |
| `ponytail` | Menahan kode berlebih; pakai fitur yang sudah ada | Kalah dari ketentuan tugas (komponen wajib tetap dibuat) |
| `design-taste-frontend` | Kualitas layout, anti tampilan generik, pre-flight | Kalah dari `DESIGN.md` untuk palet, font, dan efek kaca |
| `find-skills` | Mencari skill tambahan bila ada kebutuhan yang belum tertutup | Hanya mencari dan menyarankan; instalasi harus seizin user |

### 2.1 setup-matt-pocock-skills
- Di awal project, minta user menjalankan `/setup-matt-pocock-skills` sekali.
- Skill itu menanyakan issue tracker, label triase, dan struktur domain docs, lalu menulis blok `## Agent skills` ke `AGENTS.md` atau `CLAUDE.md` dan file di `docs/agents/`.
- Untuk repo tugas tanpa tim: jawab "single-context". Untuk issue tracker pilih sesuai kenyataan (GitHub kalau repo ada di GitHub, selain itu local markdown).
- Jangan menimpa blok `## Agent skills` yang sudah ada; perbarui di tempat.

### 2.2 rtk
- Pastikan terpasang dan hook aktif: `rtk gain` harus menampilkan statistik token (kalau "command not found", kemungkinan yang terpasang adalah paket lain bernama `rtk`, yaitu Rust Type Kit; jangan lanjut memakai `cargo install rtk` mentah-mentah).
- Hook mengubah `git status` menjadi `rtk git status` secara transparan. Tidak perlu menulis `rtk` manual untuk perintah umum.
- Karena Read/Grep/Glob tidak lewat hook, untuk melihat banyak file besar lebih baik pakai perintah shell (mis. `rtk ls`, `rtk grep`) daripada membaca file satu per satu.
- Kalau output yang dipadatkan menyembunyikan error penting saat debugging, jalankan ulang perintahnya tanpa `rtk` agar log asli terlihat.

### 2.3 caveman
- Aktif untuk balasan chat: singkat, tanpa pembuka, tanpa penutup, tanpa mengulang apa yang baru dikerjakan.
- **Tetap bahasa Indonesia santai**, tapi ringkas.
- **Kode, nama file, perintah, path, dan pesan error ditulis apa adanya.**
- **Konten website (berita, sambutan, visi, misi, sejarah) ditulis normal dan rapi**, bukan gaya caveman.
- **Dokumen (README, laporan) dan komentar kode berbahasa Indonesia ditulis normal.**
- Keluar dari mode ringkas (`stop caveman`) bila user bertanya "kenapa" atau minta penjelasan konsep.

### 2.4 ponytail
- Pakai mode `lite` atau `full`. Hindari `ultra` (paling agresif memangkas), karena bisa menabrak syarat komponen dan struktur tugas.
- Terapkan sebagai urutan pikir: **fitur bawaan Next.js/React/browser dulu, baru kode baru.** Contoh yang diharapkan di project ini:
  - `next/link`, `next/image`, `next/font/google`, `usePathname`, `notFound()`.
  - Animasi muncul-saat-scroll dengan `IntersectionObserver` native, bukan library.
  - Ikon dari `lucide-react` atau inline SVG, bukan library tambahan lain.
  - `generateStaticParams` dari data yang sudah ada, bukan mekanisme baru.
- Ponytail **tidak boleh** menghapus: validasi (VL), aksesibilitas (alt, fokus, aria), dan komponen wajib (Navbar, Footer, Hero, BeritaCard, ProgramCard, SectionHeading, Reveal). Ketentuan tugas meminta komponen reusable, jadi "reuse" berarti `BeritaCard` dipakai di tiga tempat, bukan card ditulis tiga kali.
- Jangan menambah dependency baru kecuali `lucide-react`.

### 2.5 design-taste-frontend
- Sebelum menulis kode UI, tulis **satu baris design read**: gaya, siapa pengguna, kesan yang dituju. Contoh: "Sinematik gelap, foto sekolah jadi bintang, kaca biru cyan sebagai penanda."
- Setel tiga dial (variasi desain, intensitas motion, kepadatan visual) ke: variasi **sedang**, motion **rendah-sedang** (hanya `Reveal` dan hover), kepadatan **rendah** (lega).
- **Yang diambil dari skill ini:** variasi keluarga layout antar section, pemeriksaan "AI tells", dan pre-flight akhir.
- **Yang diabaikan dari skill ini bila bertentangan dengan `DESIGN.md`:** palet, font, dan efek `.liquid-glass` (pakai yang di `DESIGN.md`).
- Aturan pre-flight yang berlaku di sini:
  - Tanpa tanda pisah panjang (em dash) di teks konten; pakai koma atau titik.
  - Tanpa label bernomor gaya "01 / Tentang" di atas heading.
  - Tanpa petunjuk scroll ("scroll ke bawah", panah bergerak).
  - **Tidak ada dua tombol dengan tujuan yang sama di satu halaman.** Di Home, tombol besar hanya satu per tujuan (Hero: `/about` dan `/berita`); di section lain, tautan ke tujuan yang sama dibuat sebagai tautan teks kecil atau dihapus. Ini merevisi tombol "Profil Sekolah" di card Sambutan pada `DESIGN.md`: ganti menjadi tautan teks "Baca sambutan lengkap" atau hapus.
  - Enam section Home memakai minimal 4 keluarga layout berbeda (pusat penuh, blok teks, gambar dengan overlay, split 2 kolom, grid card); susunan di `DESIGN.md` sudah memenuhi ini, jangan diseragamkan.

### 2.6 find-skills
- Pakai hanya bila ada kebutuhan yang belum tertutup skill di atas, misalnya audit aksesibilitas, SEO metadata, atau praktik terbaik Next.js.
- Cari dengan `npx skills find <kata kunci kemampuan + konteks>`, mis. `npx skills find nextjs app router`.
- **Sajikan hasil ke user** (nama skill, fungsi, sumbernya), lalu tunggu persetujuan. Jangan menjalankan `npx skills add` sendiri.
- Skill yang disarankan tidak boleh membawa hal terlarang (TypeScript, database, API, backend, login).
- Kalau tidak ada yang cocok, katakan singkat dan lanjutkan tanpa skill tambahan.

## 3. Ketentuan tugas (aturan keras)

- Next.js App Router, struktur `src/`, **JavaScript `.js`**, Tailwind CSS.
- **Dilarang:** TypeScript, database, API, backend, login/register, form pengirim data, framer-motion.
- Navigasi internal pakai `Link` dari `next/link`. Tag `<a>` hanya untuk tautan eksternal.
- `Navbar` dan `Footer` hanya dipanggil di `src/app/layout.js`.
- Halaman: `/`, `/about`, `/berita`, `/berita/[id]`. Minimal 6 berita (slug), `params` diakses async: `const { id } = await params;`.
- Minimal 3 komponen; target project ini 7. Card berita ditulis sekali di `BeritaCard.js`.
- Gambar di `public/`, tanpa URL gambar atau video eksternal. Logo `public/logo.png` harus transparan.
- Nama sekolah dan alamat hanya di `src/data/sekolah.js`, berita hanya di `src/data/berita.js`.
- Tailwind harus terlihat memakai: background, text color, font size, font weight, padding, margin, flex/grid, border, rounded, hover.
- Jangan sekadar mengganti teks contoh dosen; konten harus khas SMA Negeri 1 Kajen.
- Jangan menaruh seluruh kode di `page.js`.

## 4. Alur kerja

Kerjakan berurutan. Selesaikan dan verifikasi satu langkah sebelum lanjut.

1. **Siapkan.** Baca `docs/PRD.md`, `docs/SRS.md`, `docs/DESIGN.md`. Cek `rtk gain`. Minta user menjalankan `/setup-matt-pocock-skills` bila belum.
2. **Design read.** Tulis satu baris, setel dial (bagian 2.5).
3. **Scaffold.** `npx create-next-app@latest` dengan JavaScript, Tailwind, App Router, `src/`, tanpa TypeScript. Lalu `npm install lucide-react`.
4. **Fondasi.** `globals.css` (token warna, `.liquid-glass`, `.font-display`), font Instrument Serif lewat `next/font/google`, `layout.js`.
5. **Komponen global.** `Navbar` (client, menu aktif, hamburger), `Footer`, `Reveal` (client, IntersectionObserver, hormati reduced motion).
6. **Data.** `src/data/sekolah.js` dan `src/data/berita.js` (6 berita, slug unik, validasi VL-01 sampai VL-10).
7. **Komponen konten.** `Hero`, `SectionHeading`, `BeritaCard`, `ProgramCard`.
8. **Halaman.** Home, About, Berita, Detail Berita (termasuk kondisi "Berita tidak ditemukan" dan "Berita Lainnya").
9. **Pre-flight akhir** (bagian 5).
10. **Laporan** (bagian 6).

Warna: latar `#050C1A`, cyan `#08B2EE`, biru terang `#6FCFF6`, tombol `#2F4E8E` (hover `#3A64B3`). Teks sekunder tidak lebih redup dari putih/50. Heading besar boleh wrap di mobile (tanpa `whitespace-nowrap`).

## 5. Pre-flight akhir

Jalankan dan laporkan hasilnya. Semua harus lolos.

```bash
npm run build
find src -name "*.ts" -o -name "*.tsx"        # harus kosong
grep -rn "<a " src                              # hanya boleh link eksternal
grep -rn "<Navbar\|<Footer" src                 # hanya di layout.js
grep -n "framer-motion" package.json            # harus kosong
grep -rnE "src=\"https?://" src                 # harus kosong
grep -rn "—" src                                # tanpa em dash di konten
```

Lalu periksa manual:
- Semua link menu dan tombol membuka halaman yang benar (VL-32).
- Tidak ada scroll horizontal di 375 px sampai 1440 px (VL-21).
- Kontras teks di atas foto ber-overlay dan elemen kaca memadai (VL-19).
- Tidak ada dua tombol bertujuan sama di Home (aturan 2.5).
- URL berita salah (`/berita/abc`) menampilkan pesan, bukan error.

## 6. Format laporan ke user

Singkat (mode caveman), maksimal sekitar 10 baris:
- Apa yang dikerjakan (daftar file).
- Hasil pre-flight (lolos atau gagal per item).
- Hal yang perlu diisi user (alamat resmi, foto asli, logo transparan, slogan).
- Keputusan terbuka (mis. VL-13: pencocokan `id` persis atau dinormalkan).

## 7. Larangan

- Jangan menginstal skill, paket, atau dependency di luar daftar tanpa izin.
- Jangan mengubah file `SKILL.md` skill lain.
- Jangan menulis konten website dengan gaya caveman.
- Jangan menyalin konten, struktur, atau teks contoh dosen mentah-mentah.
- Jangan memakai gambar atau video dari URL eksternal.
- Jangan mengklaim sudah selesai sebelum `npm run build` sukses. 