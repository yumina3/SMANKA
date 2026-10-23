"use client";

import { useKoleksi, muatGuru, simpanGuru, hapusGuru } from "@/lib/db";

export { simpanGuru, hapusGuru };

export function useGuru() {
  return useKoleksi(muatGuru);
}
