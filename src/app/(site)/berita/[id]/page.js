import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import BeritaCard from "@/components/BeritaCard";
import { supabaseServer } from "@/lib/supabase/server";

const keBerita = (r) => ({
  id: r.slug,
  slug: r.slug,
  judul: r.judul,
  tanggal: r.tanggal,
  ringkasan: r.ringkasan,
  isi: r.isi ?? [],
  gambar: r.gambar,
  kategori: r.kategori,
});

async function ambilBerita(slug) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? keBerita(data) : null;
}

async function ambilBeritaLain(slug) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("berita")
    .select("*")
    .neq("slug", slug)
    .order("tanggal", { ascending: false })
    .limit(3);
  return (data ?? []).map(keBerita);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await ambilBerita(id);
  return {
    title: `${item?.judul ?? "Berita"} - SMA Negeri 1 Kajen`,
    description: item?.ringkasan,
  };
}

export default function Halaman({ params }) {
  return (
    <Suspense
      fallback={
        <div className="pb-28">
          <header className="bg-[#071829] pt-28 sm:pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-sm text-white/70">Memuat berita...</p>
            </div>
          </header>
        </div>
      }
    >
      <DetailBerita params={params} />
    </Suspense>
  );
}

async function DetailBerita({ params }) {
  const { id } = await params;
  const item = await ambilBerita(id);

  if (!item) {
    return (
      <div className="pb-28">
        <header className="bg-[#071829] pt-28 sm:pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="mx-2">/</span>
              <Link href="/berita" className="hover:text-white transition-colors">
                Berita
              </Link>
            </nav>
            <h1 className="font-display text-2xl md:text-3xl text-white">Berita tidak ditemukan</h1>
          </div>
        </header>
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm text-[#1769AA] hover:underline"
          >
            <ArrowLeft size={16} /> Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  const beritaLain = await ambilBeritaLain(item.slug);

  return (
    <article className="pb-28">
      {/* Header halaman konsisten warna biru tua (#071829) */}
      <header className="bg-[#071829] pt-28 sm:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb di sebelah kiri */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <Link href="/berita" className="hover:text-white transition-colors">
              Berita
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80 line-clamp-1 max-w-xs sm:max-w-md inline-block align-bottom">{item.judul}</span>
          </nav>

          {/* Judul & Tanggal di sebelah kiri */}
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C98ED]">
              <Calendar size={14} />
              {item.tanggal}
            </p>
            <h1 className="font-display mt-3 text-2xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-white">
              {item.judul}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-12">
        <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-[#CFE5F7] shadow-sm">
          <Image
            src={item.gambar || "/berita1.jpg"}
            alt={item.judul}
            width={1062}
            height={1294}
            sizes="(max-width: 768px) 100vw, 576px"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-12">
        {item.isi.map((paragraf, i) => (
          <p
            key={i}
            className="mb-6 text-base md:text-lg text-foreground/80 leading-relaxed"
          >
            {paragraf}
          </p>
        ))}

        <Link
          href="/berita"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#CFE5F7] bg-white px-5 py-2.5 text-sm font-semibold text-[#172238] hover:bg-[#EDF6FF] hover:text-[#1769AA] transition-colors shadow-sm"
        >
          <ArrowLeft size={16} />
          Kembali ke Berita
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-6 mt-24 border-t border-[#CFE5F7] pt-16">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
          Berita <em className="italic text-[#1769AA]">Lainnya</em>
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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