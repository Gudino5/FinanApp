import { useState } from 'react';
import {
  crearMensajeDeGuardado,
  type Categoria,
  type TipoMovimiento,
} from '../models/Movimiento';
import { agregarMovimiento,obtenerMovimientos } from '../services/movimientoService';
import { fechaAISO } from '../utils/formato';
import { validarMovimiento, type ErroresFormulario } from '../utils/validacion';

export const useRegistrarViewModel = () => {
  // ───────────── Estado del formulario ─────────────
  const [tipo, setTipo] = useState<TipoMovimiento>('gasto');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [fecha, setFecha] = useState(() => fechaAISO(new Date()));
  const [nota, setNota] = useState('');

  // ───────────── Estado de la interfaz ─────────────
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectorFechaVisible, setSelectorFechaVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [guardando, setGuardando] = useState(false);
  const [reinicios, setReinicios] = useState(0); // reinicia el ticket adjunto

  // ───────────── Acciones internas ─────────────
  const limpiarFormulario = () => {
    setMonto('');
    setCategoria(null);
    setFecha(fechaAISO(new Date()));
    setNota('');

    setErrores({});
    setMenuVisible(false);
    setSelectorFechaVisible(false);
    setReinicios((n) => n + 1);
  };

  const guardar = async () => {
    if (guardando) return;

    const nuevosErrores = validarMovimiento({ monto, categoria, fecha });
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0 || categoria === null) {
      setMensaje('Revisa los campos marcados.');
      return;
    }

    const nuevo = {
      tipo,
      monto: monto.trim(),
      categoria,
      fecha,
      nota: nota.trim(),
    };

    setGuardando(true);
    try {
      await agregarMovimiento(nuevo);
      console.log('GUARDADOS:', (await obtenerMovimientos()).length);
      setMensaje(crearMensajeDeGuardado(nuevo));
      limpiarFormulario();
    } catch {
      setMensaje('No se pudo guardar el movimiento. Intenta de nuevo.');

    } finally {
      setGuardando(false);
    }
  };

  // ───────────── Lo que usa la vista ─────────────
  return {
    // Estado
    tipo,
    monto,
    categoria,
    fecha,
    nota,
    menuVisible,
    selectorFechaVisible,
    mensaje,
    errores,
    guardando,
    reinicios,

    // Campos del formulario (al editar uno, se limpia su error)
    cambiarTipo: (valor: string) => {
      if (valor === 'gasto' || valor === 'ingreso') {
        setTipo(valor);
      }
    },
    cambiarMonto: (valor: string) => {
      setMonto(valor);
      setErrores((e) => ({ ...e, monto: undefined }));
    },
    cambiarCategoria: (valor: Categoria) => {
      setCategoria(valor);

      setErrores((e) => ({ ...e, categoria: undefined }));
    },
    elegirFecha: (valor: Date) => {
      setFecha(fechaAISO(valor));
      setSelectorFechaVisible(false);
      setErrores((e) => ({ ...e, fecha: undefined }));
    },
    cambiarNota: setNota,

    // Menú, selector de fecha y aviso
    abrirMenu: () => setMenuVisible(true),
    cerrarMenu: () => setMenuVisible(false),
    abrirSelectorFecha: () => setSelectorFechaVisible(true),
    cerrarSelectorFecha: () => setSelectorFechaVisible(false),
    cerrarMensaje: () => setMensaje(''),

    // Guardar
    guardar,
  };
};