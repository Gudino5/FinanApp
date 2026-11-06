import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import EstadoVacio from './EstadoVacio';
import FilaMovimiento from './FilaMovimiento';
import { AppTheme } from '../Theme';
import { Movimiento } from '../models/Movimiento';

type Props = {
  movimientos: Movimiento[];
  onVerHistorial: () => void;
};

export default function MovimientosRecientes({ movimientos, onVerHistorial }: Props) {
  const theme = useTheme<AppTheme>();

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          Movimientos recientes
        </Text>
        <Button mode="text" compact onPress={onVerHistorial}>
          Ver historial
        </Button>
      </View>

      {movimientos.length === 0 ? (
        <EstadoVacio mensaje="Aún no tienes movimientos registrados." />
      ) : (
        movimientos.map((m, i) => (
          <FilaMovimiento key={`${m.fecha}-${m.categoria}-${i}`} movimiento={m} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { gap: 10 },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});