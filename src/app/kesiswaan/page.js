import Link from "next/link";
import {
  Users,
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
} from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
  captionKesiswaan,
  organisasiSiswa,
  ekstrakurikuler,
  tataTertib,
} from "@/data/kesiswaan";

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
    "Kesiswaan SMA Negeri 1 Kajen: organisasi siswa (OSIS dan MPK), ekstrakurikuler, serta tata tertib siswa.",
};

export default function Kesiswaan() {
  return (
    <div className="pt-40 pb-28">
      {/* Header halaman */}
      <header className="max-w-6xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-foreground/50">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/70">Kesiswaan</span>
        </nav>
        <div className="text-center">
          <h1 className="font-display mt-6 text-3xl md:text-4xl leading-[1.15] tracking-tight">
            Kesiswaan <em className="italic text-foreground/60">sekolah</em>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-foreground/70 leading-relaxed">
            {captionKesiswaan}
          </p>
        </div>
      </header>

      {/* Organisasi Siswa */}
      <Section variant="white" className="pt-6 md:pt-8">
        <SectionHeading label="Organisasi Siswa">
          Wadah <em className="italic text-foreground/60">kepemimpinan</em>
        </SectionHeading>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {organisasiSiswa.map((org) => (
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

      {/* Ekstrakurikuler */}
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

      {/* Tata Tertib Siswa */}
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
              {tataTertib.kewajiban.map((k) => (
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
              {tataTertib.larangan.map((l) => (
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
  );
}
