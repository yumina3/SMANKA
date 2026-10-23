"use client";

export function JudulHalaman({ judul, deskripsi, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#172238] sm:text-2xl">
          {judul}
        </h1>
        {deskripsi && <p className="mt-1 text-sm text-[#778296]">{deskripsi}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Tombol({ children, onClick, type = "button", variasi = "utama", ...sisa }) {
  const gaya =
    variasi === "utama"
      ? "bg-[#2C98ED] text-white hover:bg-[#1769AA]"
      : variasi === "bahaya"
        ? "border border-[#F5C9C9] bg-white text-[#D93A3A] hover:bg-[#FDECEC]"
        : "border border-[#CFE5F7] bg-white text-[#1769AA] hover:bg-[#EDF6FF]";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769AA] ${gaya}`}
      {...sisa}
    >
      {children}
    </button>
  );
}

export const kelasInput =
  "w-full rounded-lg border border-[#CFE5F7] bg-white px-3 py-2.5 text-sm text-[#172238] placeholder:text-[#778296] focus:border-[#2C98ED] focus:outline-none focus:ring-2 focus:ring-[#2C98ED]/25";

export const kelasLabel = "block text-[11px] font-semibold text-[#778296]";

export function Kartu({ children }) {
  return (
    <div className="rounded-[14px] border border-[#CFE5F7] bg-white shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)]">
      {children}
    </div>
  );
}

export function Kosong({ teks }) {
  return (
    <p className="px-5 py-10 text-center text-xs text-[#778296]">{teks}</p>
  );
}
