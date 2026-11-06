import { TipoMovimiento } from '../models/Movimiento';

export type TabParamList = {
  Inicio: undefined;
  Registrar: { tipo?: TipoMovimiento } | undefined;
  Historial: undefined;
  Presupuestos: undefined;
};