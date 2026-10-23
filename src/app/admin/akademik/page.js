"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JudulHalaman } from "@/components/admin/ui";
import KelolaKalender from "@/components/admin/KelolaKalender";
import KelolaAgenda from "@/components/admin/KelolaAgenda";
import AdminGuard from "@/components/admin/AdminGuard";

const tab = [
  { id: "jadwal", label: "Kalender Akademik" },
  { id: "agenda", label: "Agenda Sekolah" },
];

export default function Halaman() {
  return (
    <Suspense>
      <Akademik />
    </Suspense>
  );
}

function Akademik() {
  const params = useSearchParams();
  const [aktif, setAktif] = useState(
    tab.some((t) => t.id === params.get("tab")) ? params.get("tab") : "jadwal"
  );

  return (
    <AdminGuard>
      <div className="flex flex-col gap-4">
        <JudulHalaman
          judul="Akademik"
          deskripsi="Kelola kalender akademik dan agenda sekolah."
        />

      <div role="tablist" aria-label="Bagian akademik" className="flex w-full gap-1 rounded-lg bg-white p-1 ring-1 ring-[#CFE5F7] sm:w-fit">
        {tab.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={aktif === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setAktif(t.id)}
            className={`min-h-10 flex-1 rounded-md px-5 text-xs font-semibold transition-colors sm:flex-none ${
              aktif === t.id
                ? "bg-[#2C98ED] text-white"
                : "text-[#778296] hover:bg-[#EDF6FF] hover:text-[#1769AA]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section
        role="tabpanel"
        id="panel-jadwal"
        aria-labelledby="tab-jadwal"
        hidden={aktif !== "jadwal"}
      >
        {aktif === "jadwal" && <KelolaKalender />}
      </section>

      <section
        role="tabpanel"
        id="panel-agenda"
        aria-labelledby="tab-agenda"
        hidden={aktif !== "agenda"}
      >
        {aktif === "agenda" && <KelolaAgenda />}
      </section>
      </div>
    </AdminGuard>
  );
}
