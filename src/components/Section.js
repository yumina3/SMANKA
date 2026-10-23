import Reveal from "@/components/Reveal";

// Section full-width dengan latar bergantian putih / biru muda.
// Ditambahkan prop 'noPad' untuk menonaktifkan padding vertikal default.
export default function Section({ variant = "white", className = "", children, noPad = false }) {
  const bg = variant === "blue" ? "bg-surface" : "bg-background";

  return (
    <section className={bg}>
      <Reveal className={`max-w-6xl mx-auto px-6 ${noPad ? "" : "py-20 md:py-28"} ${className}`}>
        {children}
      </Reveal>
    </section>
  );
}
