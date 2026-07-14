/**
 * Lugares que marcaram (ou que ainda vão marcar) a gente.
 *
 * `feito: true`  → lugar que já vivemos juntos (pin dourado cheio)
 * `feito: false` → lugar que ainda queremos ir (pin vazado)
 *
 * Para adicionar um lugar: pegue as coordenadas no Google Maps
 * (clique com o botão direito no ponto → o primeiro item é "lat, lng").
 */

export interface Place {
  id: string;
  nome: string;
  coords: [number, number]; // [latitude, longitude]
  texto: string;
  feito: boolean;
}

export const places: Place[] = [
  {
    id: "campina-sao-joao",
    nome: "São João de Campina Grande",
    coords: [-7.2216, -35.8817],
    texto:
      "Andamos com o pessoal, andamos sozinhos, escutamos as músicas de lá. Foi onde eu me senti ainda mais próximo e conectado contigo.",
    feito: true,
  },
  {
    id: "orla-jp",
    nome: "Orla de João Pessoa",
    coords: [-7.1478, -34.7958],
    texto:
      "O restaurante perto da orla, nos nossos 2 anos. A demora pra entrar foi enorme — e cada segundo do teu lado foi perfeito.",
    feito: true,
  },
  {
    id: "dique-cabedelo",
    nome: "Dique de Cabedelo",
    coords: [-6.9736, -34.8384],
    texto: "Riscamos esse da lista juntos. O primeiro de muitos.",
    feito: true,
  },
  {
    id: "pdp",
    nome: "PDP — Praça da Paz",
    coords: [-7.1401, -34.8462],
    texto:
      "Foi a primeira vez que eu fui na PDP — e eu fui contigo. Bebemos, curtimos, foi uma noite dahora. Desde então esse lugar sempre me remete a você: eu conheci ele contigo.",
    feito: true,
  },
  {
    id: "lucena-trilha",
    nome: "Trilha de Lucena",
    coords: [-6.9033, -34.8717],
    texto:
      "Nossa primeira trilha juntos: a igreja antiga com a árvore que virou parte da parede, o mirante de frente pro mar. Eu me diverti muito — e quero fazer muitas outras contigo.",
    feito: true,
  },
  {
    id: "acude-velho",
    nome: "Açude Velho",
    coords: [-7.2274, -35.8869],
    texto: "Ainda quero andar contigo por aqui, sem pressa nenhuma.",
    feito: false,
  },
  {
    id: "jardim-botanico",
    nome: "Jardim Botânico",
    coords: [-7.1697, -34.846],
    texto: "Conhecer esse lugar contigo está na nossa lista.",
    feito: false,
  },
  {
    id: "pico-do-jabre",
    nome: "Pico do Jabre",
    coords: [-7.2597, -37.3861],
    texto: "O ponto mais alto da Paraíba. Quero ver essa vista ao teu lado.",
    feito: false,
  },

  // A praia do vídeo de setembro de 2025 ficou de fora: não dava pra saber qual era.
  // Se um dia lembrar, é só somar aqui.
];
