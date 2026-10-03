import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { NativeHeroSection } from './components/native/NativeHeroSection';
import { NativeServiceCards } from './components/native/NativeServiceCards';
import { NativeBenefitsSection } from './components/native/NativeBenefitsSection';
import { NativeLandingFooter } from './components/native/NativeLandingFooter';

export function LandingScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'web' ? 100 : Math.max(insets.top, 20) + 16;

  return (
    <ScrollView
      style={{ backgroundColor: isDark ? '#060E18' : '#F4F6F9' }}
      className="flex-1 bg-brand-bg dark:bg-brand-navy-dark"
      contentContainerStyle={{
        paddingBottom: BottomTabInset + Spacing.six,
      }}
      showsVerticalScrollIndicator={false}>
      <NativeHeroSection topPadding={topPadding} />
      <NativeServiceCards isDark={isDark} />
      <NativeBenefitsSection />
      <NativeLandingFooter />
    </ScrollView>
  );
}

export default LandingScreen;
