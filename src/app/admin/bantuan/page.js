"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Users,
  GraduationCap,
  BookOpen,
  Newspaper,
  FileText,
  LifeBuoy,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import { JudulHalaman, Kartu, kelasInput } from "@/components/admin/ui";

const panduan = [
  {
    id: "siswa",
    ikon: Users,
    judul: "Mengelola Data Siswa",
    langkah: [
      "Buka menu Data Siswa pada sidebar kiri.",
      "Klik tombol Tambah Siswa untuk membuka formulir.",
      "Isi NIS, nama, kelas, jenis kelamin, dan status, lalu klik Simpan.",
      "Gunakan ikon pensil untuk mengubah dan ikon tempat sampah untuk menghapus.",
      "Gunakan kolom pencarian di header untuk menyaring daftar siswa.",
    ],
  },
  {
    id: "guru",
    ikon: GraduationCap,
    judul: "Mengelola Guru & Staf",
    langkah: [
      "Buka menu Guru & Staf.",
      "Klik Tambah Guru dan lengkapi NIP, nama, mata pelajaran, jabatan, serta status.",
      "Data guru langsung tersimpan dan dapat diubah atau dihapus dari tabel.",
    ],
  },
  {
    id: "akademik",
    ikon: BookOpen,
    judul: "Kalender Akademik & Agenda",
    langkah: [
      "Buka menu Akademik, lalu pilih tab Kalender Akademik atau Agenda Sekolah.",
      "Klik Tambah Jadwal atau Tambah Agenda untuk mengisi data baru.",
      "Jadwal kalender tampil pada halaman Akademik di website publik.",
    ],
  },
  {
    id: "berita",
    ikon: Newspaper,
    judul: "Menerbitkan Berita",
    langkah: [
      "Buka menu Berita lalu klik Tambah Berita.",
      "Isi judul, tanggal, gambar, ringkasan, dan isi berita.",
      "Pisahkan setiap paragraf isi dengan satu baris kosong.",
      "Berita yang disimpan tampil di halaman Berita website publik.",
    ],
  },
  {
    id: "laporan",
    ikon: FileText,
    judul: "Membuat Laporan",
    langkah: [
      "Buka menu Laporan untuk melihat rekapitulasi data sekolah.",
      "Klik Data Siswa atau Data Guru pada bagian Ekspor Data.",
      "Berkas CSV akan terunduh dan dapat dibuka dengan Excel.",
    ],
  },
];

const pertanyaan = [
  {
    tanya: "Di mana data saya disimpan?",
    jawab:
      "Seluruh data disimpan pada database Supabase (terpusat), bukan di browser. Data tetap tersedia meskipun cache browser dibersihkan.",
  },
  {
    tanya: "Mengapa data berbeda ketika dibuka di perangkat lain?",
    jawab:
      "Data tidak seharusnya berbeda karena tersimpan terpusat di Supabase. Jika tetap berbeda, pastikan perangkat terhubung internet dan sudah memuat ulang halaman.",
  },
  {
    tanya: "Bagaimana cara keluar dari panel admin?",
    jawab:
      "Klik ikon akun di kanan atas header, lalu pilih Keluar. Sesi akan diakhiri dan halaman login tampil kembali.",
  },
  {
    tanya: "Apakah perubahan pada website publik butuh waktu?",
    jawab:
      "Tidak. Berita dan agenda dibaca langsung dari data yang tersimpan sehingga perubahan langsung terlihat setelah halaman dimuat ulang.",
  },
];

export default function Page() {
  return (
    <AdminGuard>
      <Bantuan />
    </AdminGuard>
  );
}

function Bantuan() {
  const [cari, setCari] = useState("");
  const [terbuka, setTerbuka] = useState(null);

  const q = cari.trim().toLowerCase();
  const panduanTampil = panduan.filter(
    (p) =>
      !q ||
      p.judul.toLowerCase().includes(q) ||
      p.langkah.some((l) => l.toLowerCase().includes(q))
  );
  const pertanyaanTampil = pertanyaan.filter(
    (p) => !q || `${p.tanya} ${p.jawab}`.toLowerCase().includes(q)
  );

  return (
    <div className="flex flex-col gap-4">
      <JudulHalaman
        judul="Bantuan"
        deskripsi="Panduan penggunaan panel admin dan pertanyaan yang sering diajukan."
      />

      <Kartu>
        <div className="p-4 sm:p-5">
          <label htmlFor="bantuan-cari" className="sr-only">Cari panduan</label>
          <div className="relative">
            <Search size={16} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778296]" />
            <input
              id="bantuan-cari"
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari panduan atau pertanyaan..."
              className={`${kelasInput} pl-9`}
            />
          </div>
        </div>
      </Kartu>

      <section aria-labelledby="judul-panduan" className="flex flex-col gap-3">
        <h2 id="judul-panduan" className="text-sm font-bold text-[#172238]">
          Panduan Penggunaan
        </h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {panduanTampil.map((p) => {
            const Ikon = p.ikon;
            return (
              <Kartu key={p.id}>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EDF6FF] text-[#1769AA]">
                      <Ikon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-bold text-[#172238]">{p.judul}</h3>
                  </div>
                  <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-4 text-xs leading-relaxed text-[#3B4A61]">
                    {p.langkah.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ol>
                </div>
              </Kartu>
            );
          })}
        </div>
        {panduanTampil.length === 0 && (
          <p className="rounded-[14px] border border-dashed border-[#CFE5F7] bg-[#F5F7FB] p-8 text-center text-xs text-[#778296]">
            Tidak ada panduan yang cocok dengan pencarian.
          </p>
        )}
      </section>

      <section aria-labelledby="judul-faq" className="flex flex-col gap-3">
        <h2 id="judul-faq" className="text-sm font-bold text-[#172238]">
          Pertanyaan Umum
        </h2>
        <Kartu>
          <ul className="divide-y divide-[#EDF6FF]">
            {pertanyaanTampil.map((p, i) => {
              const aktif = terbuka === i;
              return (
                <li key={p.tanya}>
                  <button
                    type="button"
                    onClick={() => setTerbuka(aktif ? null : i)}
                    aria-expanded={aktif}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold text-[#172238] hover:bg-[#F5F7FB]"
                  >
                    {p.tanya}
                    <ChevronDown
                      size={15}
                      aria-hidden="true"
                      className={`shrink-0 text-[#778296] transition-transform ${aktif ? "rotate-180" : ""}`}
                    />
                  </button>
                  {aktif && (
                    <p className="px-4 pb-3 text-xs leading-relaxed text-[#3B4A61]">{p.jawab}</p>
                  )}
                </li>
              );
            })}
          </ul>
          {pertanyaanTampil.length === 0 && (
            <p className="px-5 py-10 text-center text-xs text-[#778296]">
              Tidak ada pertanyaan yang cocok dengan pencarian.
            </p>
          )}
        </Kartu>
      </section>

      <Kartu>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EDF6FF] text-[#1769AA]">
              <LifeBuoy size={17} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#172238]">Masih butuh bantuan?</h2>
              <p className="mt-0.5 text-[11px] text-[#778296]">
                Hubungi tim tata usaha sekolah untuk kendala teknis.
              </p>
            </div>
          </div>
          <a
            href="mailto:smankajen@gmail.com"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#CFE5F7] bg-white px-3.5 text-xs font-semibold text-[#1769AA] hover:bg-[#EDF6FF]"
          >
            <Mail size={14} aria-hidden="true" /> smankajen@gmail.com
          </a>
        </div>
      </Kartu>

      <p className="text-[11px] text-[#778296]">
        Lihat juga{" "}
        <Link href="/admin/laporan" className="inline-flex items-center gap-0.5 font-semibold text-[#1769AA] hover:underline">
          Laporan <ArrowUpRight size={11} aria-hidden="true" />
        </Link>{" "}
        untuk rekapitulasi data sekolah.
      </p>
    </div>
  );
}
