"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { useAdmin } from "../layout";
import AdminGuard from "@/components/admin/AdminGuard";
import { useBerita, simpanBerita, hapusBerita, slug } from "@/lib/admin";
import { unggahGambarBerita } from "@/lib/storage";
import {
  JudulHalaman,
  Tombol,
  Kartu,
  Kosong,
  kelasInput,
  kelasLabel,
} from "@/components/admin/ui";

const kosong = { judul: "", tanggal: "", ringkasan: "", isi: "", gambar: "/berita1.jpg" };

export default function Halaman() {
  return (
    <Suspense>
      <KelolaBerita />
    </Suspense>
  );
}

function KelolaBerita() {
  const { cari } = useAdmin();
  const params = useSearchParams();
  const { data: berita, siap, refresh } = useBerita();
  const [form, setForm] = useState(() => (params.get("baru") ? kosong : null));
  const [sedangProses, setSedangProses] = useState(false);
  const [sedangUnggah, setSedangUnggah] = useState(false);

  const q = cari.trim().toLowerCase();
  const baris = berita.filter(
    (b) => !q || `${b.judul} ${b.ringkasan}`.toLowerCase().includes(q)
  );

  const ubah = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const unggah = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSedangUnggah(true);
    try {
      const url = await unggahGambarBerita(file);
      ubah("gambar", url);
    } catch (err) {
      window.alert(`Gagal mengunggah gambar: ${err.message}`);
    } finally {
      setSedangUnggah(false);
      e.target.value = "";
    }
  };

  const simpan = async (e) => {
    e.preventDefault();
    setSedangProses(true);
    try {
      const isi = form.isi.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      const tanggal = form.tanggal;
      const data = {
        id: form.id,
        slug: slug(form.judul),
        judul: form.judul,
        tanggal,
        ringkasan: form.ringkasan,
        isi,
        gambar: form.gambar,
        kategori: form.kategori ?? "Kegiatan",
      };

      await simpanBerita(data);
      await refresh();
      setForm(null);
    } catch (err) {
      window.alert(`Gagal menyimpan berita: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  const hapus = async (b) => {
    if (!window.confirm(`Hapus berita "${b.judul}"?`)) return;
    try {
      await hapusBerita(b.id);
      await refresh();
    } catch (err) {
      window.alert(`Gagal menghapus berita: ${err.message}`);
    }
  };

  const untukForm = (b) => ({
    ...b,
    tanggal: b.tanggal ?? "",
    isi: Array.isArray(b.isi) ? b.isi.join("\n\n") : (b.isi ?? ""),
  });

  return (
    <AdminGuard>
      <div className="flex flex-col gap-4">
        <JudulHalaman judul="Berita Sekolah" deskripsi={`${berita.length} berita tersimpan.`}>
        <Tombol onClick={() => setForm(kosong)}>
          <Plus size={16} aria-hidden="true" /> Tambah Berita
        </Tombol>
      </JudulHalaman>

      {form && (
        <Kartu>
          <form onSubmit={simpan} className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="b-judul" className={kelasLabel}>Judul</label>
              <input id="b-judul" required value={form.judul} onChange={(e) => ubah("judul", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="b-tanggal" className={kelasLabel}>Tanggal</label>
              <input id="b-tanggal" type="date" required value={form.tanggal} onChange={(e) => ubah("tanggal", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="b-gambar" className={kelasLabel}>Gambar</label>
              <input id="b-gambar" type="file" accept="image/*" onChange={unggah} disabled={sedangUnggah} className={`${kelasInput} mt-1`} />
              {form.gambar && (
                <p className="mt-1 truncate text-[11px] text-[#778296]">{form.gambar}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="b-ringkasan" className={kelasLabel}>Ringkasan</label>
              <textarea id="b-ringkasan" required rows={2} value={form.ringkasan} onChange={(e) => ubah("ringkasan", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="b-isi" className={kelasLabel}>
                Isi berita (pisahkan paragraf dengan baris kosong)
              </label>
              <textarea id="b-isi" required rows={6} value={form.isi} onChange={(e) => ubah("isi", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <Tombol type="submit" disabled={sedangProses || sedangUnggah}>Simpan Berita</Tombol>
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
                <th scope="col" className="px-4 py-3">Judul</th>
                <th scope="col" className="px-4 py-3">Tanggal</th>
                <th scope="col" className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF6FF]">
              {baris.map((b) => (
                <tr key={b.id} className="text-[#3B4A61]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#172238]">{b.judul}</p>
                    <p className="mt-0.5 line-clamp-1 max-w-md text-[11px] text-[#778296]">{b.ringkasan}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[#778296]">{b.tanggal}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <a
                        href={`/berita/${b.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Lihat berita ${b.judul}`}
                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#CFE5F7] px-2.5 text-[#1769AA] hover:bg-[#EDF6FF]"
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      <Tombol variasi="netral" onClick={() => setForm(untukForm(b))} aria-label={`Ubah berita ${b.judul}`}>
                        <Pencil size={14} aria-hidden="true" />
                      </Tombol>
                      <Tombol variasi="bahaya" onClick={() => hapus(b)} aria-label={`Hapus berita ${b.judul}`}>
                        <Trash2 size={14} aria-hidden="true" />
                      </Tombol>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {siap && baris.length === 0 && <Kosong teks="Belum ada berita." />}
      </Kartu>
      </div>
    </AdminGuard>
  );
}
