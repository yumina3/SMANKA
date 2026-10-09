export default function SectionHeading({ label, children }) {
  return (
    <div>
      {label && (
        <p className="text-xs uppercase tracking-widest text-brand-light">
          {label}
        </p>
      )}
      <h2 className="font-display mt-4 text-3xl md:text-4xl leading-[1.15] tracking-tight">
        {children}
      </h2>
    </div>
  );
}
