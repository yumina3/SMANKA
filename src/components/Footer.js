import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { sekolah } from "@/data/sekolah";

const menu = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/about" },
  { label: "Kesiswaan", href: "/kesiswaan" },
  { label: "Akademik", href: "/akademik" },
  { label: "Berita", href: "/berita" },
];

const sosial = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sman1kajenofficial?stkn=MXBmbnNic3p1eDU5",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 2.7A7.1 7.1 0 1 0 19.1 12 7.1 7.1 0 0 0 12 4.9Zm0 11.7A4.6 4.6 0 1 1 16.6 12 4.6 4.6 0 0 1 12 16.6Zm5.9-11.9a1.66 1.66 0 1 1-1.66-1.66 1.66 1.66 0 0 1 1.66 1.66Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/SMA1Kajen/",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@sman1kajenofficial917?si=erW9eGmw2t95Ilx-",
    path: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#071829] text-white">
      {/* Konten utama */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid gap-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/logo.png"
              alt={`Logo ${sekolah.nama}`}
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
            />
            <span className="text-base font-bold text-white tracking-wide">
              SMA N 1 KAJEN
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            {sekolah.slogan}
          </p>
          <ul className="mt-6 flex items-center gap-2">
            {sosial.map(({ label, href, path }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#2C98ED] hover:text-white transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-white/40 mb-5 font-semibold">
            Navigasi
          </h3>
          <ul className="space-y-3">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-white/40 mb-5 font-semibold">
            Kontak
          </h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin size={16} className="text-[#2C98ED] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{sekolah.alamat}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="text-[#2C98ED] shrink-0" />
              <span>{sekolah.telepon}</span>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="text-[#2C98ED] shrink-0" />
              <span>{sekolah.email}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <p className="max-w-6xl mx-auto px-6 py-5 text-xs text-white/40">
          © 2026 SMA N 1 KAJEN. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
