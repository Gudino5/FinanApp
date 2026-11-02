import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, Text, useTheme } from 'react-native-paper';
import Header from '../components/Header';
import Tarjeta from '../components/Tarjeta';
import { AppTheme } from '../Theme';
import { Movimiento } from '../models/Movimiento';
import { useHistorialViewModel } from '../viewmodels/useHistorialViewModel';

function formatearMonto(monto: string): string {
  return `$${Number(monto).toFixed(2)}`;
}

// "2026-10-25" -> "25/10/2026"
function formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

function FilaMovimiento({ m }: { m: Movimiento }) {
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
        {formatearMonto(m.monto)}
      </Text>
    </Tarjeta>
  );
}

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
        renderItem={({ item }) => <FilaMovimiento m={item} />}
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

  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datos: { flexShrink: 1, gap: 2 },
});