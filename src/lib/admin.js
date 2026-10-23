"use client";

// Titik impor bersama untuk hook data admin.
// Implementasi Supabase ada di src/lib/db.js, format di src/lib/format.js.

import { useKoleksi, muatBerita, muatAgenda, muatKalender } from "@/lib/db";

export { formatTanggal, rentangTanggal, slug } from "@/lib/format";
export {
  simpanBerita,
  hapusBerita,
  simpanAgenda,
  hapusAgenda,
  simpanKalender,
  hapusKalender,
} from "@/lib/db";

export function useBerita() {
  return useKoleksi(muatBerita);
}

export function useAgenda() {
  return useKoleksi(muatAgenda);
}

export function useKalender() {
  return useKoleksi(muatKalender);
}
