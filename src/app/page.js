import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import BeritaCard from "@/components/BeritaCard";
import ProgramCard from "@/components/ProgramCard";
import { sekolah } from "@/data/sekolah";
import { berita } from "@/data/berita";

export default function Home() {
  // Tiga berita terbaru untuk section "Berita Terbaru"
  const beritaTerbaru = berita.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Tentang Kami */}
      <section className="py-28 md:py-40">
        <Reveal className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Teks di kiri */}
            <div>
              <SectionHeading label="Tentang Kami">
                Sekolah yang menumbuhkan{" "}
                <em className="italic text-foreground/60">potensi</em>
              </SectionHeading>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
                {sekolah.nama} merupakan sekolah menengah atas negeri di
                Kabupaten Pekalongan yang berkomitmen menghadirkan pendidikan
                bermutu. Kami memadukan pembinaan akademik, penguatan karakter,
                dan pengembangan bakat siswa dalam lingkungan belajar yang
                nyaman.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:text-foreground transition-colors"
              >
                Selengkapnya
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Foto kepala sekolah di kanan, tanpa bingkai */}
            <div className="justify-self-center w-full max-w-[240px] text-center">
              <Image
                src={sekolah.sambutan.gambar}
                alt={`${sekolah.sambutan.nama}, ${sekolah.sambutan.jabatan}`}
                width={432}
                height={577}
                sizes="240px"
                className="w-full h-auto object-contain"
              />
              <div className="mt-4">
                <p className="font-semibold">{sekolah.sambutan.nama}</p>
                <p className="text-sm text-foreground/50">
                  {sekolah.sambutan.jabatan}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Visi x Misi */}
      <section className="py-28 md:py-40 bg-surface">
        <Reveal className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight">
            Visi <em className="italic text-foreground/40">x</em> Misi
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
            <div className="liquid-glass rounded-3xl p-8 md:p-10">
              <p className="text-xs uppercase tracking-widest text-brand-light">
                Visi
              </p>
              <p className="mt-4 font-display text-2xl md:text-3xl leading-snug text-foreground/90">
                {sekolah.visi}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-brand-light">
                Misi
              </p>
              <ul className="mt-4 space-y-3 text-sm md:text-base text-foreground/70 leading-relaxed">
                {sekolah.misi.slice(0, 3).map((m) => (
                  <li key={m} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:text-foreground transition-colors"
              >
                Selengkapnya
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Program Unggulan */}
      <section className="py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading label="Program Unggulan">
              Program yang membentuk{" "}
              <em className="italic text-foreground/60">masa depan</em>
            </SectionHeading>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sekolah.programUnggulan.map((program, i) => (
              <Reveal key={program.judul} delay={i * 150}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="py-28 md:py-40 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label="Berita Terbaru">
              Kabar dari <em className="italic text-foreground/60">sekolah</em>
            </SectionHeading>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:text-foreground transition-colors"
            >
              Lihat semua
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beritaTerbaru.map((item, i) => (
              <Reveal key={item.id} delay={i * 150}>
                <BeritaCard berita={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
