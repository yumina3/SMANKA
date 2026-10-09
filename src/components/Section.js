import Reveal from "@/components/Reveal";

// Section full-width dengan latar bergantian putih / biru muda.
export default function Section({ variant = "white", className = "", children }) {
  const bg = variant === "blue" ? "bg-surface" : "bg-background";

  return (
    <section className={bg}>
      <Reveal className={`max-w-6xl mx-auto px-6 py-20 md:py-28 ${className}`}>
        {children}
      </Reveal>
    </section>
  );
}
