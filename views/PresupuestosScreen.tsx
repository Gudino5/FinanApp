import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AdjuntarTicket from '../views/AdjuntarTicket';

export default function PresupuestosScreen() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium">Presupuestos</Text>
      <AdjuntarTicket />
    </View>
  );
}
