import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(eur: number): string {
  return `€${eur.toLocaleString('en-IE', { maximumFractionDigits: 0 })}`;
}
