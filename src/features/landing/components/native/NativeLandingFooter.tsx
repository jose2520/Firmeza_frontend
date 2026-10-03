import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import {
  ChevronRight,
  User,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react-native';

export function NativeLandingFooter() {
  return (
    <View className="bg-[#050C14] px-5 pt-10 pb-8 border-t border-slate-900 gap-6">
      {/* Brand & Slogan */}
      <View className="items-center">
        <Text className="font-heading font-black text-xl text-white tracking-tight">
          FIRMEZA
        </Text>
        <Text className="text-[10px] font-bold tracking-[0.2em] text-brand-gold uppercase mt-0.5">
          TU SOCIO EN CONSTRUCCIÓN
        </Text>
        <Text className="font-sans text-xs text-slate-400 text-center mt-2 max-w-xs leading-relaxed">
          Distribución de materiales, alquiler de maquinaria y soluciones logísticas para proyectos de construcción.
        </Text>
      </View>

      {/* Portales de Acceso */}
      <View className="gap-2.5">
        <Link href="/login" asChild>
          <Pressable className="flex-row items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 active:border-brand-gold/60">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-brand-gold/15 items-center justify-center">
                <User size={16} color="#E5A93C" strokeWidth={2.2} />
              </View>
              <View>
                <Text className="font-heading font-bold text-xs text-white">Portal de Clientes</Text>
                <Text className="font-sans text-[11px] text-slate-400">Compras, cotizaciones y pedidos</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#E5A93C" strokeWidth={2.5} />
          </Pressable>
        </Link>

        <Link href="/login" asChild>
          <Pressable className="flex-row items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 active:border-brand-gold/60">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-brand-gold/15 items-center justify-center">
                <ShieldCheck size={16} color="#E5A93C" strokeWidth={2.2} />
              </View>
              <View>
                <Text className="font-heading font-bold text-xs text-white">Acceso Empleados / Admin</Text>
                <Text className="font-sans text-[11px] text-slate-400">Panel comercial, inventario y caja</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#E5A93C" strokeWidth={2.5} />
          </Pressable>
        </Link>
      </View>

      {/* Contacto Directo */}
      <View className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 gap-2.5">
        <View className="flex-row items-center gap-2">
          <Phone size={14} color="#E5A93C" />
          <Text className="font-sans text-xs text-slate-300">PBX: +57 (601) 745-9000 · Cel: 310 890 1234</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Mail size={14} color="#E5A93C" />
          <Text className="font-sans text-xs text-slate-300">contacto@firmeza.com.co</Text>
        </View>
        <View className="flex-row items-start gap-2">
          <MapPin size={14} color="#E5A93C" style={{ marginTop: 2 }} />
          <Text className="font-sans text-xs text-slate-300 flex-1">Calle 17 # 68-40, Zona Industrial, Bogotá D.C.</Text>
        </View>
      </View>

      {/* Copyright y Redes */}
      <View className="border-t border-slate-800/60 pt-4 items-center gap-2">
        <Text className="font-sans text-[11px] text-slate-400 text-center">
          © {new Date().getFullYear()} FIRMEZA S.A. · NIT: 901.452.883-7
        </Text>
        <Text className="font-sans text-[10px] text-slate-500 text-center">
          Seguridad JWT · Facturación Electrónica DIAN
        </Text>
      </View>
    </View>
  );
}

export default NativeLandingFooter;
