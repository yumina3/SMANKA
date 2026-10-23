import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

export default function BeritaCard({ berita }) {
  if (!berita) return null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={berita.gambar}
          alt={berita.judul}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="flex items-center gap-1.5 text-[11px] text-foreground/45 font-medium uppercase tracking-wide">
          <Calendar size={12} />
          {berita.tanggal}
        </p>
        <h3 className="mt-3 text-base md:text-lg font-semibold tracking-tight leading-snug line-clamp-2 text-foreground">
          {berita.judul}
        </h3>
        <p className="mt-2 text-sm text-foreground/60 leading-relaxed line-clamp-3 flex-1">
          {berita.ringkasan}
        </p>

        <Link
          href={`/berita/${berita.id}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-light hover:text-foreground transition-colors group/link"
        >
          Baca Selengkapnya
          <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
