import { NuevoPresupuesto, Presupuesto } from '../models/Presupuesto';
import { generarId } from '../utils/id';
import { guardarJSON, leerJSON } from './almacenamiento';

const CLAVE = 'finanapp:presupuestos';

// Devuelve los presupuestos guardados, o una lista vacía si no hay ninguno
export async function obtenerPresupuestos(): Promise<Presupuesto[]> {
  const datos = await leerJSON<Presupuesto[]>(CLAVE);
  return Array.isArray(datos) ? datos : [];
}

// Un solo límite por categoría: si ya existe lo actualiza (conserva su id),
// y si no existe lo crea con un id nuevo
export async function guardarPresupuesto(
  nuevo: NuevoPresupuesto,
): Promise<Presupuesto> {
  const presupuestos = await obtenerPresupuestos();
  const existente = presupuestos.find((p) => p.categoria === nuevo.categoria);

  const presupuesto: Presupuesto = {
    ...nuevo,
    id: existente?.id ?? generarId(),
  };

  const lista = existente
    ? presupuestos.map((p) => (p.id === existente.id ? presupuesto : p))
    : [...presupuestos, presupuesto];

  await guardarJSON(CLAVE, lista);
  return presupuesto;
}


// Quita el presupuesto con ese id (si no existe, no pasa nada)
export async function eliminarPresupuesto(id: string): Promise<void> {
  const presupuestos = await obtenerPresupuestos();
  await guardarJSON(
    CLAVE,
    presupuestos.filter((p) => p.id !== id),
  );
}