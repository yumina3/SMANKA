import Image from "next/image";
import { sekolah } from "@/data/sekolah";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <Image
        src="/sekolah.jpg"
        alt={`Gedung ${sekolah.nama}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay gelap bertingkat agar teks putih tetap terbaca di atas foto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2a4a]/85 via-[#0f2a4a]/55 to-[#0f2a4a]/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70">
          {sekolah.nama}
        </p>
        <h1 className="font-roboto mt-8 text-4xl sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight font-bold text-white">
          Mandiri, agamis, terdepan dalam prestasi dan berwawasan{" "}
          <span className="text-green-100">lingkungan</span>
        </h1>
        <p className="mt-8 mx-auto max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">
          Sekolah menengah atas negeri di Kabupaten Pekalongan yang membina
          prestasi, karakter, dan kepedulian terhadap lingkungan.
        </p>
      </div>
    </section>
  );
}
