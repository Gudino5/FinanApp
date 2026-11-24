import { useEffect } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { usePresupuestosViewModel } from '../viewmodels/usePresupuestosViewModel';
import { guardarPresupuesto } from '../services/presupuestosService';

export default function PresupuestosScreen() {
  const theme = useTheme();
  const vm = usePresupuestosViewModel(); // ← aquí adentro

  useEffect(() => {
    guardarPresupuesto({ categoria: 'Comida', limite: 500 }).then(vm.recargar);
  }, []);

  console.log('NOMBRE MES:', vm.nombreMes, JSON.stringify(vm.items, null, 2));

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text variant="headlineMedium">Presupuestos</Text>
    </View>
  );
}