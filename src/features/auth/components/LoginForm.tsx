import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react-native';
import { LoginDto } from '../types/auth.types';

interface LoginFormProps {
  onSubmit: (credentials: LoginDto) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
  isDark: boolean;
}

export function LoginForm({
  onSubmit,
  isLoading,
  error,
  onClearError,
  isDark,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const textColor = isDark ? '#FFFFFF' : '#091522';
  const textSubColor = isDark ? '#94A3B8' : '#64748B';
  const inputBg = isDark ? '#060E18' : '#F8FAFC';
  const inputBorder = isDark ? '#1E293B' : '#E2E8F0';

  const handleSubmit = async () => {
    setValidationError(null);
    onClearError();

    if (!email.trim()) {
      setValidationError('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (!password.trim()) {
      setValidationError('Por favor ingresa tu contraseña.');
      return;
    }

    try {
      await onSubmit({ email: email.trim(), password });
    } catch {
      // El error se maneja en el hook y se pasa por props
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@firmeza.com');
    setPassword('Admin123*');
    setValidationError(null);
    onClearError();
  };

  const displayedError = validationError || error;

  return (
    <View className="w-full">
      {/* Alerta de Error */}
      {displayedError && (
        <View className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex-row items-center gap-2.5">
          <AlertCircle size={18} color="#EF4444" strokeWidth={2.2} />
          <Text className="text-red-500 font-sans text-xs flex-1 leading-relaxed">
            {displayedError}
          </Text>
        </View>
      )}

      {/* Campo: Correo Electrónico */}
      <View className="mb-4">
        <Text
          style={{ color: textColor }}
          className="font-heading font-bold text-xs uppercase tracking-wider mb-2">
          Correo Electrónico
        </Text>
        <View
          style={{ backgroundColor: inputBg, borderColor: inputBorder }}
          className="flex-row items-center border rounded-xl px-3.5 py-3 focus:border-brand-gold">
          <Mail size={18} color={isDark ? '#E5A93C' : '#64748B'} strokeWidth={2} />
          <TextInput
            placeholder="ejemplo@firmeza.com"
            placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (validationError) setValidationError(null);
            }}
            style={{ color: textColor }}
            className="flex-1 ml-3 font-sans text-sm outline-none"
          />
        </View>
      </View>

      {/* Campo: Contraseña */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text
            style={{ color: textColor }}
            className="font-heading font-bold text-xs uppercase tracking-wider">
            Contraseña
          </Text>
        </View>
        <View
          style={{ backgroundColor: inputBg, borderColor: inputBorder }}
          className="flex-row items-center border rounded-xl px-3.5 py-3 focus:border-brand-gold">
          <Lock size={18} color={isDark ? '#E5A93C' : '#64748B'} strokeWidth={2} />
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (validationError) setValidationError(null);
            }}
            style={{ color: textColor }}
            className="flex-1 ml-3 font-sans text-sm outline-none"
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            className="p-1">
            {showPassword ? (
              <EyeOff size={18} color={isDark ? '#CBD5E1' : '#64748B'} />
            ) : (
              <Eye size={18} color={isDark ? '#CBD5E1' : '#64748B'} />
            )}
          </Pressable>
        </View>
      </View>

      {/* Botón Principal: Iniciar Sesión */}
      <Pressable
        onPress={handleSubmit}
        disabled={isLoading}
        className={`w-full py-3.5 px-6 rounded-full flex-row items-center justify-center gap-2 shadow-lg transition-all ${
          isLoading
            ? 'bg-brand-gold/60'
            : 'bg-brand-gold active:bg-brand-gold-hover shadow-brand-gold/25'
        }`}>
        {isLoading ? (
          <ActivityIndicator color="#091522" size="small" />
        ) : (
          <>
            <Text className="text-brand-navy font-heading font-black text-xs sm:text-sm tracking-wider uppercase">
              INICIAR SESIÓN
            </Text>
            <ArrowRight size={16} color="#091522" strokeWidth={2.5} />
          </>
        )}
      </Pressable>

      {/* Botón de Relleno Rápido de Demo */}
      <View className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 items-center">
        <Pressable
          onPress={handleFillDemo}
          className="py-1 px-3 rounded-lg bg-slate-100 dark:bg-slate-800/80 active:bg-slate-200">
          <Text style={{ color: textSubColor }} className="font-sans text-[11px]">
            ⚡ Rellenar credenciales de prueba (<Text className="text-brand-gold font-semibold">admin@firmeza.com</Text>)
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginForm;
