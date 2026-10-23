import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import {
  Users,
  GraduationCap,
  Award,
  Calendar,
  Crown,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Tent,
  HeartPulse,
  Flag,
  CircleDot,
  Goal,
  Volleyball,
  MicVocal,
  PersonStanding,
  FlaskConical,
  Moon,
  Sparkles,
  Compass,
  ArrowRight,
} from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import {
  captionKesiswaan,
  organisasiSiswa as organisasiStatis,
  ekstrakurikuler as ekstrakurikulerStatis,
  tataTertib as tataTertibStatis,
} from "@/data/kesiswaan";
import { supabaseServer } from "@/lib/supabase/server";

async function ambilKesiswaan() {
  const supabase = await supabaseServer();
  const [orgRes, ekskulRes, tataRes] = await Promise.all([
    supabase.from("kesiswaan_organisasi").select("*").order("urutan"),
    supabase.from("kesiswaan_ekskul").select("*").order("urutan"),
    supabase.from("kesiswaan_tata_tertib").select("*").order("urutan"),
  ]);

  const organisasi = (orgRes.data ?? []).map((r) => ({
    id: r.slug,
    nama: r.nama,
    namaPanjang: r.nama_panjang,
    deskripsi: r.deskripsi,
    struktur: r.struktur ?? [],
    tugas: r.tugas ?? [],
  }));
  const ekskul = (ekskulRes.data ?? []).map((r) => ({
    nama: r.nama,
    caption: r.caption,
  }));
  const tata = tataRes.data ?? [];
  return {
    organisasi: organisasi.length ? organisasi : organisasiStatis,
    ekstrakurikuler: ekskul.length ? ekskul : ekstrakurikulerStatis,
    kewajiban: tata.some((t) => t.jenis === "kewajiban")
      ? tata.filter((t) => t.jenis === "kewajiban").map((t) => t.teks)
      : tataTertibStatis.kewajiban,
    larangan: tata.some((t) => t.jenis === "larangan")
      ? tata.filter((t) => t.jenis === "larangan").map((t) => t.teks)
      : tataTertibStatis.larangan,
  };
}

// Data statistik siswa & guru
const dataStatistik = [
  {
    ikon: Users,
    angka: "1.185",
    label: "Siswa Aktif",
    sub: "Tersebar dalam 3 angkatan",
  },
  {
    ikon: GraduationCap,
    angka: "86",
    label: "Guru & Tenaga Pendidik",
    sub: "Kualifikasi S1 & S2",
  },
  {
    ikon: Award,
    angka: "50+",
    label: "Prestasi Tahunan",
    sub: "Tingkat Daerah & Nasional",
  },
  {
    ikon: Calendar,
    angka: "1965",
    label: "Tahun Berdiri",
    sub: "Melayani lebih dari 5 dekade",
  },
];

// Ikon untuk setiap ekstrakurikuler (urutan mengikuti data kesiswaan)
const ikonEkskul = [
  Tent, // Pramuka
  HeartPulse, // Palang Merah Remaja
  Flag, // Paskibra
  CircleDot, // Basket
  Goal, // Futsal
  Volleyball, // Voly
  MicVocal, // Paduan Suara
  PersonStanding, // Seni Tari
  FlaskConical, // Karya Ilmiah Remaja
  Moon, // Rohis
];

export const metadata = {
  title: "Kesiswaan - SMA Negeri 1 Kajen",
  description:
    "Kesiswaan SMA Negeri 1 Kajen: statistik siswa dan guru, organisasi siswa (OSIS dan MPK), ekstrakurikuler, serta tata tertib siswa.",
};

export default function Halaman() {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Memuat...</p>}>
      <IsiHalaman />
    </Suspense>
  );
}

async function IsiHalaman() {
  await connection();
  const { organisasi, ekstrakurikuler, kewajiban, larangan } =
    await ambilKesiswaan();

  return (
    <div className="pb-28">
      {/* Header halaman konsisten warna biru tua (#071829) */}
      <header className="bg-[#071829] pt-28 sm:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb di sebelah kiri */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Kesiswaan</span>
          </nav>

          {/* Judul & Deskripsi di sebelah kiri */}
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#2C98ED] font-semibold">
              Kesiswaan & Ekstrakurikuler
            </p>
            <h1 className="font-display mt-3 text-3xl md:text-5xl leading-[1.15] tracking-tight text-white">
              Kesiswaan <em className="italic text-white/60">Smanka</em>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
              {captionKesiswaan}
            </p>
          </div>
        </div>
      </header>

      {/* Section Statistik Sekolah: Angka Siswa & Guru & Prestasi */}
      <div id="statistik" className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 mb-12">
        <Reveal>
          <div className="rounded-2xl border border-[#CFE5F7] bg-white p-6 sm:p-8 shadow-[0_12px_36px_-12px_rgba(23,105,170,0.2)]">
            <div className="mb-4 pb-3 border-b border-[#CFE5F7]/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                  Data Statistik Sekolah
                </p>
                <p className="text-xs text-[#778296] mt-0.5">
                  Ringkasan kuantitatif peserta didik dan tenaga pendidik SMA N 1 Kajen
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#CFE5F7]">
              {dataStatistik.map((item, idx) => {
                const Ikon = item.ikon;
                return (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center text-center ${
                      idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""
                    }`}
                  >
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF6FF] text-[#1769AA]">
                      <Ikon size={22} aria-hidden="true" />
                    </div>
                    <span className="font-roboto text-3xl sm:text-4xl font-extrabold text-[#172238] tracking-tight">
                      {item.angka}
                    </span>
                    <span className="mt-1 text-xs sm:text-sm font-semibold text-[#172238]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 text-[11px] text-[#778296]">
                      {item.sub}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Eksplorasi Cepat Aktivitas Siswa */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="rounded-2xl border border-[#CFE5F7] bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF6FF] text-[#1769AA]">
                <Compass size={20} />
              </span>
              <div>
                <h2 className="text-sm font-bold text-[#172238]">
                  Eksplorasi Kegiatan Kesiswaan
                </h2>
                <p className="text-xs text-[#778296]">
                  Pilih kategori kegiatan untuk melompat langsung ke bagian yang diinginkan
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="#organisasi"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#EDF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1769AA] hover:bg-[#1769AA] hover:text-white transition-colors"
              >
                Organisasi Siswa
                <ArrowRight size={12} />
              </a>
              <a
                href="#ekstrakurikuler"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#EDF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1769AA] hover:bg-[#1769AA] hover:text-white transition-colors"
              >
                Ekstrakurikuler
                <ArrowRight size={12} />
              </a>
              <a
                href="#tata-tertib"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#EDF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1769AA] hover:bg-[#1769AA] hover:text-white transition-colors"
              >
                Tata Tertib
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Organisasi Siswa */}
      <div id="organisasi">
        <Section variant="white" className="pt-6 md:pt-8">
          <SectionHeading label="Organisasi Siswa">
            Wadah <em className="italic text-foreground/60">kepemimpinan</em>
          </SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {organisasi.map((org) => (
              <article
                key={org.id}
                className="liquid-glass rounded-3xl p-8 flex flex-col gap-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-light">
                    {org.id === "osis" ? <Users size={22} /> : <Crown size={22} />}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl tracking-tight">
                      {org.nama}
                    </h3>
                    <p className="text-sm text-foreground/50">{org.namaPanjang}</p>
                  </div>
                </div>

                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  {org.deskripsi}
                </p>

                {/* Struktur kepengurusan */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-light">
                    Struktur Kepengurusan
                  </p>
                  <ul className="mt-4 space-y-2">
                    {org.struktur.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-3 text-sm text-foreground/70 border-b border-black/5 pb-2 last:border-0"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tugas & fungsi */}
                <div className="rounded-2xl bg-brand/5 p-5">
                  <p className="text-xs uppercase tracking-widest text-brand-light">
                    Tugas &amp; Fungsi
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/70 leading-relaxed">
                    {org.tugas.map((t) => (
                      <li key={t} className="flex gap-3">
                        <ShieldCheck
                          size={16}
                          className="text-brand-light shrink-0 mt-1"
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* Ekstrakurikuler */}
      <div id="ekstrakurikuler">
        <Section variant="blue">
          <SectionHeading label="Ekstrakurikuler">
            Ruang <em className="italic text-foreground/60">berkembang</em>
          </SectionHeading>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {ekstrakurikuler.map((e, i) => {
              const Ikon = ikonEkskul[i] ?? Sparkles;
              return (
                <div
                  key={e.nama}
                  className="liquid-glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-500 hover:-translate-y-1 hover:bg-black/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-light">
                    <Ikon size={22} />
                  </span>
                  <span className="text-sm font-medium text-foreground/80 leading-snug">
                    {e.nama}
                  </span>
                  <span className="text-xs text-foreground/50 leading-relaxed">
                    {e.caption}
                  </span>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Tata Tertib Siswa */}
      <div id="tata-tertib">
        <Section variant="white">
          <SectionHeading label="Tata Tertib Siswa">
            Disiplin <em className="italic text-foreground/60">bersama</em>
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="liquid-glass rounded-3xl p-8">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-light">
                <CheckCircle2 size={16} />
                Kewajiban Siswa
              </p>
              <ul className="mt-6 space-y-4 text-sm md:text-base text-foreground/70 leading-relaxed">
                {kewajiban.map((k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div className="liquid-glass rounded-3xl p-8">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-600">
                <XCircle size={16} />
                Larangan Siswa
              </p>
              <ul className="mt-6 space-y-4 text-sm md:text-base text-foreground/70 leading-relaxed">
                {larangan.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}