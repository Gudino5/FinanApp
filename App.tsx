import { PaperProvider } from 'react-native-paper';
import { theme } from './Theme';
import RegistrarScreen from './views/RegistrarScreen';
import TapNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {/* //<RegistrarScreen /> */}
      <TapNavigator />
    </PaperProvider>
  );
}


