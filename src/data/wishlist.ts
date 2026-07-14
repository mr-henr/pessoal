/**
 * Lista base — transcrita de lista.txt.
 * Fica no código de propósito: mesmo que o Firebase esteja fora do ar,
 * a lista continua aparecendo. O Firestore guarda só o que é dinâmico
 * (o que foi conquistado e o que foi adicionado pelo site).
 *
 * Os ids são estáveis: nunca renumere um item já existente, senão o
 * "conquistado" salvo no banco passa a apontar para outro item.
 */

export type WishGroup = "aventura" | "restaurante";

export interface WishItem {
  id: string;
  text: string;
  group: WishGroup;
}

export const GROUP_LABEL: Record<WishGroup, string> = {
  aventura: "aventuras",
  restaurante: "restaurantes",
};

export const baseItems: WishItem[] = [
  { id: "a1", group: "aventura", text: "Ir a uma cafeteria jogar conversa fora, passear e comer" },
  { id: "a2", group: "aventura", text: "Tentar fazer alguma coisinha besta junto: cerâmica, pintura, cozinhar, desenhar, escultura de argila etc" },
  { id: "a3", group: "aventura", text: "Caminhar aleatoriamente em algum ponto da cidade" },
  { id: "a4", group: "aventura", text: "Ir ao cinema assistir algo novo" },
  { id: "a5", group: "aventura", text: "Ir em uma livraria e escolher um livro um para o outro" },
  { id: "a6", group: "aventura", text: "Sessão de fotos juntos com alguém q saiba tirar foto ou só de brincadeira naquelas máquinas de foto do shopping" },
  { id: "a7", group: "aventura", text: "Acordar cedo para ver o nascer do sol pelo menos uma vez na praia ou algum ponto dahora" },
  { id: "a8", group: "aventura", text: "Passar uma ou duas noites em um hotel de JP só pela experiência" },
  { id: "a9", group: "aventura", text: "Criar uma playlist com várias vibes em sequência pra curtir junto" },
  { id: "a10", group: "aventura", text: "Tomar café da manhã fora em uma padaria ou restaurante" },
  { id: "a11", group: "aventura", text: 'Cozinhar em casa e fazer um prato "diferente" em cada vez q fizer isso' },
  { id: "a12", group: "aventura", text: "Imprimir/revelar fotos pra guardar, fazer um álbum ou sei lá, acho fofo a ideia" },
  { id: "a13", group: "aventura", text: "Visitar uma floricultura pra conhecer as flores e talvez até pegar decoração" },
  { id: "a14", group: "aventura", text: "Montar uma noite temática em casa: italiana, francesa, anos 90, gótico enfim — e fazer comida, maquiagem, arte, pegar um filme ou qlqr coisa do tipo nessa temática" },
  { id: "a15", group: "aventura", text: "Curtir nos nossos barzinhos preferidos como o Gringos, Frigideira — e conhecer novos como o Vila do Porto (João Pessoa)" },
  { id: "a16", group: "aventura", text: "Andar de bike pela orla bem longe" },
  { id: "a17", group: "aventura", text: "Conhecer o Jardim Botânico (João Pessoa)" },
  { id: "a18", group: "aventura", text: "Quando for possível, ir a restaurantes diferentes ou chiques" },
  { id: "a19", group: "aventura", text: "Ir ao Pico do Jabre (Patos)" },
  { id: "a20", group: "aventura", text: "Sair pra sorveteria e dar um passeio" },
  { id: "a21", group: "aventura", text: "Fazer um churrasquinho juntos com vinho só pra comemorar estando juntos" },
  { id: "a22", group: "aventura", text: "Andar pelo Açude Velho (Campina)" },
  { id: "a23", group: "aventura", text: "Andar pelo shopping à toa e olhar roupa etc" },
  { id: "a24", group: "aventura", text: "Ir a shows pequenos" },
  { id: "a25", group: "aventura", text: "Fazer viagem para outras cidades com hotel e tal" },
  { id: "a26", group: "aventura", text: "Andar de skate" },
  { id: "a27", group: "aventura", text: "Fazer viagem de carro sem muito planejamento" },
  { id: "a28", group: "aventura", text: "Fazer uma viagem curta de moto (quando tiver uma moto mais confortável)" },
  { id: "a29", group: "aventura", text: "Jogar vôlei" },
  { id: "a30", group: "aventura", text: "Ir no Dique de Cabedelo" },
  { id: "r1", group: "restaurante", text: "Korean Chicken" },
  { id: "r2", group: "restaurante", text: "@casanonnajp" },
];

/** Itens já conquistados antes do site existir (o dique já rolou). */
export const initialDone = ["a30"];
