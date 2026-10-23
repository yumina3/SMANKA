"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Search, Bell, User, LogOut, UserCog } from "lucide-react";

const notifikasi = [
  { judul: "Jadwal PTS Ganjil telah diperbarui", waktu: "10 menit lalu" },
  { judul: "Rapat evaluasi semester besok pukul 08.00", waktu: "1 jam lalu" },
  { judul: "1 berita baru berhasil dipublikasi", waktu: "Kemarin" },
];

export default function AdminHeader({ cari, setCari, onMenu, onKeluar }) {
  const [panel, setPanel] = useState(null);
  const wadah = useRef(null);

  useEffect(() => {
    const tutup = (e) => {
      if (wadah.current && !wadah.current.contains(e.target)) setPanel(null);
    };
    const esc = (e) => e.key === "Escape" && setPanel(null);
    document.addEventListener("mousedown", tutup);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", tutup);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const tombolIkon =
    "inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#778296] hover:bg-[#EDF6FF] hover:text-[#1769AA] transition-colors";

  return (
    <header className="sticky top-0 z-30 border-b border-[#CFE5F7]/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-4 sm:px-8">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Buka menu navigasi"
          className={`${tombolIkon} lg:hidden`}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="hidden md:block"
          >
            <label htmlFor="admin-cari" className="sr-only">
              Cari data
            </label>
            <div className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778296]"
              />
              <input
                id="admin-cari"
                type="search"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Cari siswa, berita, agenda..."
                className="h-10 w-56 rounded-lg border border-[#CFE5F7] bg-[#F5F7FB] pl-9 pr-3 text-sm text-[#172238] placeholder:text-[#778296] focus:border-[#2C98ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C98ED]/25 xl:w-72"
              />
            </div>
          </form>

          <div ref={wadah} className="flex items-center gap-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setPanel(panel === "notif" ? null : "notif")}
                aria-label="Notifikasi"
                aria-expanded={panel === "notif"}
                className={`${tombolIkon} relative`}
              >
                <Bell size={20} aria-hidden="true" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E79025] ring-2 ring-white" />
              </button>
              {panel === "notif" && (
                <div className="absolute right-0 mt-2 w-72 rounded-[12px] border border-[#CFE5F7] bg-white p-2 shadow-lg">
                  <p className="px-2 py-1.5 text-xs font-bold text-[#172238]">
                    Notifikasi
                  </p>
                  <ul className="flex flex-col">
                    {notifikasi.map((n) => (
                      <li
                        key={n.judul}
                        className="rounded-lg px-2 py-2 hover:bg-[#EDF6FF]"
                      >
                        <p className="text-xs font-medium text-[#172238]">{n.judul}</p>
                        <p className="text-[11px] text-[#778296]">{n.waktu}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setPanel(panel === "profil" ? null : "profil")}
                aria-label="Menu akun administrator"
                aria-expanded={panel === "profil"}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#778296] hover:bg-[#EDF6FF] hover:text-[#1769AA] transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDF6FF] text-[#1769AA] ring-1 ring-[#CFE5F7]">
                  <User size={18} aria-hidden="true" />
                </span>
              </button>
              {panel === "profil" && (
                <div className="absolute right-0 mt-2 w-52 rounded-[12px] border border-[#CFE5F7] bg-white p-1.5 shadow-lg">
                  <div className="px-2.5 py-2 border-b border-[#EDF6FF]">
                    <p className="text-sm font-semibold text-[#172238]">Administrator</p>
                    <p className="text-[11px] text-[#778296]">
                      admin@sman1kajen.sch.id
                    </p>
                  </div>
                  <a
                    href="/admin/pengaturan"
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#3B4A61] hover:bg-[#EDF6FF]"
                  >
                    <UserCog size={15} aria-hidden="true" /> Pengaturan akun
                  </a>
                  <button
                    type="button"
                    onClick={onKeluar}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#D93A3A] hover:bg-[#FDECEC]"
                  >
                    <LogOut size={15} aria-hidden="true" /> Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
