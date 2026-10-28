import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { AppTheme } from '../Theme';
import InicioScreen from '../views/InicioScreen';
import RegistrarScreen from '../views/RegistrarScreen';
import HistorialScreen from '../views/HistorialScreen';
import PresupuestosScreen from '../views/PresupuestosScreen';

const Tab = createBottomTabNavigator();

const ICONOS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Inicio: 'home-outline',
  Registrar: 'plus-circle-outline',
  Historial: 'history',
  Presupuestos: 'wallet-outline',
};

export default function TabNavigator() {
  const theme = useTheme<AppTheme>();

  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.onSurface,
      border: theme.colors.outlineVariant,

    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outlineVariant,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={ICONOS[route.name]}
              color={color}
              size={size}
            />
          ),
        })}
      >
        <Tab.Screen name="Inicio" component={InicioScreen} />
        <Tab.Screen name="Registrar" component={RegistrarScreen} />
        <Tab.Screen name="Historial" component={HistorialScreen} />
        <Tab.Screen name="Presupuestos" component={PresupuestosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}