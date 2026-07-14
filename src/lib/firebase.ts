import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Config do projeto "pessoal-casal".
 *
 * Isto NÃO é um segredo: a config do Firebase são identificadores públicos e
 * sempre acabam no JavaScript que o navegador baixa. Quem protege o banco são
 * as Regras de Segurança do Firestore, que só liberam o documento `lista/estado`.
 *
 * Dá pra sobrescrever via VITE_FIREBASE_CONFIG (JSON numa linha) em .env.local,
 * caso um dia queira apontar para outro projeto.
 */
const defaultConfig = {
  apiKey: "AIzaSyDWjWwpCPI4VCwjXfUBFrc0G1T0NssCU8I",
  authDomain: "pessoal-casal.firebaseapp.com",
  projectId: "pessoal-casal",
  storageBucket: "pessoal-casal.firebasestorage.app",
  messagingSenderId: "311714920792",
  appId: "1:311714920792:web:986cbe232137a317e9cd2d",
};

/**
 * Se a config for inválida, `db` fica null e a lista cai em modo
 * somente-leitura — o site continua funcionando normalmente.
 */
function initDb(): Firestore | null {
  try {
    const raw = import.meta.env.VITE_FIREBASE_CONFIG;
    const config = raw ? JSON.parse(raw) : defaultConfig;
    if (!config?.projectId) throw new Error("config sem projectId");
    const app: FirebaseApp = initializeApp(config);
    return getFirestore(app);
  } catch (err) {
    console.error("[firebase] não consegui inicializar:", err);
    return null;
  }
}

export const db = initDb();

/** true quando a lista pode ser editada (Firebase configurado). */
export const firebaseReady = db !== null;
