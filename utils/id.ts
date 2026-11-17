// Identificador único sin dependencias: marca de tiempo + parte aleatoria
export function generarId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}