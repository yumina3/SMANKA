"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAdmin } from "../layout";
import AdminGuard from "@/components/admin/AdminGuard";
import { useSiswa, simpanSiswa, hapusSiswa } from "@/lib/siswa";
import { daftarKelas } from "@/data/kelas";
import {
  JudulHalaman,
  Tombol,
  Kartu,
  Kosong,
  kelasInput,
  kelasLabel,
} from "@/components/admin/ui";

const kosong = {
  nis: "",
  nama: "",
  kelas: daftarKelas[0] ?? "",
  jenisKelamin: "L",
  status: "Aktif",
};

export default function Halaman() {
  return (
    <Suspense>
      <DataSiswa />
    </Suspense>
  );
}

function DataSiswa() {
  const { cari } = useAdmin();
  const params = useSearchParams();
  const { data: siswa = [], siap, refresh } = useSiswa();
  const [form, setForm] = useState(() => (params.get("baru") ? kosong : null));
  const [sedangProses, setSedangProses] = useState(false);

  const q = cari.trim().toLowerCase();
  const baris = siswa.filter(
    (s) => !q || `${s.nama} ${s.nis} ${s.kelas}`.toLowerCase().includes(q)
  );

  const ubah = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Kelas lama yang tidak ada di daftar dikosongkan agar dropdown tidak
  // menampilkan opsi pertama padahal state form masih kosong.
  const untukForm = (s) => ({
    ...s,
    kelas: daftarKelas.includes(s.kelas) ? s.kelas : "",
  });

  const simpan = async (e) => {
    e.preventDefault();
    setSedangProses(true);
    try {
      await simpanSiswa(form);
      await refresh();
      setForm(null);
    } catch (err) {
      window.alert(`Gagal menyimpan data siswa: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  const hapus = async (s) => {
    if (!window.confirm(`Hapus data siswa ${s.nama}?`)) return;
    try {
      await hapusSiswa(s.id);
      await refresh();
    } catch (err) {
      window.alert(`Gagal menghapus data siswa: ${err.message}`);
    }
  };

  return (
    <AdminGuard>
      <div className="flex flex-col gap-4">
        <JudulHalaman judul="Data Siswa" deskripsi={`${siswa.length} siswa terdaftar.`}>
          <Tombol onClick={() => setForm(kosong)}>
            <Plus size={16} aria-hidden="true" /> Tambah Siswa
          </Tombol>
        </JudulHalaman>

        {form && (
          <Kartu>
            <form onSubmit={simpan} className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="sm:col-span-2 lg:col-span-1">
                <label htmlFor="s-nis" className={kelasLabel}>NIS</label>
                <input id="s-nis" required value={form.nis} onChange={(e) => ubah("nis", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="s-nama" className={kelasLabel}>Nama</label>
                <input id="s-nama" required value={form.nama} onChange={(e) => ubah("nama", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
              <div>
                <label htmlFor="s-kelas" className={kelasLabel}>Kelas</label>
                <select id="s-kelas" required value={form.kelas} onChange={(e) => ubah("kelas", e.target.value)} className={`${kelasInput} mt-1`}>
                  <option value="" disabled>Pilih kelas</option>
                  {daftarKelas.map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="s-jk" className={kelasLabel}>Jenis Kelamin</label>
                <select id="s-jk" value={form.jenisKelamin} onChange={(e) => ubah("jenisKelamin", e.target.value)} className={`${kelasInput} mt-1`}>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label htmlFor="s-status" className={kelasLabel}>Status</label>
                <select id="s-status" value={form.status} onChange={(e) => ubah("status", e.target.value)} className={`${kelasInput} mt-1`}>
                  <option>Aktif</option>
                  <option>Cuti</option>
                  <option>Lulus</option>
                </select>
              </div>
              <div className="flex gap-2 sm:col-span-2 lg:col-span-5">
                <Tombol type="submit" disabled={sedangProses}>Simpan</Tombol>
                <Tombol variasi="netral" onClick={() => setForm(null)} disabled={sedangProses}>Batal</Tombol>
              </div>
            </form>
          </Kartu>
        )}

        <Kartu>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDF6FF] text-[10px] font-semibold uppercase tracking-wide text-[#778296]">
                  <th scope="col" className="px-4 py-3">NIS</th>
                  <th scope="col" className="px-4 py-3">Nama</th>
                  <th scope="col" className="px-4 py-3">Kelas</th>
                  <th scope="col" className="px-4 py-3">L/P</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF6FF]">
                {baris.map((s) => (
                  <tr key={s.id} className="text-[#3B4A61]">
                    <td className="px-4 py-3 text-[#778296]">{s.nis}</td>
                    <td className="px-4 py-3 font-semibold text-[#172238]">{s.nama}</td>
                    <td className="px-4 py-3">{s.kelas || "-"}</td>
                    <td className="px-4 py-3">{s.jenisKelamin}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${s.status === "Aktif" ? "bg-[#E7F7F1] text-[#1B8A64]" : "bg-[#FDF3E6] text-[#B76E14]"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Tombol variasi="netral" onClick={() => setForm(untukForm(s))} aria-label={`Ubah data ${s.nama}`}>
                          <Pencil size={14} aria-hidden="true" />
                        </Tombol>
                        <Tombol variasi="bahaya" onClick={() => hapus(s)} aria-label={`Hapus data ${s.nama}`}>
                          <Trash2 size={14} aria-hidden="true" />
                        </Tombol>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {siap && baris.length === 0 && <Kosong teks="Belum ada data siswa." />}
        </Kartu>

        <p className="flex items-center gap-1.5 text-[11px] text-[#778296]">
          <X size={12} aria-hidden="true" /> Data disimpan di database Supabase (terpusat).
        </p>
      </div>
    </AdminGuard>
  );
}