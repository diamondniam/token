export function convertHexToCSSRGBA(hex: string, alpha: number = 1): string {
  const cleanHex = hex.replace(/^#/, "");

  const bigint = parseInt(
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((c) => c + c)
          .join("")
      : cleanHex,
    16,
  );

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
