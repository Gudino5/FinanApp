import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '../Theme';

type Props = {
  mensaje: string;
};

export default function EstadoVacio({ mensaje }: Props) {
  const theme = useTheme<AppTheme>();

  return (
    <View style={styles.contenedor}>
      <MaterialCommunityIcons
        name="inbox-outline"
        size={44}
        color={theme.colors.onSurfaceVariant}
      />
      <Text
        variant="bodyLarge"
        style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
      >
        {mensaje}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {

    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
});