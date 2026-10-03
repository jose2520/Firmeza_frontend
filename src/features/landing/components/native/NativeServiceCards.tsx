import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ArrowRight, ShieldCheck } from 'lucide-react-native';

const materialsImage = require('@/assets/images/landing/materials.jpg');
const vehiclesImage = require('@/assets/images/landing/vehicles.jpg');
const digitalImage = require('@/assets/images/landing/digital.jpg');
const solutionsImage = require('@/assets/images/landing/solutions.jpg');

interface NativeServiceCardsProps {
  isDark: boolean;
}

export function NativeServiceCards({ isDark }: NativeServiceCardsProps) {
  const cardBg = isDark ? '#091522' : '#FFFFFF';
  const cardBorder = isDark ? '#1E293B' : '#E2E8F0';
  const textColor = isDark ? '#FFFFFF' : '#091522';
  const textSubColor = isDark ? '#CBD5E1' : '#64748B';

  return (
    <View className="px-4 -mt-8 z-20 gap-5">
      {/* Card 1: Venta de Materiales */}
      <View
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        className="rounded-2xl shadow-xl border overflow-hidden">
        <Image
          source={materialsImage}
          contentFit="cover"
          style={{ width: '100%', height: 180 }}
          className="w-full h-44"
        />
        <View className="p-5">
          <View className="flex-row items-center justify-between mb-2">
            <Text
              style={{ color: textColor }}
              className="font-heading font-black text-sm uppercase">
              VENTA DE MATERIALES
            </Text>
            <View className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
          </View>
          <Text
            style={{ color: textSubColor }}
            className="font-sans text-xs leading-relaxed mb-4">
            Agregado de arena / cemento, materiales, agregas rendimiento y asistencia eficiente.
          </Text>
          <View className="flex-row justify-end">
            <Link href="/explore" asChild>
              <Pressable className="w-8 h-8 rounded-full bg-brand-gold active:bg-brand-gold-hover items-center justify-center shadow-md">
                <ArrowRight size={16} color="#091522" strokeWidth={2.5} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Card 2: Alquiler de Vehículos */}
      <View
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        className="rounded-2xl shadow-xl border overflow-hidden">
        <Image
          source={vehiclesImage}
          contentFit="cover"
          style={{ width: '100%', height: 180 }}
          className="w-full h-44"
        />
        <View className="p-5">
          <View className="flex-row items-center justify-between mb-2">
            <Text
              style={{ color: textColor }}
              className="font-heading font-black text-sm uppercase">
              ALQUILER DE VEHÍCULOS
            </Text>
            <View className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
          </View>
          <Text
            style={{ color: textSubColor }}
            className="font-sans text-xs leading-relaxed mb-4">
            Alquileres heavy duty, flotas de vehículos, amplia gama de maquinaria para construcción y proyectos viales.
          </Text>
          <View className="flex-row justify-end">
            <Link href="/explore" asChild>
              <Pressable className="w-8 h-8 rounded-full bg-brand-navy dark:bg-slate-800 active:bg-brand-gold items-center justify-center shadow-md">
                <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Card 3: Plataforma Digital Moderna */}
      <View
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        className="rounded-2xl shadow-xl border overflow-hidden">
        <View className="relative w-full h-44 bg-brand-navy-dark overflow-hidden">
          <Image
            source={digitalImage}
            contentFit="cover"
            style={{ width: '100%', height: 180 }}
            className="w-full h-full opacity-85"
          />
          {/* Badges de Seguridad JWT y PDF */}
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(9, 21, 34, 0.4)' },
            ]}
            className="flex-row items-center justify-center gap-3">
            <View className="w-10 h-10 rounded-full bg-brand-navy border-2 border-brand-gold items-center justify-center shadow-lg">
              <ShieldCheck size={20} color="#E5A93C" strokeWidth={2.2} />
            </View>
            <View className="bg-white/95 dark:bg-slate-800 rounded px-2.5 py-1 shadow border border-transparent dark:border-slate-700">
              <Text className="text-[10px] font-bold text-red-500">PDF</Text>
            </View>
          </View>
        </View>
        <View className="p-5">
          <View className="flex-row items-center justify-between mb-2">
            <Text
              style={{ color: textColor }}
              className="font-heading font-black text-sm uppercase">
              PLATAFORMA DIGITAL MODERNA
            </Text>
            <View className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
          </View>
          <Text
            style={{ color: textSubColor }}
            className="font-sans text-xs leading-relaxed mb-4">
            Clean Architecture, acceso seguro JWT, reportes automáticos en PDF y Excel para un control milimétrico.
          </Text>
          <View className="flex-row justify-end">
            <Link href="/explore" asChild>
              <Pressable className="w-8 h-8 rounded-full bg-brand-navy dark:bg-slate-800 active:bg-brand-gold items-center justify-center shadow-md">
                <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Card 4: Soluciones Integrales */}
      <View
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        className="rounded-2xl shadow-xl border overflow-hidden">
        <Image
          source={solutionsImage}
          contentFit="cover"
          style={{ width: '100%', height: 180 }}
          className="w-full h-44"
        />
        <View className="p-5">
          <View className="flex-row items-center justify-between mb-2">
            <Text
              style={{ color: textColor }}
              className="font-heading font-black text-sm uppercase">
              SOLUCIONES INTEGRALES
            </Text>
            <View className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
          </View>
          <Text
            style={{ color: textSubColor }}
            className="font-sans text-xs leading-relaxed mb-4">
            Te acompañamos en cada etapa de tu proyecto con servicio, tecnología y el respaldo de nuestra sólida experiencia.
          </Text>
          <View className="flex-row justify-end">
            <Link href="/explore" asChild>
              <Pressable className="w-8 h-8 rounded-full bg-brand-navy dark:bg-slate-800 active:bg-brand-gold items-center justify-center shadow-md">
                <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

export default NativeServiceCards;
