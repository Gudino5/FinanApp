import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '../Theme';

type Props = {
  titulo?: string;
  iniciales?: string;
};

export default function Header({ titulo = 'Finanzas', iniciales = 'U' }: Props) {
  const theme = useTheme<AppTheme>();

  return (
    <View
      style={[
        styles.contenedor,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outlineVariant,
        },
      ]}
    >
      <View style={styles.marca}>
        <MaterialCommunityIcons
          name="wallet-outline"
          size={26}
          color={theme.colors.primary}
        />
        <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
          {titulo}

        </Text>
      </View>

     <Avatar.Text
  size={36}
  label={iniciales}
  style={{ backgroundColor: theme.colors.primary }}
  color={theme.colors.onPrimary}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});