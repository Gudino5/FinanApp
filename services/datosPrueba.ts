import { Movimiento } from '../models/Movimiento';

export const MOVIMIENTOS_PRUEBA: Movimiento[] = [
  { id: 'prueba-1', tipo: 'ingreso', monto: '8500', categoria: 'Sueldos', fecha: '2026-10-15', nota: 'Quincena' },
  { id: 'prueba-2', tipo: 'gasto', monto: '320.50', categoria: 'Comida', fecha: '2026-10-18', nota: 'Súper' },
  { id: 'prueba-3', tipo: 'gasto', monto: '45', categoria: 'Transporte', fecha: '2026-10-20', nota: 'Camión' },
  { id: 'prueba-4', tipo: 'gasto', monto: '600', categoria: 'Servicios', fecha: '2026-10-22', nota: 'Luz' },
  { id: 'prueba-5', tipo: 'gasto', monto: '180', categoria: 'Ocio', fecha: '2026-10-25', nota: 'Cine' },
  { id: 'prueba-6', tipo: 'gasto', monto: '95', categoria: 'Comida', fecha: '2026-10-27', nota: '' },
  { id: 'prueba-7', tipo: 'gasto', monto: '60', categoria: 'Otros', fecha: '2026-10-28', nota: '' },
];