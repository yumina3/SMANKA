# PRD: Website Profil SMA Negeri 1 Kajen

| | |
|---|---|
| **Versi** | 2.0 |
| **Jenis proyek** | Tugas kuliah (frontend, routing, layout, component) |
| **Tech stack** | Next.js (App Router), JavaScript, Tailwind CSS |
| **Dokumen terkait** | DESIGN.md, SRS.md |
| **Status** | Draft |

---

## 1. Ringkasan

Website profil statis untuk **SMA Negeri 1 Kajen, Kabupaten Pekalongan** yang memperkenalkan sekolah, menampilkan profil lengkap, dan menyajikan berita kegiatan. Tampilan memakai tema gelap dengan efek "liquid glass" dan palet biru yang diambil dari logo sekolah (lihat DESIGN.md).

Tidak ada backend, database, API, atau login. Seluruh data (terutama berita) disimpan sebagai data statis di file JavaScript.

Fokus tugas: **frontend, component reusable, routing berbasis folder, dynamic route, dan layout bersama** pada Next.js.

## 2. Tujuan

### Tujuan produk
- Memperkenalkan sekolah secara menarik, rapi, dan terpercaya.
- Menyediakan informasi profil sekolah (sejarah, visi, misi, alamat, fasilitas, prestasi).
- Menyajikan berita kegiatan beserta halaman detailnya.
- Mencerminkan identitas visual sekolah lewat warna dan logo.

### Tujuan akademik
- Menerapkan routing App Router (nama folder menjadi URL, `page.js` menjadi halaman).
- Menerapkan dynamic route `[id]`.
- Menerapkan `layout.js` sebagai kerangka bersama (Navbar dan Footer tidak diulang).
- Membuat component reusable, bukan copy-paste kode.
- Menggunakan Tailwind CSS dan `Link` dari `next/link`.

### Di luar cakupan (non-goals)
- TypeScript, database, API, backend, login/register, dashboard admin, CMS.
- Form yang mengirim data (termasuk newsletter), pencarian, komentar.
- Library animasi (framer-motion); animasi dibuat dengan Tailwind dan komponen `Reveal`.

## 3. Target Pengguna

| Pengguna | Kebutuhan utama |
|---|---|
| Calon siswa | Mengenal sekolah, prestasi, fasilitas |
| Orang tua | Melihat kredibilitas, alamat, program unggulan |
| Siswa | Membaca berita dan kegiatan terbaru |
| Masyarakat umum | Informasi umum dan lokasi sekolah |

## 4. Ruang Lingkup Fitur

### 4.1 Halaman wajib

| No | Halaman | URL | File |
|---|---|---|---|
| 1 | Home | `/` | `src/app/page.js` |
| 2 | About | `/about` | `src/app/about/page.js` |
| 3 | Berita | `/berita` | `src/app/berita/page.js` |
| 4 | Detail Berita | `/berita/[id]` | `src/app/berita/[id]/page.js` |

### 4.2 Halaman tambahan (opsional, nilai tambah)
`/galeri`, `/guru`, `/prestasi`, `/fasilitas`, `/ekstrakurikuler`, `/kontak`, selama fungsi utama tetap berjalan.

## 5. Kebutuhan Fungsional

### FR-1: Home (`/`)
Section berurutan:
1. **Hero**: nama sekolah, logo (di navbar), foto banner, slogan, dua tombol (ke `/about` dan `/berita`).
2. **Tentang Kami**: informasi singkat tentang sekolah dengan link ke `/about`.
3. **Sambutan Kepala Sekolah**: foto, sambutan singkat, nama dan jabatan.
4. **Visi x Misi**: ringkasan visi dan misi dengan link ke `/about`.
5. **Program Unggulan**: 2 program (memakai `ProgramCard`).
6. **Berita Terbaru**: minimal 3 berita terbaru (memakai `BeritaCard`) dan link "Lihat semua".

### FR-2: About (`/about`)
- Wajib: Profil Sekolah, Sejarah Singkat, Visi, Misi, Alamat.
- Tambahan: Fasilitas, Ekstrakurikuler, Prestasi, Program Unggulan, Struktur Organisasi.

### FR-3: Berita (`/berita`)
- Daftar **minimal 6 berita** dalam grid, urut tanggal terbaru.
- Tiap berita: **gambar, judul, tanggal, ringkasan, tombol "Baca Selengkapnya"**.
- Berita boleh berupa data simulasi yang masuk akal.

### FR-4: Detail Berita (`/berita/[id]`)
- Satu file halaman melayani banyak URL, mis. `/berita/penerimaan-siswa-baru`.
- Menampilkan judul, tanggal, gambar, isi berita, tombol **"Kembali ke Berita"**, dan "Berita Lainnya".
- Data diambil dari `src/data/berita.js` berdasarkan `id` (slug).
- Jika `id` tidak ditemukan, tampilkan "Berita tidak ditemukan" beserta link kembali.
- Catatan teknis: `params` bersifat async (`const { id } = await params;`).

### FR-5: Navbar (`src/components/Navbar.js`)
- Berisi logo dan nama sekolah, menu **Home, About, Berita**.
- Dipanggil **hanya sekali** di `layout.js`.
- Menu aktif diberi penanda; di mobile berubah menjadi hamburger.

### FR-6: Footer (`src/components/Footer.js`)
- Berisi nama sekolah, alamat, menu, dan copyright `© 2026 SMA Negeri 1 Kajen`.
- Muncul di **seluruh halaman** lewat `layout.js`.

### FR-7: Component reusable
- Komponen: `Navbar`, `Footer`, `Hero`, `BeritaCard`, `ProgramCard`, `SectionHeading`, `Reveal` (jauh di atas minimum 3).
- `BeritaCard` dipakai di Home, `/berita`, dan "Berita Lainnya" tanpa duplikasi kode.

### FR-8: Navigasi
- Semua perpindahan halaman internal memakai `Link` dari `next/link`, bukan `<a>`. Tag `<a>` hanya untuk link eksternal (mis. media sosial).

### FR-9: Animasi muncul saat scroll
- Komponen `Reveal` memunculkan section dengan fade dan geser halus saat masuk layar, sekali saja, dan menghormati pengaturan "reduced motion".

## 6. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| Responsif | 1 kolom (mobile), 2 (`md:`), 3 (`lg:`); tanpa scroll horizontal |
| Keterbacaan | Kontras teks minimal 4.5:1, lebar teks artikel nyaman |
| Performa | Gambar dioptimalkan, tanpa video eksternal, tanpa library animasi |
| Kemudahan perubahan | Nama sekolah, alamat, dan konten profil ada di `src/data/sekolah.js` |
| Bahasa | Konten berbahasa Indonesia |
| Aksesibilitas | `alt` pada gambar, fokus keyboard terlihat, target sentuh min. 44px |

## 7. Desain UI/UX (ringkasan)

Rincian lengkap ada di **DESIGN.md**. Ringkasnya:

- Tema gelap: latar `#050C1A`, aksen cyan logo `#08B2EE`, tombol `#2F4E8E`.
- Font judul Instrument Serif (satu kata italic beraksen), isi sans-serif.
- Elemen kaca lewat satu class `.liquid-glass` di `globals.css`.
- Alur pengguna utama: `Home` → `Berita` → `Detail Berita` → `Kembali ke Berita`; semua halaman dapat dijangkau maksimal 3 klik.

## 8. Struktur Project

```
src/
├── app/
│   ├── layout.js
│   ├── globals.css
│   ├── page.js
│   ├── about/
│   │   └── page.js
│   └── berita/
│       ├── page.js
│       └── [id]/
│           └── page.js
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── BeritaCard.js
│   ├── ProgramCard.js
│   ├── SectionHeading.js
│   └── Reveal.js
└── data/
    ├── berita.js
    └── sekolah.js
public/
├── logo.png            (background transparan)
├── sekolah.jpg
├── sambutan.jpg
├── kegiatan.jpg
├── program1.jpg, program2.jpg
└── berita1.jpg ... berita6.jpg
```

Struktur `layout.js`:

```jsx
<body>
  <Navbar />
  {children}
  <Footer />
</body>
```

## 9. Model Data

### `src/data/berita.js`

| Field | Tipe | Contoh |
|---|---|---|
| `id` | string (slug) | `"penerimaan-siswa-baru"` |
| `judul` | string | `"Penerimaan Siswa Baru 2026/2027 Dibuka"` |
| `tanggal` | string | `"10 Oktober 2026"` |
| `ringkasan` | string | 1-2 kalimat |
| `isi` | array of string | 2-3 paragraf |
| `gambar` | string | `"/berita1.jpg"` |

### `src/data/sekolah.js`

| Field | Keterangan |
|---|---|
| `nama` | "SMA Negeri 1 Kajen" |
| `slogan` | slogan di Hero |
| `alamat` | alamat resmi sekolah (diisi sendiri) |
| `sambutan` | teks, nama, dan jabatan kepala sekolah |
| `visi`, `misi` | string dan array |
| `sejarah` | array `{ tahun, teks }` |
| `fasilitas`, `ekstrakurikuler`, `prestasi` | array |
| `programUnggulan` | array 2 item `{ tag, judul, deskripsi, gambar }` |

### Usulan 6 topik berita
Penerimaan siswa baru, lomba basket, juara olimpiade sains, pentas seni, kegiatan pramuka, kunjungan industri (sesuaikan dengan kegiatan nyata sekolah).

## 10. Ketentuan Teknis

**Wajib:** Next.js, JavaScript (`.js`), App Router, Tailwind CSS. Ikon memakai `lucide-react` (opsional; bisa diganti inline SVG).

**Dilarang:** TypeScript, database, API, backend, login/register.

**Larangan lain:**
- Hanya mengganti teks dari contoh dosen.
- Menyalin project teman.
- Menaruh seluruh website dalam satu halaman atau seluruh kode di `page.js`.
- Membuat Navbar berulang di tiap halaman.

## 11. Kriteria Penerimaan (Checklist)

| No | Kriteria | Selesai |
|---|---|---|
| 1 | Home `/` berfungsi dan berisi semua section wajib | ☐ |
| 2 | About `/about` berisi profil, sejarah, visi, misi, alamat | ☐ |
| 3 | Berita `/berita` menampilkan minimal 6 berita lengkap | ☐ |
| 4 | Detail berita `/berita/[id]` bekerja untuk semua berita | ☐ |
| 5 | Navbar dipakai lewat `layout.js`, tidak diulang | ☐ |
| 6 | Footer muncul di semua halaman | ☐ |
| 7 | Tailwind CSS dipakai (semua properti yang diminta terlihat) | ☐ |
| 8 | Minimal 3 component (di proyek ini 7) | ☐ |
| 9 | Navigasi internal memakai `Link` | ☐ |
| 10 | Tampilan responsif sederhana | ☐ |
| 11 | JavaScript, bukan TypeScript | ☐ |
| 12 | Gambar di `public/`, relevan dengan sekolah, logo transparan | ☐ |
| 13 | Konten disesuaikan dengan SMA Negeri 1 Kajen (bukan teks contoh) | ☐ |
| 14 | Desain sesuai DESIGN.md (palet biru logo, efek kaca) | ☐ |

## 12. Rencana Pengerjaan

| Tahap | Pekerjaan |
|---|---|
| 1 | Setup project (`create-next-app`: JavaScript, Tailwind, App Router, `src/`), install `lucide-react`, siapkan data dan gambar |
| 2 | `globals.css` (token dan `.liquid-glass`), font, `layout.js`, `Navbar`, `Footer`, `Reveal` |
| 3 | `Hero`, `SectionHeading`, `BeritaCard`, `ProgramCard`, halaman Home |
| 4 | Halaman About |
| 5 | Halaman Berita dan Detail Berita (dynamic route) |
| 6 | Responsif, polish tampilan, uji semua link, `npm run build` |
| 7 | (Opsional) Halaman tambahan: galeri, kontak, dll. |

## 13. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Efek kaca tidak terlihat | Pakai foto asli yang jelas di belakang elemen kaca |
| Logo tampil dengan kotak latar abu-abu | Hapus background logo, simpan PNG transparan |
| `params` error di dynamic route | Gunakan `async` page dan `await params` |
| Gambar tidak muncul | Path dimulai `/` dan file ada di `public/` |
| Konten terkesan generik | Pakai data nyata SMA Negeri 1 Kajen |
| Kode menumpuk di `page.js` | Pecah ke component sejak awal |
| Navbar fixed menutupi konten | Beri `pt-40` pada header halaman non-hero |