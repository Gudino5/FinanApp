import { useCallback, useMemo, useState } from "react";
import { Movimiento } from "../models/Movimiento";
import { obtenerMovimientos } from "../services/movimientoService";
import { useFocusEffect } from "@react-navigation/native";

const CANTIDAD_RECIENTES = 5;

// Evita errores de coma flotante al sumar (0.1 + 0.2)
function redondear(valor: number): number {
  return Math.round(valor * 100) / 100;
}

function sumar(lista: Movimiento[]): number {
  return redondear(lista.reduce((total, m) => total + Number(m.monto), 0));
}

export function useInicioViewModel() {
  // ───────────── Estado ─────────────
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
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

  // Recarga cada vez que la pestaña toma el foco
  useFocusEffect(
    useCallback(() => {
      recargar();
    }, [recargar]),
  );

  // ───────────── Cálculos ─────────────
  const resumen = useMemo(() => {
    const ingresos = sumar(movimientos.filter((m) => m.tipo === "ingreso"));
    const gastos = sumar(movimientos.filter((m) => m.tipo === "gasto"));

    // Más recientes primero, solo los últimos N
    const recientes = [...movimientos]
      .sort(
        (a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id),
      )
      .slice(0, CANTIDAD_RECIENTES);

    return {
      ingresos,
      gastos,
      balance: redondear(ingresos - gastos),
      recientes,
      hayMovimientos: movimientos.length > 0,
    };
  }, [movimientos]);

  // ───────────── Lo que usa la vista ─────────────
  return { ...resumen, cargando, recargar };
}
