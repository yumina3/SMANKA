"use client";

import { useState } from "react";
import { useBerita, useAgenda, useKalender } from "@/lib/admin";

const warnaStatus = {
  Terbit: "bg-[#E7F7F1] text-[#1B8A64]",
  Terjadwal: "bg-[#EDF6FF] text-[#1769AA]",
  Aktif: "bg-[#F1EDFB] text-[#8268DF]",
  Kosong: "bg-[#FDF3E6] text-[#B76E14]",
};

export default function RecentActivity({ cari = "" }) {
  const { data: berita = [] } = useBerita();
  const { data: agenda = [] } = useAgenda();
  const { data: kalender = [] } = useKalender();
  // Format YYYY-MM-DD (zona waktu lokal), dihitung sekali saat mount
  const [hariIni] = useState(() => new Date().toLocaleDateString("sv-SE"));

  const beritaTerbaru = [...berita]
    .filter((b) => b.tanggal)
    .sort((a, b) => String(b.tanggal).localeCompare(String(a.tanggal)))[0];

  const agendaMendatang = agenda
    .filter((a) => a.tanggal && String(a.tanggal) >= hariIni)
    .sort((a, b) => String(a.tanggal).localeCompare(String(b.tanggal)));

  const semua = [
    {
      nama: "Berita",
      inisial: "BR",
      aktivitas: beritaTerbaru
        ? `${berita.length} berita tersimpan. Terbaru: ${beritaTerbaru.judul}`
        : `${berita.length} berita tersimpan`,
      waktu: beritaTerbaru?.tanggal ?? "-",
      status: berita.length > 0 ? "Terbit" : "Kosong",
    },
    {
      nama: "Agenda",
      inisial: "AG",
      aktivitas: `${agendaMendatang.length} agenda mendatang dari ${agenda.length} agenda`,
      waktu: agendaMendatang[0]?.tanggal ?? "-",
      status: agendaMendatang.length > 0 ? "Terjadwal" : "Kosong",
    },
    {
      nama: "Kalender",
      inisial: "KL",
      aktivitas: `${kalender.length} jadwal kalender akademik`,
      waktu: "-",
      status: kalender.length > 0 ? "Aktif" : "Kosong",
    },
  ];

  const q = cari.trim().toLowerCase();
  const baris = semua.filter(
    (a) => !q || `${a.nama} ${a.aktivitas} ${a.status}`.toLowerCase().includes(q)
  );

  return (
    <section
      aria-labelledby="judul-aktivitas"
      className="rounded-[14px] border border-[#CFE5F7] bg-white p-4 shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)] sm:p-5"
    >
      <h2 id="judul-aktivitas" className="text-sm font-bold text-[#172238]">
        Ringkasan Konten
      </h2>

      <div className="mt-3 hidden sm:block">
        <table className="w-full text-left">
          <caption className="sr-only">Ringkasan konten berita, agenda, dan kalender</caption>
          <thead>
            <tr className="border-b border-[#EDF6FF] text-[10px] font-semibold uppercase tracking-wide text-[#778296]">
              <th scope="col" className="pb-2 font-semibold">Konten</th>
              <th scope="col" className="pb-2 font-semibold">Ringkasan</th>
              <th scope="col" className="pb-2 font-semibold">Terdekat / Terbaru</th>
              <th scope="col" className="pb-2 text-right font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF6FF]">
            {baris.map((a) => (
              <tr key={a.nama} className="text-xs text-[#3B4A61]">
                <td className="py-3 pr-2">
                  <span className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EDF6FF] text-[10px] font-bold text-[#1769AA]">
                      {a.inisial}
                    </span>
                    <span className="font-semibold text-[#172238]">{a.nama}</span>
                  </span>
                </td>
                <td className="py-3 pr-2">{a.aktivitas}</td>
                <td className="whitespace-nowrap py-3 pr-2 text-[#778296]">{a.waktu}</td>
                <td className="py-3 text-right">
                  <span className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${warnaStatus[a.status]}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
            {baris.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-xs text-[#778296]">
                  Tidak ada konten yang cocok dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="mt-2 flex flex-col divide-y divide-[#EDF6FF] sm:hidden">
        {baris.map((a) => (
          <li key={a.nama} className="flex items-start gap-2.5 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EDF6FF] text-[10px] font-bold text-[#1769AA]">
              {a.inisial}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-[#172238]">{a.nama}</p>
                <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${warnaStatus[a.status]}`}>
                  {a.status}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#3B4A61]">{a.aktivitas}</p>
              <p className="text-[10px] text-[#778296]">{a.waktu}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}