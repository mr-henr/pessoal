import { useState } from "react";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/love/Reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Cartas escondidas: corações espalhados que revelam mensagens surpresa.
 * Edite os textos abaixo à vontade.
 */
const letters: { hint: string; message: string }[] = [
  {
    hint: "quando bate a saudade",
    message:
      "Se você abriu isso, é porque estava com saudade — e eu também estou. Fecha os olhos que eu já estou te abraçando daqui.",
  },
  {
    hint: "num dia difícil",
    message:
      "Dia ruim acontece, Sensações ruins vem e vão, mas você não está sozinha. Respira e lembra: Vai passar, e vai ficar tudo bem melhor logo. Se quiser eu estou aí pra ti. Eu escolho ficar do teu lado sempre.",
  },
  {
    hint: "só porque sim",
    message:
      "Eu te amo. Do jeitinho que você é, com tudo que você é, com toda sua autenticidade, do fundo da minha mente e coração. Você é minha pessoa favorita no mundo.",
  },
  {
    hint: "antes de dormir",
    message:
      "Boa noite, minha princesa. Dorme tranquila sabendo que eu to torcendo sempre por você, sentindo orgulho e agradecendo todo dia por você existir na minha vida.",
  },
  {
    hint: "Se ficar perdida sem saber oq fazer",
    message:
      "Você é mais forte, mais linda e mais capaz do que imagina. Eu vejo isso em você todos os dias, te quero todo dia e espero que você enxergue o mesmo",
  },
];

export function HiddenLetters() {
  const [open, setOpen] = useState<number | null>(null);
  const [read, setRead] = useState<Set<number>>(new Set());

  const openLetter = (i: number) => {
    setOpen(i);
    setRead((prev) => new Set(prev).add(i));
  };

  return (
    <div>
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.5em] text-gold-soft">
          cartas escondidas
        </p>
        <p className="mt-4 text-center font-display italic text-muted-foreground">
          toque em cada coração quando o coração pedir
        </p>
      </Reveal>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
        {letters.map((l, i) => (
          <Reveal key={i} delay={i * 80}>
            <button
              type="button"
              onClick={() => openLetter(i)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gold/30 bg-card/40 px-6 py-5 cursor-pointer transition-colors hover:bg-card/70 focus:outline-none focus:ring-2 focus:ring-gold/60"
              aria-label={`Abrir carta: ${l.hint}`}
            >
              <Heart
                className={
                  "h-8 w-8 text-gold transition-transform group-hover:scale-110 " +
                  (read.has(i) ? "" : "animate-shimmer")
                }
                fill={read.has(i) ? "currentColor" : "none"}
              />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-soft/80">
                {l.hint}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-md border-gold/30 bg-card">
          <DialogTitle className="text-center text-xs uppercase tracking-[0.4em] text-gold-soft font-normal">
            {open !== null ? letters[open].hint : ""}
          </DialogTitle>
          <div className="flex flex-col items-center gap-6 px-2 py-4">
            <Heart className="h-6 w-6 text-gold" fill="currentColor" />
            <p className="text-center font-display text-2xl font-light leading-snug text-foreground/90">
              {open !== null ? letters[open].message : ""}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
