"use client";

// Lapisan data Supabase untuk panel admin.
// Semua fungsi mengembalikan data siap pakai (snake_case DB -> camelCase UI)
// dan melempar Error berisi pesan Supabase bila gagal.

import { useCallback, useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

function lempar(error) {
  if (error) throw new Error(error.message);
}

// ---------- Mapper ----------

const keBerita = (r) => ({
  id: r.id,
  slug: r.slug,
  judul: r.judul,
  tanggal: r.tanggal,
  ringkasan: r.ringkasan,
  isi: r.isi ?? [],
  gambar: r.gambar,
  kategori: r.kategori,
});

const dariBerita = (b) => ({
  slug: b.slug,
  judul: b.judul,
  tanggal: b.tanggal,
  ringkasan: b.ringkasan,
  isi: b.isi,
  gambar: b.gambar,
  kategori: b.kategori,
});

const keGuru = (r) => ({
  id: r.id,
  nip: r.nip,
  nama: r.nama,
  mapel: r.mapel,
  jabatan: r.jabatan,
  status: r.status,
});

const keSiswa = (r) => ({
  id: r.id,
  nis: r.nis,
  nama: r.nama,
  kelas: r.kelas,
  jenisKelamin: r.jenis_kelamin,
  status: r.status,
});

const dariSiswa = (s) => ({
  nis: s.nis,
  nama: s.nama,
  kelas: s.kelas,
  jenis_kelamin: s.jenisKelamin,
  status: s.status,
});

const keAgenda = (r) => ({
  id: r.id,
  tanggal: r.tanggal,
  nama: r.nama,
  jam: r.jam,
  lokasi: r.lokasi,
});

const keKalender = (r) => ({
  id: r.id,
  mulai: r.mulai,
  selesai: r.selesai,
  nama: r.nama,
  jenis: r.jenis,
});

const keProfil = (r) => ({
  nama: r.nama,
  slogan: r.slogan,
  alamat: r.alamat,
  telepon: r.telepon,
  email: r.email,
  visi: r.visi,
  misi: r.misi ?? [],
  sambutan: {
    teks: r.sambutan_teks,
    nama: r.sambutan_nama,
    jabatan: r.sambutan_jabatan,
    gambar: r.sambutan_gambar,
  },
  sejarah: r.sejarah ?? [],
  fasilitas: r.fasilitas ?? [],
  ekstrakurikuler: r.ekstrakurikuler ?? [],
  prestasi: r.prestasi ?? [],
  programUnggulan: r.program_unggulan ?? [],
  kelas: r.kelas ?? [],
});

// ---------- Hook generik ----------

export function useKoleksi(muat, deps = []) {
  const [data, setData] = useState([]);
  const [siap, setSiap] = useState(false);
  const [error, setError] = useState(null);
  const muatRef = useRef(muat);

  useEffect(() => {
    muatRef.current = muat;
  }, [muat]);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      setData(await muatRef.current());
    } catch (e) {
      setError(e.message);
      setData([]);
    } finally {
      setSiap(true);
    }
  }, []);

  useEffect(() => {
    let aktif = true;
    (async () => {
      try {
        const hasil = await muatRef.current();
        if (!aktif) return;
        setData(hasil);
        setError(null);
      } catch (e) {
        if (!aktif) return;
        setError(e.message);
        setData([]);
      } finally {
        if (aktif) setSiap(true);
      }
    })();
    return () => {
      aktif = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, setData, siap, error, refresh };
}

// ---------- Berita ----------

export const muatBerita = async () => {
  const { data, error } = await supabaseBrowser()
    .from("berita")
    .select("*")
    .order("tanggal", { ascending: false });
  lempar(error);
  return data.map(keBerita);
};

export const simpanBerita = async (berita) => {
  const db = supabaseBrowser();
  if (berita.id) {
    const { error } = await db.from("berita").update(dariBerita(berita)).eq("id", berita.id);
    lempar(error);
  } else {
    const { error } = await db.from("berita").insert(dariBerita(berita));
    lempar(error);
  }
};

export const hapusBerita = async (id) => {
  const { error } = await supabaseBrowser().from("berita").delete().eq("id", id);
  lempar(error);
};

// ---------- Guru ----------

export const muatGuru = async () => {
  const { data, error } = await supabaseBrowser().from("guru").select("*").order("nama");
  lempar(error);
  return data.map(keGuru);
};

export const simpanGuru = async (guru) => {
  const db = supabaseBrowser();
  const isian = {
    nip: guru.nip,
    nama: guru.nama,
    mapel: guru.mapel,
    jabatan: guru.jabatan,
    status: guru.status,
  };
  if (guru.id) {
    const { error } = await db.from("guru").update(isian).eq("id", guru.id);
    lempar(error);
  } else {
    const { error } = await db.from("guru").insert(isian);
    lempar(error);
  }
};

export const hapusGuru = async (id) => {
  const { error } = await supabaseBrowser().from("guru").delete().eq("id", id);
  lempar(error);
};

// ---------- Siswa ----------

export const muatSiswa = async () => {
  const { data, error } = await supabaseBrowser().from("siswa").select("*").order("nama");
  lempar(error);
  return data.map(keSiswa);
};

export const simpanSiswa = async (siswa) => {
  const db = supabaseBrowser();
  if (siswa.id) {
    // .select() mengembalikan baris yang benar-benar berubah. Bila kebijakan RLS
    // menolak UPDATE, Supabase tidak melempar error tetapi hasilnya kosong.
    const { data, error } = await db
      .from("siswa")
      .update(dariSiswa(siswa))
      .eq("id", siswa.id)
      .select();
    lempar(error);
    if (!data || data.length === 0) {
      throw new Error(
        "Tidak ada baris yang diperbarui. Cek kebijakan RLS UPDATE untuk tabel siswa."
      );
    }
  } else {
    const { error } = await db.from("siswa").insert(dariSiswa(siswa));
    lempar(error);
  }
};

export const hapusSiswa = async (id) => {
  const { error } = await supabaseBrowser().from("siswa").delete().eq("id", id);
  lempar(error);
};

// ---------- Agenda ----------

export const muatAgenda = async () => {
  const { data, error } = await supabaseBrowser()
    .from("agenda")
    .select("*")
    .order("tanggal", { ascending: true });
  lempar(error);
  return data.map(keAgenda);
};

export const simpanAgenda = async (agenda) => {
  const db = supabaseBrowser();
  const isian = {
    tanggal: agenda.tanggal,
    nama: agenda.nama,
    jam: agenda.jam,
    lokasi: agenda.lokasi,
  };
  if (agenda.id) {
    const { error } = await db.from("agenda").update(isian).eq("id", agenda.id);
    lempar(error);
  } else {
    const { error } = await db.from("agenda").insert(isian);
    lempar(error);
  }
};

export const hapusAgenda = async (id) => {
  const { error } = await supabaseBrowser().from("agenda").delete().eq("id", id);
  lempar(error);
};

// ---------- Kalender akademik ----------

export const muatKalender = async () => {
  const { data, error } = await supabaseBrowser()
    .from("kalender_akademik")
    .select("*")
    .order("mulai", { ascending: true });
  lempar(error);
  return data.map(keKalender);
};

export const simpanKalender = async (kalender) => {
  const db = supabaseBrowser();
  const isian = {
    mulai: kalender.mulai,
    selesai: kalender.selesai || null,
    nama: kalender.nama,
    jenis: kalender.jenis,
  };
  if (kalender.id) {
    const { error } = await db.from("kalender_akademik").update(isian).eq("id", kalender.id);
    lempar(error);
  } else {
    const { error } = await db.from("kalender_akademik").insert(isian);
    lempar(error);
  }
};

export const hapusKalender = async (id) => {
  const { error } = await supabaseBrowser().from("kalender_akademik").delete().eq("id", id);
  lempar(error);
};

// ---------- Profil sekolah ----------

export const muatProfil = async () => {
  const { data, error } = await supabaseBrowser()
    .from("profil_sekolah")
    .select("*")
    .eq("id", 1)
    .single();
  lempar(error);
  return keProfil(data);
};

export const simpanProfil = async (profil) => {
  const { error } = await supabaseBrowser()
    .from("profil_sekolah")
    .update({
      nama: profil.nama,
      slogan: profil.slogan,
      alamat: profil.alamat,
      telepon: profil.telepon,
      email: profil.email,
      visi: profil.visi,
    })
    .eq("id", 1);
  lempar(error);
};