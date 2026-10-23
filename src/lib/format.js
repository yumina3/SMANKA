// Fungsi format bersama untuk data yang berasal dari Supabase.

export function slug(teks) {
  return (teks ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function formatTanggal(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso ?? "")) {
    return { tanggal: "-", bulan: "-", panjang: "-" };
  }
  const d = new Date(`${iso}T00:00:00`);
  return {
    tanggal: String(d.getDate()).padStart(2, "0"),
    bulan: d.toLocaleDateString("id-ID", { month: "short" }),
    panjang: d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export function tanggalPanjang(iso) {
  return formatTanggal(iso).panjang;
}

export function rentangTanggal(mulai, selesai) {
  const a = formatTanggal(mulai);
  if (!selesai || selesai === mulai) return a.panjang ?? "-";
  const b = formatTanggal(selesai);
  return `${a.panjang} - ${b.panjang}`;
}
