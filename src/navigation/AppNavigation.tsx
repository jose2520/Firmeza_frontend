import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Home, BookOpen, Sun, Moon, User, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/features/auth/hooks/useAuth';

type BottomBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

/**
 * Barra de navegación inferior móvil con iconos vectoriales reales de Lucide.
 * Sincronizada al 100% con la estética y colores de Firmeza.
 */
function FirmezaBottomNavbar({ state, navigation, insets }: BottomBarProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { isAuthenticated } = useAuth();
  const bottomInset = Math.max(insets?.bottom ?? 0, 10);
  const currentRouteName = state.routes[state.index]?.name;

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setColorScheme(next);
  };

  const isHome = currentRouteName === 'index';
  const isExplore = currentRouteName === 'explore';
  const isPortal = currentRouteName === 'login';

  return (
    <View
      style={{
        paddingBottom: bottomInset,
        backgroundColor: isDark ? '#091522' : '#FFFFFF',
        borderTopColor: isDark ? '#1E293B' : '#E2E8F0',
      }}
      className="w-full border-t shadow-2xl flex-row items-center justify-around px-3 pt-2.5">
      
      {/* 1. Tab Inicio con icono vectorial Home e indicador dorado activo */}
      <Pressable
        onPress={() => navigation.navigate('index')}
        accessibilityRole="button"
        accessibilityLabel="Inicio"
        className="flex-col items-center justify-center py-1 px-3">
        <Home
          size={21}
          color={isHome ? '#E5A93C' : (isDark ? '#94A3B8' : '#64748B')}
          strokeWidth={isHome ? 2.5 : 2}
        />
        <Text
          style={{
            color: isHome ? '#E5A93C' : (isDark ? '#94A3B8' : '#1E293B'),
            fontWeight: isHome ? '800' : '600',
          }}
          className="font-heading text-[10.5px] tracking-wider uppercase mt-1">
          Inicio
        </Text>
        {isHome ? (
          <View className="w-7 h-[2.5px] bg-brand-gold rounded-full mt-1" />
        ) : (
          <View className="w-7 h-[2.5px] bg-transparent mt-1" />
        )}
      </Pressable>

      {/* 2. Tab Catálogo con icono vectorial BookOpen e indicador dorado activo */}
      <Pressable
        onPress={() => navigation.navigate('explore')}
        accessibilityRole="button"
        accessibilityLabel="Catálogo"
        className="flex-col items-center justify-center py-1 px-3">
        <BookOpen
          size={21}
          color={isExplore ? '#E5A93C' : (isDark ? '#94A3B8' : '#64748B')}
          strokeWidth={isExplore ? 2.5 : 2}
        />
        <Text
          style={{
            color: isExplore ? '#E5A93C' : (isDark ? '#94A3B8' : '#1E293B'),
            fontWeight: isExplore ? '800' : '600',
          }}
          className="font-heading text-[10.5px] tracking-wider uppercase mt-1">
          Catálogo
        </Text>
        {isExplore ? (
          <View className="w-7 h-[2.5px] bg-brand-gold rounded-full mt-1" />
        ) : (
          <View className="w-7 h-[2.5px] bg-transparent mt-1" />
        )}
      </Pressable>

      {/* 3. Botón de Cambio de Tema con iconos vectoriales reales (Sun / Moon) */}
      <Pressable
        onPress={toggleTheme}
        accessibilityRole="button"
        accessibilityLabel={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className={`w-9 h-9 rounded-full items-center justify-center border shadow-sm ${
          isDark
            ? 'bg-brand-navy-light border-slate-700 active:bg-slate-800'
            : 'bg-slate-100 border-slate-200 active:bg-slate-200'
        }`}>
        {isDark ? (
          <Sun size={17} color="#E5A93C" strokeWidth={2.4} />
        ) : (
          <Moon size={17} color="#091522" strokeWidth={2.4} />
        )}
      </Pressable>

      {/* 4. Botón Portal de Clientes / Mi Portal con sesión sincronizada */}
      <Pressable
        onPress={() => navigation.navigate('login')}
        accessibilityRole="button"
        accessibilityLabel={isAuthenticated ? 'Mi Portal Firmeza' : 'Portal de Clientes'}
        className={`flex-row items-center gap-1.5 py-2 px-3.5 rounded-full border shadow-sm ${
          isPortal
            ? 'bg-brand-gold border-amber-500'
            : isDark
            ? 'bg-brand-navy-light border-brand-gold/50 active:bg-brand-gold/10'
            : 'bg-brand-navy border-slate-700 active:bg-brand-navy-light'
        }`}>
        <User
          size={13}
          color={isPortal ? '#091522' : '#E5A93C'}
          strokeWidth={2.5}
        />
        <Text
          style={{
            color: isPortal ? '#091522' : '#FFFFFF',
            fontWeight: '900',
          }}
          className="font-heading text-[10.5px] tracking-wider uppercase">
          {isAuthenticated ? 'MI SESIÓN' : 'PORTAL'}
        </Text>
        <ChevronRight
          size={13}
          color={isPortal ? '#091522' : isDark ? '#E5A93C' : '#94A3B8'}
          strokeWidth={2.5}
        />
      </Pressable>

    </View>
  );
}

export default function AppNavigation() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <FirmezaBottomNavbar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Catálogo',
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
          title: 'Portal',
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          href: null,
          title: 'Admin',
        }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
