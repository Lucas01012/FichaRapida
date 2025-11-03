import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { FichaProvider } from '@/contexts/FichaContext';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <FichaProvider>
        <PaperProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="dashboard" options={{ headerShown: false }} />
              <Stack.Screen name="nova-ficha" options={{ title: 'Nova Ficha', headerBackTitle: 'Voltar' }} />
              <Stack.Screen name="fichas" options={{ title: 'Fichas Cadastradas', headerBackTitle: 'Voltar' }} />
              <Stack.Screen name="ficha-detalhes" options={{ title: 'Detalhes da Ficha', headerBackTitle: 'Voltar' }} />
              <Stack.Screen name="perfil" options={{ title: 'Perfil', headerBackTitle: 'Voltar' }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PaperProvider>
      </FichaProvider>
    </AuthProvider>
  );
}
