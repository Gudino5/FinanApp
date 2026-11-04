import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import Header from '../components/Header';
import TarjetaBalance from '../components/TarjetaBalance';
import { useInicioViewModel } from '../viewmodels/useInicioViewModel';

export default function InicioScreen() {
  const theme = useTheme();
  const vm = useInicioViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <Header />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TarjetaBalance
          balance={vm.balance}
          ingresos={vm.ingresos}
          gastos={vm.gastos}
        />
      </ScrollView>
    </SafeAreaView>
  );
}