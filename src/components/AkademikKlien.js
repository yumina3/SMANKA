"use client";

import { useKalender, useAgenda, rentangTanggal } from "@/lib/admin";

const urutKalender = (list) => [...list].sort((a, b) => a.mulai.localeCompare(b.mulai));

export default function JadwalAkademik() {
  const { data: kalender, siap: siapKalender } = useKalender();
  const { data: agenda, siap: siapAgenda } = useAgenda();

  const tahun = [...new Set(urutKalender(kalender).map((k) => k.mulai.slice(0, 4)))];

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="kalender-akademik">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-light">
          Jadwal
        </h2>
        <h3
          id="kalender-akademik"
          className="font-display mt-2 text-2xl md:text-3xl tracking-tight"
        >
          Kalender <em className="italic text-foreground/60">akademik</em>
        </h3>
        <p className="mt-3 max-w-2xl text-base text-foreground/70 leading-relaxed">
          Rangkaian kegiatan belajar mengajar, penilaian, dan libur sepanjang
          tahun ajaran.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {tahun.map((t) => (
            <div key={t}>
              <h4 className="text-sm font-semibold text-foreground/70">
                Tahun {t}
              </h4>
              <ul className="mt-3 divide-y divide-black/5 liquid-glass rounded-3xl px-5 sm:px-6">
                {urutKalender(kalender)
                  .filter((k) => k.mulai.startsWith(t))
                  .map((k) => (
                    <li key={k.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4">
                      <span className="w-full shrink-0 text-xs text-foreground/50 sm:w-56">
                        {rentangTanggal(k.mulai, k.selesai)}
                      </span>
                      <span className="flex-1 text-sm md:text-base">{k.nama}</span>
                      <span className="rounded-full bg-black/5 px-3 py-1 text-[10px] font-semibold">
                        {k.jenis}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          {siapKalender && kalender.length === 0 && (
            <p className="text-sm text-foreground/60">Belum ada jadwal.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="agenda-sekolah">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-light">
          Agenda
        </h2>
        <h3
          id="agenda-sekolah"
          className="font-display mt-2 text-2xl md:text-3xl tracking-tight"
        >
          Agenda <em className="italic text-foreground/60">sekolah</em>
        </h3>
        <p className="mt-3 max-w-2xl text-base text-foreground/70 leading-relaxed">
          Rapat, pertemuan, dan kegiatan sekolah yang akan datang.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {[...agenda]
            .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
            .map((a) => {
              const d = new Date(`${a.tanggal}T00:00:00`);
              return (
                <li
                  key={a.id}
                  className="liquid-glass flex gap-4 rounded-3xl p-5"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand/10 leading-none">
                    <span className="text-lg font-semibold text-brand">
                      {String(d.getDate()).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-[10px] uppercase text-foreground/50">
                      {d.toLocaleDateString("id-ID", { month: "short" })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold md:text-base">{a.nama}</p>
                    <p className="mt-1 text-xs text-foreground/60">
                      {a.jam} · {a.lokasi}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
        {siapAgenda && agenda.length === 0 && (
          <p className="mt-4 text-sm text-foreground/60">Belum ada agenda.</p>
        )}
      </section>
    </div>
  );
}
