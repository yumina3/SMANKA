"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal – wrapper animasi scroll-masuk.
 * @param {string}  direction  - arah masuk: "up" (default), "left", "right", "fade"
 * @param {number}  delay      - delay transisi dalam ms
 * @param {string}  className
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) {
  const ref = useRef(null);
  const [terlihat, setTerlihat] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTerlihat(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mulai = {
    up: "opacity-0 translate-y-10",
    left: "opacity-0 -translate-x-10",
    right: "opacity-0 translate-x-10",
    fade: "opacity-0",
  }[direction] ?? "opacity-0 translate-y-10";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal transition-all duration-700 ease-out ${
        terlihat ? "opacity-100 translate-y-0 translate-x-0" : mulai
      } ${className}`}
    >
      {children}
    </div>
  );
}
