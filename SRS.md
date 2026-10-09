# SRS: Website Profil SMA Negeri 1 Kajen

| | |
|---|---|
| **Versi** | 2.0 |
| **Dokumen terkait** | PRD.md, DESIGN.md |
| **Tech stack** | Next.js (App Router), JavaScript, Tailwind CSS |
| **Fokus dokumen** | Validasi, behaviour (perilaku sistem), dan aturan aplikasi |

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini menjabarkan **bagaimana website harus berperilaku**, **validasi apa yang berlaku**, dan **aturan apa yang harus dipatuhi** selama pengembangan. Dokumen ini turunan teknis dari PRD.md dan mengacu pada DESIGN.md untuk hal visual.

### 1.2 Ruang lingkup
Website profil sekolah **statis**: tanpa backend, database, API, dan login. Semua data dari file JavaScript di `src/data/`. Tidak ada input pengguna yang dikirim ke server, sehingga "validasi" berfokus pada:
- validitas **parameter URL** (`[id]`),
- validitas **data statis** (berita dan profil sekolah),
- validitas **tampilan** (kontras, responsif, aksesibilitas),
- validitas **kepatuhan terhadap ketentuan tugas**.

### 1.3 Definisi

| Istilah | Arti |
|---|---|
| Slug | ID berita berbentuk teks URL-friendly, mis. `lomba-basket` |
| Dynamic route | Route `[id]` yang satu file-nya melayani banyak URL |
| Layout | `src/app/layout.js`, kerangka bersama semua halaman |
| Liquid glass | Gaya elemen kaca transparan lewat class `.liquid-glass` |
| Reveal | Komponen animasi muncul saat scroll |

### 1.4 Asumsi
- Pengguna memakai browser modern (desktop dan mobile).
- Konten berita berupa data simulasi yang masuk akal.
- Aplikasi dijalankan dengan `npm run dev` atau di-build dengan `npm run build`.

---

## 2. Aturan Aplikasi (Business Rules)

### 2.1 Aturan teknologi

| ID | Aturan |
|---|---|
| BR-01 | Wajib Next.js dengan App Router dan struktur `src/` |
| BR-02 | Wajib JavaScript (`.js`); file `.ts` dan `.tsx` **tidak boleh** ada |
| BR-03 | Wajib Tailwind CSS untuk styling; CSS kustom hanya `.liquid-glass` dan token font di `globals.css` |
| BR-04 | Dilarang database, API, backend, login/register, dan form pengirim data |
| BR-05 | Navigasi internal wajib `Link` dari `next/link`; tag `<a>` hanya untuk link eksternal |
| BR-06 | Semua gambar disimpan di `public/` dan dirujuk dengan path diawali `/`; tidak memakai gambar/video dari URL eksternal |
| BR-07 | Tidak memakai library animasi (framer-motion); animasi memakai Tailwind dan `Reveal.js` |
| BR-08 | Library tambahan hanya `lucide-react` (ikon); boleh diganti inline SVG |

### 2.2 Aturan struktur dan komponen

| ID | Aturan |
|---|---|
| BR-09 | Nama folder di `src/app/` menentukan URL; `page.js` adalah halaman yang tampil |
| BR-10 | `Navbar` dan `Footer` **hanya** dipanggil di `layout.js` |
| BR-11 | Urutan di `<body>`: `<Navbar />`, `{children}`, `<Footer />` |
| BR-12 | Minimal 3 komponen selain halaman; rencana: `Navbar`, `Footer`, `Hero`, `BeritaCard`, `ProgramCard`, `SectionHeading`, `Reveal` |
| BR-13 | Tampilan card berita hanya ditulis sekali di `BeritaCard.js` dan dipakai di Home, `/berita`, dan "Berita Lainnya" |
| BR-14 | Dilarang menaruh seluruh kode website dalam satu `page.js` atau satu halaman |
| BR-15 | Data berita hanya ada di `src/data/berita.js` |
| BR-16 | Nama sekolah, alamat, slogan, dan konten profil hanya ditulis di `src/data/sekolah.js` dan dipakai Navbar, Footer, Hero, About |
| BR-17 | `Navbar` dan `Reveal` adalah client component (`"use client"`); komponen lain sebisa mungkin server component |

### 2.3 Aturan konten

| ID | Aturan |
|---|---|
| BR-18 | Minimal 6 berita |
| BR-19 | Home menampilkan minimal 3 berita terbaru (urut tanggal terbaru) |
| BR-20 | Setiap berita wajib punya: `id`, `judul`, `tanggal`, `ringkasan`, `isi`, `gambar` |
| BR-21 | Konten disesuaikan dengan SMA Negeri 1 Kajen, bukan sekadar mengganti teks contoh |
| BR-22 | Gambar relevan dengan sekolah (logo, gedung, kegiatan, prestasi, ekstrakurikuler) |
| BR-23 | Footer wajib memuat nama sekolah, alamat, dan copyright; tampil di semua halaman |

### 2.4 Aturan desain (mengacu DESIGN.md)

| ID | Aturan |
|---|---|
| BR-24 | Palet: latar `#050C1A`, aksen cyan `#08B2EE`, biru terang `#6FCFF6`, tombol solid `#2F4E8E` |
| BR-25 | Semua elemen kaca memakai satu class `.liquid-glass`, tidak ditulis ulang per komponen |
| BR-26 | Heading besar memakai font Instrument Serif lewat `next/font/google`; maksimal satu kata italic beraksen per heading |
| BR-27 | Cyan tidak dipakai sebagai warna teks di latar terang |
| BR-28 | Teks sekunder tidak boleh lebih redup dari putih/50 |
| BR-29 | Logo memakai `public/logo.png` dengan background transparan |

---

## 3. Validasi

### 3.1 Validasi data berita (`src/data/berita.js`)

| ID | Field | Aturan validasi |
|---|---|---|
| VL-01 | `id` | Wajib ada, string, **unik** antar berita |
| VL-02 | `id` | Format slug: huruf kecil, angka, tanda hubung; tanpa spasi atau karakter khusus |
| VL-03 | `judul` | Wajib ada, string tidak kosong |
| VL-04 | `tanggal` | Wajib ada, format konsisten di semua berita (mis. `10 Oktober 2026`) |
| VL-05 | `ringkasan` | Wajib ada; 1-2 kalimat (di card dipotong maks. 3 baris) |
| VL-06 | `isi` | Wajib ada, array minimal 2 paragraf, tiap paragraf string tidak kosong |
| VL-07 | `gambar` | Wajib ada, diawali `/`, dan file ada di `public/` |

### 3.2 Validasi data sekolah (`src/data/sekolah.js`)

| ID | Aturan |
|---|---|
| VL-08 | `nama`, `slogan`, `alamat` wajib terisi (bukan placeholder "XX") |
| VL-09 | `misi` berupa array minimal 3 butir; `sejarah` berupa array berurut tahun |
| VL-10 | `programUnggulan` berisi tepat 2 item, masing-masing punya `tag`, `judul`, `deskripsi`, `gambar` |

### 3.3 Validasi parameter URL (`/berita/[id]`)

| ID | Kondisi | Hasil yang diharapkan |
|---|---|---|
| VL-11 | `id` cocok dengan salah satu `berita.id` | Halaman detail ditampilkan |
| VL-12 | `id` tidak ditemukan (mis. `/berita/abc`) | Tampilkan "Berita tidak ditemukan" dan tombol kembali ke `/berita`; tidak boleh crash atau layar kosong |
| VL-13 | `id` beda huruf besar/kecil (mis. `/berita/Lomba-Basket`) | Diperlakukan tidak ditemukan (pencocokan persis), kecuali tim memilih menormalkan ke huruf kecil; pilihan harus konsisten |
| VL-14 | `id` kosong (`/berita/`) | Menampilkan halaman daftar `/berita` |
| VL-15 | `params` | Diakses async: `const { id } = await params;` pada `async function` |

### 3.4 Validasi tampilan dan komponen

| ID | Aturan |
|---|---|
| VL-16 | Setiap gambar punya `alt` deskriptif |
| VL-17 | Setiap list hasil `map` punya `key` unik (pakai `id`) |
| VL-18 | Komponen dengan props (mis. `BeritaCard`) tetap tampil wajar bila prop kosong (tidak menampilkan `undefined`) |
| VL-19 | Kontras teks terhadap latar minimal 4.5:1 (cek di atas foto ber-overlay dan di atas elemen kaca) |
| VL-20 | Target sentuh tombol dan link di mobile minimal 44 x 44 px |
| VL-21 | Tidak ada scroll horizontal pada lebar 375 px sampai 1440 px |
| VL-22 | Fokus keyboard terlihat pada semua link dan tombol |
| VL-23 | Tombol hamburger punya `aria-label` dan `aria-expanded` |
| VL-24 | Logo tampil tanpa kotak latar (PNG transparan) |
| VL-25 | Animasi nonaktif/instan bila pengguna mengaktifkan "reduced motion" |

### 3.5 Validasi kepatuhan tugas (checklist review)

| ID | Pemeriksaan | Cara cek |
|---|---|---|
| VL-26 | Tidak ada file TypeScript | Cari `*.ts` / `*.tsx` |
| VL-27 | Tidak ada tag `<a>` untuk link internal | Cari `<a ` di `src/` |
| VL-28 | `Navbar` dan `Footer` hanya di `layout.js` | Cari `<Navbar` dan `<Footer` |
| VL-29 | Tailwind terlihat memakai: background, text color, font size, font weight, padding, margin, flex/grid, border, rounded, hover | Telusuri `className` |
| VL-30 | Tidak ada `framer-motion` di `package.json` | Cek dependencies |
| VL-31 | `npm run build` sukses tanpa error | Jalankan build |
| VL-32 | Semua link menu dan tombol membuka halaman yang benar | Uji manual |
| VL-33 | Tidak ada URL gambar/video eksternal | Cari `http` pada `src=` |

---

## 4. Behaviour Sistem

### 4.1 Behaviour global

| ID | Behaviour |
|---|---|
| BH-01 | Navbar tampil melayang di atas semua halaman (fixed); footer di bagian bawah |
| BH-02 | Klik logo/nama sekolah di Navbar membuka `/` |
| BH-03 | Klik menu Home, About, Berita membuka `/`, `/about`, `/berita` tanpa reload penuh (client-side navigation lewat `Link`) |
| BH-04 | Menu aktif ditandai teks putih dan garis bawah cyan 2px (berdasarkan `usePathname`) |
| BH-05 | Di mobile, menu berubah menjadi hamburger; klik membuka panel kaca, klik link atau ikon X menutupnya |
| BH-06 | Elemen interaktif (tombol, link, card) memberi umpan balik saat di-hover |
| BH-07 | Section muncul dengan fade dan geser halus saat pertama kali masuk layar, hanya sekali (komponen `Reveal`) |
| BH-08 | Grid card: 1 kolom (mobile), 2 (`md:`), 3 (`lg:`) |
| BH-09 | Konten halaman non-hero tidak tertutup Navbar (padding atas cukup) |

### 4.2 Behaviour Home (`/`)

| ID | Behaviour |
|---|---|
| BH-10 | Hero menampilkan banner sekolah, label nama sekolah, slogan, dan subtitle; teks tetap terbaca di atas foto (overlay gradien) |
| BH-11 | Tombol "Tentang Kami" membuka `/about`; "Lihat Berita" membuka `/berita` |
| BH-12 | Section tampil berurutan: Hero, Tentang Kami, Sambutan, Visi x Misi, Program Unggulan, Berita Terbaru |
| BH-13 | "Berita Terbaru" menampilkan tepat 3 berita terbaru memakai `BeritaCard` |
| BH-14 | Link "Lihat semua" membuka `/berita`; link "Selengkapnya" dan "Profil Sekolah" membuka `/about` |
| BH-15 | Ikon media sosial di Hero membuka link eksternal di tab baru |

### 4.3 Behaviour About (`/about`)

| ID | Behaviour |
|---|---|
| BH-16 | Menampilkan header halaman dengan breadcrumb (Home > About) |
| BH-17 | Section berurutan: Profil, Sejarah, Visi, Misi, Alamat, lalu Fasilitas, Ekstrakurikuler, Prestasi |
| BH-18 | Sejarah ditampilkan sebagai timeline vertikal; Misi sebagai daftar bernomor |

### 4.4 Behaviour Berita (`/berita`)

| ID | Behaviour |
|---|---|
| BH-19 | Menampilkan seluruh berita dari `berita.js` (minimal 6) dalam grid card, urut tanggal terbaru |
| BH-20 | Tiap card menampilkan gambar, judul, tanggal, ringkasan, dan tombol "Baca Selengkapnya" |
| BH-21 | Klik "Baca Selengkapnya" membuka `/berita/{id}` milik berita tersebut |
| BH-22 | Hover card: naik sedikit, latar sedikit terang, gambar zoom halus |

### 4.5 Behaviour Detail Berita (`/berita/[id]`)

| ID | Behaviour |
|---|---|
| BH-23 | Satu file `page.js` melayani semua URL berita berdasarkan `id` |
| BH-24 | Halaman menampilkan breadcrumb, gambar utama, tanggal, judul, dan seluruh paragraf isi |
| BH-25 | Tombol "Kembali ke Berita" membuka `/berita` |
| BH-26 | Bila berita tidak ditemukan, tampil "Berita tidak ditemukan" dan link kembali ke `/berita`; Navbar dan Footer tetap tampil |
| BH-27 | Bagian "Berita Lainnya" menampilkan 3 berita selain yang sedang dibuka |
| BH-28 | Lebar teks isi dibatasi (maks. sekitar 720px) agar nyaman dibaca |

### 4.6 Behaviour gambar dan efek kaca

| ID | Behaviour |
|---|---|
| BH-29 | Gambar menyesuaikan lebar kontainer dan tidak terdistorsi (`object-cover`) |
| BH-30 | Bila file gambar belum ada, layout tidak rusak (gunakan placeholder sementara) |
| BH-31 | Elemen `.liquid-glass` menampilkan blur latar dan border gradien tipis; tanpa foto di belakangnya, hanya border yang terlihat (perilaku normal) |

---

## 5. Alur Pengguna (Skenario)

**Skenario 1: membaca berita dari Home**
1. Pengguna membuka `/` dan melihat 3 berita terbaru.
2. Pengguna klik "Baca Selengkapnya" pada salah satu card.
3. Sistem membuka `/berita/{id}` dan menampilkan detail.
4. Pengguna klik "Kembali ke Berita" dan sistem membuka `/berita`.

**Skenario 2: mengenal sekolah**
1. Pengguna klik menu "About" di Navbar.
2. Sistem membuka `/about` dan menandai menu About sebagai aktif.
3. Pengguna membaca profil, sejarah, visi, misi, dan alamat.

**Skenario 3: URL berita salah**
1. Pengguna membuka `/berita/tidak-ada`.
2. Sistem menampilkan "Berita tidak ditemukan" beserta tombol kembali ke `/berita`.
3. Navbar dan Footer tetap tampil normal.

**Skenario 4: membuka dari ponsel**
1. Pengguna membuka `/` di layar 375 px; menu tampil sebagai hamburger.
2. Pengguna menekan hamburger, panel menu terbuka, lalu memilih "Berita".
3. Panel menutup dan halaman `/berita` tampil 1 kolom tanpa scroll horizontal.

---

## 6. Kebutuhan Non-Fungsional Terkait

| ID | Kebutuhan |
|---|---|
| NF-01 | Responsif pada lebar 375 px sampai 1440 px |
| NF-02 | Tidak ada error di console browser saat membuka semua halaman |
| NF-03 | `npm run build` dan `npm run dev` berjalan tanpa error |
| NF-04 | Kode diberi komentar singkat berbahasa Indonesia pada bagian penting |
| NF-05 | Konvensi nama: komponen `PascalCase.js`, data `camelCase`, slug `kebab-case` |

---

## 7. Matriks Keterlacakan Singkat

| Fitur PRD | Aturan | Validasi | Behaviour |
|---|---|---|---|
| Home | BR-16, BR-19, BR-23 | VL-16, VL-19 | BH-10 s.d. BH-15 |
| About | BR-16, BR-21 | VL-08, VL-09, VL-16 | BH-16 s.d. BH-18 |
| Berita | BR-13, BR-15, BR-18, BR-20 | VL-01 s.d. VL-07, VL-17 | BH-19 s.d. BH-22 |
| Detail Berita | BR-15 | VL-11 s.d. VL-15 | BH-23 s.d. BH-28 |
| Navbar | BR-05, BR-10, BR-11, BR-17 | VL-23, VL-28 | BH-01 s.d. BH-05 |
| Footer | BR-10, BR-23 | VL-28 | BH-01 |
| Styling dan efek kaca | BR-03, BR-24 s.d. BR-29 | VL-19, VL-29 | BH-06 s.d. BH-08, BH-31 |
| Animasi | BR-07, BR-17 | VL-25, VL-30 | BH-07 |
| Komponen | BR-12, BR-13, BR-14 | VL-27, VL-28 | n/a |

---

## 8. Kriteria Penerimaan

Website memenuhi SRS bila:
1. Semua aturan BR-01 s.d. BR-29 dipatuhi.
2. Semua pemeriksaan VL-01 s.d. VL-33 lolos.
3. Semua behaviour BH-01 s.d. BH-31 dapat didemonstrasikan.
4. Keempat skenario pada bagian 5 berjalan sesuai penjelasan.