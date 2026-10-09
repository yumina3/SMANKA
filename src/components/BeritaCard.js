import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

export default function BeritaCard({ berita }) {
  if (!berita) return null;

  return (
    <article className="liquid-glass rounded-3xl group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-black/5">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={berita.gambar}
          alt={berita.judul}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="flex items-center gap-2 text-xs text-foreground/50">
          <Calendar size={14} />
          {berita.tanggal}
        </p>
        <h3 className="mt-3 text-xl md:text-2xl tracking-tight line-clamp-2">
          {berita.judul}
        </h3>
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-3">
          {berita.ringkasan}
        </p>

        <Link
          href={`/berita/${berita.id}`}
          className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-brand-light transition-colors"
        >
          Baca Selengkapnya
          <span className="liquid-glass flex h-8 w-8 items-center justify-center rounded-full">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </article>
  );
}
