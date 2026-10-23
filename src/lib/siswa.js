"use client";

import { useKoleksi, muatSiswa, simpanSiswa, hapusSiswa } from "@/lib/db";

export { simpanSiswa, hapusSiswa };

export function useSiswa() {
  return useKoleksi(muatSiswa);
}
