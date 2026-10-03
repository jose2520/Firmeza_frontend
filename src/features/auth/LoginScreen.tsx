import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ShieldCheck,
  HardHat,
  Building,
  Truck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  Award,
  Layers,
  FileText,
  Settings,
  AlertCircle,
  LogOut,
  User,
  CheckCircle2,
} from 'lucide-react-native';

import { useColorScheme } from 'nativewind';
import { useAuth } from './hooks/useAuth';

const heroImage = require('@/assets/images/landing/hero.jpg');

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { user, isAuthenticated, isLoading, error, login, logout, clearError } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState<'empresa' | 'conductor'>('empresa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setValidationError(null);
    clearError();

    if (!email.trim()) {
      setValidationError('Por favor ingresa tu correo electrónico corporativo.');
      return;
    }

    if (!password.trim()) {
      setValidationError('Por favor ingresa tu contraseña de acceso.');
      return;
    }

    try {
      const response = await login({ email: email.trim(), password });
      setSuccessMessage(`¡Bienvenido de nuevo, ${response.usuario.name || response.usuario.email}!`);
      if (response.usuario.role === 'Admin') {
        router.replace('/admin');
      }
    } catch {
      // Error manejado en useAuth
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@firmeza.com');
    setPassword('Admin123*');
    setValidationError(null);
    clearError();
  };

  const handleLogout = async () => {
    setSuccessMessage(null);
    await logout();
  };

  const displayedError = validationError || error;

  return (
    <ScrollView
      style={{ backgroundColor: '#0B111E' }}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingTop: Math.max(insets.top, 20) + 12,
        paddingBottom: Math.max(insets.bottom, 20) + 16,
      }}
      showsVerticalScrollIndicator={false}>
      
      {/* Background Image con overlay de construcción */}
      <View style={StyleSheet.absoluteFill} className="absolute inset-0">
        <Image
          source={heroImage}
          contentFit="cover"
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(11, 17, 30, 0.88)' },
          ]}
        />
      </View>

      {/* Tira superior dorada */}
      <View className="w-full h-1 bg-brand-gold opacity-80" />

      {/* Contenido Principal */}
      <View className="px-4 py-6 w-full max-w-lg self-center">
        
        {/* Badge superior JWT */}
        <View className="items-center mb-6">
          <View className="flex-row items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-gold/40">
            <ShieldCheck size={14} color="#F59E0B" />
            <Text className="text-amber-300 font-heading font-extrabold text-[11px] tracking-wider uppercase">
              Acceso Seguro Verificado JWT
            </Text>
          </View>
        </View>

        {/* Tarjeta Elevada de Login con adaptación Claro / Oscuro */}
        <View
          style={{
            backgroundColor: isDark ? '#151D2E' : '#FFFFFF',
            borderColor: isDark ? '#334155' : 'rgba(255,255,255,0.2)',
          }}
          className="rounded-3xl shadow-2xl border overflow-hidden">
          
          {/* Barra ámbar superior de la tarjeta */}
          <View className="h-2 w-full bg-brand-gold" />

          <View className="p-6">
            
            {/* Header de la tarjeta */}
            <View className="mb-5">
              <View className="flex-row items-center justify-between mb-2">
                <View
                  style={{
                    backgroundColor: isDark ? 'rgba(120, 53, 15, 0.4)' : '#FEF3C7',
                    borderColor: isDark ? '#92400E' : '#FDE68A',
                  }}
                  className="flex-row items-center gap-1.5 px-3 py-1 rounded-full border">
                  <HardHat size={14} color="#D97706" />
                  <Text
                    style={{ color: isDark ? '#FCD34D' : '#78350F' }}
                    className="font-heading font-extrabold text-[10px] uppercase tracking-wider">
                    Portal Oficial
                  </Text>
                </View>
                <Text style={{ color: isDark ? '#64748B' : '#94A3B8' }} className="font-sans text-xs">v2.4.0</Text>
              </View>

              <Text
                style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                className="font-heading font-black text-xl tracking-tight">
                Portal de Clientes y Contratistas
              </Text>
              <Text
                style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                className="font-sans text-xs mt-1 leading-relaxed">
                Ingresa con tus credenciales maestras para gestionar despacho de materiales, cubicación y alquiler.
              </Text>
            </View>

            {/* Estado: Ya Autenticado */}
            {isAuthenticated && user ? (
              <View className="items-center py-4">
                <View className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 items-center justify-center mb-4">
                  <CheckCircle2 size={32} color="#10B981" />
                </View>

                <Text
                  style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                  className="font-heading font-black text-lg uppercase mb-1">
                  Sesión Activa
                </Text>

                <Text style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="font-sans text-xs mb-1">
                  Conectado como:
                </Text>
                <View
                  style={{ backgroundColor: isDark ? '#0B111E' : '#F1F5F9' }}
                  className="flex-row items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full">
                  <User size={14} color="#D97706" />
                  <Text className="text-amber-700 dark:text-amber-400 font-heading font-bold text-xs">
                    {user.email} {user.role ? `(${user.role})` : ''}
                  </Text>
                </View>

                {successMessage && (
                  <Text className="text-emerald-500 font-sans text-xs text-center mb-4">
                    {successMessage}
                  </Text>
                )}

                <View className="w-full gap-3">
                  {user.role === 'Admin' && (
                    <Link href="/admin" asChild>
                      <Pressable className="w-full py-3.5 px-6 rounded-full bg-emerald-500 active:bg-emerald-600 items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Text className="text-white font-heading font-black text-xs uppercase tracking-wider">
                          IR AL PANEL DE ADMINISTRACIÓN
                        </Text>
                      </Pressable>
                    </Link>
                  )}
                  <Link href="/explore" asChild>
                    <Pressable className="w-full py-3.5 px-6 rounded-full bg-brand-gold active:bg-amber-500 items-center justify-center shadow-lg shadow-amber-500/25">
                      <Text className="text-slate-950 font-heading font-black text-xs uppercase tracking-wider">
                        IR AL CATÁLOGO DE PRODUCTOS
                      </Text>
                    </Pressable>
                  </Link>

                  <Pressable
                    onPress={handleLogout}
                    style={{ borderColor: isDark ? '#334155' : '#CBD5E1' }}
                    className="w-full py-3 px-6 rounded-full border flex-row items-center justify-center gap-2 active:bg-red-50 dark:active:bg-red-950/30">
                    <LogOut size={16} color="#DC2626" />
                    <Text className="text-red-600 dark:text-red-400 font-heading font-bold text-xs uppercase tracking-wider">
                      CERRAR SESIÓN
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <>
                {/* Selector de Rol */}
                <View
                  style={{
                    backgroundColor: isDark ? '#0B111E' : '#F1F5F9',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                  }}
                  className="flex-row p-1 rounded-xl mb-5 border">
                  <Pressable
                    onPress={() => setRole('empresa')}
                    style={
                      role === 'empresa'
                        ? {
                            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                            borderColor: '#F59E0B',
                          }
                        : {}
                    }
                    className={`flex-1 py-2.5 px-3 rounded-lg flex-row items-center justify-center gap-2 ${
                      role === 'empresa' ? 'shadow-sm border' : ''
                    }`}>
                    <Building size={14} color={role === 'empresa' ? '#D97706' : '#64748B'} />
                    <Text
                      style={{
                        color: role === 'empresa' ? (isDark ? '#FFFFFF' : '#0F172A') : (isDark ? '#94A3B8' : '#64748B'),
                      }}
                      className={`font-heading text-xs ${
                        role === 'empresa' ? 'font-bold' : 'font-semibold'
                      }`}>
                      Empresa
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setRole('conductor')}
                    style={
                      role === 'conductor'
                        ? {
                            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                            borderColor: '#F59E0B',
                          }
                        : {}
                    }
                    className={`flex-1 py-2.5 px-3 rounded-lg flex-row items-center justify-center gap-2 ${
                      role === 'conductor' ? 'shadow-sm border' : ''
                    }`}>
                    <Truck size={14} color={role === 'conductor' ? '#D97706' : '#64748B'} />
                    <Text
                      style={{
                        color: role === 'conductor' ? (isDark ? '#FFFFFF' : '#0F172A') : (isDark ? '#94A3B8' : '#64748B'),
                      }}
                      className={`font-heading text-xs ${
                        role === 'conductor' ? 'font-bold' : 'font-semibold'
                      }`}>
                      Conductor
                    </Text>
                  </Pressable>
                </View>

                {/* Alerta de Error */}
                {displayedError && (
                  <View className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex-row items-center gap-2.5">
                    <AlertCircle size={16} color="#DC2626" />
                    <Text className="text-red-700 dark:text-red-300 font-sans text-xs flex-1 leading-relaxed">
                      {displayedError}
                    </Text>
                  </View>
                )}

                {/* Campo Correo Electrónico */}
                <View className="mb-4">
                  <Text
                    style={{ color: isDark ? '#E2E8F0' : '#334155' }}
                    className="font-heading font-bold text-xs uppercase tracking-wider mb-1.5">
                    Correo Electrónico Corporativo
                  </Text>
                  <View
                    style={{
                      backgroundColor: isDark ? '#0B111E' : '#F8FAFC',
                      borderColor: isDark ? '#334155' : '#CBD5E1',
                    }}
                    className="flex-row items-center border rounded-xl px-3.5 py-3">
                    <Mail size={16} color="#94A3B8" />
                    <TextInput
                      placeholder={role === 'empresa' ? 'nombre@constructora.com' : 'conductor@flotafirmeza.com'}
                      placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        if (validationError) setValidationError(null);
                      }}
                      style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                      className="flex-1 ml-3 font-sans text-sm"
                    />
                  </View>
                </View>

                {/* Campo Contraseña */}
                <View className="mb-5">
                  <Text
                    style={{ color: isDark ? '#E2E8F0' : '#334155' }}
                    className="font-heading font-bold text-xs uppercase tracking-wider mb-1.5">
                    Contraseña de Acceso
                  </Text>
                  <View
                    style={{
                      backgroundColor: isDark ? '#0B111E' : '#F8FAFC',
                      borderColor: isDark ? '#334155' : '#CBD5E1',
                    }}
                    className="flex-row items-center border rounded-xl px-3.5 py-3">
                    <Lock size={16} color="#94A3B8" />
                    <TextInput
                      placeholder="••••••••••••"
                      placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (validationError) setValidationError(null);
                      }}
                      style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                      className="flex-1 ml-3 font-sans text-sm"
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-1">
                      {showPassword ? (
                        <EyeOff size={16} color="#64748B" />
                      ) : (
                        <Eye size={16} color="#64748B" />
                      )}
                    </Pressable>
                  </View>
                </View>

                {/* Botón Principal: Ingresar al Portal */}
                <Pressable
                  onPress={handleSubmit}
                  disabled={isLoading}
                  style={({ pressed }) => ({
                    backgroundColor: isLoading
                      ? '#D97706'
                      : pressed
                      ? '#B45309'
                      : '#F59E0B',
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  })}
                  className="w-full py-3.5 px-6 rounded-full flex-row items-center justify-center gap-3 shadow-lg shadow-amber-500/30">
                  {({ pressed }) => (
                    isLoading ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <>
                        <Text
                          style={{ color: pressed ? '#FFFFFF' : '#020617' }}
                          className="font-heading font-black text-xs sm:text-sm tracking-wider uppercase">
                          INGRESAR AL PORTAL
                        </Text>
                        <ArrowRight size={16} color={pressed ? '#FFFFFF' : '#020617'} strokeWidth={2.5} />
                      </>
                    )
                  )}
                </Pressable>

                {/* Botón Rápido Demo */}
                <View className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 items-center">
                  <Pressable
                    onPress={handleFillDemo}
                    style={{ backgroundColor: isDark ? '#0B111E' : '#F1F5F9' }}
                    className="py-1 px-3 rounded-lg active:bg-slate-200 dark:active:bg-slate-800">
                    <Text style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="font-sans text-[11px]">
                      ⚡ Rellenar credenciales demo (<Text className="text-amber-600 dark:text-amber-400 font-semibold">admin@firmeza.com</Text>)
                    </Text>
                  </Pressable>
                </View>
              </>
            )}

          </View>

          {/* Tira Inferior de Seguridad */}
          <View
            style={{
              backgroundColor: isDark ? '#0B111E' : '#F8FAFC',
              borderTopColor: isDark ? '#1E293B' : '#F1F5F9',
            }}
            className="px-5 py-3 border-t flex-row items-center justify-between">
            <View className="flex-row items-center gap-1.5">
              <Fingerprint size={13} color="#D97706" />
              <Text style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="font-sans text-[10px]">Token de sesión único</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Lock size={13} color="#059669" />
              <Text style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="font-sans text-[10px]">SSL 256-bit Certificado</Text>
            </View>
          </View>

        </View>

      </View>

      {/* SECCIÓN INFERIOR: BENEFICIOS FIRMEZA */}
      <View className="mt-6 bg-[#0B111E] border-t border-slate-800 pt-6 pb-6 px-4">
        {/* Badge Central */}
        <View className="items-center -mt-9 mb-4">
          <View className="bg-slate-900 border border-brand-gold/50 px-5 py-1.5 rounded-full flex-row items-center gap-2 shadow-md">
            <Award size={14} color="#F59E0B" />
            <Text className="text-slate-200 font-heading font-black text-[10.5px] uppercase tracking-wider">
              Beneficios Firmeza
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-4">
          <View className="w-[48%] flex-row items-center gap-2.5">
            <View className="w-9 h-9 rounded-full border border-brand-gold/60 bg-brand-gold/10 items-center justify-center">
              <ShieldCheck size={16} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-[11px] text-white uppercase leading-tight">
                Seguridad{'\n'}Avanzada (JWT)
              </Text>
            </View>
          </View>

          <View className="w-[48%] flex-row items-center gap-2.5">
            <View className="w-9 h-9 rounded-full border border-brand-gold/60 bg-brand-gold/10 items-center justify-center">
              <Layers size={16} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-[11px] text-white uppercase leading-tight">
                Catálogo{'\n'}Dinámico
              </Text>
            </View>
          </View>

          <View className="w-[48%] flex-row items-center gap-2.5">
            <View className="w-9 h-9 rounded-full border border-brand-gold/60 bg-brand-gold/10 items-center justify-center">
              <FileText size={16} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-[11px] text-white uppercase leading-tight">
                Reportes{'\n'}PDF/Excel
              </Text>
            </View>
          </View>

          <View className="w-[48%] flex-row items-center gap-2.5">
            <View className="w-9 h-9 rounded-full border border-brand-gold/60 bg-brand-gold/10 items-center justify-center">
              <Settings size={16} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-[11px] text-white uppercase leading-tight">
                Gestión{'\n'}De Pedidos
              </Text>
            </View>
          </View>
        </View>

        {/* Sub-footer copyright */}
        <Text className="font-sans text-[10px] text-slate-500 text-center mt-6">
          © {new Date().getFullYear()} FIRMEZA S.A. Todos los derechos reservados.
        </Text>
      </View>

    </ScrollView>
  );
}

export default LoginScreen;
