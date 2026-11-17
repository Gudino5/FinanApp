import { useCallback, useEffect, useMemo, useState } from 'react';
import { Movimiento } from '../models/Movimiento';
import { Categoria, CATEGORIAS } from '../models/Categoria';
import { obtenerMovimientos } from '../services/movimientoService';

export type FiltroCategoria = Categoria | 'Todas';

export function useHistorialViewModel() {
  // ───────────── Estado ─────────────
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [filtro, setFiltro] = useState<FiltroCategoria>('Todas');
  const [cargando, setCargando] = useState(true);

  // ───────────── Lectura desde el servicio ─────────────
  const recargar = useCallback(async () => {
    try {
      setMovimientos(await obtenerMovimientos());
    } catch {
      setMovimientos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  // ───────────── Filtrado y orden ─────────────
  const movimientosFiltrados = useMemo(() => {
    const lista =
      filtro === 'Todas'
        ? movimientos
        : movimientos.filter((m) => m.categoria === filtro);

    // Más reciente primero; con la misma fecha, el último registrado arriba
    return [...lista].sort(
      (a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id),
    );
  }, [movimientos, filtro]);

  const categorias: FiltroCategoria[] = ['Todas', ...CATEGORIAS];

  // ───────────── Lo que usa la vista ─────────────
  return {
    filtro,
    setFiltro,
    categorias,
    movimientos: movimientosFiltrados,
    contador: movimientosFiltrados.length,
    total: movimientos.length,
    cargando,
    recargar, // la tarea 48 lo llamará al volver a la pestaña
  };
}