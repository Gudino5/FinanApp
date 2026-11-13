import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  Menu,
  SegmentedButtons,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CATEGORIAS } from "../models/Categoria";
import { useRegistrarViewModel } from "../viewmodels/useRegistrarViewModel";
import { AppTheme } from "../Theme";
import { TabParamList } from "../navigation/types";
import { fechaDesdeISO, formatearFecha } from "../utils/formato";
import AdjuntarTicket from "./AdjuntarTicket";

export default function RegistrarScreen() {
  const theme = useTheme<AppTheme>();
  const viewModel = useRegistrarViewModel();

  // ───────────── Navegación (tarea 38) ─────────────
  const route = useRoute<RouteProp<TabParamList, "Registrar">>();
  const navigation =
    useNavigation<BottomTabNavigationProp<TabParamList, "Registrar">>();
  const tipoRecibido = route.params?.tipo;

  // Al entrar desde los botones de Inicio, aplica el tipo y limpia el parámetro
  useFocusEffect(
    useCallback(() => {
      if (tipoRecibido) {
        viewModel.cambiarTipo(tipoRecibido);
        navigation.setParams({ tipo: undefined });
      }
    }, [tipoRecibido]),
  );

  // ───────────── Interfaz ─────────────
  return (
    <SafeAreaView
      style={[styles.contenedor, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text variant="headlineSmall">Registrar movimiento</Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Completa el monto, la categoría y la fecha.
        </Text>

        <Card mode="outlined" style={styles.tarjeta}>
          <Card.Content style={styles.formulario}>
            {/* Tipo: gasto o ingreso */}
            <SegmentedButtons
              value={viewModel.tipo}
              onValueChange={viewModel.cambiarTipo}
              theme={{
                colors: {
                  secondaryContainer:
                    viewModel.tipo === "gasto"
                      ? theme.colors.error
                      : theme.colors.income,
                  onSecondaryContainer: "#FFFFFF",
                },
              }}
              buttons={[
                { value: "gasto", label: "Gasto" },
                { value: "ingreso", label: "Ingreso" },
              ]}
            />

            {/* Monto (tarea 39: validación) */}
            <View>
              <TextInput
                mode="outlined"
                label="Monto (MXN)"
                value={viewModel.monto}
                onChangeText={viewModel.cambiarMonto}
                keyboardType="numeric"
                left={<TextInput.Affix text="$" />}
                error={!!viewModel.errores.monto}
              />
              <HelperText type="error" visible={!!viewModel.errores.monto}>
                {viewModel.errores.monto}
              </HelperText>
            </View>

            {/* Categoría (tarea 39: validación) */}
            <View>
              <Menu
                visible={viewModel.menuVisible}
                onDismiss={viewModel.cerrarMenu}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={viewModel.abrirMenu}
                    textColor={
                      viewModel.errores.categoria
                        ? theme.colors.error
                        : undefined
                    }
                  >
                    {viewModel.categoria ?? "Selecciona una categoría"}
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
              <HelperText type="error" visible={!!viewModel.errores.categoria}>
                {viewModel.errores.categoria}
              </HelperText>
            </View>

            {/* Fecha (tarea 40: selector) */}
            <View>
              <Button
                mode="outlined"
                icon="calendar"
                onPress={viewModel.abrirSelectorFecha}
                textColor={
                  viewModel.errores.fecha ? theme.colors.error : undefined
                }
              >
                {`Fecha: ${formatearFecha(viewModel.fecha)}`}
              </Button>
              <HelperText type="error" visible={!!viewModel.errores.fecha}>
                {viewModel.errores.fecha}
              </HelperText>
            </View>

            {/* Nota */}
            <TextInput
              mode="outlined"
              label="Nota (opcional)"
              value={viewModel.nota}
              onChangeText={viewModel.cambiarNota}
              multiline
              numberOfLines={3}
            />

            {/* Ticket adjunto (tarea 41: se reinicia al guardar) */}
            <AdjuntarTicket key={viewModel.reinicios} />

            <Button mode="contained" onPress={viewModel.guardar}>
              Guardar movimiento
            </Button>

            {viewModel.selectorFechaVisible && (
              <DateTimePicker
                value={fechaDesdeISO(viewModel.fecha)}
                mode="date"
                maximumDate={new Date()}
                onChange={(
                  evento: DateTimePickerEvent,
                  fechaElegida?: Date,
                ) => {
                  if (evento.type === "set" && fechaElegida) {
                    viewModel.elegirFecha(fechaElegida);
                  } else {
                    viewModel.cerrarSelectorFecha();
                  }
                }}
              />
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Aviso de confirmación (tarea 41) */}
      <Snackbar
        visible={viewModel.mensaje !== ""}
        onDismiss={viewModel.cerrarMensaje}
        duration={3000}
        action={{ label: "OK", onPress: viewModel.cerrarMensaje }}
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