import { PaperProvider } from 'react-native-paper';
import { theme } from './Theme';
import RegistrarScreen from './views/RegistrarScreen';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <RegistrarScreen />
    </PaperProvider>
  );
}


