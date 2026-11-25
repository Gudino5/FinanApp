import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import Header from '../components/Header';
import EstadoVacio from '../components/EstadoVacio';
import TarjetaPresupuesto from '../components/TarjetaPresupuesto';
import { AppTheme } from '../Theme';
import { usePresupuestosViewModel } from '../viewmodels/usePresupuestosViewModel';

export default function PresupuestosScreen() {
  const theme = useTheme<AppTheme>();
  const vm = usePresupuestosViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <Header />

      <View style={styles.encabezado}>
        <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
          Presupuestos
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.mes, { color: theme.colors.onSurfaceVariant }]}
        >
          Gasto de {vm.nombreMes}
        </Text>
      </View>

      <FlatList
        data={vm.items}
        keyExtractor={(item) => item.presupuesto.id}
        renderItem={({ item }) => (
          <TarjetaPresupuesto
            categoria={item.presupuesto.categoria}
            limite={item.presupuesto.limite}
            gastado={item.gastado}
            disponible={item.disponible}
            progreso={item.progreso}
            porcentaje={item.porcentaje}
            excedido={item.excedido}
          />
        )}
        ListEmptyComponent={
          vm.cargando ? (
            <ActivityIndicator style={styles.cargando} />
          ) : (
            <EstadoVacio mensaje="Aún no tienes presupuestos. Define un límite por categoría para seguir tu gasto del mes." />
          )
        }
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  encabezado: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  mes: { textTransform: 'capitalize' },
  lista: { padding: 16, gap: 10 },
  cargando: { marginTop: 48 },
});