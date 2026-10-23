import { Suspense } from "react";
import Link from "next/link";
import AkademikKlien from "@/components/AkademikKlien";

export const metadata = {
  title: "Akademik - SMA Negeri 1 Kajen",
  description:
    "Kalender akademik dan agenda kegiatan SMA Negeri 1 Kajen, Kabupaten Pekalongan.",
};

export default function Akademik() {
  return (
    <div className="pb-28">
      {/* Header halaman konsisten warna biru tua (#071829) */}
      <header className="bg-[#071829] pt-28 sm:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb di sebelah kiri */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Akademik</span>
          </nav>

          {/* Judul & Deskripsi di sebelah kiri */}
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#2C98ED] font-semibold">
              Jadwal & Agenda
            </p>
            <h1 className="font-display mt-3 text-3xl md:text-5xl leading-[1.15] tracking-tight text-white">
              Akademik <em className="italic text-white/60">Sekolah</em>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
              Pantau kalender akademik dan agenda kegiatan SMA Negeri 1 Kajen agar tidak tertinggal informasi penting.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-16">
        <Suspense fallback={<div className="h-40" />}>
          <AkademikKlien />
        </Suspense>
      </div>
    </div>
  );
}
