import { useEffect, useRef, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { initialDone, type WishGroup } from "@/data/wishlist";

export interface AddedItem {
  id: string;
  text: string;
  group: WishGroup;
  createdAt: number;
}

export interface WishState {
  done: string[];
  added: AddedItem[];
}

const EMPTY: WishState = { done: initialDone, added: [] };

/**
 * Estado compartilhado da lista, num único documento (`lista/estado`).
 *
 * Escritas usam arrayUnion/arrayRemove — são atômicas, então os dois podem
 * editar ao mesmo tempo sem um sobrescrever o outro. A leitura é via
 * onSnapshot: o que um adiciona aparece no aparelho do outro na hora.
 */
export function useWishlist() {
  const [state, setState] = useState<WishState>(EMPTY);
  const [loading, setLoading] = useState(db !== null);
  const seeded = useRef(false);

  useEffect(() => {
    if (!db) return;
    const ref = doc(db, "lista", "estado");

    return onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          // Primeira visita de todas: cria o documento já com o que
          // era conquistado antes do site existir.
          if (!seeded.current) {
            seeded.current = true;
            void setDoc(ref, EMPTY).catch((e) =>
              console.error("[wishlist] falha ao criar o documento:", e),
            );
          }
          return;
        }
        const data = snap.data();
        setState({
          done: Array.isArray(data.done) ? data.done : [],
          added: Array.isArray(data.added) ? data.added : [],
        });
        setLoading(false);
      },
      (err) => {
        console.error("[wishlist] erro ao ouvir o documento:", err);
        setLoading(false);
      },
    );
  }, []);

  const ref = () => (db ? doc(db, "lista", "estado") : null);

  async function toggleDone(id: string, done: boolean) {
    const r = ref();
    if (!r) return;
    await setDoc(
      r,
      { done: done ? arrayUnion(id) : arrayRemove(id) },
      { merge: true },
    );
  }

  async function addItem(text: string, group: WishGroup) {
    const r = ref();
    if (!r) return;
    const item: AddedItem = {
      id: `x${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      text: text.trim(),
      group,
      createdAt: Date.now(),
    };
    await setDoc(r, { added: arrayUnion(item) }, { merge: true });
  }

  return { state, loading, toggleDone, addItem };
}
