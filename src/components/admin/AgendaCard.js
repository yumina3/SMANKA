"use client";

import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { formatTanggal, useAgenda } from "@/lib/admin";

export default function AgendaCard({ batas = 3 }) {
  const { data: agenda, siap } = useAgenda();

  const urut = [...agenda]
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    .slice(0, batas);

  return (
    <section
      aria-labelledby="judul-agenda"
      className="rounded-[14px] border border-[#CFE5F7] bg-white p-4 shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="judul-agenda" className="text-sm font-bold text-[#172238]">
          Agenda Terdekat
        </h2>
        <Link href="/admin/akademik?tab=agenda" className="text-[11px] font-semibold text-[#1769AA] hover:underline">
          Kelola
        </Link>
      </div>

      <ul className="mt-3 flex flex-col divide-y divide-[#EDF6FF]">
        {siap && urut.length === 0 && (
          <li className="py-6 text-center text-xs text-[#778296]">
            Belum ada agenda. Tambahkan lewat menu Agenda.
          </li>
        )}
        {urut.map((a) => {
          const t = formatTanggal(a.tanggal);
          return (
            <li key={a.id} className="flex items-start gap-3 py-3">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[10px] bg-[#EDF6FF] leading-none">
                <span className="text-base font-bold text-[#1769AA]">{t.tanggal}</span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase text-[#778296]">
                  {t.bulan}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#172238]">{a.nama}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#778296]">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" /> {a.jam}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} aria-hidden="true" /> {a.lokasi}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
