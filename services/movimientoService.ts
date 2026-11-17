import { Movimiento, NuevoMovimiento } from '../models/Movimiento';
import { generarId } from '../utils/id';
import { guardarJSON, leerJSON } from './almacenamiento';

const CLAVE = 'finanapp:movimientos';

// Devuelve los movimientos guardados, o una lista vacía si no hay ninguno
export async function obtenerMovimientos(): Promise<Movimiento[]> {
  const datos = await leerJSON<Movimiento[]>(CLAVE);
  return Array.isArray(datos) ? datos : [];
}

// Le asigna un id, lo guarda y devuelve el movimiento ya completo
export async function agregarMovimiento(
  nuevo: NuevoMovimiento,
): Promise<Movimiento> {
  const movimientos = await obtenerMovimientos();
  const movimiento: Movimiento = { ...nuevo, id: generarId() };
  await guardarJSON(CLAVE, [...movimientos, movimiento]);
  return movimiento;
}

// Quita el movimiento con ese id (si no existe, no pasa nada)
export async function eliminarMovimiento(id: string): Promise<void> {
  const movimientos = await obtenerMovimientos();
  await guardarJSON(
    CLAVE,
    movimientos.filter((m) => m.id !== id),
  );
}