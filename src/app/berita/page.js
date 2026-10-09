import Link from "next/link";
import Reveal from "@/components/Reveal";
import BeritaCard from "@/components/BeritaCard";
import { berita } from "@/data/berita";

export const metadata = {
  title: "Berita - SMA Negeri 1 Kajen",
  description:
    "Kumpulan berita dan kegiatan terbaru SMA Negeri 1 Kajen, Kabupaten Pekalongan.",
};

export default function Berita() {
  return (
    <div className="pt-40 pb-28">
      <header className="max-w-6xl mx-auto px-6 pb-16">
        <nav aria-label="Breadcrumb" className="text-xs text-foreground/50">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/70">Berita</span>
        </nav>
        <div className="text-center">
          <h1 className="font-display mt-6 text-3xl md:text-4xl leading-[1.15] tracking-tight">
            Berita <em className="italic text-foreground/60">sekolah</em>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-foreground/70 leading-relaxed">
            Ikuti kabar terbaru seputar kegiatan, prestasi, dan agenda SMA
            Negeri 1 Kajen.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {berita.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 150}>
            <BeritaCard berita={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
