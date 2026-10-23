"use client";

import { Download, Users, GraduationCap, School, ClipboardList } from "lucide-react";
import { useSiswa } from "@/lib/siswa";
import { useGuru } from "@/lib/guru";
import { useBerita, useAgenda, useKalender } from "@/lib/admin";
import AdminGuard from "@/components/admin/AdminGuard";
import StatCard from "@/components/admin/StatCard";
import { JudulHalaman, Tombol, Kartu } from "@/components/admin/ui";

function unduhCsv(nama, baris) {
  const csv = baris
    .map((r) => r.map((sel) => `"${String(sel).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nama;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Page() {
  return (
    <AdminGuard>
      <Laporan />
    </AdminGuard>
  );
}

function Laporan() {
  const { data: siswa = [] } = useSiswa();
  const { data: guru = [] } = useGuru();
  const { data: berita = [] } = useBerita();
  const { data: agenda = [] } = useAgenda();
  const { data: kalender = [] } = useKalender();

  const kelasUnik = [...new Set(siswa.map((s) => s.kelas))].sort();

  const perKelas = kelasUnik.map((kelas) => ({
    kelas,
    jumlah: siswa.filter((s) => s.kelas === kelas).length,
  }));
  const maksimal = Math.max(1, ...perKelas.map((k) => k.jumlah));

  const perMapel = [...new Set(guru.map((g) => g.mapel))]
    .map((mapel) => ({ mapel, jumlah: guru.filter((g) => g.mapel === mapel).length }))
    .sort((a, b) => b.jumlah - a.jumlah);

  const perStatus = ["Aktif", "Cuti", "Lulus"].map((status) => ({
    status,
    jumlah: siswa.filter((s) => s.status === status).length,
  }));

  const eksporSiswa = () =>
    unduhCsv("laporan-data-siswa.csv", [
      ["NIS", "Nama", "Kelas", "Jenis Kelamin", "Status"],
      ...siswa.map((s) => [s.nis, s.nama, s.kelas, s.jenisKelamin, s.status]),
    ]);

  const eksporGuru = () =>
    unduhCsv("laporan-data-guru.csv", [
      ["NIP", "Nama", "Mata Pelajaran", "Jabatan", "Status"],
      ...guru.map((g) => [g.nip, g.nama, g.mapel, g.jabatan, g.status]),
    ]);

  return (
    <div className="flex flex-col gap-4">
      <JudulHalaman judul="Laporan" deskripsi="Rekapitulasi data sekolah dan ekspor ke berkas CSV." />

      <section aria-label="Ringkasan laporan" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard ikon={Users} label="Total Siswa" nilai={String(siswa.length)} keterangan={`${siswa.filter((s) => s.status === "Aktif").length} siswa aktif`} warna="primary" />
        <StatCard ikon={GraduationCap} label="Guru & Staf" nilai={String(guru.length)} keterangan={`${perMapel.length} mata pelajaran`} warna="purple" />
        <StatCard ikon={School} label="Kelas" nilai={String(kelasUnik.length)} keterangan="Kelas terdaftar" warna="success" />
        <StatCard ikon={ClipboardList} label="Konten Terbit" nilai={String(berita.length)} keterangan={`${agenda.length} agenda, ${kalender.length} jadwal`} warna="warning" />
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Kartu>
          <div className="p-4 sm:p-5">
            <h2 className="text-sm font-bold text-[#172238]">Siswa per Kelas</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {perKelas.map((k) => (
                <li key={k.kelas} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[11px] font-semibold text-[#3B4A61]">{k.kelas}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDF6FF]">
                    <span
                      className="block h-full rounded-full bg-[#2C98ED]"
                      style={{ width: `${(k.jumlah / maksimal) * 100}%` }}
                    />
                  </span>
                  <span className="w-6 shrink-0 text-right text-[11px] font-semibold text-[#1769AA]">{k.jumlah}</span>
                </li>
              ))}
            </ul>
          </div>
        </Kartu>

        <Kartu>
          <div className="p-4 sm:p-5">
            <h2 className="text-sm font-bold text-[#172238]">Status Siswa</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {perStatus.map((s) => (
                <li key={s.status} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[11px] font-semibold text-[#3B4A61]">{s.status}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDF6FF]">
                    <span
                      className="block h-full rounded-full bg-[#20B27F]"
                      style={{ width: `${siswa.length ? (s.jumlah / siswa.length) * 100 : 0}%` }}
                    />
                  </span>
                  <span className="w-6 shrink-0 text-right text-[11px] font-semibold text-[#1769AA]">{s.jumlah}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-sm font-bold text-[#172238]">Guru per Mata Pelajaran</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {perMapel.map((m) => (
                <li key={m.mapel} className="rounded-md bg-[#EDF6FF] px-2 py-1 text-[10px] font-semibold text-[#1769AA]">
                  {m.mapel} · {m.jumlah}
                </li>
              ))}
            </ul>
          </div>
        </Kartu>
      </div>

      <Kartu>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
          <div>
            <h2 className="text-sm font-bold text-[#172238]">Ekspor Data</h2>
            <p className="mt-1 text-[11px] text-[#778296]">
              Unduh rekap data dalam format CSV, dapat dibuka di Excel.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tombol variasi="netral" onClick={eksporSiswa}>
              <Download size={14} aria-hidden="true" /> Data Siswa
            </Tombol>
            <Tombol variasi="netral" onClick={eksporGuru}>
              <Download size={14} aria-hidden="true" /> Data Guru
            </Tombol>
          </div>
        </div>
      </Kartu>
    </div>
  );
}