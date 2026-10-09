import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import BeritaCard from "@/components/BeritaCard";
import { berita } from "@/data/berita";

export function generateStaticParams() {
  return berita.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = berita.find((b) => b.id === id);
  if (!item) return { title: "Berita tidak ditemukan - SMA Negeri 1 Kajen" };
  return {
    title: `${item.judul} - SMA Negeri 1 Kajen`,
    description: item.ringkasan,
  };
}

export default async function DetailBerita({ params }) {
  const { id } = await params;
  const item = berita.find((b) => b.id === id);

  if (!item) notFound();

  const beritaLain = berita.filter((b) => b.id !== id).slice(0, 3);

  return (
    <article className="pt-40 pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-foreground/50">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/berita" className="hover:text-foreground transition-colors">
            Berita
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/70">{item.judul}</span>
        </nav>
      </div>

      <header className="max-w-3xl mx-auto px-6 mt-8">
        <p className="flex items-center gap-2 text-sm text-foreground/50">
          <Calendar size={15} />
          {item.tanggal}
        </p>
        <h1 className="font-display mt-4 text-3xl md:text-4xl leading-[1.15] tracking-tight">
          {item.judul}
        </h1>
      </header>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        <div className="mx-auto max-w-md overflow-hidden rounded-3xl">
          <Image
            src={item.gambar}
            alt={item.judul}
            width={1062}
            height={1294}
            priority
            sizes="(max-width: 768px) 100vw, 448px"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-12">
        {item.isi.map((paragraf) => (
          <p
            key={paragraf}
            className="mb-6 text-lg text-foreground/80 leading-relaxed"
          >
            {paragraf}
          </p>
        ))}

        <Link
          href="/berita"
          className="mt-8 inline-flex items-center gap-3 liquid-glass rounded-full px-8 py-3 text-sm font-medium hover:bg-black/5 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Berita
        </Link>
      </div>

      {/* Berita Lainnya */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight">
          Berita <em className="italic text-foreground/60">lainnya</em>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beritaLain.map((lain, i) => (
            <Reveal key={lain.id} delay={i * 150}>
              <BeritaCard berita={lain} />
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
