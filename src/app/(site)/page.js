import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, Quote } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import BeritaCard from "@/components/BeritaCard";
import ProgramCard from "@/components/ProgramCard";
import Image from "next/image";
import { sekolah } from "@/data/sekolah";
import { supabaseServer } from "@/lib/supabase/server";

async function ambilData() {
  await connection();
  const supabase = await supabaseServer();
  const [beritaRes, profilRes] = await Promise.all([
    supabase
      .from("berita")
      .select("id,slug,judul,tanggal,ringkasan,gambar,kategori")
      .order("tanggal", { ascending: false })
      .limit(3),
    supabase.from("profil_sekolah").select("*").eq("id", 1).single(),
  ]);

  const beritaTerbaru = (beritaRes.data ?? []).map((b) => ({
    ...b,
    id: b.slug,
  }));
  return { beritaTerbaru, profil: profilRes.data ?? null };
}

export default function Halaman() {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Memuat...</p>}>
      <IsiHalaman />
    </Suspense>
  );
}

async function IsiHalaman() {
  const { beritaTerbaru, profil } = await ambilData();
  const sambutan = {
    teks: profil?.sambutan_teks || sekolah.sambutan.teks,
    nama: profil?.sambutan_nama || sekolah.sambutan.nama,
    jabatan: profil?.sambutan_jabatan || sekolah.sambutan.jabatan,
    gambar: profil?.sambutan_gambar || sekolah.sambutan.gambar,
  };
  const visi = profil?.visi || sekolah.visi;
  const misi = profil?.misi?.length ? profil.misi : sekolah.misi;
  const programUnggulan = profil?.program_unggulan?.length
    ? profil.program_unggulan
    : sekolah.programUnggulan;

  return (
    <>
      <Hero />

      {/* Tentang Kami */}
      <section id="tentang" className="py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <SectionHeading label="Tentang Kami">
              Sekolah yang menumbuhkan{" "}
              <em className="italic text-[#1769AA]">potensi</em>
            </SectionHeading>
            <p className="mt-6 text-base md:text-lg text-[#3B4A61] leading-relaxed">
              {profil?.nama || sekolah.nama} merupakan sekolah menengah atas negeri di
              Kabupaten Pekalongan yang berkomitmen menghadirkan pendidikan
              bermutu. Kami memadukan pembinaan akademik, penguatan karakter,
              dan pengembangan bakat siswa dalam lingkungan belajar yang
              kondusif dan ramah lingkungan.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1769AA] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1769AA]/20 transition-all hover:bg-[#0f4b7a] hover:-translate-y-0.5"
              >
                Selengkapnya
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/kesiswaan"
                className="inline-flex items-center gap-2 rounded-xl border border-[#CFE5F7] bg-white px-5 py-2.5 text-sm font-semibold text-[#172238] hover:bg-[#F5F7FB] transition-colors"
              >
                Kegiatan Kesiswaan
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section id="sambutan" className="py-20 md:py-28 bg-[#F5F7FB] border-y border-[#CFE5F7]">
        <Reveal className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Foto Kepala Sekolah */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-[#CFE5F7] bg-white p-4 shadow-sm">
                <div className="overflow-hidden rounded-xl bg-[#EDF6FF]">
                  <Image
                    src={sambutan.gambar}
                    alt={`${sambutan.nama}, ${sambutan.jabatan}`}
                    width={432}
                    height={577}
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="mt-4 pt-3 border-t border-[#CFE5F7] text-center">
                  <h3 className="font-bold text-base text-[#172238]">
                    {sambutan.nama}
                  </h3>
                  <p className="text-xs text-[#778296] font-medium mt-0.5">
                    {sambutan.jabatan}
                  </p>
                </div>
              </div>
            </div>

            {/* Teks Sambutan */}
            <div className="lg:col-span-7">
              <SectionHeading label="Sambutan">
                Kata Sambutan <em className="italic text-[#1769AA]">Kepala Sekolah</em>
              </SectionHeading>

              <div className="relative mt-6">
                <Quote
                  size={42}
                  className="text-[#2C98ED]/20 absolute -top-4 -left-2 -z-0"
                  aria-hidden="true"
                />
                <p className="relative z-10 text-base md:text-lg text-[#3B4A61] leading-relaxed italic">
                  &ldquo;{sambutan.teks}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#CFE5F7]/80">
                <p className="font-semibold text-sm text-[#172238]">
                  {sambutan.nama}
                </p>
                <p className="text-xs text-[#778296]">
                  {sambutan.jabatan}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Visi x Misi */}
      <section id="visi-misi" className="py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Arah & Landasan">
            Visi & <em className="italic text-[#1769AA]">Misi Sekolah</em>
          </SectionHeading>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
            <div className="rounded-2xl border border-[#CFE5F7] bg-white p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                Visi Sekolah
              </p>
              <blockquote className="mt-4 border-l-4 border-[#2C98ED] pl-4">
                <p className="font-display text-xl md:text-2xl font-semibold leading-snug text-[#172238]">
                  &ldquo;{visi}&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="rounded-2xl border border-[#CFE5F7] bg-white p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                Misi Utama
              </p>
              <ul className="mt-4 space-y-3.5 text-sm md:text-base text-[#3B4A61] leading-relaxed">
                {misi.slice(0, 3).map((m, i) => (
                  <li key={m} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EDF6FF] text-xs font-bold text-[#1769AA]">
                      {i + 1}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] hover:text-[#0f4b7a] transition-colors"
              >
                Selengkapnya di Profil
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Program Unggulan */}
      <section id="program" className="py-20 md:py-28 bg-[#F5F7FB] border-t border-[#CFE5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading label="Fokus Pembelajaran">
              Program <em className="italic text-[#1769AA]">Unggulan</em>
            </SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {programUnggulan.map((program, i) => (
              <Reveal key={program.judul} delay={i * 150}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section id="berita-terbaru" className="py-20 md:py-28 border-t border-[#CFE5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label="Informasi Terkini">
              Kabar & Agenda <em className="italic text-[#1769AA]">Sekolah</em>
            </SectionHeading>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 rounded-xl border border-[#CFE5F7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#172238] hover:bg-[#EDF6FF] hover:text-[#1769AA] transition-colors shadow-sm"
            >
              Lihat Semua Berita
              <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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