import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import {
  MapPin,
  Phone,
  Mail,
  Award,
  BookOpen,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { sekolah } from "@/data/sekolah";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata = {
  title: "Profil - SMA Negeri 1 Kajen",
  description:
    "Profil, sejarah, visi, misi, alamat, fasilitas, dan prestasi SMA Negeri 1 Kajen.",
};

async function ambilProfil() {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("profil_sekolah")
    .select("*")
    .eq("id", 1)
    .single();
  return data;
}

export default function Halaman() {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Memuat...</p>}>
      <IsiHalaman />
    </Suspense>
  );
}

async function IsiHalaman() {
  await connection();
  const profil = await ambilProfil();
  const nama = profil?.nama || sekolah.nama;
  const alamat = profil?.alamat || sekolah.alamat;
  const telepon = profil?.telepon || sekolah.telepon;
  const email = profil?.email || sekolah.email;
  const visi = profil?.visi || sekolah.visi;
  const misi = profil?.misi?.length ? profil.misi : sekolah.misi;
  const sejarah = profil?.sejarah?.length ? profil.sejarah : sekolah.sejarah;
  const fasilitas = profil?.fasilitas?.length ? profil.fasilitas : sekolah.fasilitas;
  const prestasi = profil?.prestasi?.length ? profil.prestasi : sekolah.prestasi;

  return (
    <div className="pb-28">
      {/* Header halaman konsisten warna biru tua (#071829) */}
      <header className="bg-[#071829] pt-28 sm:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb di sebelah kiri */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Profil</span>
          </nav>

          {/* Judul & Deskripsi di sebelah kiri */}
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#2C98ED] font-semibold">
              Tentang Kami
            </p>
            <h1 className="font-display mt-3 text-3xl md:text-5xl leading-[1.15] tracking-tight text-white">
              Profil <em className="italic text-white/60">Sekolah</em>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
              Mengenal lebih dekat SMA Negeri 1 Kajen beserta identitas, sejarah, visi misi, fasilitas, dan capaian prestasinya.
            </p>
          </div>
        </div>
      </header>

      {/* Profil */}
      <section id="profil" className="bg-background py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Profil">
            Mengenal <em className="italic text-foreground/60">Smanka</em>
          </SectionHeading>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-foreground/70 leading-relaxed">
            {nama} berlokasi di {alamat}. Sejak berdiri, sekolah
            ini terus berkomitmen menghadirkan layanan pendidikan yang bermutu,
            membina prestasi akademik dan non-akademik, serta menumbuhkan karakter
            peserta didik yang beriman, mandiri, dan peduli terhadap lingkungan.
          </p>
        </Reveal>
      </section>

      {/* Sejarah */}
      <section id="sejarah" className="bg-surface py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Sejarah">
            Perjalanan <em className="italic text-foreground/60">sekolah</em>
          </SectionHeading>
          <ol className="mt-12 relative border-l-2 border-brand/20 ml-3 space-y-10">
            {sejarah.map((item, i) => (
              <Reveal key={item.tahun} delay={i * 100} direction="left">
                <li className="pl-8 relative">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand border-2 border-background shadow-sm" />
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-light">{item.tahun}</p>
                  <p className="mt-2 text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl">
                    {item.teks}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Visi */}
      <section id="visi" className="bg-background py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Visi">
            Arah <em className="italic text-foreground/60">tujuan</em>
          </SectionHeading>
          <blockquote className="mt-10 border-l-4 border-brand pl-8 max-w-3xl">
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground/85 italic">
              &ldquo;{visi}&rdquo;
            </p>
          </blockquote>
        </Reveal>
      </section>

      {/* Misi */}
      <section id="misi" className="bg-surface py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Misi">
            Langkah <em className="italic text-foreground/60">nyata</em>
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {misi.map((m, i) => (
              <Reveal key={m} delay={i * 100}>
                <div className="flex gap-5 p-6 rounded-2xl bg-background border border-black/8 shadow-sm">
                  <span className="font-display text-3xl text-brand/25 leading-none font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed pt-1">
                    {m}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Fasilitas */}
      <section id="fasilitas" className="bg-background py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Fasilitas">
            Sarana <em className="italic text-foreground/60">pendukung</em>
          </SectionHeading>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fasilitas.map((f, i) => (
              <Reveal key={f} delay={i * 60}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-black/8 bg-surface/60 hover:bg-surface transition-colors duration-200">
                  <BookOpen size={16} className="text-brand-light shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/70">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Prestasi */}
      <section id="prestasi" className="bg-surface py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Prestasi">
            Capaian <em className="italic text-foreground/60">peserta didik</em>
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {prestasi.map((p, i) => (
              <Reveal key={p.judul} delay={i * 80}>
                <div className="flex gap-4 p-5 rounded-2xl bg-background border border-black/8 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                    <Award size={18} className="text-brand-light" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base text-foreground">{p.judul}</p>
                    <p className="mt-1 text-xs text-foreground/45 font-medium uppercase tracking-wide">{p.keterangan}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Alamat */}
      <section id="alamat" className="bg-background py-20 md:py-28">
        <Reveal className="max-w-6xl mx-auto px-6">
          <SectionHeading label="Alamat">
            Kunjungi <em className="italic text-foreground/60">kami</em>
          </SectionHeading>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
            <ul className="space-y-5 text-foreground/70">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-light shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{alamat}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-brand-light shrink-0" />
                <span className="text-sm">{telepon}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-brand-light shrink-0" />
                <span className="text-sm">{email}</span>
              </li>
            </ul>
            <div className="rounded-2xl overflow-hidden aspect-video border border-black/8 shadow-sm">
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
        </Reveal>
      </section>
    </div>
  );
}