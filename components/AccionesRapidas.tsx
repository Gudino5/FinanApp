import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { AppTheme } from '../Theme';

type Props = {
  onIngreso: () => void;
  onGasto: () => void;
};

export default function AccionesRapidas({ onIngreso, onGasto }: Props) {
  const theme = useTheme<AppTheme>();

  return (
    <View style={styles.fila}>
      <Button
        mode="outlined"
        icon="plus-circle-outline"
        textColor={theme.colors.income}
        onPress={onIngreso}
        style={[styles.boton, { borderColor: theme.colors.income }]}
        contentStyle={styles.contenido}
        labelStyle={styles.etiqueta}
      >
        Registrar ingreso
      </Button>
      <Button
        mode="outlined"
        icon="minus-circle-outline"
        textColor={theme.colors.expense}
        onPress={onGasto}
        style={[styles.boton, { borderColor: theme.colors.expense }]}

        contentStyle={styles.contenido}
        labelStyle={styles.etiqueta}
      >
        Registrar gasto
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  fila: { flexDirection: 'row', gap: 12 },
  boton: { flex: 1 },
  contenido: { paddingVertical: 6 },
  etiqueta: { fontSize: 13 },
});