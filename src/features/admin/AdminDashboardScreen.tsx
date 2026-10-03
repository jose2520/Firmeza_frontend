import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { 
  FileUp, Users, Database, ShieldAlert, ShoppingCart, 
  LayoutDashboard, FileSpreadsheet, LogOut, FileText
} from 'lucide-react-native';
import { AdminGuard } from '@/features/auth/components/AdminGuard';

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inicio' | 'herramientas'>('inicio');

  return (
    <AdminGuard>
      <ScrollView className="flex-1 bg-brand-bg dark:bg-brand-navy-dark">
        <View className="px-4 py-8">
          
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center gap-3">
              <ShieldAlert size={32} color="#10B981" />
              <View>
                <Text className="font-heading font-black text-2xl text-slate-900 dark:text-white uppercase">
                  Panel Admin
                </Text>
                <Text className="text-sm font-bold text-emerald-500 uppercase mt-1">
                  Rol: {user?.role || 'Administrador'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout} className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
              <LogOut size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View className="flex-row gap-2 mb-6 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
            <TouchableOpacity 
              onPress={() => setActiveTab('inicio')}
              className={`flex-1 flex-row justify-center items-center gap-2 py-2.5 rounded-lg ${activeTab === 'inicio' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
            >
              <LayoutDashboard size={16} color={activeTab === 'inicio' ? '#10B981' : '#64748B'} />
              <Text className={`font-bold text-xs uppercase ${activeTab === 'inicio' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Métricas</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('herramientas')}
              className={`flex-1 flex-row justify-center items-center gap-2 py-2.5 rounded-lg ${activeTab === 'herramientas' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
            >
              <FileUp size={16} color={activeTab === 'herramientas' ? '#10B981' : '#64748B'} />
              <Text className={`font-bold text-xs uppercase ${activeTab === 'herramientas' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Herramientas</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'inicio' ? (
            <View>
              <Text className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">Métricas Clave (KPIs)</Text>
              
              <View className="flex-row gap-3 mb-4">
                <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex-1">
                  <Database size={24} color="#3B82F6" className="mb-2" />
                  <Text className="text-xs text-slate-500 mb-1">Total Productos</Text>
                  <Text className="font-black text-2xl text-slate-900 dark:text-white">1,245</Text>
                </View>
                <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex-1">
                  <Users size={24} color="#F59E0B" className="mb-2" />
                  <Text className="text-xs text-slate-500 mb-1">Total Clientes</Text>
                  <Text className="font-black text-2xl text-slate-900 dark:text-white">892</Text>
                </View>
              </View>

              <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
                <View className="flex-row items-center justify-between">
                  <View>
                    <ShoppingCart size={24} color="#10B981" className="mb-2" />
                    <Text className="text-xs text-slate-500 mb-1">Total Ventas Registradas</Text>
                    <Text className="font-black text-2xl text-slate-900 dark:text-white">3,456</Text>
                  </View>
                  <Text className="font-bold text-emerald-500">+24%</Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">Módulos y Exportación</Text>
              
              <View className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 mb-4">
                <View className="flex-row items-center gap-3 mb-4">
                  <FileSpreadsheet size={24} color="#10B981" />
                  <Text className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    Importación EPPlus
                  </Text>
                </View>
                <Text className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Subida de archivos .xlsx para normalización y carga masiva a PostgreSQL.
                </Text>
                <TouchableOpacity className="bg-emerald-500 py-3 rounded-xl flex-row items-center justify-center gap-2 active:bg-emerald-600">
                  <FileUp size={18} color="#FFFFFF" />
                  <Text className="font-bold text-white uppercase text-xs tracking-wider">
                    Seleccionar Excel
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                <View className="flex-row items-center gap-3 mb-4">
                  <FileText size={24} color="#EF4444" />
                  <Text className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    Reportes y Recibos PDF
                  </Text>
                </View>
                <Text className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Gestor de recibos con IVA (19%) y exportación de métricas.
                </Text>
                <TouchableOpacity className="bg-red-500 py-3 rounded-xl flex-row items-center justify-center gap-2 active:bg-red-600">
                  <FileText size={18} color="#FFFFFF" />
                  <Text className="font-bold text-white uppercase text-xs tracking-wider">
                    Ver Gestor PDF
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </View>
      </ScrollView>
    </AdminGuard>
  );
}
