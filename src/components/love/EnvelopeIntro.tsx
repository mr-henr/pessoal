import { useEffect, useState } from "react";

const SEEN_KEY = "envelope:visto";

type Phase = "fechado" | "abrindo" | "saindo" | "oculto";

/**
 * Abertura em envelope: overlay dourado que abre ao clique e revela o site.
 * Aparece uma vez por sessão — vira um ritual de chegada, sem irritar a cada refresh.
 */
export function EnvelopeIntro() {
  const [phase, setPhase] = useState<Phase>("oculto");

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    setPhase("fechado");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function abrir() {
    if (phase !== "fechado") return;
    setPhase("abrindo");
    sessionStorage.setItem(SEEN_KEY, "1");
    setTimeout(() => setPhase("saindo"), 1100);
    setTimeout(() => {
      setPhase("oculto");
      document.body.style.overflow = "";
    }, 2000);
  }

  if (phase === "oculto") return null;

  const aberto = phase === "abrindo" || phase === "saindo";

  return (
    <div
      className={
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 " +
        (phase === "saindo" ? "pointer-events-none opacity-0" : "opacity-100")
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.78 0.13 85 / 0.14), transparent 70%)",
        }}
        aria-hidden
      />

      <button
        type="button"
        onClick={abrir}
        disabled={aberto}
        aria-label="Abrir a carta"
        className="group relative flex flex-col items-center gap-10 focus:outline-none"
      >
        <div
          className="relative h-[190px] w-[300px] sm:h-[230px] sm:w-[360px]"
          style={{ perspective: "1200px" }}
        >
          {/* Carta que sobe ao abrir */}
          <div
            className={
              "absolute inset-x-4 top-3 bottom-8 rounded-sm border border-gold/40 bg-[oklch(0.96_0.02_85)] shadow-gold transition-all duration-1000 ease-out " +
              (aberto
                ? "-translate-y-28 opacity-100 sm:-translate-y-36"
                : "translate-y-4 opacity-0")
            }
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[oklch(0.45_0.05_60)]">
                para
              </span>
              <span className="font-display text-3xl font-light text-[oklch(0.35_0.08_60)]">
                Renally
              </span>
            </div>
          </div>

          {/* Corpo do envelope */}
          <div className="absolute inset-0 rounded-md border border-gold/50 bg-gradient-to-b from-[oklch(0.22_0.02_70)] to-[oklch(0.16_0.01_60)] shadow-gold" />

          {/* Dobras laterais */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.13 85 / 0.10) 0%, transparent 45%), linear-gradient(-135deg, oklch(0.78 0.13 85 / 0.10) 0%, transparent 45%)",
            }}
            aria-hidden
          />

          {/* Aba superior — abre em 3D */}
          <div
            className={
              "absolute inset-x-0 top-0 h-1/2 origin-top transition-transform duration-1000 ease-in-out " +
              (aberto ? "[transform:rotateX(-172deg)]" : "")
            }
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="h-full w-full rounded-t-md border-x border-t border-gold/50"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.26 0.03 75), oklch(0.19 0.02 65))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </div>

          {/* Selo de cera */}
          <div
            className={
              "absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 transition-all duration-500 " +
              (aberto
                ? "scale-50 opacity-0"
                : "animate-shimmer scale-100 opacity-100 group-hover:scale-110")
            }
            style={{ background: "var(--gradient-gold)" }}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7">
              <path
                d="M12 21s-7.5-4.7-9.6-9.2C.6 8.2 2.6 4.5 6.2 4.5c2 0 3.4 1.1 4.2 2.3.8-1.2 2.2-2.3 4.2-2.3 3.6 0 5.6 3.7 3.8 7.3C19.5 16.3 12 21 12 21z"
                fill="oklch(0.16 0.01 60)"
              />
            </svg>
          </div>
        </div>

        <span
          className={
            "text-xs uppercase tracking-[0.5em] text-gold-soft transition-opacity duration-500 " +
            (aberto ? "opacity-0" : "animate-fade-up opacity-100")
          }
        >
          toque para abrir
        </span>
      </button>
    </div>
  );
}
