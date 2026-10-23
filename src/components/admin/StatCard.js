const variasi = {
  primary: "bg-[#EDF6FF] text-[#1769AA]",
  success: "bg-[#E7F7F1] text-[#20B27F]",
  warning: "bg-[#FDF3E6] text-[#E79025]",
  purple: "bg-[#F1EDFB] text-[#8268DF]",
};

export default function StatCard({ ikon: Ikon, label, nilai, keterangan, warna = "primary" }) {
  return (
    <div className="rounded-[14px] border border-[#CFE5F7] bg-white p-4 shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#778296]">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#172238]">{nilai}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${variasi[warna]}`}>
          <Ikon size={19} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-[11px] font-medium text-[#778296]">{keterangan}</p>
    </div>
  );
}
