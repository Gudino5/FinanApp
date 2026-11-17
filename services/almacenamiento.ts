import AsyncStorage from '@react-native-async-storage/async-storage';

// Guarda cualquier valor como JSON bajo una clave
export async function guardarJSON<T>(clave: string, valor: T): Promise<void> {
  await AsyncStorage.setItem(clave, JSON.stringify(valor));
}

// Lee y convierte de vuelta; devuelve null si no existe o está dañado
export async function leerJSON<T>(clave: string): Promise<T | null> {
  const texto = await AsyncStorage.getItem(clave);
  if (texto === null) return null;
  try {
    return JSON.parse(texto) as T;
  } catch {
    return null;
  }
}

export async function borrar(clave: string): Promise<void> {
  await AsyncStorage.removeItem(clave);
}