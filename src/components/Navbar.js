"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { sekolah } from "@/data/sekolah";

const menu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Kesiswaan", href: "/kesiswaan" },
  { label: "Berita", href: "/berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);

  const isAktif = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav
        aria-label="Navigasi utama"
        className="rounded-full max-w-5xl mx-auto px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border border-white shadow-lg shadow-blue-900/10"
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setTerbuka(false)}
          >
            <Image
              src="/logo.png"
              alt={`Logo ${sekolah.nama}`}
              width={50}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-semibold text-sm sm:text-base tracking-tight">
              {sekolah.nama}
            </span>
          </Link>

          {/* Menu desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isAktif(item.href)
                      ? "text-foreground border-b-2 border-brand pb-1"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Tombol hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setTerbuka((v) => !v)}
            aria-label={terbuka ? "Tutup menu" : "Buka menu"}
            aria-expanded={terbuka}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-black/5"
          >
            {terbuka ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Panel menu mobile */}
        {terbuka && (
          <div className="md:hidden mt-3 rounded-3xl p-4 bg-white border border-black/5 shadow-lg">
            <ul className="flex flex-col gap-1">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setTerbuka(false)}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                      isAktif(item.href)
                        ? "text-foreground bg-black/5"
                        : "text-foreground/70 hover:text-foreground hover:bg-black/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
