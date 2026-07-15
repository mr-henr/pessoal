import { useEffect, useState } from "react";
import { specialDates, type SpecialDate } from "@/data/special-dates";

/** Retorna a data especial de hoje (dia/mês), ou null. */
export function useSpecialDate(): SpecialDate | null {
  const [today, setToday] = useState<SpecialDate | null>(null);

  useEffect(() => {
    const now = new Date();
    const match = specialDates.find(
      (d) => d.month === now.getMonth() + 1 && d.day === now.getDate(),
    );
    setToday(match ?? null);
  }, []);

  return today;
}
