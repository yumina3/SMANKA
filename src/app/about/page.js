import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Award,
  BookOpen,
} from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { sekolah } from "@/data/sekolah";

export const metadata = {
  title: "About - SMA Negeri 1 Kajen",
  description:
    "Profil, sejarah, visi, misi, alamat, fasilitas, dan prestasi SMA Negeri 1 Kajen.",
};

export default function About() {
  return (
    <div className="pt-40 pb-28">
      {/* Header halaman */}
      <header className="max-w-6xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-foreground/50">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/70">About</span>
        </nav>
        <div className="text-center">
          <h1 className="font-display mt-6 text-3xl md:text-4xl leading-[1.15] tracking-tight">
            Profil <em className="italic text-foreground/60">Sekolah</em>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-foreground/70 leading-relaxed">
            Mengenal lebih dekat SMA Negeri 1 Kajen beserta identitasnya.
          </p>
        </div>
      </header>

      {/* Profil */}
      <Section variant="white" className="pt-6 md:pt-8">
        <SectionHeading label="Profil">
          Mengenal <em className="italic text-foreground/60">Smanka</em>
        </SectionHeading>
        <p className="mt-6 max-w-3xl text-base md:text-lg text-foreground/70 leading-relaxed">
          {sekolah.nama} berlokasi di {sekolah.alamat}. Sejak berdiri, sekolah
          ini terus berkomitmen menghadirkan layanan pendidikan yang bermutu,
          membina prestasi akademik dan non-akademik, serta menumbuhkan karakter
          peserta didik yang beriman, mandiri, dan peduli terhadap lingkungan.
        </p>
      </Section>

      {/* Sejarah */}
      <Section variant="blue">
        <SectionHeading label="Sejarah">
          Perjalanan <em className="italic text-foreground/60">sekolah</em>
        </SectionHeading>
        <ol className="mt-12 relative border-l border-black/10 ml-2 space-y-10">
          {sekolah.sejarah.map((item) => (
            <li key={item.tahun} className="pl-8 relative">
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-brand" />
              <p className="font-semibold text-brand-light">{item.tahun}</p>
              <p className="mt-2 text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
                {item.teks}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Visi */}
      <Section variant="white">
        <SectionHeading label="Visi">
          Arah <em className="italic text-foreground/60">tujuan</em>
        </SectionHeading>
        <blockquote className="mt-10 liquid-glass rounded-3xl p-8 md:p-12 max-w-4xl">
          <p className="font-display text-2xl md:text-3xl leading-snug text-foreground/90">
            “{sekolah.visi}”
          </p>
        </blockquote>
      </Section>

      {/* Misi */}
      <Section variant="blue">
        <SectionHeading label="Misi">
          Langkah <em className="italic text-foreground/60">nyata</em>
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sekolah.misi.map((m, i) => (
            <div key={m} className="liquid-glass rounded-2xl p-6 flex gap-4">
              <span className="font-display text-3xl text-brand-light leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                {m}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Fasilitas */}
      <Section variant="white">
        <SectionHeading label="Fasilitas">
          Sarana <em className="italic text-foreground/60">pendukung</em>
        </SectionHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sekolah.fasilitas.map((f) => (
            <div
              key={f}
              className="liquid-glass rounded-2xl p-5 flex items-start gap-3"
            >
              <BookOpen size={18} className="text-brand-light shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/70">{f}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Prestasi */}
      <Section variant="blue">
        <SectionHeading label="Prestasi">
          Capaian <em className="italic text-foreground/60">peserta didik</em>
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sekolah.prestasi.map((p) => (
            <div
              key={p.judul}
              className="liquid-glass rounded-2xl p-6 flex gap-4"
            >
              <Award size={22} className="text-brand-light shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{p.judul}</p>
                <p className="mt-1 text-sm text-foreground/50">{p.keterangan}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Alamat */}
      <Section variant="white">
        <SectionHeading label="Alamat">
          Kunjungi <em className="italic text-foreground/60">kami</em>
        </SectionHeading>
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
          <ul className="space-y-5 text-foreground/70">
            <li className="flex gap-3">
              <MapPin size={20} className="text-brand-light shrink-0 mt-0.5" />
              <span>{sekolah.alamat}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="text-brand-light shrink-0" />
              <span>{sekolah.telepon}</span>
            </li>
            <li className="flex gap-3">
              <Mail size={20} className="text-brand-light shrink-0" />
              <span>{sekolah.email}</span>
            </li>
          </ul>
          <div className="liquid-glass rounded-3xl overflow-hidden aspect-video">
            <iframe
              title="Lokasi SMA Negeri 1 Kajen"
              src="https://www.google.com/maps?q=SMA%20Negeri%201%20Kajen&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
