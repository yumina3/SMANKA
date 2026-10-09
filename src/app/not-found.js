import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70svh] flex items-center justify-center px-6 pt-40 pb-28">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-3xl md:text-4xl leading-[1.15] tracking-tight">
          Berita <em className="italic text-foreground/60">tidak ditemukan</em>
        </h1>
        <p className="mt-6 text-foreground/70 leading-relaxed">
          Halaman atau berita yang Anda cari tidak tersedia. Silakan kembali ke
          daftar berita untuk menemukan informasi lainnya.
        </p>
        <Link
          href="/berita"
          className="mt-8 inline-flex items-center gap-3 liquid-glass rounded-full px-8 py-3 text-sm font-medium hover:bg-black/5 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Berita
        </Link>
      </div>
    </div>
  );
}
