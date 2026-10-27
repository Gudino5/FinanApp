import { useState } from 'react';
import {
  crearMensajeDeGuardado,
  movimientoEsValido,
  obtenerFechaActual,
  type Categoria,
  type TipoMovimiento,
} from '../models/Movimiento';

export const useRegistrarViewModel = () => {
  const [tipo, setTipo] = useState<TipoMovimiento>('gasto');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [fecha, setFecha] = useState(obtenerFechaActual);
  const [nota, setNota] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const guardar = () => {
    const formulario = { monto, categoria };
    if (!movimientoEsValido(formulario)) {
      setMensaje('Completa el monto y la categoría');
      return;
    }

    setMensaje(
      crearMensajeDeGuardado({
        tipo,
        monto: formulario.monto,
        categoria: formulario.categoria,
        fecha,
        nota,
      }),
    );
    setMonto('');
    setNota('');
    setCategoria(null);
  };

  return {
    tipo,
    monto,
    categoria,
    fecha,
    nota,
    menuVisible,
    mensaje,
    cambiarTipo: (valor: string) => {
      if (valor === 'gasto' || valor === 'ingreso') {
        setTipo(valor);
      }
    },
    cambiarMonto: setMonto,
    cambiarCategoria: setCategoria,
    cambiarFecha: setFecha,
    cambiarNota: setNota,
    abrirMenu: () => setMenuVisible(true),
    cerrarMenu: () => setMenuVisible(false),
    cerrarMensaje: () => setMensaje(''),
    guardar,
  };
};
