import Link from "next/link";
import { ArrowRight } from "lucide-react";

const warna = [
  "bg-[#20B27F]",
  "bg-[#2C98ED]",
  "bg-[#8268DF]",
  "bg-[#E79025]",
  "bg-[#1769AA]",
  "bg-[#778296]",
];

export default function ClassSummary({ siswa = [] }) {
  const perKelas = [...new Set(siswa.map((s) => s.kelas))]
    .filter(Boolean)
    .map((kelas) => ({
      kelas,
      jumlah: siswa.filter((s) => s.kelas === kelas).length,
    }))
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 6);

  const maks = Math.max(1, ...perKelas.map((k) => k.jumlah));
  const total = siswa.length;

  return (
    <section
      aria-labelledby="judul-kelas"
      className="rounded-[14px] border border-[#CFE5F7] bg-white p-4 shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)] sm:p-5"
    >
      <h2 id="judul-kelas" className="text-sm font-bold text-[#172238]">
        Sebaran Siswa per Kelas
      </h2>

      {perKelas.length === 0 ? (
        <p className="mt-3 text-xs text-[#778296]">Belum ada data siswa.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {perKelas.map((k, i) => (
            <li key={k.kelas}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-semibold text-[#172238]">{k.kelas}</p>
                <p className="text-xs font-bold text-[#172238]">{k.jumlah}</p>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EDF6FF]">
                  <div
                    className={`h-full rounded-full ${warna[i % warna.length]}`}
                    style={{ width: `${(k.jumlah / maks) * 100}%` }}
                    role="progressbar"
                    aria-label={`Jumlah siswa ${k.kelas}`}
                    aria-valuenow={k.jumlah}
                    aria-valuemin={0}
                    aria-valuemax={maks}
                  />
                </div>
                <p className="shrink-0 text-[10px] text-[#778296]">
                  {total ? Math.round((k.jumlah / total) * 100) : 0}% dari total
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/admin/akademik"
        className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1769AA] hover:underline"
      >
        Lihat seluruh kelas <ArrowRight size={13} aria-hidden="true" />
      </Link>
    </section>
  );
}