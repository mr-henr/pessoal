import { useEffect, useState } from "react";

// 02/12/2023 às 18:00 (horário de Brasília, UTC-3)
const START = new Date("2023-12-02T18:00:00-03:00").getTime();

export interface LoveTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function compute(): LoveTime {
  const diff = Math.max(0, Date.now() - START);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

export function useLoveTimer(): LoveTime {
  const [time, setTime] = useState<LoveTime>(() => compute());
  useEffect(() => {
    const id = setInterval(() => setTime(compute()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
