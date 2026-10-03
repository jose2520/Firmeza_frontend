import React from 'react';
import { Platform } from 'react-native';
import LoginScreenWeb from '@/features/auth/LoginScreen.web';
import LoginScreen from '@/features/auth/LoginScreen';

export default function LoginRoute() {
  if (Platform.OS === 'web') {
    return <LoginScreenWeb />;
  }
  return <LoginScreen />;
}
