export function formatearMonto(valor: number): string {
  return `$${valor.toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}