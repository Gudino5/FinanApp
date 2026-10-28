export const CATEGORIAS = [
  'Comida',
  'Transporte',
  'Servicios',
  'Sueldos',
  'Ocio',
  'Otros',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

// Presupuestos solo aplica a gastos, así que "Sueldos" (ingreso) se excluye
export type CategoriaGasto = Exclude<Categoria, 'Sueldos'>;

export const CATEGORIAS_GASTO = CATEGORIAS.filter(
  (c): c is CategoriaGasto => c !== 'Sueldos'
);