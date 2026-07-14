import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Config vem de UMA variável de ambiente com o JSON do Firebase:
 *
 *   VITE_FIREBASE_CONFIG={"apiKey":"...","authDomain":"...","projectId":"...", ...}
 *
 * Local: .env.local (ignorado pelo git). Produção: secret no GitHub Actions.
 *
 * Se a config estiver ausente ou inválida, `db` fica null e a lista cai em
 * modo somente-leitura — o site continua funcionando normalmente.
 */
function initDb(): Firestore | null {
  const raw = import.meta.env.VITE_FIREBASE_CONFIG;
  if (!raw) return null;

  try {
    const config = JSON.parse(raw);
    if (!config?.projectId) throw new Error("config sem projectId");
    const app: FirebaseApp = initializeApp(config);
    return getFirestore(app);
  } catch (err) {
    console.error("[firebase] VITE_FIREBASE_CONFIG inválida:", err);
    return null;
  }
}

export const db = initDb();

/** true quando a lista pode ser editada (Firebase configurado). */
export const firebaseReady = db !== null;
