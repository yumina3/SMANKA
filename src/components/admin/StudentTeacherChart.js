"use client";

import { useState } from "react";
import { Users, GraduationCap } from "lucide-react";

const JENJANG = ["X", "XI", "XII"];
const STATUS_GURU = ["Aktif", "Cuti", "Pensiun"];

// "XI IPA 1" -> "XI" (jangan pakai startsWith: "XI" dan "XII" ikut terhitung "X")
const jenjangKelas = (kelas = "") => kelas.split(" ")[0];

// Persentase aman bagi nol
const persen = (n, total) => (total ? (n / total) * 100 : 0);
const bulat = (n, total) => Math.round(persen(n, total));
const desimal = (n, total) => persen(n, total).toFixed(1);

export default function StudentTeacherChart({ siswa = [], guru = [] }) {
  const [tab, setTab] = useState("siswa");

  const totalSiswa = siswa.length;
  const totalGuru = guru.length;

  // --- Data siswa ---
  const laki = siswa.filter((s) => s.jenisKelamin === "L").length;
  const perempuan = siswa.filter((s) => s.jenisKelamin === "P").length;

  const dataSiswa = JENJANG.map((j) => {
    const anggota = siswa.filter((s) => jenjangKelas(s.kelas) === j);
    return {
      kategori: `Kelas ${j}`,
      jumlah: anggota.length,
      persentase: bulat(anggota.length, totalSiswa),
      sub: `${anggota.filter((s) => s.status === "Aktif").length} siswa aktif`,
    };
  });
  const jumlahAngkatan = dataSiswa.filter((d) => d.jumlah > 0).length;

  // --- Data guru ---
  const dataStatusGuru = STATUS_GURU.map((status) => {
    const jumlah = guru.filter((g) => g.status === status).length;
    return { status, jumlah, persentase: desimal(jumlah, totalGuru) };
  });

  const dataGuru = [...new Set(guru.map((g) => g.jabatan).filter(Boolean))]
    .map((jabatan) => {
      const jumlah = guru.filter((g) => g.jabatan === jabatan).length;
      return {
        kategori: jabatan,
        jumlah,
        persentase: bulat(jumlah, totalGuru),
        sub: `${guru.filter((g) => g.jabatan === jabatan && g.status === "Aktif").length} berstatus aktif`,
      };
    })
    .sort((a, b) => b.jumlah - a.jumlah);

  return (
    <section
      aria-labelledby="judul-statistik-guru-siswa"
      className="rounded-[14px] border border-[#CFE5F7] bg-white p-4 shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)] sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="judul-statistik-guru-siswa" className="text-sm font-bold text-[#172238]">
            Statistik Jumlah Guru & Siswa
          </h2>
          <p className="mt-1 text-xs text-[#778296]">
            Total terdaftar: <strong className="text-[#1769AA]">{totalSiswa} Siswa</strong> &{" "}
            <strong className="text-[#8268DF]">{totalGuru} Guru/Staf</strong>
          </p>
        </div>

        {/* Tab switcher: Siswa vs Guru */}
        <div role="group" aria-label="Pilihan Data Statistik" className="flex rounded-lg bg-[#F5F7FB] p-0.5">
          <button
            type="button"
            onClick={() => setTab("siswa")}
            aria-pressed={tab === "siswa"}
            className={`min-h-9 flex items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
              tab === "siswa"
                ? "bg-white text-[#1769AA] shadow-sm"
                : "text-[#778296] hover:text-[#1769AA]"
            }`}
          >
            <Users size={14} />
            Data Siswa
          </button>
          <button
            type="button"
            onClick={() => setTab("guru")}
            aria-pressed={tab === "guru"}
            className={`min-h-9 flex items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
              tab === "guru"
                ? "bg-white text-[#8268DF] shadow-sm"
                : "text-[#778296] hover:text-[#8268DF]"
            }`}
          >
            <GraduationCap size={14} />
            Data Guru & Staf
          </button>
        </div>
      </div>

      {/* Konten Tab Siswa */}
      {tab === "siswa" && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[#EDF6FF] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#1769AA]">Laki-laki</span>
              <p className="mt-1 text-lg font-bold text-[#172238]">{laki}</p>
              <span className="text-[10px] text-[#778296]">{desimal(laki, totalSiswa)}%</span>
            </div>
            <div className="rounded-xl bg-[#FDF3E6] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#E79025]">Perempuan</span>
              <p className="mt-1 text-lg font-bold text-[#172238]">{perempuan}</p>
              <span className="text-[10px] text-[#778296]">{desimal(perempuan, totalSiswa)}%</span>
            </div>
            <div className="rounded-xl bg-[#E7F7F1] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#20B27F]">Angkatan</span>
              <p className="mt-1 text-lg font-bold text-[#172238]">{jumlahAngkatan}</p>
              <span className="text-[10px] text-[#778296]">Berdata</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {dataSiswa.map((item) => (
              <div key={item.kategori}>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#172238]">{item.kategori}</span>
                  <span className="text-[#1769AA]">{item.jumlah} Siswa ({item.persentase}%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#EDF6FF]">
                  <div
                    className="h-full rounded-full bg-[#2C98ED] transition-all duration-500"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-[#778296]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Konten Tab Guru & Staf */}
      {tab === "guru" && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[#E7F7F1] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#20B27F]">{dataStatusGuru[0].status}</span>
              <p className="mt-1 text-lg font-bold text-[#172238]">{dataStatusGuru[0].jumlah}</p>
              <span className="text-[10px] text-[#778296]">{dataStatusGuru[0].persentase}%</span>
            </div>
            <div className="rounded-xl bg-[#EDF6FF] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#1769AA]">{dataStatusGuru[1].status}</span>
              <p className="mt-1 text-lg font-bold text-[#172238]">{dataStatusGuru[1].jumlah}</p>
              <span className="text-[10px] text-[#778296]">{dataStatusGuru[1].persentase}%</span>
            </div>
            <div className="rounded-xl bg-[#F1EDFB] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#8268DF]">{dataStatusGuru[2].status}</span>
              <p className="mt-1 text-lg font-bold text-[#172238]">{dataStatusGuru[2].jumlah}</p>
              <span className="text-[10px] text-[#778296]">{dataStatusGuru[2].persentase}%</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {dataGuru.map((item) => (
              <div key={item.kategori}>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#172238]">{item.kategori}</span>
                  <span className="text-[#8268DF]">{item.jumlah} Orang ({item.persentase}%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F1EDFB]">
                  <div
                    className="h-full rounded-full bg-[#8268DF] transition-all duration-500"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-[#778296]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}