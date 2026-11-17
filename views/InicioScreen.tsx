import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import TarjetaBalance from "../components/TarjetaBalance";
import { useInicioViewModel } from "../viewmodels/useInicioViewModel";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import AccionesRapidas from "../components/AccionesRapidas";
import { TabParamList } from "../navigation/types";
import MovimientosRecientes from "../components/MovimientosRecientes";
import { borrar, guardarJSON, leerJSON } from "../services/almacenamiento";
import { useEffect } from "react";
import {
  agregarMovimiento,
  eliminarMovimiento,
  obtenerMovimientos,
} from "../services/movimientoService";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function InicioScreen() {
  const theme = useTheme();
  const vm = useInicioViewModel();
  //  useEffect(() => {
  //   (async () => {
  //     const creado = await agregarMovimiento({
  //       tipo: 'gasto',
  //       monto: '10',
  //       categoria: 'Comida',
  //       fecha: '2026-11-16',
  //       nota: 'prueba',
  //     });
  //     console.log('AGREGADO:', creado);
  //     console.log('TOTAL:', (await obtenerMovimientos()).length);
  //     await eliminarMovimiento(creado.id);
  //     console.log('TOTAL TRAS ELIMINAR:', (await obtenerMovimientos()).length);
  //   })();
  // }, []);
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={["top"]}
    >
      <Header />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {vm.cargando ? (
          <ActivityIndicator style={{ marginTop: 48 }} />
        ) : (
          <>
            <TarjetaBalance
              balance={vm.balance}
              ingresos={vm.ingresos}
              gastos={vm.gastos}
            />
            <AccionesRapidas
              onIngreso={() =>
                navigation.navigate("Registrar", { tipo: "ingreso" })
              }
              onGasto={() =>
                navigation.navigate("Registrar", { tipo: "gasto" })
              }
            />
            <MovimientosRecientes
              movimientos={vm.recientes}
              onVerHistorial={() => navigation.navigate("Historial")}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
