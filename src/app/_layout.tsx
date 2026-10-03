import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import { cssInterop } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { AnimatedSplashOverlay } from '@/components/splash/AnimatedSplash';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import AppNavigation from '@/navigation/AppNavigation';

cssInterop(SafeAreaView, { className: 'style' });
cssInterop(Image, { className: 'style' });

SplashScreen.preventAutoHideAsync();

import CustomCursor from '@/components/ui/CustomCursor';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <CustomCursor />
        <AnimatedSplashOverlay />
        <AppNavigation />
      </AuthProvider>
    </ThemeProvider>
  );
}
