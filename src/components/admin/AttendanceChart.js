"use client";

import { useState } from "react";

const data7 = [
  { day: "Sen", value: 88 },
  { day: "Sel", value: 82 },
  { day: "Rab", value: 91 },
  { day: "Kam", value: 84 },
  { day: "Jum", value: 94 },
  { day: "Sab", value: 87 },
  { day: "Min", value: 96 },
];

const angka30 = [
  86, 84, 90, 88, 85, 92, 89, 87, 83, 91, 90, 88, 86, 93, 95, 92, 89, 87, 84, 90,
  88, 91, 93, 90, 87, 85, 89, 92, 94, 91,
];

const data30 = angka30.map((value, i) => ({ day: String(i + 1), value }));

const W = 640;
const H = 220;
const PAD = 18;

function titik(data) {
  const min = Math.min(...data.map((d) => d.value)) - 6;
  const max = Math.max(...data.map((d) => d.value)) + 4;
  return data.map((d, i) => ({
    ...d,
    x: PAD + (i * (W - PAD * 2)) / (data.length - 1),
    y: H - PAD - ((d.value - min) / (max - min)) * (H - PAD * 2),
  }));
}

export default function AttendanceChart() {
  const [rentang, setRentang] = useState("7");
  const data = rentang === "7" ? data7 : data30;
  const pts = titik(data);
  const path = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `M ${pts[0].x},${H - PAD} L ${pts
    .map((p) => `${p.x},${p.y}`)
    .join(" L ")} L ${pts.at(-1).x},${H - PAD} Z`;
  const rata = (data.reduce((a, b) => a + b.value, 0) / data.length).toFixed(1);

  return (
    <section
      aria-labelledby="judul-kehadiran"
      className="rounded-[14px] border border-[#CFE5F7] bg-white p-4 shadow-[0_6px_20px_-14px_rgba(23,105,170,0.4)] sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="judul-kehadiran" className="text-sm font-bold text-[#172238]">
            Statistik Kehadiran
          </h2>
          <p className="mt-1 text-xs text-[#778296]">
            Rata-rata <strong className="text-[#20B27F]">{rata}%</strong> dalam{" "}
            {rentang} hari
          </p>
        </div>
        <div role="group" aria-label="Rentang kehadiran" className="flex rounded-lg bg-[#F5F7FB] p-0.5">
          {[
            { id: "7", label: "7 Hari" },
            { id: "30", label: "30 Hari" },
          ].map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setRentang(o.id)}
              aria-pressed={rentang === o.id}
              className={`min-h-10 rounded-md px-3 text-xs font-semibold transition-colors ${
                rentang === o.id
                  ? "bg-white text-[#1769AA] shadow-sm"
                  : "text-[#778296] hover:text-[#1769AA]"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 h-48 w-full sm:h-56"
        role="img"
        aria-label={`Grafik kehadiran ${rentang} hari terakhir`}
      >
        <defs>
          <linearGradient id="gradKehadiran" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2C98ED" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2C98ED" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD}
            x2={W - PAD}
            y1={H * f}
            y2={H * f}
            stroke="#EDF6FF"
            strokeWidth="1.5"
          />
        ))}
        <path d={area} fill="url(#gradKehadiran)" />
        <polyline
          points={path}
          fill="none"
          stroke="#2C98ED"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pts.map((p) => (
          <circle
            key={p.day}
            cx={p.x}
            cy={p.y}
            r={rentang === "7" ? 4 : 2.5}
            fill="#fff"
            stroke="#2C98ED"
            strokeWidth="2"
          >
            <title>{`${p.day}: ${p.value}%`}</title>
          </circle>
        ))}
      </svg>

      <div className="mt-1 flex justify-between overflow-hidden text-[10px] font-semibold text-[#778296]">
        {(rentang === "7"
          ? data
          : data.filter((_, i) => i % 5 === 0 || i === data.length - 1)
        ).map((d) => (
          <span key={d.day}>{rentang === "7" ? d.day : `${d.day}/30`}</span>
        ))}
      </div>
    </section>
  );
}
