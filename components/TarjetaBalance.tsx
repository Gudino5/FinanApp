import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tarjeta from './Tarjeta';
import { AppTheme } from '../Theme';
import { formatearMonto } from '../utils/formato';

type Props = {
  balance: number;
  ingresos: number;
  gastos: number;
};

type MiniProps = {
  etiqueta: string;
  monto: number;
  color: string;
  icono: keyof typeof MaterialCommunityIcons.glyphMap;
};

function MiniTarjeta({ etiqueta, monto, color, icono }: MiniProps) {
  const theme = useTheme<AppTheme>();

  return (
    <Tarjeta
      style={[styles.mini, { backgroundColor: theme.colors.elevation.level2 }]}
    >
      <View style={styles.etiqueta}>
        <MaterialCommunityIcons name={icono} size={18} color={color} />
        <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
          {etiqueta}
        </Text>
      </View>
      <Text variant="titleMedium" style={{ color }}>
        {formatearMonto(monto)}
      </Text>
    </Tarjeta>
  );
}

export default function TarjetaBalance({ balance, ingresos, gastos }: Props) {
  const theme = useTheme<AppTheme>();
  const colorBalance =
    balance < 0 ? theme.colors.expense : theme.colors.onSurface;

  return (
    <Tarjeta style={styles.contenedor}>
      <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
        Balance total
      </Text>
      <Text variant="displaySmall" style={{ color: colorBalance }}>
        {formatearMonto(balance)}
      </Text>

      <View style={styles.fila}>
        <MiniTarjeta
          etiqueta="Ingresos"
          monto={ingresos}
          color={theme.colors.income}
          icono="arrow-down-circle-outline"
        />
        <MiniTarjeta
          etiqueta="Gastos"
          monto={gastos}
          color={theme.colors.expense}
          icono="arrow-up-circle-outline"
        />
      </View>
    </Tarjeta>
  );
}

const styles = StyleSheet.create({
  contenedor: { gap: 4 },
  fila: { flexDirection: 'row', gap: 12, marginTop: 12 },
  mini: { flex: 1, padding: 12, gap: 6 },
  etiqueta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});