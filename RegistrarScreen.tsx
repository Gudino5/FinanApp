import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { AppTheme } from './Theme';

const CATEGORIAS = ['Comida', 'Transporte', 'Servicios', 'Sueldos', 'Ocio', 'Otros'];

type Tipo = 'gasto' | 'ingreso';

const fechaDeHoy = (): string => {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export default function RegistrarScreen() {
  const theme = useTheme<AppTheme>();

  // Estado del formulario
  const [tipo, setTipo] = useState<Tipo>('gasto');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState<string | null>(null);
  const [fecha, setFecha] = useState(fechaDeHoy());
  
  const [nota, setNota] = useState('');

  // Estado de la interfaz
  const [menuVisible, setMenuVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const guardar = () => {
    if (!monto || !categoria) {
      setMensaje('Completa el monto y la categoría');
      return;
    }
    setMensaje(`Se guardó un ${tipo} de $${monto} en ${categoria}`);
    setMonto('');
    setNota('');
    setCategoria(null);
  };

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
            value={tipo}
            onValueChange={(valor) => setTipo(valor as Tipo)}
            theme={{
                colors: {
                secondaryContainer: tipo === 'gasto' ? theme.colors.error : theme.colors.income,
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
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
              left={<TextInput.Affix text="$" />}
            />

            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                  {categoria ?? 'Selecciona una categoría'}
                </Button>
              }
            >
              {CATEGORIAS.map((c) => (
                <Menu.Item
                  key={c}
                  title={c}
                  onPress={() => {
                    setCategoria(c);
                    setMenuVisible(false);
                  }}
                />
              ))}
            </Menu>

            <TextInput mode="outlined" label="Fecha" value={fecha} onChangeText={setFecha} />

            <TextInput
              mode="outlined"
              label="Nota (opcional)"
              value={nota}
              onChangeText={setNota}
              multiline
              numberOfLines={3}
            />

            <Button mode="contained" onPress={guardar}>
              Guardar movimiento
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar visible={mensaje !== ''} onDismiss={() => setMensaje('')} duration={3000}>
        {mensaje}
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