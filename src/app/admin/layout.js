"use client";

import { createContext, useContext, useState } from "react";
import { DM_Sans } from "next/font/google";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { PenyediaSesi, useSesi } from "@/components/admin/AdminGuard";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export const KonteksAdmin = createContext({ nama: "", email: "", cari: "" });
export const useAdmin = () => useContext(KonteksAdmin);

function KerangkaAdmin({ children }) {
  const { masuk, user, keluarSekarang } = useSesi();
  const [drawer, setDrawer] = useState(false);
  const [cari, setCari] = useState("");
  const nama = user?.user_metadata?.nama || user?.email?.split("@")[0] || "Administrator";

  return (
    <div className={dmSans.className}>
      {masuk && (
        <>
          <a
            href="#konten-admin"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#172238]"
          >
            Lewati ke konten
          </a>

          <AdminSidebar open={drawer} onClose={() => setDrawer(false)} />
        </>
      )}

      <div className={masuk ? "lg:pl-[258px]" : undefined}>
        {masuk && (
          <AdminHeader
            cari={cari}
            setCari={setCari}
            onMenu={() => setDrawer(true)}
            onKeluar={keluarSekarang}
          />
        )}
        <main
          id="konten-admin"
          className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-8 sm:py-6"
        >
          <KonteksAdmin.Provider value={{ nama, email: user?.email ?? "", cari }}>
            {children}
          </KonteksAdmin.Provider>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <PenyediaSesi>
      <KerangkaAdmin>{children}</KerangkaAdmin>
    </PenyediaSesi>
  );
}
