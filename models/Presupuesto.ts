import { CategoriaGasto } from './Categoria';

export interface Presupuesto {
  categoria: CategoriaGasto;
  limite: number;
}