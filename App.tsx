import { PaperProvider } from 'react-native-paper';
import { theme } from './Theme';
import RegistrarScreen from './RegistrarScreen';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <RegistrarScreen />
    </PaperProvider>
  );
}