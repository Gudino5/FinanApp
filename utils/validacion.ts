export type ErroresFormulario = {
  monto?: string;
  categoria?: string;
  fecha?: string;
};

type Formulario = {
  monto: string;
  categoria: string | null;
  fecha: string;
};

// Acepta solo fechas reales con formato AAAA-MM-DD
function fechaValida(fecha: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const f = new Date(anio, mes - 1, dia);
  return (
    f.getFullYear() === anio && f.getMonth() === mes - 1 && f.getDate() === dia
  );
}

export function validarMovimiento(f: Formulario): ErroresFormulario {
  const errores: ErroresFormulario = {};

  const monto = f.monto.trim();
  if (monto === '') {
    errores.monto = 'Escribe el monto.';
  } else if (!Number.isFinite(Number(monto)) || Number(monto) <= 0) {
    errores.monto = 'El monto debe ser un número mayor a 0.';
  }


  if (f.categoria === null) {
    errores.categoria = 'Selecciona una categoría.';
  }

  const fecha = f.fecha.trim();
  if (fecha === '') {
    errores.fecha = 'Escribe la fecha.';
  } else if (!fechaValida(fecha)) {
    errores.fecha = 'Usa una fecha válida con formato AAAA-MM-DD.';
  }

  return errores;
}