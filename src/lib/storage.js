"use client";

// Upload gambar berita ke Supabase Storage (bucket publik "berita").

import { supabaseBrowser } from "@/lib/supabase/client";

const BUCKET = "berita";
const MAKS_UKURAN = 5 * 1024 * 1024;

export async function unggahGambarBerita(file) {
  if (!file) throw new Error("Pilih file gambar terlebih dahulu.");
  if (!file.type.startsWith("image/")) {
    throw new Error("File harus berupa gambar.");
  }
  if (file.size > MAKS_UKURAN) {
    throw new Error("Ukuran gambar maksimal 5 MB.");
  }

  const ekstensi = (file.name.split(".").pop() || "jpg").toLowerCase();
  const nama = `${Date.now()}-${crypto.randomUUID()}.${ekstensi}`;

  const { error } = await supabaseBrowser()
    .storage.from(BUCKET)
    .upload(nama, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(error.message);

  return supabaseBrowser().storage.from(BUCKET).getPublicUrl(nama).data.publicUrl;
}
