import { useLoveTimer } from "@/hooks/use-love-timer";

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        key={value}
        className="animate-tick font-display text-5xl sm:text-6xl md:text-7xl font-light text-gradient-gold tabular-nums leading-none"
      >
        {display}
      </div>
      <div className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function LoveClock() {
  const { days, hours, minutes, seconds } = useLoveTimer();

  return (
    <div className="relative mx-auto max-w-3xl rounded-2xl border border-gold/30 bg-card/60 backdrop-blur-sm p-8 sm:p-12 shadow-gold">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl animate-shimmer"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.78 0.13 85 / 0.15), transparent 70%)",
        }}
        aria-hidden
      />
      <p className="relative text-center text-xs uppercase tracking-[0.5em] text-gold-soft">
        Estamos juntos há
      </p>
      <div className="relative mt-8 grid grid-cols-4 gap-3 sm:gap-6">
        <Unit value={days} label="Dias" />
        <Unit value={hours} label="Horas" />
        <Unit value={minutes} label="Minutos" />
        <Unit value={seconds} label="Segundos" />
      </div>
      <p className="relative mt-10 text-center font-display italic text-lg sm:text-xl text-foreground/90">
        …e cada segundo vale a pena.
      </p>
      <p className="relative mt-2 text-center font-display text-2xl sm:text-3xl text-gradient-gold">
        Eu te amo, princesa.
      </p>
      <p className="relative mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Desde 02 · 12 · 2023 — 18:00
      </p>
    </div>
  );
}
