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
    coords: [-7.2236996571395204, -35.88755686572316],
    texto:
      "A gente andou com o pessoal, andou sozinho também, escutou as músicas de lá e curtiu demais. Foi aqui que eu me senti ainda mais perto de você — e isso me deixava feliz que só.",
    feito: true,
  },
  {
    id: "pdp",
    nome: "PDP — Praça da Paz",
    coords: [-7.146721583263933, -34.84330437681256],
    texto:
      "Foi a primeira vez que eu fui na PDP, e fui contigo. A gente bebeu, curtiu, foi uma noite dahora. Desde então esse lugar sempre me lembra você — eu conheci ele contigo.",
    feito: true,
  },
  {
    id: "orla-jp",
    nome: "Orla de João Pessoa",
    coords: [-7.1478, -34.7958],
    texto:
      "A gente pegou a bike e andou pela orla bem longe. Me diverti demais, me senti leve e feliz do teu lado, sem nada de mais — só a gente e o vento.",
    feito: true,
  },
  {
    id: "dique-cabedelo",
    nome: "Dique de Cabedelo",
    coords: [-6.960996898029213, -34.843100363322556],
    texto:
      "Riscamos esse da nossa lista juntos. O primeiro de muitos que ainda quero fazer contigo.",
    feito: true,
  },
  {
    id: "lucena-trilha",
    nome: "Trilha de Lucena",
    coords: [-6.877115360267099, -34.89654252099516],
    texto:
      "Nossa primeira trilha juntos. Começou nas ruínas da antiga Igreja do Bom Sucesso — tinha aquela árvore que virou parte da parede — e a gente foi indo até um mirante de frente pro mar. Me diverti pra caramba e quero fazer muitas outras contigo.",
    feito: true,
  },
  {
    id: "acude-velho",
    nome: "Açude Velho",
    coords: [-7.225757273616172, -35.87980659201566],
    texto:
      "Ainda quero andar por aqui contigo, sem pressa nenhuma, só curtindo o tempo do teu lado.",
    feito: false,
  },
  {
    id: "jardim-botanico",
    nome: "Jardim Botânico",
    coords: [-7.1697, -34.846],
    texto:
      "Conhecer esse lugar contigo tá na nossa lista. Quero andar por aqui e ver tudo com você.",
    feito: false,
  },
  {
    id: "pico-do-jabre",
    nome: "Pico do Jabre",
    coords: [-7.253020367912497, -37.384184677819626],
    texto:
      "É o ponto mais alto da Paraíba. Um dia eu quero ver essa vista com você do meu lado.",
    feito: false,
  },

  // A praia do vídeo de setembro de 2025 ficou de fora: não dava pra saber qual era.
  // Se um dia lembrar, é só somar aqui.
];
