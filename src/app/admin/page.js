"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Users, GraduationCap, School, Plus } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import StudentTeacherChart from "@/components/admin/StudentTeacherChart";
import AgendaCard from "@/components/admin/AgendaCard";
import RecentActivity from "@/components/admin/RecentActivity";
import ClassSummary from "@/components/admin/ClassSummary";
import { useAdmin } from "./layout";
import AdminGuard from "@/components/admin/AdminGuard";
import { useSiswa } from "@/lib/siswa";
import { useGuru } from "@/lib/guru";
import { daftarKelas } from "@/data/kelas";

const angka = (n) => n.toLocaleString("id-ID");
const TOTAL_KELAS = daftarKelas.length;

const formatTanggal = (nilai) =>
  nilai
    ? new Date(nilai).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "\u00A0";

export default function DashboardAdmin() {
  const { nama, cari } = useAdmin();
  const [tanggal, setTanggal] = useState(null);
  const { data: siswa = [] } = useSiswa();
  const { data: guru = [] } = useGuru();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTanggal(Date.now());
  }, []);

  const kelasUnik = [...new Set(siswa.map((s) => s.kelas))];

  return (
    <AdminGuard>
      <div className="flex flex-col gap-4 sm:gap-6">
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#778296]">
              {formatTanggal(tanggal)}
            </p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#172238] sm:text-[28px]">
              Halo, {nama}
            </h1>
            <p className="mt-1 text-sm text-[#778296]">
              Berikut ringkasan aktivitas sekolah hari ini.
            </p>
          </div>
          <Link
            href="/admin/siswa?baru=1"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#2C98ED] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1769AA]"
          >
            <Plus size={16} aria-hidden="true" />
            Tambah Data Siswa
          </Link>
        </section>

        {/* 3 Kartu Statistik Atas (Siswa, Guru, dan Kelas Terisi) */}
        <section aria-label="Ringkasan statistik" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard ikon={Users} label="Total Siswa" nilai={angka(siswa.length)} keterangan="Data tersimpan di Supabase" warna="primary" />
          <StatCard ikon={GraduationCap} label="Guru & Staf" nilai={angka(guru.length)} keterangan="Data tersimpan di Supabase" warna="purple" />
          <StatCard ikon={School} label="Kelas Terisi" nilai={`${kelasUnik.length}/${TOTAL_KELAS}`} keterangan="Rombel dengan data siswa" warna="success" />
        </section>

        {/* Bagian Grafik: Statistik Jumlah Guru dan Siswa */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <StudentTeacherChart siswa={siswa} guru={guru} />
          </div>
          <AgendaCard />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentActivity cari={cari} />
          </div>
          <ClassSummary siswa={siswa} />
        </div>
      </div>
    </AdminGuard>
  );
}