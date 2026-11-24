import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Movimiento } from '../models/Movimiento';
import { Presupuesto } from '../models/Presupuesto';
import { CATEGORIAS, CATEGORIAS_GASTO } from '../models/Categoria';
import { obtenerMovimientos } from '../services/movimientoService';
import { obtenerPresupuestos } from '../services/presupuestosService';
import { fechaAISO } from '../utils/formato';
import { redondear } from '../utils/dinero';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

// Un presupuesto junto con lo que ya se gastó en el mes
export interface ItemPresupuesto {
  presupuesto: Presupuesto;
  gastado: number;
  disponible: number; // negativo si se pasó del límite
  progreso: number;   // de 0 a 1, para la barra
  porcentaje: number; // puede pasar de 100
  excedido: boolean;
}

export function usePresupuestosViewModel() {
  // ───────────── Estado ─────────────
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [cargando, setCargando] = useState(true);

  // ───────────── Lectura desde los servicios ─────────────

  const recargar = useCallback(async () => {
    try {
      const [listaMovimientos, listaPresupuestos] = await Promise.all([
        obtenerMovimientos(),
        obtenerPresupuestos(),
      ]);
      setMovimientos(listaMovimientos);
      setPresupuestos(listaPresupuestos);
    } catch {
      setMovimientos([]);
      setPresupuestos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  // Recarga cada vez que la pestaña toma el foco
  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar]),
  );

  // ───────────── Mes actual ─────────────
  const hoy = new Date();
  const prefijoMes = fechaAISO(hoy).slice(0, 7); // "2026-11"
  const nombreMes = `${MESES[hoy.getMonth()]} ${hoy.getFullYear()}`;

  // ───────────── Cálculos ─────────────
  const items = useMemo<ItemPresupuesto[]>(() => {
    // Suma de gastos del mes, por categoría
    const gastadoPorCategoria = new Map<string, number>();

    for (const m of movimientos) {
      if (m.tipo !== 'gasto' || !m.fecha.startsWith(prefijoMes)) continue;
      gastadoPorCategoria.set(
        m.categoria,
        (gastadoPorCategoria.get(m.categoria) ?? 0) + Number(m.monto),
      );
    }

    // En el mismo orden en que aparecen las categorías
    return [...presupuestos]
      .sort(
        (a, b) =>
          CATEGORIAS.indexOf(a.categoria) - CATEGORIAS.indexOf(b.categoria),
      )
      .map((p) => {
        const gastado = redondear(gastadoPorCategoria.get(p.categoria) ?? 0);
        const razon = p.limite > 0 ? gastado / p.limite : 0;
        return {
          presupuesto: p,
          gastado,
          disponible: redondear(p.limite - gastado),
          progreso: Math.min(razon, 1),
          porcentaje: Math.round(razon * 100),
          excedido: gastado > p.limite,
        };
      });
  }, [movimientos, presupuestos, prefijoMes]);

  // Categorías de gasto que todavía no tienen límite (las usará el formulario)
  const categoriasSinPresupuesto = CATEGORIAS_GASTO.filter(
    (c) => !presupuestos.some((p) => p.categoria === c),
  );


  // ───────────── Lo que usa la vista ─────────────
  return {
    nombreMes,
    items,
    categoriasSinPresupuesto,
    hayPresupuestos: presupuestos.length > 0,
    cargando,
    recargar,
  };
}