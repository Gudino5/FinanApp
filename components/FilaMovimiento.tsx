import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Tarjeta from './Tarjeta';
import { AppTheme } from '../Theme';
import { Movimiento } from '../models/Movimiento';
import { formatearFecha, formatearMonto } from '../utils/formato';

type Props = {
  movimiento: Movimiento;
};

export default function FilaMovimiento({ movimiento: m }: Props) {
  const theme = useTheme<AppTheme>();
  const esIngreso = m.tipo === 'ingreso';
  const color = esIngreso ? theme.colors.income : theme.colors.expense;

  return (
    <Tarjeta style={styles.fila}>
      <View style={styles.datos}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          {m.categoria}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {formatearFecha(m.fecha)}
          {m.nota ? ` · ${m.nota}` : ''}
        </Text>
      </View>
      <Text variant="titleMedium" style={{ color }}>
        {esIngreso ? '+' : '-'}
        {formatearMonto(Number(m.monto))}
      </Text>

    </Tarjeta>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datos: { flexShrink: 1, gap: 2 },
});