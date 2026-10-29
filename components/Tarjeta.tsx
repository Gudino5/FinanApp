import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { AppTheme } from '../Theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Tarjeta({ children, style }: Props) {
  const theme = useTheme<AppTheme>();

  return (
    <Surface
      elevation={1}
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </Surface>
  );
}