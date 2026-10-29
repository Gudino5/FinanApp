import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'principal' | 'secundario';
  deshabilitado?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Boton({
  titulo,
  onPress,
  variante = 'principal',
  deshabilitado = false,
  style,
}: Props) {
  return (
    <Button
      mode={variante === 'principal' ? 'contained' : 'outlined'}
      onPress={onPress}
      disabled={deshabilitado}
      style={style}
      contentStyle={{ paddingVertical: 6 }}
    >
      {titulo}
    </Button>
  );
}