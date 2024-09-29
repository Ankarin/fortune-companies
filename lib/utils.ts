import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number | null) => {
  return num !== null ? num.toLocaleString() : "";
};

export const formatCurrency = (value: number | null | undefined): string => {
  if (value == null) {
    return "";
  }
  return `$${formatNumber(value)}`;
};
