import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Lock, LockOpen, Plus } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/love/Reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { firebaseReady } from "@/lib/firebase";
import { useWishlist } from "@/hooks/use-wishlist";
import {
  baseItems,
  GROUP_LABEL,
  type WishGroup,
  type WishItem,
} from "@/data/wishlist";

/** Código que libera a edição. Trocar aqui se quiser outro. */
const CODIGO_EDICAO = "0308";
const UNLOCK_KEY = "lista:unlockUntil";
const UNLOCK_MS = 24 * 60 * 60 * 1000; // 24 horas

function unlockedUntil(): number {
  if (typeof localStorage === "undefined") return 0;
  return Number(localStorage.getItem(UNLOCK_KEY) ?? 0);
}

export function WishList() {
  const { state, loading, toggleDone, addItem } = useWishlist();
  const [unlocked, setUnlocked] = useState(false);
  const [askCode, setAskCode] = useState(false);
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);
  const [draft, setDraft] = useState("");
  const [draftGroup, setDraftGroup] = useState<WishGroup>("aventura");
  const [saving, setSaving] = useState(false);

  // Revalida a cada minuto para travar sozinho quando as 24h expirarem.
  useEffect(() => {
    const check = () => setUnlocked(Date.now() < unlockedUntil());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  const items: WishItem[] = useMemo(
    () => [...baseItems, ...state.added],
    [state.added],
  );
  const doneSet = useMemo(() => new Set(state.done), [state.done]);
  const doneCount = items.filter((i) => doneSet.has(i.id)).length;
  const pct = items.length ? (doneCount / items.length) * 100 : 0;

  const canEdit = unlocked && firebaseReady;

  function submitCode(value: string) {
    if (value !== CODIGO_EDICAO) {
      setWrong(true);
      setCode("");
      setTimeout(() => setWrong(false), 600);
      toast.error("Código errado", { description: "Tenta de novo, amor." });
      return;
    }
    localStorage.setItem(UNLOCK_KEY, String(Date.now() + UNLOCK_MS));
    setUnlocked(true);
    setAskCode(false);
    setCode("");
    toast.success("Destravado por 24 horas", {
      description: "Agora dá pra adicionar e marcar o que já vivemos.",
    });
  }

  async function handleToggle(item: WishItem) {
    if (!canEdit) return;
    const next = !doneSet.has(item.id);
    try {
      await toggleDone(item.id, next);
      if (next) toast.success("Mais um que a gente viveu ♥");
    } catch {
      toast.error("Não consegui salvar. Tenta de novo?");
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !canEdit) return;
    setSaving(true);
    try {
      await addItem(text, draftGroup);
      setDraft("");
      toast.success("Adicionado à nossa lista ♥");
    } catch {
      toast.error("Não consegui salvar. Tenta de novo?");
    } finally {
      setSaving(false);
    }
  }

  const groups: WishGroup[] = ["aventura", "restaurante"];

  return (
    <div>
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.5em] text-gold-soft">
          o que ainda quero viver contigo
        </p>
        <p className="mt-4 text-center font-display italic text-muted-foreground">
          nossa lista de planos — e o que a gente já conquistou
        </p>
      </Reveal>

      {/* Progresso */}
      <Reveal delay={80}>
        <div className="mx-auto mt-10 max-w-md">
          <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span>
              <span className="font-display text-2xl text-gradient-gold">
                {doneCount}
              </span>{" "}
              de {items.length} conquistados
            </span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-gold/15">
            <div
              className="h-full gradient-gold transition-[width] duration-1000 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </Reveal>

      {/* Cadeado / status */}
      <Reveal delay={120}>
        <div className="mt-8 flex justify-center">
          {!firebaseReady ? (
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
              lista em modo leitura
            </span>
          ) : canEdit ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold-soft">
              <LockOpen className="h-3 w-3" />
              destravado por 24h
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setAskCode(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground cursor-pointer transition-colors hover:border-gold/60 hover:text-gold-soft focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <Lock className="h-3 w-3" />
              destravar para editar
            </button>
          )}
        </div>
      </Reveal>

      {/* Lista */}
      <div className="mt-12 space-y-12">
        {groups.map((group) => {
          const list = items.filter((i) => i.group === group);
          if (!list.length) return null;
          return (
            <Reveal key={group} delay={160}>
              <div>
                <p className="mb-5 text-center text-[10px] uppercase tracking-[0.4em] text-gold/60">
                  {GROUP_LABEL[group]}
                </p>
                <ul className="mx-auto max-w-2xl space-y-2">
                  {list.map((item) => {
                    const done = doneSet.has(item.id);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleToggle(item)}
                          disabled={!canEdit}
                          aria-pressed={done}
                          className={
                            "group flex w-full items-start gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-300 " +
                            (done
                              ? "border-gold/40 bg-gold/[0.06]"
                              : "border-gold/15 bg-card/30") +
                            (canEdit
                              ? " cursor-pointer hover:border-gold/50 hover:bg-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                              : " cursor-default")
                          }
                        >
                          <span
                            className={
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 " +
                              (done
                                ? "border-gold bg-gold text-background shadow-[0_0_10px_2px] shadow-gold/40"
                                : "border-gold/40 text-transparent group-hover:border-gold/70")
                            }
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span
                            className={
                              "font-display text-lg leading-snug transition-all duration-300 " +
                              (done
                                ? "text-muted-foreground/60 line-through decoration-gold/50"
                                : "text-foreground/90")
                            }
                          >
                            {item.text}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Adicionar */}
      {canEdit && (
        <form
          onSubmit={handleAdd}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="o que mais você quer viver comigo?"
            maxLength={200}
            className="flex-1 rounded-xl border border-gold/30 bg-card/40 px-4 py-3 font-display text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          <select
            value={draftGroup}
            onChange={(e) => setDraftGroup(e.target.value as WishGroup)}
            className="rounded-xl border border-gold/30 bg-card/40 px-3 py-3 text-xs uppercase tracking-[0.2em] text-gold-soft focus:border-gold/60 focus:outline-none"
          >
            <option value="aventura">aventura</option>
            <option value="restaurante">restaurante</option>
          </select>
          <button
            type="submit"
            disabled={!draft.trim() || saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-gold-soft cursor-pointer transition-colors hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            somar
          </button>
        </form>
      )}

      {loading && (
        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          carregando nossa lista…
        </p>
      )}

      {/* Código */}
      <Dialog open={askCode} onOpenChange={setAskCode}>
        <DialogContent className="max-w-sm border-gold/30 bg-card">
          <DialogTitle className="text-center text-xs uppercase tracking-[0.4em] text-gold-soft font-normal">
            código do casal
          </DialogTitle>
          <div className="flex flex-col items-center gap-6 py-4">
            <p className="text-center font-display italic text-muted-foreground">
              digite os 4 números para editar a lista por 24 horas
            </p>
            <div className={wrong ? "animate-shake" : undefined}>
              <InputOTP
                maxLength={4}
                value={code}
                onChange={(v) => {
                  setCode(v);
                  if (v.length === 4) submitCode(v);
                }}
                autoFocus
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-14 w-12 rounded-md border border-gold/40 bg-background/60 font-display text-2xl text-gold-soft"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
