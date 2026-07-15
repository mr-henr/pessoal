/**
 * Datas que deixam a página em modo comemoração (chuva de corações + mensagem).
 * Só dia e mês — repete todo ano automaticamente.
 *
 * Para somar uma data nova, é só adicionar um item aqui:
 *   { id: "natal", month: 12, day: 25, label: "Feliz Natal", message: "..." }
 */

export interface SpecialDate {
  id: string;
  month: number; // 1 = janeiro ... 12 = dezembro
  day: number;
  label: string;
  message: string;
}

export const specialDates: SpecialDate[] = [
  {
    id: "namoro",
    month: 12,
    day: 2,
    label: "Nosso dia ♥",
    message:
      "Mais 1 ano contigo, eu sou muito abençoado viu. Olha oq a gente ja viveu ate hoje e quero viver muito mais, crescer muito mais, Hoje é o nosso dia. Eu te amo demais minha princesa, você é incrivel e só tenho a agradecer por tudo que nos vivemos e vamos viver ainda.",
  },
  {
    id: "aniversario-renally",
    month: 3,
    day: 6,
    label: "Feliz aniversário, Renally ♥",
    message:
      "Feliz aniversário, minha princesa. É uma dadiva viver no mesmo mundo que você, hoje é dia de comemorar a existencia da pessoa mais incrivel e foda de todas, linda, autentica, divertida e perfeita, aproveita esse dia princesa, você merece demais!",
  },
];
