"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays,
  FileText,
  Settings,
  Newspaper,
  HelpCircle,
  ExternalLink,
  X,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Data Siswa", href: "/admin/siswa", icon: Users },
  { label: "Guru & Staf", href: "/admin/guru", icon: GraduationCap },
  { label: "Akademik", href: "/admin/akademik", icon: BookOpen },
  { label: "Berita", href: "/admin/berita", icon: Newspaper },
  { label: "Laporan", href: "/admin/laporan", icon: FileText },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();
  const aktif = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#172238]/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Navigasi admin"
        className={`fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col border-r border-[#CFE5F7] bg-[#EAF5FF] transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between gap-2 px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Logo SMA Negeri 1 Kajen"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#1769AA]">
                SMAN 1 Kajen
              </span>
              <span className="block text-sm font-bold text-[#172238]">
                Admin Panel
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#1769AA] hover:bg-white/70 lg:hidden"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto px-3 pb-4">
          <ul className="flex flex-col gap-1">
            {menu.map((item) => {
              const Ikon = item.icon;
              const dipilih = aktif(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={dipilih ? "page" : undefined}
                    className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                      dipilih
                        ? "bg-[#2C98ED] text-white shadow-sm"
                        : "text-[#3B4A61] hover:bg-white/70 hover:text-[#1769AA]"
                    }`}
                  >
                    <Ikon size={18} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 border-t border-[#CFE5F7] px-5 py-4">
          <Link
            href="/akademik"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1769AA] hover:underline"
          >
            <ExternalLink size={15} aria-hidden="true" />
            Halaman Akademik website
          </Link>
          <Link
            href="/admin/bantuan"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1769AA] hover:underline"
          >
            <HelpCircle size={16} aria-hidden="true" />
            Bantuan
          </Link>
        </div>
      </aside>
    </>
  );
}
