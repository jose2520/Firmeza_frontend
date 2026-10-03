import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import {
  Search,
  Package,
  Truck,
  Layers,
  Wrench,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react-native';
import { BottomTabInset, Spacing } from '@/constants/theme';

const CATEGORIES = [
  { id: '1', name: 'Materiales Básicos', icon: Layers, count: '48 items' },
  { id: '2', name: 'Maquinaria Pesada', icon: Truck, count: '16 unidades' },
  { id: '3', name: 'Acero & Estructura', icon: Package, count: '32 items' },
  { id: '4', name: 'Ferretería & Equipos', icon: Wrench, count: '95 items' },
];

export default function ExploreScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState('');

  const cardBg = isDark ? '#091522' : '#FFFFFF';
  const cardBorder = isDark ? '#1E293B' : '#E2E8F0';
  const textColor = isDark ? '#FFFFFF' : '#091522';
  const textSubColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <ScrollView
      style={{ backgroundColor: isDark ? '#060E18' : '#F8FAFC' }}
      className="flex-1"
      contentContainerStyle={{
        paddingTop: Platform.OS === 'web' ? 100 : Math.max(insets.top, 20) + 12,
        paddingBottom: BottomTabInset + Spacing.six,
        paddingHorizontal: 20,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      }}
      showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View className="mb-6">
        <Text className="text-brand-gold font-heading font-extrabold text-xs tracking-widest uppercase mb-1">
          FIRMEZA · CATÁLOGO COMERCIAL
        </Text>
        <Text
          style={{ color: textColor }}
          className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight">
          PRODUCTOS & SERVICIOS
        </Text>
        <Text style={{ color: textSubColor }} className="font-sans text-xs sm:text-sm mt-1 leading-relaxed">
          Consulta nuestro stock disponible, cotiza materiales y solicita alquiler de maquinaria en tiempo real.
        </Text>
      </View>

      {/* Buscador */}
      <View
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        className="flex-row items-center border rounded-2xl px-4 py-3 mb-8 shadow-sm">
        <Search size={18} color="#E5A93C" strokeWidth={2.2} />
        <TextInput
          placeholder="Buscar cemento, arena, volqueta, excavadora..."
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{ color: textColor }}
          className="flex-1 ml-3 font-sans text-sm outline-none"
        />
      </View>

      {/* Categorías Principales */}
      <View className="mb-8">
        <Text
          style={{ color: textColor }}
          className="font-heading font-bold text-sm tracking-wider uppercase mb-4">
          Líneas de Negocio
        </Text>
        
        <View className="flex-row flex-wrap gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Pressable
                key={cat.id}
                style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                className="flex-1 min-w-[140px] p-4 rounded-2xl border shadow-sm active:border-brand-gold">
                <View className="w-10 h-10 rounded-xl bg-brand-gold/15 items-center justify-center mb-3">
                  <Icon size={20} color="#E5A93C" strokeWidth={2.2} />
                </View>
                <Text
                  style={{ color: textColor }}
                  className="font-heading font-bold text-xs uppercase leading-tight">
                  {cat.name}
                </Text>
                <Text style={{ color: textSubColor }} className="font-sans text-[11px] mt-1">
                  {cat.count}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Banner Informativo de Conexión a la API */}
      <View
        style={{ backgroundColor: isDark ? '#0B1726' : '#EFF6FF', borderColor: isDark ? '#1E293B' : '#BFDBFE' }}
        className="p-5 rounded-2xl border flex-row items-start gap-3.5 shadow-sm">
        <View className="w-8 h-8 rounded-full bg-brand-gold/20 items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert size={16} color="#E5A93C" strokeWidth={2.5} />
        </View>
        <View className="flex-1">
          <Text
            style={{ color: textColor }}
            className="font-heading font-bold text-xs tracking-wider uppercase">
            Módulo en Sincronización
          </Text>
          <Text style={{ color: textSubColor }} className="font-sans text-xs mt-1 leading-relaxed">
            El catálogo interactivo se está integrando directamente con la API de Firmeza (.NET 10). Próximamente podrás filtrar por disponibilidad, precios con IVA y agregar al carrito.
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}
