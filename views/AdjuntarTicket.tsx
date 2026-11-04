import { useState } from 'react';
import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AdjuntarTicket() {
  const [uri, setUri] = useState<string | null>(null);

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert(
        'Permiso denegado',
        'Sin cámara puedes elegir una foto de la galería o continuar sin ticket.'
      );
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  const elegirGaleria = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  return (
    <View style={s.box}>
      <Pressable style={s.btn} onPress={tomarFoto}>
        <Text style={s.txt}>Tomar foto del ticket</Text>
      </Pressable>
      <Pressable style={s.btn} onPress={elegirGaleria}>
        <Text style={s.txt}>Elegir de galería</Text>
      </Pressable>
      {uri && <Image source={{ uri }} style={s.img} />}
      {uri && <Text style={s.uri}>{uri}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  box: { padding: 16, gap: 12 },
  btn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10 },
  txt: { color: '#fff', textAlign: 'center' },
  img: { width: '100%', height: 220, borderRadius: 10 },
  uri: { color: '#94a3b8', fontSize: 11 },
});