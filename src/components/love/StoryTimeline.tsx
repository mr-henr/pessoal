import { Reveal } from "@/components/love/Reveal";

const mediaModules = import.meta.glob<{ default: string }>(
  "/src/components/ui/fotos/*.{jpeg,mp4}",
  { eager: true }
);
const media: Record<string, string> = {};
Object.entries(mediaModules).forEach(([path, mod]) => {
  const filename = path.split("/").pop()!;
  media[filename] = mod.default;
});

interface StoryEntry {
  type: "photo" | "video" | "duo";
  files: string[];
  date: string;
  text: string;
}

const entries: StoryEntry[] = [
  {
    type: "video",
    files: ["video1.mp4"],
    date: "Outubro de 2023",
    text: "Uma das primeiras vezes que saímos já estando mais próximos, mas sem expectativas. Foi o nosso primeiro vídeo juntos.",
  },
  {
    type: "video",
    files: ["video2.mp4"],
    date: "Novembro de 2023",
    text: "Primeira vez que te levei em casa para sairmos num encontro de verdade. Eu me senti tão confortável mesmo sem certeza de nada — e foi tão divertido.",
  },
  {
    type: "photo",
    files: ["foto1.jpeg"],
    date: "2 de Janeiro de 2024",
    text: "Quando completamos nosso primeiro mês juntos. Você sempre me causou uma sensação diferente — mesmo eu não sabendo explicar, não dava pra ignorar também.",
  },
  {
    type: "photo",
    files: ["foto2.jpeg"],
    date: "Abril de 2024",
    text: "Era uma tarde qualquer que nos encontramos e ficamos só ouvindo música sem falar muito e dando carinho. Lembro pouco desse momento, mas lembro da sensação de paz enquanto estava junto contigo.",
  },
  {
    type: "photo",
    files: ["foto3.jpeg"],
    date: "Fevereiro de 2025",
    text: "Foi a primeira vez que eu fui na PDP — e eu fui contigo. Bebemos, curtimos, foi uma noite dahora. Lembro que você ficou meio bêbada e começou a querer ir pra casa dizendo que queria ficar a sós de carinho comigo kkkkk. Desde então a PDP sempre me remete a você. Eu conheci aquele lugar contigo.",
  },
  {
    type: "photo",
    files: ["foto4.jpeg"],
    date: "Junho de 2025",
    text: "A gente foi no São João de Campina, andamos com o pessoal, andamos sozinhos, curtimos, escutamos as musicas lá, nesse período eu me senti ainda mais próximo e conectado contigo, e isso me dava uma felicidade imensa",
  },
  {
    type: "photo",
    files: ["foto5.jpeg"],
    date: "Julho de 2025",
    text: "Foi o casamento do meu irmão — um momento que pra mim e você não foi nada demais, foi lindo. Mas também foi o momento que eu jurei pra mim mesmo que casaria com você. Que essa ideia de não casar não faz sentido quando eu estou com você. E eu te amo por ter mudado meu entendimento sobre isso.",
  },
  {
    type: "video",
    files: ["video3.mp4"],
    date: "Setembro de 2025",
    text: "A gente foi na praia sozinhos, só pra curtir — e eu gravei um vídeo de você saindo da água porque eu estava só admirando. Eu quero repetir isso muitas outras vezes contigo. Esses nossos momentos me dão uma experiência de proximidade única com a pessoa que eu mais amo.",
  },
  {
    type: "photo",
    files: ["foto6.jpeg"],
    date: "Dezembro de 2025",
    text: "Eu tinha acabado de ter a primeira conquista como adulto, a moto — e você participou disso. Acho que é uma realização pra mim ter alguém como você. Estávamos completando 2 anos juntos e resolvemos ir naquele restaurante perto da orla. Ainda lembro da demoooora pra a gente entrar, mas cada segundo do teu lado era perfeito. Eu estava feliz de poder dedicar tempo pra nós — e mesmo quase sem dinheiro por conta da demissão, eu não queria deixar esse dia passar. Eu estava decidido a fazer o meu melhor por nós pro resto da vida.",
  },
  {
    type: "duo",
    files: ["foto7.jpeg", "foto8.jpeg"],
    date: "Natal de 2025",
    text: "Estávamos em Campina. Seu pai, Lucas e tua vó estavam comendo do outro lado do lugar, e a gente esperando a nossa comida — zoando os campinenses e admirando o tempo juntos. Eu nunca vou me esquecer dessas coisas. (Inclusive aquele hambúrguer era muito bom.)",
  },
  {
    type: "video",
    files: ["video4.mp4"],
    date: "Janeiro de 2026",
    text: "Nossa primeira trilha juntos. Eu me diverti muito e espero que façamos muitas outras ainda mais incríveis.",
  },
];

function MediaBlock({ entry }: { entry: StoryEntry }) {
  if (entry.type === "duo") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {entry.files.map((f) => (
          <img
            key={f}
            src={media[f]}
            alt={f}
            className="w-full rounded-md object-cover aspect-square"
            loading="lazy"
          />
        ))}
      </div>
    );
  }
  if (entry.type === "video") {
    return (
      <video
        src={media[entry.files[0]]}
        controls
        playsInline
        className="w-full rounded-md"
      />
    );
  }
  return (
    <img
      src={media[entry.files[0]]}
      alt={entry.date}
      className="w-full rounded-md object-cover"
      loading="lazy"
    />
  );
}

export function StoryTimeline() {
  return (
    <div>
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.5em] text-gold-soft mb-16">
          nossa história
        </p>
      </Reveal>

      <div className="relative">
        {/* Linha central — visível no md+, à esquerda no mobile */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:-translate-x-1/2" />

        <div className="flex flex-col gap-16">
          {entries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={i} delay={i * 60}>
                <div
                  className={
                    "relative flex items-start gap-6 md:gap-0 " +
                    (isLeft ? "md:flex-row" : "md:flex-row-reverse")
                  }
                >
                  {/* Conteúdo do cartão */}
                  <div
                    className={
                      "ml-10 md:ml-0 md:w-[45%] " +
                      (isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10")
                    }
                  >
                    <div className="overflow-hidden rounded-xl border border-gold/30 bg-card/40 p-1">
                      <MediaBlock entry={entry} />
                    </div>
                    <p
                      className={
                        "mt-4 font-display italic text-base text-foreground/80 leading-relaxed " +
                        (isLeft ? "text-left" : "md:text-right text-left")
                      }
                    >
                      {entry.text}
                    </p>
                  </div>

                  {/* Badge de data — ancorado na linha */}
                  <div
                    className={
                      "absolute top-2 flex items-center gap-2 " +
                      (isLeft
                        ? "left-0 md:left-1/2 md:-translate-x-1/2 flex-row"
                        : "left-0 md:left-1/2 md:-translate-x-1/2 flex-row")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_6px_2px] shadow-gold/50" />
                    </div>
                    <span className="hidden md:block whitespace-nowrap rounded-full border border-gold/40 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                      {entry.date}
                    </span>
                  </div>

                  {/* Data visível no mobile (abaixo da mídia) — sem duplicar no desktop */}
                  <span className="absolute top-0 left-8 md:hidden text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                    {entry.date}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
