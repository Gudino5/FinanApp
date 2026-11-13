import { useState } from "react";
import {
  crearMensajeDeGuardado,
  obtenerFechaActual,
  type Categoria,
  type TipoMovimiento,
} from "../models/Movimiento";
import { validarMovimiento, type ErroresFormulario } from "../utils/validacion";
import { fechaAISO } from "../utils/formato";

export const useRegistrarViewModel = () => {
  const [tipo, setTipo] = useState<TipoMovimiento>("gasto");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [fecha, setFecha] = useState(() => fechaAISO(new Date()));
  const [selectorFechaVisible, setSelectorFechaVisible] = useState(false);
  const [nota, setNota] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [reinicios, setReinicios] = useState(0);

  const limpiarFormulario = () => {
    setMonto("");
    setCategoria(null);
    setFecha(fechaAISO(new Date()));
    setNota("");
    setErrores({});
    setMenuVisible(false);
    setSelectorFechaVisible(false);
    setReinicios((n) => n + 1);
  };

  const guardar = () => {
  const nuevosErrores = validarMovimiento({ monto, categoria, fecha });
  setErrores(nuevosErrores);

  if (Object.keys(nuevosErrores).length > 0 || categoria === null) {
    setMensaje('Revisa los campos marcados.');
    return;
  }

  setMensaje(crearMensajeDeGuardado({ tipo, monto, categoria, fecha, nota }));
  limpiarFormulario();
};

  return {
    tipo,
    monto,
    categoria,
    fecha,
    nota,
    menuVisible,
    mensaje,
    errores,
    reinicios,
    selectorFechaVisible,
    abrirSelectorFecha: () => setSelectorFechaVisible(true),
    cerrarSelectorFecha: () => setSelectorFechaVisible(false),
    elegirFecha: (valor: Date) => {
      setFecha(fechaAISO(valor));
      setSelectorFechaVisible(false);
      setErrores((e) => ({ ...e, fecha: undefined }));
    },
    cambiarTipo: (valor: string) => {
      if (valor === "gasto" || valor === "ingreso") {
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
    cambiarFecha: (valor: string) => {
      setFecha(valor);
      setErrores((e) => ({ ...e, fecha: undefined }));
    },
    cambiarNota: setNota,
    abrirMenu: () => setMenuVisible(true),
    cerrarMenu: () => setMenuVisible(false),
    cerrarMensaje: () => setMensaje(""),
    guardar,
  };
};
