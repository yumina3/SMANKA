"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, CalendarRange } from "lucide-react";
import { useKalender, simpanKalender, hapusKalender, rentangTanggal } from "@/lib/admin";
import {
  Tombol,
  Kartu,
  Kosong,
  kelasInput,
  kelasLabel,
} from "@/components/admin/ui";

const kosong = { nama: "", mulai: "", selesai: "", jenis: "Kegiatan" };

const jenis = ["Kegiatan", "Ujian", "Libur", "Rapat"];

const warnaJenis = {
  Ujian: "bg-[#FDF3E6] text-[#B76E14]",
  Libur: "bg-[#F1EDFB] text-[#6B4FD1]",
  Rapat: "bg-[#EDF6FF] text-[#1769AA]",
  Kegiatan: "bg-[#E7F7F1] text-[#1B8A64]",
};

export default function KelolaKalender() {
  const { data: kalender, siap, refresh } = useKalender();
  const [form, setForm] = useState(null);
  const [sedangProses, setSedangProses] = useState(false);

  const urut = [...kalender].sort((a, b) => a.mulai.localeCompare(b.mulai));

  const ubah = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const simpan = async (e) => {
    e.preventDefault();
    setSedangProses(true);
    try {
      await simpanKalender(form);
      await refresh();
      setForm(null);
    } catch (err) {
      window.alert(`Gagal menyimpan jadwal: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  const hapus = async (k) => {
    if (!window.confirm(`Hapus jadwal "${k.nama}"?`)) return;
    try {
      await hapusKalender(k.id);
      await refresh();
    } catch (err) {
      window.alert(`Gagal menghapus jadwal: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#778296]">
          {kalender.length} jadwal. Kalender akademik tampil di halaman Akademik
          website.
        </p>
        <Tombol onClick={() => setForm(kosong)}>
          <Plus size={16} aria-hidden="true" /> Tambah Jadwal
        </Tombol>
      </div>

      {form && (
        <Kartu>
          <form onSubmit={simpan} className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <label htmlFor="k-nama" className={kelasLabel}>Nama kegiatan</label>
              <input id="k-nama" required value={form.nama} onChange={(e) => ubah("nama", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="k-mulai" className={kelasLabel}>Mulai</label>
              <input id="k-mulai" type="date" required value={form.mulai} onChange={(e) => ubah("mulai", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="k-selesai" className={kelasLabel}>Selesai</label>
              <input id="k-selesai" type="date" value={form.selesai} min={form.mulai} onChange={(e) => ubah("selesai", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="k-jenis" className={kelasLabel}>Kategori</label>
              <select id="k-jenis" value={form.jenis} onChange={(e) => ubah("jenis", e.target.value)} className={`${kelasInput} mt-1`}>
                {jenis.map((j) => <option key={j}>{j}</option>)}
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
        <ul className="divide-y divide-[#EDF6FF]">
          {urut.map((k) => (
            <li key={k.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EDF6FF] text-[#1769AA]">
                <CalendarRange size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#172238]">{k.nama}</p>
                <p className="mt-0.5 text-[11px] text-[#778296]">
                  {rentangTanggal(k.mulai, k.selesai)}
                </p>
              </div>
              <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${warnaJenis[k.jenis] ?? warnaJenis.Kegiatan}`}>
                {k.jenis}
              </span>
              <div className="flex gap-1">
                <Tombol variasi="netral" onClick={() => setForm(k)} aria-label={`Ubah jadwal ${k.nama}`}>
                  <Pencil size={14} aria-hidden="true" />
                </Tombol>
                <Tombol variasi="bahaya" onClick={() => hapus(k)} aria-label={`Hapus jadwal ${k.nama}`}>
                  <Trash2 size={14} aria-hidden="true" />
                </Tombol>
              </div>
            </li>
          ))}
        </ul>
        {siap && urut.length === 0 && <Kosong teks="Belum ada jadwal." />}
      </Kartu>
    </div>
  );
}
