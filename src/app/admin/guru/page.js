"use client";

import { Suspense, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "../layout";
import { useGuru, simpanGuru, hapusGuru } from "@/lib/guru";
import AdminGuard from "@/components/admin/AdminGuard";
import {
  JudulHalaman,
  Tombol,
  Kartu,
  Kosong,
  kelasInput,
  kelasLabel,
} from "@/components/admin/ui";

const kosong = { nip: "", nama: "", mapel: "", jabatan: "Guru", status: "Aktif" };

const jabatan = [
  "Kepala Sekolah",
  "Wakil Kepala Kurikulum",
  "Wakil Kepala Kesiswaan",
  "Wakil Kepala Sarana",
  "Kepala Laboratorium",
  "Guru",
  "Staf Tata Usaha",
];

export default function Halaman() {
  return (
    <Suspense>
      <DataGuru />
    </Suspense>
  );
}

function DataGuru() {
  const { cari } = useAdmin();
  const { data: guru, siap, refresh } = useGuru();
  const [form, setForm] = useState(null);
  const [sedangProses, setSedangProses] = useState(false);

  const q = cari.trim().toLowerCase();
  const baris = guru.filter(
    (g) => !q || `${g.nama} ${g.nip} ${g.mapel} ${g.jabatan}`.toLowerCase().includes(q)
  );

  const ubah = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const simpan = async (e) => {
    e.preventDefault();
    setSedangProses(true);
    try {
      await simpanGuru(form);
      await refresh();
      setForm(null);
    } catch (err) {
      window.alert(`Gagal menyimpan data guru: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  const hapus = async (g) => {
    if (!window.confirm(`Hapus data guru ${g.nama}?`)) return;
    try {
      await hapusGuru(g.id);
      await refresh();
    } catch (err) {
      window.alert(`Gagal menghapus data guru: ${err.message}`);
    }
  };

  return (
    <AdminGuard>
      <div className="flex flex-col gap-4">
        <JudulHalaman judul="Guru & Staf" deskripsi={`${guru.length} guru dan staf terdaftar.`}>
          <Tombol onClick={() => setForm(kosong)}>
            <Plus size={16} aria-hidden="true" /> Tambah Guru
          </Tombol>
        </JudulHalaman>

        {form && (
          <Kartu>
            <form onSubmit={simpan} className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="g-nip" className={kelasLabel}>NIP</label>
                <input id="g-nip" required value={form.nip} onChange={(e) => ubah("nip", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="g-nama" className={kelasLabel}>Nama lengkap</label>
                <input id="g-nama" required value={form.nama} onChange={(e) => ubah("nama", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
              <div>
                <label htmlFor="g-mapel" className={kelasLabel}>Mata pelajaran</label>
                <input id="g-mapel" required value={form.mapel} onChange={(e) => ubah("mapel", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
              <div>
                <label htmlFor="g-jabatan" className={kelasLabel}>Jabatan</label>
                <select id="g-jabatan" value={form.jabatan} onChange={(e) => ubah("jabatan", e.target.value)} className={`${kelasInput} mt-1`}>
                  {jabatan.map((j) => <option key={j}>{j}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="g-status" className={kelasLabel}>Status</label>
                <select id="g-status" value={form.status} onChange={(e) => ubah("status", e.target.value)} className={`${kelasInput} mt-1`}>
                  <option>Aktif</option>
                  <option>Cuti</option>
                  <option>Pensiun</option>
                </select>
              </div>
              <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
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
                  <th scope="col" className="px-4 py-3">NIP</th>
                  <th scope="col" className="px-4 py-3">Nama</th>
                  <th scope="col" className="px-4 py-3">Mapel</th>
                  <th scope="col" className="px-4 py-3">Jabatan</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF6FF]">
                {baris.map((g) => (
                  <tr key={g.id} className="text-[#3B4A61]">
                    <td className="px-4 py-3 text-[#778296]">{g.nip}</td>
                    <td className="px-4 py-3 font-semibold text-[#172238]">{g.nama}</td>
                    <td className="px-4 py-3">{g.mapel}</td>
                    <td className="px-4 py-3 text-[#778296]">{g.jabatan}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${g.status === "Aktif" ? "bg-[#E7F7F1] text-[#1B8A64]" : "bg-[#FDF3E6] text-[#B76E14]"}`}>
                        {g.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Tombol variasi="netral" onClick={() => setForm(g)} aria-label={`Ubah data ${g.nama}`}>
                          <Pencil size={14} aria-hidden="true" />
                        </Tombol>
                        <Tombol variasi="bahaya" onClick={() => hapus(g)} aria-label={`Hapus data ${g.nama}`}>
                          <Trash2 size={14} aria-hidden="true" />
                        </Tombol>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {siap && baris.length === 0 && <Kosong teks="Belum ada data guru." />}
        </Kartu>
      </div>
    </AdminGuard>
  );
}
