import { useState } from "react";
import {
  crearMensajeDeGuardado,
  obtenerFechaActual,
  type Categoria,
  type TipoMovimiento,
} from "../models/Movimiento";
import { validarMovimiento, type ErroresFormulario } from "../utils/validacion";

export const useRegistrarViewModel = () => {
  const [tipo, setTipo] = useState<TipoMovimiento>("gasto");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [fecha, setFecha] = useState(obtenerFechaActual);
  const [nota, setNota] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<ErroresFormulario>({});

  const guardar = () => {
    const nuevosErrores = validarMovimiento({ monto, categoria, fecha });
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0 || categoria === null) {
      setMensaje("Revisa los campos marcados.");
      return;
    }

    setMensaje(crearMensajeDeGuardado({ tipo, monto, categoria, fecha, nota }));
    setMonto("");
    setNota("");
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
    errores,
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
