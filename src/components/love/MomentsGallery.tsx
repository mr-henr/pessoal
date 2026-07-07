import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/love/Reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface MomentsGalleryProps {
  photos: string[];
}

/** Mosaico de fotos com lightbox (abre em tela cheia, navegável). */
export function MomentsGallery({ photos }: MomentsGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const show = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, show]);

  return (
    <>
      <div className="mt-12 columns-2 sm:columns-3 gap-4 space-y-4">
        {photos.map((src, i) => (
          <Reveal key={i} delay={i * 60}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full overflow-hidden rounded-lg border border-gold/30 bg-card/40 p-1 break-inside-avoid cursor-pointer transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold/60"
              aria-label={`Abrir momento ${i + 1}`}
            >
              <img
                src={src}
                alt={`Momento ${i + 1}`}
                className="w-full rounded-md object-cover"
                loading="lazy"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(o) => !o && setOpenIndex(null)}
      >
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {openIndex !== null ? `Momento ${openIndex + 1}` : "Momento"}
          </DialogTitle>
          {openIndex !== null && (
            <div className="flex flex-col items-center gap-4">
              <img
                src={photos[openIndex]}
                alt={`Momento ${openIndex + 1}`}
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-gold"
              />
              <div className="flex items-center gap-6 text-gold">
                <button
                  type="button"
                  onClick={() => show(-1)}
                  aria-label="Foto anterior"
                  className="rounded-full border border-gold/40 bg-background/70 p-2 cursor-pointer transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-gold/60"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-xs uppercase tracking-[0.3em] text-gold-soft">
                  {openIndex + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  onClick={() => show(1)}
                  aria-label="Próxima foto"
                  className="rounded-full border border-gold/40 bg-background/70 p-2 cursor-pointer transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-gold/60"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
