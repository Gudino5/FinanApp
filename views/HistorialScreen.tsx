import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, Text, useTheme } from 'react-native-paper';
import Header from '../components/Header';
import EstadoVacio from '../components/EstadoVacio';
import FilaMovimiento from '../components/FilaMovimiento';
import { AppTheme } from '../Theme';
import { useHistorialViewModel } from '../viewmodels/useHistorialViewModel';

export default function HistorialScreen() {
  const theme = useTheme<AppTheme>();
  const vm = useHistorialViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <Header />

      <View style={styles.encabezado}>
        <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
          Historial
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          {vm.contador} de {vm.total} movimientos
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.selector}
        contentContainerStyle={styles.chips}
      >
        {vm.categorias.map((c) => (
          <Chip
            key={c}
            selected={vm.filtro === c}
            onPress={() => vm.setFiltro(c)}
          >
            {c}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        data={vm.movimientos}
        keyExtractor={(m, i) => `${m.fecha}-${m.categoria}-${m.monto}-${i}`}
        renderItem={({ item }) => <FilaMovimiento movimiento={item} />}
        ListEmptyComponent={
          <EstadoVacio mensaje="No hay movimientos para esta categoría." />
        }
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  encabezado: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  selector: { flexGrow: 0 },
  chips: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  lista: { padding: 16, gap: 10 },
});