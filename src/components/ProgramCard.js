import Image from "next/image";

export default function ProgramCard({ program }) {
  if (!program) return null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={program.gambar}
          alt={program.judul}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge kategori di atas gambar */}
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-[#071829]/70 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
          {program.tag}
        </span>
      </div>

      <div className="flex flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          {program.judul}
        </h3>
        <p className="mt-3 text-sm text-foreground/65 leading-relaxed">
          {program.deskripsi}
        </p>
      </div>
    </article>
  );
}
