import { useMemo, useState } from 'react';
import { Movimiento } from '../models/Movimiento';
import { MOVIMIENTOS_PRUEBA } from '../services/datosPrueba';

const CANTIDAD_RECIENTES = 5;

// Evita errores de coma flotante al sumar (0.1 + 0.2)
function redondear(valor: number): number {
  return Math.round(valor * 100) / 100;
}

function sumar(lista: Movimiento[]): number {
  return redondear(lista.reduce((total, m) => total + Number(m.monto), 0));
}

export function useInicioViewModel() {
  const [movimientos] = useState<Movimiento[]>(MOVIMIENTOS_PRUEBA);

  return useMemo(() => {
    const ingresos = sumar(movimientos.filter((m) => m.tipo === 'ingreso'));
    const gastos = sumar(movimientos.filter((m) => m.tipo === 'gasto'));

    // Más recientes primero, solo los últimos N
    const recientes = [...movimientos]
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
      .slice(0, CANTIDAD_RECIENTES);

    return {
      ingresos,
      gastos,
      balance: redondear(ingresos - gastos),
      recientes,
      hayMovimientos: movimientos.length > 0,
    };
  }, [movimientos]);
}