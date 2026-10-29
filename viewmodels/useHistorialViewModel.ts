import { useMemo, useState } from 'react';
import { Movimiento } from '../models/Movimiento';
import { Categoria, CATEGORIAS } from '../models/Categoria';
import { MOVIMIENTOS_PRUEBA } from '../services/datosPrueba';

export type FiltroCategoria = Categoria | 'Todas';

export function useHistorialViewModel() {
  const [movimientos] = useState<Movimiento[]>(MOVIMIENTOS_PRUEBA);
  const [filtro, setFiltro] = useState<FiltroCategoria>('Todas');

  // Lista filtrada y ordenada del más reciente al más antiguo
  const movimientosFiltrados = useMemo(() => {
    const lista =
      filtro === 'Todas'
        ? movimientos
        : movimientos.filter((m) => m.categoria === filtro);
    return [...lista].sort((a, b) => b.fecha.localeCompare(a.fecha));
  }, [movimientos, filtro]);

  const categorias: FiltroCategoria[] = ['Todas', ...CATEGORIAS];

  return {
    filtro,
    setFiltro,
    categorias,
    movimientos: movimientosFiltrados,
    contador: movimientosFiltrados.length,
    total: movimientos.length,
  };
}