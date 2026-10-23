"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Clock, MapPin, CalendarDays } from "lucide-react";
import { useAgenda, simpanAgenda, hapusAgenda, formatTanggal } from "@/lib/admin";
import {
  Tombol,
  Kartu,
  Kosong,
  kelasInput,
  kelasLabel,
} from "@/components/admin/ui";

const kosong = { tanggal: "", nama: "", jam: "", lokasi: "" };

export default function KelolaAgenda() {
  const { data: agenda, siap, refresh } = useAgenda();
  const [form, setForm] = useState(null);
  const [sedangProses, setSedangProses] = useState(false);

  const urut = [...agenda].sort((a, b) => a.tanggal.localeCompare(b.tanggal));

  const ubah = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const simpan = async (e) => {
    e.preventDefault();
    setSedangProses(true);
    try {
      await simpanAgenda(form);
      await refresh();
      setForm(null);
    } catch (err) {
      window.alert(`Gagal menyimpan agenda: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  const hapus = async (a) => {
    if (!window.confirm(`Hapus agenda "${a.nama}"?`)) return;
    try {
      await hapusAgenda(a.id);
      await refresh();
    } catch (err) {
      window.alert(`Gagal menghapus agenda: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#778296]">
          {agenda.length} agenda sekolah. Agenda ini juga tampil di dashboard dan
          halaman Akademik website.
        </p>
        <Tombol onClick={() => setForm(kosong)}>
          <Plus size={16} aria-hidden="true" /> Tambah Agenda
        </Tombol>
      </div>

      {form && (
        <Kartu>
          <form onSubmit={simpan} className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="a-nama" className={kelasLabel}>Nama kegiatan</label>
              <input id="a-nama" required value={form.nama} onChange={(e) => ubah("nama", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="a-tanggal" className={kelasLabel}>Tanggal</label>
              <input id="a-tanggal" type="date" required value={form.tanggal} onChange={(e) => ubah("tanggal", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="a-jam" className={kelasLabel}>Jam</label>
              <input id="a-jam" required value={form.jam} onChange={(e) => ubah("jam", e.target.value)} placeholder="08.00 - 11.00" className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="a-lokasi" className={kelasLabel}>Lokasi</label>
              <input id="a-lokasi" required value={form.lokasi} onChange={(e) => ubah("lokasi", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
              <Tombol type="submit" disabled={sedangProses}>Simpan</Tombol>
              <Tombol variasi="netral" onClick={() => setForm(null)} disabled={sedangProses}>Batal</Tombol>
            </div>
          </form>
        </Kartu>
      )}

      <Kartu>
        <ul className="divide-y divide-[#EDF6FF]">
          {urut.map((a) => {
            const t = formatTanggal(a.tanggal);
            return (
              <li key={a.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[10px] bg-[#EDF6FF] leading-none">
                  <span className="text-base font-bold text-[#1769AA]">{t.tanggal}</span>
                  <span className="mt-0.5 text-[10px] font-semibold uppercase text-[#778296]">{t.bulan}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#172238]">{a.nama}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#778296]">
                    <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden="true" /> {a.jam}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={12} aria-hidden="true" /> {a.lokasi}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays size={12} aria-hidden="true" /> {t.panjang}</span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <Tombol variasi="netral" onClick={() => setForm(a)} aria-label={`Ubah agenda ${a.nama}`}>
                    <Pencil size={14} aria-hidden="true" />
                  </Tombol>
                  <Tombol variasi="bahaya" onClick={() => hapus(a)} aria-label={`Hapus agenda ${a.nama}`}>
                    <Trash2 size={14} aria-hidden="true" />
                  </Tombol>
                </div>
              </li>
            );
          })}
        </ul>
        {siap && urut.length === 0 && <Kosong teks="Belum ada agenda." />}
      </Kartu>
    </div>
  );
}
