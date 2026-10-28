import { ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Menu,
  SegmentedButtons,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIAS } from '../models/Categoria';
import { useRegistrarViewModel } from '../viewmodels/useRegistrarViewModel';
import { AppTheme } from '../Theme';

export default function RegistrarScreen() {
  const theme = useTheme<AppTheme>();
  const viewModel = useRegistrarViewModel();

  return (
    <SafeAreaView style={[styles.contenedor, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text variant="headlineSmall">Registrar movimiento</Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          Completa el monto, la categoría y la fecha.
        </Text>

        <Card mode="outlined" style={styles.tarjeta}>
          <Card.Content style={styles.formulario}>
            <SegmentedButtons
              value={viewModel.tipo}
              onValueChange={viewModel.cambiarTipo}
              theme={{
                colors: {
                  secondaryContainer:
                    viewModel.tipo === 'gasto' ? theme.colors.error : theme.colors.income,
                  onSecondaryContainer: '#FFFFFF',
                },
              }}
              buttons={[
                { value: 'gasto', label: 'Gasto' },
                { value: 'ingreso', label: 'Ingreso' },
              ]}
            />

            <TextInput
              mode="outlined"
              label="Monto (MXN)"
              value={viewModel.monto}
              onChangeText={viewModel.cambiarMonto}
              keyboardType="numeric"
              left={<TextInput.Affix text="$" />}
            />

            <Menu
              visible={viewModel.menuVisible}
              onDismiss={viewModel.cerrarMenu}
              anchor={
                <Button mode="outlined" onPress={viewModel.abrirMenu}>
                  {viewModel.categoria ?? 'Selecciona una categoría'}
                </Button>
              }
            >
              {CATEGORIAS.map((categoria) => (
                <Menu.Item
                  key={categoria}
                  title={categoria}
                  onPress={() => {
                    viewModel.cambiarCategoria(categoria);
                    viewModel.cerrarMenu();
                  }}
                />
              ))}
            </Menu>

            <TextInput
              mode="outlined"
              label="Fecha"
              value={viewModel.fecha}
              onChangeText={viewModel.cambiarFecha}
            />

            <TextInput
              mode="outlined"
              label="Nota (opcional)"
              value={viewModel.nota}
              onChangeText={viewModel.cambiarNota}
              multiline
              numberOfLines={3}
            />

            <Button mode="contained" onPress={viewModel.guardar}>
              Guardar movimiento
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={viewModel.mensaje !== ''}
        onDismiss={viewModel.cerrarMensaje}
        duration={3000}
      >
        {viewModel.mensaje}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1 },
  contenido: { padding: 20, gap: 8 },
  tarjeta: { marginTop: 16 },
  formulario: { gap: 14 },
});
