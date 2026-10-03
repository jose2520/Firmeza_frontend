import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { BookOpen, ChevronRight, FileText } from 'lucide-react-native';

const heroImage = require('@/assets/images/landing/hero.jpg');

interface NativeHeroSectionProps {
  topPadding: number;
}

export function NativeHeroSection({ topPadding }: NativeHeroSectionProps) {
  return (
    <View className="relative min-h-[480px] bg-brand-navy overflow-hidden justify-end">
      {/* Imagen de fondo de maquinaria pesada */}
      <Image
        source={heroImage}
        contentFit="cover"
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
        className="absolute inset-0 w-full h-full"
      />

      {/* Capas de oscurecimiento cinematográfico para legibilidad */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(9, 21, 34, 0.62)' },
        ]}
      />

      {/* Contenido del Hero */}
      <View style={{ paddingTop: topPadding }} className="p-6 pb-16 z-10">
        <Text className="text-brand-gold font-heading font-extrabold text-sm tracking-widest uppercase mb-2">
          FIRMEZA:
        </Text>

        <Text className="font-heading font-black text-2xl sm:text-3xl text-white uppercase leading-tight mb-3">
          TU SOCIO CONFIABLE EN MATERIALES Y VEHÍCULOS DE CONSTRUCCIÓN.
        </Text>

        <Text className="font-sans text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
          Optimizamos tus proyectos con nuestra plataforma líder en gestión de inventario, alquiler de maquinaria y distribución eficiente.
        </Text>

        <View className="flex-row flex-wrap items-center gap-3">
          <Link href="/explore" asChild>
            <Pressable className="bg-brand-gold active:bg-brand-gold-hover py-3.5 px-5 rounded-full flex-row items-center gap-2 shadow-lg shadow-brand-gold/25">
              <BookOpen size={15} color="#091522" strokeWidth={2.5} />
              <Text className="text-brand-navy font-heading font-bold text-xs tracking-wider uppercase">
                EXPLORAR CATÁLOGO
              </Text>
              <ChevronRight size={15} color="#091522" strokeWidth={3} />
            </Pressable>
          </Link>

          <Link href="/explore" asChild>
            <Pressable className="bg-brand-navy/80 border border-slate-500 py-3.5 px-5 rounded-full flex-row items-center gap-2">
              <FileText size={15} color="#FFFFFF" strokeWidth={2} />
              <Text className="text-white font-heading font-bold text-xs tracking-wider uppercase">
                SOLICITAR COTIZACIÓN
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default NativeHeroSection;
