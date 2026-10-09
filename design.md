# DESIGN: Website Profil SMA Negeri 1 Kajen

| | |
|---|---|
| **Versi** | 1.0 |
| **Dokumen terkait** | PRD.md, SRS.md |
| **Gaya** | Dark theme + "liquid glass" (elemen kaca transparan di atas foto) |
| **Implementasi** | Next.js (App Router), JavaScript, Tailwind CSS |

---

## 1. Konsep Desain

Website terasa **modern, tenang, dan premium**: latar navy sangat gelap, foto sekolah sebagai bintang utama, dan elemen antarmuka berupa kaca transparan yang melayang di atas foto. Warna aksen diambil dari logo sekolah (cyan dan biru navy) sehingga website terasa milik SMA Negeri 1 Kajen, bukan template generik.

Kata kunci: **gelap, lega, sinematik, berkaca, biru**.

## 2. Prinsip Desain

1. **Foto adalah bintang.** Efek kaca hanya terlihat bagus di atas foto, jadi pakai foto asli sekolah yang jelas dan terang.
2. **Satu fokus per section.** Jangan menumpuk banyak elemen dalam satu layar.
3. **Hierarki tegas.** Judul besar berfont serif dengan satu kata italic beraksen, isi sans-serif yang tenang.
4. **Ruang kosong lega.** Jarak antar section besar agar konten bernapas.
5. **Aksen hemat.** Cyan hanya untuk penanda kecil (menu aktif, ikon, titik timeline), bukan blok warna besar.
6. **Keterbacaan nomor satu.** Efek visual tidak boleh mengorbankan kontras teks.

## 3. Design Tokens

### 3.1 Warna

| Peran | Kode | Pemakaian |
|---|---|---|
| Latar dasar | `#050C1A` | background halaman, footer |
| Latar section selang-seling | `#081428` | pemisah antar section |
| Biru brand (cyan logo) | `#08B2EE` | garis menu aktif, ikon, titik timeline, highlight dekoratif |
| Biru muda terang | `#6FCFF6` | label kecil di atas heading, kata italic beraksen |
| Biru tombol solid | `#2F4E8E` (hover `#3A64B3`) | tombol primer, teks putih |
| Teks utama | `#FFFFFF` | judul |
| Teks isi | putih/70 | paragraf |
| Teks sekunder | putih/50 | label, tanggal, caption (jangan lebih redup dari ini) |
| Garis pemisah | putih/10 | divider, border halus |

Catatan: warna cyan **tidak boleh dipakai sebagai teks di latar terang** (kontras buruk). Pada tema gelap ini aman.

### 3.2 Tipografi

| Elemen | Font | Ukuran Tailwind | Gaya |
|---|---|---|---|
| Heading hero | Instrument Serif | `text-5xl sm:text-7xl lg:text-8xl` | putih, `tracking-tight`, boleh wrap, satu kata `<em>` italic |
| Heading section besar | Instrument Serif | `text-4xl md:text-6xl` (Visi x Misi: `text-5xl md:text-7xl lg:text-8xl`) | `leading-[1.1]`, `tracking-tight` |
| Judul card | sans-serif | `text-xl md:text-2xl` | putih, `tracking-tight` |
| Isi | sans-serif (Inter/Geist) | `text-base md:text-lg` | putih/70, `leading-relaxed` |
| Label | sans-serif | `text-xs` / `text-sm` | `uppercase tracking-widest`, putih/50 atau `#6FCFF6` |
| Caption/tanggal | sans-serif | `text-xs` | putih/50 |

Font **Instrument Serif** (regular dan italic) dimuat lewat `next/font/google` di `layout.js`, dipakai lewat class `.font-display` di `globals.css`.

### 3.3 Spasi, radius, bayangan

| Token | Nilai |
|---|---|
| Container | `max-w-6xl mx-auto px-6` |
| Jarak antar section | `py-28 md:py-40` |
| Radius card besar | `rounded-3xl` |
| Radius card kecil | `rounded-2xl` |
| Radius tombol dan navbar | `rounded-full` |
| Bayangan | hampir tidak ada; kedalaman dibuat oleh efek kaca dan border gradien |

## 4. Efek Liquid Glass

Satu class reusable `.liquid-glass` di `src/app/globals.css`, dipakai di **semua** elemen kaca (navbar, card, tombol sekunder, ikon sosial).

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.03);
  background-blend-mode: luminosity;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Catatan: efek blur hanya terlihat bila ada foto/konten di belakang elemen. Di atas latar polos, yang tampak hanya border gradien tipis.

## 5. Komponen

### 5.1 Navbar (`Navbar.js`, client component)
- `fixed top-4 inset-x-0 z-50 px-4`; isi berupa pill `.liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3`.
- Kiri: logo (`/logo.png`, 32 sampai 40px) dan nama sekolah (putih, `font-semibold`).
- Kanan (desktop): menu Home, About, Berita. Aktif: teks putih + garis bawah 2px `#08B2EE`. Tidak aktif: putih/70, hover putih.
- Mobile: hamburger (ikon Menu/X) yang membuka panel `.liquid-glass rounded-3xl` berisi 3 link; panel menutup setelah link diklik.

### 5.2 Footer (`Footer.js`)
- Latar `#050C1A`, `border-t border-white/10`.
- 3 kolom (desktop) dan 1 kolom (mobile): identitas sekolah, menu, alamat.
- Baris bawah: `© 2026 SMA Negeri 1 Kajen` (putih/50, `text-sm`).

### 5.3 Hero (`Hero.js`)
- `min-h-screen`, foto banner `absolute inset-0 object-cover`, overlay gradien dari `#050C1A` (atas 70%, tengah 40%, bawah 100%).
- Konten rata tengah: label nama sekolah (`#6FCFF6`), heading slogan, subtitle singkat, dua tombol.
- Tombol primer: `bg-[#2F4E8E] hover:bg-[#3A64B3] text-white rounded-full px-8 py-3`.
- Tombol sekunder: `.liquid-glass rounded-full px-8 py-3 hover:bg-white/5`.
- Bawah hero: tiga ikon sosial dalam lingkaran `.liquid-glass`.

### 5.4 BeritaCard (`BeritaCard.js`)
- `.liquid-glass rounded-3xl group`, hover naik 4px dan `bg-white/5`.
- Gambar `aspect-[4/3]`, `object-cover`, zoom 1.05 saat hover (`duration-700`).
- Body `p-6`: tanggal (ikon kalender kecil), judul (maks 2 baris), ringkasan (maks 3 baris), tombol "Baca Selengkapnya" dengan ikon panah di lingkaran kaca.

### 5.5 ProgramCard (`ProgramCard.js`)
- Struktur mirip BeritaCard, gambar `aspect-video`, ditambah tag kecil uppercase di atas judul.

### 5.6 SectionHeading (`SectionHeading.js`)
- Label kecil di atas, judul `font-display`, satu kata italic berwarna putih/60.

### 5.7 Reveal (`Reveal.js`, client component)
- Pembungkus animasi muncul saat scroll (lihat bagian Motion).

## 6. Layout Halaman

### 6.1 Home (`/`)
1. **Hero**: banner penuh layar.
2. **Tentang Kami**: label, heading serif dua baris, satu paragraf, link "Selengkapnya →". Radial gradient halus putih 3% di atas.
3. **Sambutan Kepala Sekolah**: foto `rounded-3xl aspect-video` dengan gradien bawah; card kaca di kiri bawah (label, sambutan, nama dan jabatan); tombol kaca "Profil Sekolah" di kanan bawah.
4. **Visi x Misi**: judul besar dengan "x" italic putih/40; grid 2 kolom (foto kiri, teks kanan dengan dua blok dipisah garis tipis).
5. **Program Unggulan**: header sejajar, grid 2 ProgramCard.
6. **Berita Terbaru**: header dengan link "Lihat semua →", grid 3 BeritaCard.

### 6.2 About (`/about`)
- Header halaman (`pt-40 pb-16`): label, judul, breadcrumb.
- Section berurutan: Profil, Sejarah (timeline vertikal, titik cyan), Visi (blok kaca dengan kutipan besar), Misi (card kaca bernomor, 2 kolom), Alamat (info + peta/placeholder), Fasilitas (grid foto 3 kolom), Ekstrakurikuler (card kecil berikon), Prestasi (badge kaca).

### 6.3 Berita (`/berita`)
- Header halaman seperti About, lalu grid BeritaCard (1/2/3 kolom).

### 6.4 Detail Berita (`/berita/[id]`)
- Breadcrumb, gambar utama `aspect-video rounded-3xl`, tanggal, judul serif besar.
- Isi `max-w-3xl mx-auto`, `text-lg text-white/80 leading-relaxed`, jarak paragraf `mb-6`.
- Tombol kaca "← Kembali ke Berita", lalu "Berita Lainnya" (3 card).
- Keadaan tidak ditemukan: pesan "Berita tidak ditemukan" + tombol kembali.

## 7. Motion

| Elemen | Perilaku |
|---|---|
| Section (via `Reveal`) | fade-in dan naik dari `translate-y-8`, `duration-700`, sekali saja saat masuk viewport |
| Card dalam grid | stagger delay 150 ms per card |
| Card hover | naik 4px, `bg-white/5` |
| Gambar card hover | zoom 1.05, `duration-700` |
| Tombol hover | `hover:bg-white/5` atau `hover:scale-105` |

Hormati `prefers-reduced-motion`: gunakan `motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`. Tanpa library animasi tambahan.

## 8. Responsif

| Breakpoint | Perilaku |
|---|---|
| Mobile (375px sampai < 768px) | 1 kolom, hamburger menu, heading lebih kecil, jarak section lebih rapat |
| Tablet (`md:`, 768px) | grid card 2 kolom, layout 2 kolom aktif |
| Desktop (`lg:`, 1024px ke atas) | grid card 3 kolom, heading ukuran penuh |

Tidak boleh ada scroll horizontal di ukuran apa pun.

## 9. Aksesibilitas

- Kontras teks minimal 4.5:1 (karena itu label tidak boleh lebih redup dari putih/50).
- Semua gambar punya `alt` deskriptif.
- Target sentuh tombol dan link minimal 44 x 44 px.
- Fokus keyboard terlihat (`focus-visible:ring-2 ring-[#08B2EE]`).
- Tombol hamburger punya `aria-label` dan `aria-expanded`.

## 10. Aset Gambar

| File | Isi | Rasio/ukuran saran |
|---|---|---|
| `public/logo.png` | logo sekolah, **background transparan** | persegi, min. 256px |
| `public/sekolah.jpg` | foto gedung/halaman sekolah (hero) | 1920 x 1080 |
| `public/sambutan.jpg` | foto kepala sekolah/gedung | 1600 x 900 |
| `public/kegiatan.jpg` | foto kegiatan siswa | 1200 x 900 |
| `public/program1.jpg`, `program2.jpg` | foto program unggulan | 1280 x 720 |
| `public/berita1.jpg` sampai `berita6.jpg` | foto berita | 1200 x 900 |

Logo asli memiliki border biru tua yang bisa menyatu dengan latar gelap; bila terasa tenggelam, beri `drop-shadow` tipis berwarna cyan.

## 11. Do dan Don't

| Do | Don't |
|---|---|
| Pakai foto asli sekolah | Pakai placeholder abu-abu atau stock gaya kantor |
| Satu aksen cyan per area kecil | Memakai cyan sebagai blok warna besar |
| Satu kata italic per heading | Memakai italic di seluruh kalimat |
| Pakai `.liquid-glass` di semua elemen kaca | Menulis ulang gaya kaca berbeda-beda per komponen |
| Heading boleh wrap di mobile | `whitespace-nowrap` pada heading besar |
| Ikon satu set konsisten (lucide, garis tipis) | Emoji sebagai ikon |
| Tailwind untuk semua styling | CSS terpisah selain `.liquid-glass` dan token font |

## 12. Contoh Class Tailwind (bukti pemakaian materi)

| Properti | Contoh |
|---|---|
| background | `bg-[#050C1A]`, `bg-[#2F4E8E]` |
| text color | `text-white`, `text-white/70` |
| font size | `text-5xl`, `text-sm` |
| font weight | `font-semibold` |
| padding / margin | `px-8 py-3`, `mb-6` |
| flex / grid | `flex justify-between`, `grid md:grid-cols-3 gap-6` |
| border | `border-t border-white/10` |
| rounded | `rounded-full`, `rounded-3xl` |
| hover | `hover:bg-white/5`, `hover:scale-105` |