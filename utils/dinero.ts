// Evita errores de coma flotante al sumar o restar (0.1 + 0.2)
export function redondear(valor: number): number {
  return Math.round(valor * 100) / 100;
}