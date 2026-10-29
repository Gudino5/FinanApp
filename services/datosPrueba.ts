import { Movimiento } from '../models/Movimiento';

export const MOVIMIENTOS_PRUEBA: Movimiento[] = [
  { tipo: 'ingreso', monto: '8500', categoria: 'Sueldos', fecha: '2026-10-15', nota: 'Quincena' },
  { tipo: 'gasto', monto: '320.50', categoria: 'Comida', fecha: '2026-10-18', nota: 'Súper' },
  { tipo: 'gasto', monto: '45', categoria: 'Transporte', fecha: '2026-10-20', nota: 'Camión' },
  { tipo: 'gasto', monto: '600', categoria: 'Servicios', fecha: '2026-10-22', nota: 'Luz' },
  { tipo: 'gasto', monto: '180', categoria: 'Ocio', fecha: '2026-10-25', nota: 'Cine' },
  { tipo: 'gasto', monto: '95', categoria: 'Comida', fecha: '2026-10-27', nota: '' },
  { tipo: 'gasto', monto: '60', categoria: 'Otros', fecha: '2026-10-28', nota: '' },
];