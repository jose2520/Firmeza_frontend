import React from 'react';
import { View, Text } from 'react-native';
import { Shield, Database, FileCheck2, Settings } from 'lucide-react-native';

export function NativeBenefitsSection() {
  return (
    <View className="mt-12">
      {/* Badge Central tipo Píldora */}
      <View className="items-center -mb-4 z-20">
        <View className="bg-white dark:bg-brand-navy border-2 border-slate-200 dark:border-slate-700 px-6 py-2 rounded-full shadow-md">
          <Text className="text-brand-navy dark:text-brand-gold font-heading font-extrabold text-xs uppercase tracking-wider">
            BENEFICIOS FIRMEZA
          </Text>
        </View>
      </View>

      {/* Franja Marina con iconos vectoriales reales */}
      <View className="bg-brand-navy-dark pt-10 pb-8 px-5 border-t border-slate-800">
        <View className="flex-row flex-wrap justify-between gap-y-6">
          {/* Beneficio 1 */}
          <View className="w-[48%] flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full border-2 border-brand-gold/80 items-center justify-center bg-brand-navy-dark/60">
              <Shield size={22} color="#E5A93C" strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-xs text-white uppercase leading-tight">
                SEGURIDAD{'\n'}AVANZADA (JWT)
              </Text>
            </View>
          </View>

          {/* Beneficio 2 */}
          <View className="w-[48%] flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full border-2 border-brand-gold/80 items-center justify-center bg-brand-navy-dark/60">
              <Database size={22} color="#E5A93C" strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-xs text-white uppercase leading-tight">
                CATÁLOGO{'\n'}DINÁMICO
              </Text>
            </View>
          </View>

          {/* Beneficio 3 */}
          <View className="w-[48%] flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full border-2 border-brand-gold/80 items-center justify-center bg-brand-navy-dark/60">
              <FileCheck2 size={22} color="#E5A93C" strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-xs text-white uppercase leading-tight">
                REPORTES{'\n'}PDF/EXCEL
              </Text>
            </View>
          </View>

          {/* Beneficio 4 */}
          <View className="w-[48%] flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full border-2 border-brand-gold/80 items-center justify-center bg-brand-navy-dark/60">
              <Settings size={22} color="#E5A93C" strokeWidth={2.2} />
            </View>
            <View className="flex-1">
              <Text className="font-heading font-bold text-xs text-white uppercase leading-tight">
                GESTIÓN{'\n'}DE PEDIDOS
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default NativeBenefitsSection;
