import React from 'react';
import { TextInput } from 'react-native-paper';

type Props = {
  valor: string;
  onChange: (valor: string) => void;
  etiqueta?: string;
};

// Deja solo dígitos y un punto decimal, con máximo 2 decimales
function limpiar(texto: string): string {
  const soloNumeros = texto.replace(/[^0-9.]/g, '');
  const [entero, ...resto] = soloNumeros.split('.');
  if (resto.length === 0) return entero;
  return `${entero}.${resto.join('').slice(0, 2)}`;
}

export default function CampoMonto({ valor, onChange, etiqueta = 'Monto' }: Props) {
  return (
    <TextInput
      mode="outlined"
      label={etiqueta}
      value={valor}
      onChangeText={(t) => onChange(limpiar(t))}
      keyboardType="decimal-pad"
      left={<TextInput.Affix text="$" />}
    />
  );
}