import { createFileRoute } from "@tanstack/react-router";
import { HeartParticles } from "@/components/love/HeartParticles";
import { Reveal } from "@/components/love/Reveal";
import { LoveClock } from "@/components/love/LoveClock";

const photoModules = import.meta.glob<{ default: string }>(
  "/src/components/ui/fotos/*.jpeg",
  { eager: true }
);
const photos = Object.values(photoModules).map((m) => m.default);

export const Route = createFileRoute("/")({
  component: Index,
});

const letters = [
  "Tivemos um inicio estranho e incerto mas ficamos juntos mesmo sem muitos motivos para isso.",
  "Mas cada vez foi crescendo o amor em nós",
  "O tanto que ja chorei de saudades mesmo sabendo que te veria em breve, tantos sorrisos que dei ao teu lado...",
  "Se eu puder ser sempre cada vez uma versão ainda melhor, mais madura e mais feliz contigo, eu vou escolher cada segundo da vida contigo.",
];

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Glow ambiente */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.78 0.13 85 / 0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, oklch(0.88 0.10 88 / 0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <HeartParticles />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p
          className="animate-fade-up text-xs uppercase tracking-[0.5em] text-gold-soft"
          style={{ animationDelay: "0.2s" }}
        >
          Para você
        </p>
        <h1
          className="animate-fade-up font-display mt-6 text-6xl sm:text-7xl md:text-8xl font-light text-gradient-gold"
          style={{ animationDelay: "0.8s" }}
        >
          Renally
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-xl font-display italic text-xl sm:text-2xl text-foreground/85"
          style={{ animationDelay: "1.8s" }}
        >
          quero sempre aprender mais contigo
        </p>
        <div
          className="animate-fade-up mt-16 flex flex-col items-center gap-2 text-gold/70"
          style={{ animationDelay: "2.6s" }}
          aria-hidden
        >
          <span className="text-xs uppercase tracking-[0.4em]">Deslize para baixo</span>
          <span className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Carta */}
      <section className="relative mx-auto max-w-3xl px-6 py-32 space-y-32">
        {letters.map((line, i) => (
          <Reveal key={i} delay={i * 80}>
            <p
              className={
                "font-display text-3xl sm:text-4xl md:text-5xl font-light leading-snug " +
                (i % 2 === 0 ? "text-left" : "text-right")
              }
            >
              <span className="text-gold-soft">"</span>
              {line}
              <span className="text-gold-soft">"</span>
            </p>
          </Reveal>
        ))}
      </section>

      {/* Momentos */}
      <section className="relative mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.5em] text-gold-soft">
            momentos nossos
          </p>
        </Reveal>
        <div className="mt-12 columns-2 sm:columns-3 gap-4 space-y-4">
          {photos.map((src, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-lg border border-gold/30 bg-card/40 p-1 break-inside-avoid">
                <img
                  src={src}
                  alt={`Momento ${i + 1}`}
                  className="w-full rounded-md object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Relógio do amor */}
      <section className="relative px-6 py-32">
        <Reveal>
          <LoveClock />
        </Reveal>
      </section>

      {/* Rodapé */}
      <footer className="relative px-6 py-16 text-center">
        <p className="font-display italic text-base text-muted-foreground">
          Você quer ser meu ultimo amor, minha primeira esposa, mulher que vou passar ate o ultimo segundo da minha vida? Aceita ser minha noiva?{" "}
          <span className="text-gold animate-shimmer inline-block">♥</span>
        </p>
      </footer>
    </main>
  );
}
