"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw, Check, ShieldCheck } from "lucide-react";
import { muatProfil, simpanProfil } from "@/lib/db";
import AdminGuard, { useSesi } from "@/components/admin/AdminGuard";
import { JudulHalaman, Tombol, Kartu, kelasInput, kelasLabel } from "@/components/admin/ui";

const profilAwal = {
  nama: "SMA Negeri 1 Kajen",
  slogan: "Unggul dalam prestasi, Luhur dalam budi pekerti dan berwawasan lingkungan",
  alamat: "Jl. Ahmad Yani No. 1, Kajen, Kabupaten Pekalongan, Jawa Tengah 51161",
  telepon: "(0285) 381 708",
  email: "smankajen@gmail.com",
  visi: "Unggul dalam prestasi, Luhur dalam budi pekerti dan berwawasan lingkungan",
};

export default function Page() {
  return (
    <AdminGuard>
      <Pengaturan />
    </AdminGuard>
  );
}

function Pengaturan() {
  const { user } = useSesi();
  const namaAkun = user?.user_metadata?.nama || user?.email?.split("@")[0] || "Administrator";
  const [profil, setProfil] = useState(null);
  const [siap, setSiap] = useState(false);
  const [form, setForm] = useState(null);
  const [tersimpan, setTersimpan] = useState(false);
  const [sedangProses, setSedangProses] = useState(false);

  useEffect(() => {
    let aktif = true;
    muatProfil()
      .then((data) => {
        if (aktif) setProfil(data);
      })
      .catch((err) => {
        if (aktif) window.alert(`Gagal memuat profil: ${err.message}`);
      })
      .finally(() => {
        if (aktif) setSiap(true);
      });
    return () => {
      aktif = false;
    };
  }, []);

  const nilai = form ?? profil ?? profilAwal;

  const ubah = (k, v) => {
    setTersimpan(false);
    setForm((f) => ({ ...(f ?? profil ?? profilAwal), [k]: v }));
  };

  const simpan = async (e) => {
    e.preventDefault();
    setSedangProses(true);
    try {
      const data = {
        nama: nilai.nama,
        slogan: nilai.slogan,
        alamat: nilai.alamat,
        telepon: nilai.telepon,
        email: nilai.email,
        visi: nilai.visi,
      };
      await simpanProfil(data);
      setProfil((p) => ({ ...(p ?? {}), ...data }));
      setForm(null);
      setTersimpan(true);
    } catch (err) {
      window.alert(`Gagal menyimpan profil: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  const pulihkan = async () => {
    setSedangProses(true);
    try {
      await simpanProfil(profilAwal);
      setProfil((p) => ({ ...(p ?? {}), ...profilAwal }));
      setForm(null);
      setTersimpan(true);
    } catch (err) {
      window.alert(`Gagal memulihkan profil: ${err.message}`);
    } finally {
      setSedangProses(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <JudulHalaman
        judul="Pengaturan"
        deskripsi="Ubah profil sekolah dan lihat informasi akun administrator."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Kartu>
          <form onSubmit={simpan} className="flex flex-col gap-3 p-4 sm:p-5">
            <h2 className="text-sm font-bold text-[#172238]">Profil Sekolah</h2>

            <div>
              <label htmlFor="p-nama" className={kelasLabel}>Nama sekolah</label>
              <input id="p-nama" required value={nilai.nama} onChange={(e) => ubah("nama", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="p-slogan" className={kelasLabel}>Slogan</label>
              <input id="p-slogan" value={nilai.slogan} onChange={(e) => ubah("slogan", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div>
              <label htmlFor="p-alamat" className={kelasLabel}>Alamat</label>
              <textarea id="p-alamat" rows={2} value={nilai.alamat} onChange={(e) => ubah("alamat", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="p-telepon" className={kelasLabel}>Telepon</label>
                <input id="p-telepon" value={nilai.telepon} onChange={(e) => ubah("telepon", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
              <div>
                <label htmlFor="p-email" className={kelasLabel}>Email</label>
                <input id="p-email" type="email" value={nilai.email} onChange={(e) => ubah("email", e.target.value)} className={`${kelasInput} mt-1`} />
              </div>
            </div>
            <div>
              <label htmlFor="p-visi" className={kelasLabel}>Visi sekolah</label>
              <textarea id="p-visi" rows={2} value={nilai.visi} onChange={(e) => ubah("visi", e.target.value)} className={`${kelasInput} mt-1`} />
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Tombol type="submit" disabled={!siap || sedangProses}>
                <Save size={14} aria-hidden="true" /> Simpan Perubahan
              </Tombol>
              <Tombol variasi="netral" onClick={pulihkan} disabled={!siap || sedangProses}>
                <RotateCcw size={14} aria-hidden="true" /> Pulihkan Default
              </Tombol>
              {tersimpan && (
                <span role="status" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B8A64]">
                  <Check size={13} aria-hidden="true" /> Tersimpan di Supabase
                </span>
              )}
            </div>
          </form>
        </Kartu>

        <div className="flex flex-col gap-4">
          <Kartu>
            <div className="p-4 sm:p-5">
              <h2 className="text-sm font-bold text-[#172238]">Informasi Akun</h2>
              <dl className="mt-3 flex flex-col gap-3 text-xs">
                <div>
                  <dt className="text-[11px] font-semibold text-[#778296]">Nama</dt>
                  <dd className="mt-0.5 font-semibold text-[#172238]">{namaAkun}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold text-[#778296]">Peran</dt>
                  <dd className="mt-0.5 font-semibold text-[#172238]">Administrator</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold text-[#778296]">Email</dt>
                  <dd className="mt-0.5 font-semibold text-[#172238]">{user?.email ?? "—"}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-[#EDF6FF] px-3 py-2 text-[11px] text-[#1769AA]">
                <ShieldCheck size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                Sesi login dikelola oleh Supabase Auth.
              </p>
            </div>
          </Kartu>

          <Kartu>
            <div className="p-4 sm:p-5">
              <h2 className="text-sm font-bold text-[#172238]">Preview</h2>
              <p className="mt-2 text-sm font-semibold text-[#172238]">{nilai.nama}</p>
              <p className="mt-1 text-[11px] italic text-[#778296]">{nilai.slogan}</p>
              <p className="mt-3 text-[11px] text-[#3B4A61]">{nilai.alamat}</p>
              <p className="mt-1 text-[11px] text-[#778296]">
                {nilai.telepon} &middot; {nilai.email}
              </p>
            </div>
          </Kartu>
        </div>
      </div>
    </div>
  );
}
