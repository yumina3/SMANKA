import Image from "next/image";

export default function ProgramCard({ program }) {
  if (!program) return null;

  return (
    <article className="liquid-glass rounded-3xl group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-black/5">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={program.gambar}
          alt={program.judul}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-brand-light">
          {program.tag}
        </p>
        <h3 className="mt-3 text-xl md:text-2xl tracking-tight">
          {program.judul}
        </h3>
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
          {program.deskripsi}
        </p>
      </div>
    </article>
  );
}
