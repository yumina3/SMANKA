import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SegeraHadir({ judul }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold tracking-tight text-[#172238] sm:text-2xl">
        {judul}
      </h1>
      <div className="rounded-[14px] border border-[#CFE5F7] bg-white shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)]">
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="max-w-md text-sm text-[#778296]">
            Menu ini masih dalam pengembangan. Untuk demo, data yang bisa dikelola
            adalah berita, agenda, dan data siswa.
          </p>
          <Link
            href="/admin"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#CFE5F7] px-4 text-xs font-semibold text-[#1769AA] hover:bg-[#EDF6FF]"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
