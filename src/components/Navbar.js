"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { sekolah } from "@/data/sekolah";

// Struktur menu dengan sub-section / submenu agar pengunjung tahu isi masing-masing header
const menu = [
  {
    label: "Beranda",
    href: "/",
    sections: [
      { label: "Tentang Kami", href: "/#tentang" },
      { label: "Sambutan Kepala Sekolah", href: "/#sambutan" },
      { label: "Visi & Misi", href: "/#visi-misi" },
      { label: "Program Unggulan", href: "/#program" },
      { label: "Berita Terkini", href: "/#berita-terbaru" },
    ],
  },
  {
    label: "Profil",
    href: "/about",
    sections: [
      { label: "Mengenal Smanka", href: "/about#profil" },
      { label: "Sejarah Perjalanan", href: "/about#sejarah" },
      { label: "Visi & Misi", href: "/about#visi" },
      { label: "Fasilitas Sekolah", href: "/about#fasilitas" },
      { label: "Prestasi Siswa", href: "/about#prestasi" },
      { label: "Lokasi & Kontak", href: "/about#alamat" },
    ],
  },
  {
    label: "Kesiswaan",
    href: "/kesiswaan",
    sections: [
      { label: "Data Statistik Sekolah", href: "/kesiswaan#statistik" },
      { label: "Organisasi (OSIS & MPK)", href: "/kesiswaan#organisasi" },
      { label: "Ekstrakurikuler", href: "/kesiswaan#ekstrakurikuler" },
      { label: "Tata Tertib Siswa", href: "/kesiswaan#tata-tertib" },
    ],
  },
  {
    label: "Akademik",
    href: "/akademik",
    sections: [
      { label: "Kalender Akademik", href: "/akademik#kalender-akademik" },
      { label: "Agenda Sekolah", href: "/akademik#agenda-sekolah" },
    ],
  },
  {
    label: "Berita",
    href: "/berita",
    sections: [
      { label: "Semua Berita", href: "/berita" },
      { label: "SPMB / PPDB", href: "/berita/spmb-2026-2027" },
      { label: "Prestasi & Kegiatan", href: "/berita/juara-tinju-popda" },
    ],
  },
];

function NavbarIsi() {
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAktif = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Karena semua halaman kini memakai header atas biru tua (#071829),
  // saat paling atas (belum scroll) di semua halaman teks berwarna putih.
  // Saat scroll (scrolled = true), bar berubah menjadi solid putih dan teks kontras (#172238).
  const gunakanTemaTerang = scrolled;

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div
        className={`transition-all duration-300 ${
          scrolled ? "mx-4 mt-3" : "mx-0 mt-0"
        }`}
      >
        <nav
          aria-label="Navigasi utama"
          className={`transition-all duration-300 ${
            scrolled
              ? "rounded-full max-w-5xl mx-auto px-5 sm:px-7 py-3 bg-white/95 backdrop-blur-md border border-[#CFE5F7] shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
              : "max-w-full px-6 sm:px-10 py-5 bg-transparent border-b border-white/10"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-4 ${
              scrolled ? "max-w-5xl mx-auto" : "max-w-6xl mx-auto"
            }`}
          >
            {/* Logo & Nama Sekolah (1 Baris) */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setTerbuka(false)}
            >
              <Image
                src="/logo.png"
                alt={`Logo ${sekolah.nama}`}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                priority
              />
              <span
                className={`font-bold tracking-tight text-sm sm:text-base whitespace-nowrap transition-colors duration-200 ${
                  gunakanTemaTerang
                    ? "text-[#172238] group-hover:text-[#1769AA]"
                    : "text-white group-hover:text-white/80"
                }`}
              >
                SMA N 1 KAJEN
              </span>
            </Link>

            {/* Menu desktop dengan dropdown pilihan section */}
            <ul className="hidden md:flex items-center gap-1">
              {menu.map((item, idx) => {
                const aktif = isAktif(item.href);
                const isHovered = hoverIndex === idx;

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                        aktif
                          ? gunakanTemaTerang
                            ? "text-[#1769AA] bg-[#EDF6FF]"
                            : "text-white bg-white/20"
                          : gunakanTemaTerang
                          ? "text-[#3B4A61] hover:text-[#1769AA] hover:bg-[#F5F7FB]"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.sections && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            isHovered ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      {aktif && (
                        <span
                          className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full ${
                            gunakanTemaTerang ? "bg-[#1769AA]" : "bg-white"
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu Pilihan Section */}
                    {item.sections && isHovered && (
                      <div className="absolute top-full left-0 pt-2 w-56 z-50">
                        <div className="rounded-2xl border border-[#CFE5F7] bg-white p-2 shadow-xl">
                          <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#778296] border-b border-[#EDF6FF] mb-1">
                            Pilihan Bagian
                          </p>
                          <ul className="flex flex-col gap-0.5">
                            {item.sections.map((sec) => (
                              <li key={sec.label}>
                                <Link
                                  href={sec.href}
                                  onClick={() => setHoverIndex(null)}
                                  className="block rounded-lg px-3 py-2 text-xs font-medium text-[#3B4A61] hover:bg-[#EDF6FF] hover:text-[#1769AA] transition-colors"
                                >
                                  {sec.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Tombol hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setTerbuka((v) => !v)}
              aria-label={terbuka ? "Tutup menu" : "Buka menu"}
              aria-expanded={terbuka}
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                gunakanTemaTerang
                  ? "text-[#172238] hover:bg-[#EDF6FF]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {terbuka ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Panel menu mobile dengan expand pilihan section */}
      {terbuka && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl bg-white border border-[#CFE5F7] shadow-xl p-3 max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {menu.map((item, idx) => {
              const aktif = isAktif(item.href);
              const isExpanded = mobileExpanded === idx;

              return (
                <li key={item.href} className="border-b border-[#F5F7FB] pb-1 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setTerbuka(false)}
                      className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                        aktif
                          ? "text-[#1769AA] bg-[#EDF6FF]"
                          : "text-[#3B4A61] hover:bg-[#F5F7FB] hover:text-[#1769AA]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.sections && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : idx)
                        }
                        className="p-2 text-[#778296] hover:text-[#1769AA]"
                        aria-label={`Lihat pilihan ${item.label}`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu mobile */}
                  {item.sections && isExpanded && (
                    <ul className="mt-1 ml-4 pl-3 border-l-2 border-[#CFE5F7] flex flex-col gap-1 py-1">
                      {item.sections.map((sec) => (
                        <li key={sec.label}>
                          <Link
                            href={sec.href}
                            onClick={() => setTerbuka(false)}
                            className="block py-1.5 px-2 text-xs font-medium text-[#778296] hover:text-[#1769AA]"
                          >
                            {sec.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarIsi />
    </Suspense>
  );
}