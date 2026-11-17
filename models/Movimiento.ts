import { CATEGORIAS } from './Categoria';

export type Categoria = (typeof CATEGORIAS)[number];
export type TipoMovimiento = 'gasto' | 'ingreso';

export interface Movimiento {
  id: string;            // ← nuevo
  tipo: TipoMovimiento;
  monto: string;
  categoria: Categoria;
  fecha: string;
  nota: string;
}

// Lo que produce el formulario: todavía no tiene id
export type NuevoMovimiento = Omit<Movimiento, 'id'>;

export const obtenerFechaActual = (): string => {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export const movimientoEsValido = (
  movimiento: Pick<Movimiento, 'monto'> & { categoria: Categoria | null },
): movimiento is Pick<Movimiento, 'monto'> & { categoria: Categoria } =>
  Boolean(movimiento.monto && movimiento.categoria);

export const crearMensajeDeGuardado = (movimiento: NuevoMovimiento): string =>
  `Se guardó un ${movimiento.tipo} de $${movimiento.monto} en ${movimiento.categoria}`;
