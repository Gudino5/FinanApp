import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Text, useTheme } from 'react-native-paper';
import Tarjeta from './Tarjeta';
import { AppTheme } from '../Theme';
import { formatearMonto } from '../utils/formato';

type Props = {
  categoria: string;
  limite: number;
  gastado: number;
  disponible: number; // negativo si se pasó del límite
  progreso: number;   // de 0 a 1
  porcentaje: number; // puede pasar de 100
  excedido: boolean;
};

export default function TarjetaPresupuesto({
  categoria,
  limite,
  gastado,
  disponible,
  progreso,
  porcentaje,
  excedido,
}: Props) {
  const theme = useTheme<AppTheme>();
  const color = excedido ? theme.colors.expense : theme.colors.primary;

  return (
    <Tarjeta style={styles.contenedor}>
      <View style={styles.fila}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          {categoria}
        </Text>
        <Text variant="labelLarge" style={{ color }}>
          {porcentaje}%
        </Text>
      </View>

      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        {formatearMonto(gastado)} de {formatearMonto(limite)}
      </Text>

      <ProgressBar progress={progreso} color={color} style={styles.barra} />

      <Text
        variant="bodySmall"
        style={{ color: excedido ? theme.colors.expense : theme.colors.onSurfaceVariant }}
      >
        {excedido
          ? `Te pasaste por ${formatearMonto(Math.abs(disponible))}`
          : `${formatearMonto(disponible)} disponibles`}
      </Text>
    </Tarjeta>
  );
}

const styles = StyleSheet.create({
  contenedor: { gap: 8 },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barra: { height: 8, borderRadius: 4 },
});