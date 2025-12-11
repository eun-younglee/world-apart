import { useState } from "react";
import { TDDay } from "./types";

export const useDDay = (dday: TDDay) => {
  const [count, setCount] = useState<number>(0);
  const now = new Date();
  const targetDate = new Date(dday);

  const difference = targetDate.getTime() - now.getTime();

  const diffDays = Math.floor(difference / (1000 * 60 * 60 * 24));

  return diffDays;
};
