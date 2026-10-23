"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Tag } from "lucide-react";
import Reveal from "@/components/Reveal";
import BeritaCard from "@/components/BeritaCard";
import { useBerita } from "@/lib/admin";

const kategoriList = ["Semua", "Kegiatan", "Prestasi", "Akademik", "Pengumuman"];

export default function Berita() {
  const { data: berita, siap } = useBerita();
  const [cari, setCari] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const beritaTersaring = (berita || []).filter((item) => {
    const cocokCari =
      !cari ||
      item.judul.toLowerCase().includes(cari.toLowerCase()) ||
      item.ringkasan.toLowerCase().includes(cari.toLowerCase());

    const cocokKategori =
      kategoriAktif === "Semua" || item.kategori === kategoriAktif;

    return cocokCari && cocokKategori;
  });

  return (
    <div className="pb-28">
      {/* Header halaman konsisten warna biru tua (#071829) */}
      <header className="bg-[#071829] pt-28 sm:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb di sebelah kiri */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Berita</span>
          </nav>

          {/* Judul & Deskripsi di sebelah kiri */}
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#2C98ED] font-semibold">
              Kabar & Publikasi
            </p>
            <h1 className="font-display mt-3 text-3xl md:text-5xl leading-[1.15] tracking-tight text-white">
              Berita & Informasi <em className="italic text-white/60">Sekolah</em>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
              Ikuti kabar terbaru seputar kegiatan, prestasi, pengumuman, dan agenda penting SMA Negeri 1 Kajen.
            </p>
          </div>
        </div>
      </header>

      {/* Bar Pencarian & Filter Kategori Konsisten Floating Card */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 mb-12">
        <div className="rounded-2xl border border-[#CFE5F7] bg-white p-5 sm:p-6 shadow-[0_12px_36px_-12px_rgba(23,105,170,0.18)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Input Pencarian */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778296]"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Cari judul atau topik berita..."
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                className="w-full rounded-xl border border-[#CFE5F7] bg-[#F5F7FB] py-2.5 pl-10 pr-4 text-sm text-[#172238] placeholder:text-[#778296] focus:border-[#2C98ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C98ED]/20 transition-all"
              />
            </div>

            {/* Filter Kategori */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <Tag size={16} className="text-[#1769AA] shrink-0 hidden sm:block" />
              {kategoriList.map((kat) => (
                <button
                  key={kat}
                  type="button"
                  onClick={() => setKategoriAktif(kat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    kategoriAktif === kat
                      ? "bg-[#1769AA] text-white shadow-sm"
                      : "bg-[#EDF6FF] text-[#1769AA] hover:bg-[#CFE5F7]"
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Daftar Berita */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#CFE5F7]/80">
          <h2 className="text-base font-bold text-[#172238]">
            {kategoriAktif === "Semua" ? "Daftar Berita Terkini" : `Kategori: ${kategoriAktif}`}
          </h2>
          <span className="text-xs font-medium text-[#778296]">
            Menampilkan {beritaTersaring.length} berita
          </span>
        </div>

        {siap && beritaTersaring.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beritaTersaring.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 100}>
                <BeritaCard berita={item} />
              </Reveal>
            ))}
          </div>
        )}

        {siap && beritaTersaring.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#CFE5F7] bg-[#F5F7FB] p-12 text-center">
            <p className="text-base font-medium text-[#172238]">
              Tidak ada berita yang sesuai dengan pencarian &ldquo;{cari}&rdquo;
            </p>
            <p className="text-xs text-[#778296] mt-1">
              Coba gunakan kata kunci lain atau pilih kategori &ldquo;Semua&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setCari("");
                setKategoriAktif("Semua");
              }}
              className="mt-4 inline-flex items-center rounded-xl bg-[#1769AA] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f4b7a] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
