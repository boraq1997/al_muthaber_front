// src/utils/format.ts
export function formatCurrency(value: string | number): string {
  if (value == null) return "0";

  const num = Number(value.toString().replace(/,/g, ""));

  if (isNaN(num)) return value.toString();

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}