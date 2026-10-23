import Image from "next/image";
import { Play } from "lucide-react";
import { sekolah } from "@/data/sekolah";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/sekolah.jpg"
        alt={`Gedung ${sekolah.nama}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay bertingkat elegan agar teks kontras dan formal */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071829]/90 via-[#0c2040]/75 to-[#071829]/95" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-16">
        {/* Tulisan SMA N 1 KAJEN tanpa container */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-white/70">
          SMA N 1 KAJEN
        </p>

        <h1 className="font-roboto mt-5 text-2xl sm:text-4xl lg:text-[44px] leading-[1.2] tracking-tight font-bold text-white max-w-3xl">
          Unggul dalam prestasi, Luhur dalam budi pekerti dan berwawasan {" "}
          <span className="text-green-100">lingkungan</span>
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-normal">
          Sekolah menengah atas negeri di Kabupaten Pekalongan yang membina
          prestasi, karakter, dan kepedulian terhadap lingkungan.
        </p>

        {/* Video Profil / Dokumentasi YouTube */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-white/20 bg-black/60 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-[#2C98ED]">
            <iframe
              src="https://www.youtube.com/embed/3c5p6twQ2W4"
              title="Profil SMA Negeri 1 Kajen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/60">
            <Play size={12} className="text-[#2C98ED] fill-[#2C98ED]" />
            <span>Tonton Video Profil Resmi SMA Negeri 1 Kajen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
