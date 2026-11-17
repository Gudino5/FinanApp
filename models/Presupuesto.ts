import { CategoriaGasto } from './Categoria';

export interface Presupuesto {
  id: string;            // ← nuevo
  categoria: CategoriaGasto;
  limite: number;
}

export type NuevoPresupuesto = Omit<Presupuesto, 'id'>;