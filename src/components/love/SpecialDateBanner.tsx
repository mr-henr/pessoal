import { useState } from "react";
import { X } from "lucide-react";
import { HeartParticles } from "@/components/love/HeartParticles";
import { useSpecialDate } from "@/hooks/use-special-date";

/**
 * Em datas especiais (ver src/data/special-dates.ts), a página comemora:
 * chuva de corações dourados + um cartão com a mensagem daquele dia.
 * Em dias comuns, não renderiza nada.
 */
export function SpecialDateBanner() {
  const special = useSpecialDate();
  // No modo prévia (?preview=) o cartão sempre aparece, sem lembrar o "fechar".
  const isPreview =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("preview");
  const dismissKey =
    special && !isPreview ? `special:${special.id}:${new Date().getFullYear()}` : "";
  const [dismissed, setDismissed] = useState(
    () => !!dismissKey && typeof sessionStorage !== "undefined" && !!sessionStorage.getItem(dismissKey),
  );

  if (!special || dismissed) return null;

  function fechar() {
    if (dismissKey) sessionStorage.setItem(dismissKey, "1");
    setDismissed(true);
  }

  return (
    <>
      {/* Chuva de comemoração por cima de tudo */}
      <HeartParticles count={64} intense />

      {/* Cartão da mensagem */}
      <div className="relative z-20 px-6 pt-24 pb-4 sm:pt-28">
        <div className="animate-fade-up mx-auto max-w-2xl rounded-2xl border border-gold/40 bg-card/70 p-6 text-center shadow-gold backdrop-blur-sm sm:p-8">
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            className="absolute right-4 top-4 text-gold/60 cursor-pointer transition-colors hover:text-gold focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold-soft">
            {special.label}
          </p>
          <p className="mt-5 font-display text-xl font-light leading-relaxed text-foreground/90 sm:text-2xl">
            {special.message}
          </p>
          <p className="mt-6 text-gold">
            <span className="animate-shimmer inline-block text-2xl">♥</span>
          </p>
        </div>
      </div>
    </>
  );
}
