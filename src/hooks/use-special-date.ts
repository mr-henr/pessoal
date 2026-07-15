import { useEffect, useState } from "react";
import { specialDates, type SpecialDate } from "@/data/special-dates";

/**
 * Retorna a data especial de hoje (dia/mês), ou null.
 *
 * Modo prévia para teste: acesse com ?preview=<id> na URL
 * (ex: ?preview=aniversario-renally ou ?preview=namoro) para forçar
 * o cartão, sem mexer no relógio. Sem o parâmetro, funciona pela data real.
 */
export function useSpecialDate(): SpecialDate | null {
  const [today, setToday] = useState<SpecialDate | null>(null);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("preview");
    if (preview) {
      setToday(specialDates.find((d) => d.id === preview) ?? null);
      return;
    }

    const now = new Date();
    const match = specialDates.find(
      (d) => d.month === now.getMonth() + 1 && d.day === now.getDate(),
    );
    setToday(match ?? null);
  }, []);

  return today;
}
