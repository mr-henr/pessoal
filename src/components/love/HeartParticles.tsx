import { useMemo } from "react";

/** Sutis corações/brilhos dourados subindo no fundo. */
export function HeartParticles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        duration: 14 + Math.random() * 14,
        delay: Math.random() * 18,
        drift: `${(Math.random() - 0.5) * 120}px`,
        opacity: 0.25 + Math.random() * 0.45,
        kind: Math.random() > 0.5 ? "heart" : "spark",
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-float-up absolute bottom-0 text-gold"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            ["--drift" as string]: p.drift,
          }}
        >
          {p.kind === "heart" ? "♥" : "✦"}
        </span>
      ))}
    </div>
  );
}
