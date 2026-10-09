import { MD3DarkTheme } from 'react-native-paper';

// Tema global: parte del tema oscuro de Paper
export const theme = {
  ...MD3DarkTheme,
  roundness: 3,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#0A0A0A',       // fondo de la pantalla
    surface: '#171717',          // fondo de las tarjetas
    onSurface: '#FAFAFA',        // texto principal
    onSurfaceVariant: '#A3A3A3', // texto secundario
    primary: '#E5E5E5',          // botón Guardar y texto de botones outlined
    onPrimary: '#171717',        // texto del botón Guardar
    outline: '#FFFFFF1A',        // bordes
    error: '#FF6B6B',            // rojo de Gasto
    income: '#34D399',           // verde de Ingreso (color propio, Paper no lo trae)
  },
};

export type AppTheme = typeof theme;