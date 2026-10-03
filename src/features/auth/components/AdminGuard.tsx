import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isInitializing, isAuthenticated } = useAuth();

  if (isInitializing) {
    return (
      <View className="flex-1 items-center justify-center bg-brand-bg dark:bg-brand-navy-dark">
        <ActivityIndicator size="large" color="#E5A93C" />
      </View>
    );
  }

  // Si no está autenticado o no es Admin, lo redirigimos al portal (login/dashboard normal)
  if (!isAuthenticated || user?.role !== 'Admin') {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
