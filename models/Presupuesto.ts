import { Categoria } from './Movimiento';

export interface Presupuesto {
  categoria: Categoria;
  limite: number;
}