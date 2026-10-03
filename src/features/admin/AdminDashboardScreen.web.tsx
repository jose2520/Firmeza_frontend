import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { 
  FileUp, Users, Database, ShieldAlert,
  Menu, X, Plus, MoreVertical, LogOut, Activity, Loader2,
  TrendingUp, Download, Bell, ChevronRight, ChevronLeft, Home, DollarSign, List, Search, FileText, FileSpreadsheet
} from 'lucide-react';
import { Link } from 'expo-router';
import { AdminGuard } from '@/features/auth/components/AdminGuard';
import { adminApi, DashboardSummary, Producto, Cliente, Venta } from './services/adminApi';

type AdminTab = 'dashboard' | 'productos' | 'clientes' | 'ventas' | 'carga';

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSlim, setIsSlim] = useState(false);

  // Estados de datos
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Función para cargar datos
  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      if (activeTab === 'dashboard') {
        const data = await adminApi.getDashboardSummary();
        setSummary(data);
        const prods = await adminApi.getProductos();
        setProductos(prods);
        const clis = await adminApi.getClientes();
        setClientes(clis);
        const vents = await adminApi.getVentas();
        setVentas(vents);
      } else if (activeTab === 'productos') {
        const data = await adminApi.getProductos();
        setProductos(data);
      } else if (activeTab === 'clientes') {
        const data = await adminApi.getClientes();
        setClientes(data);
      } else if (activeTab === 'ventas') {
        const data = await adminApi.getVentas();
        setVentas(data);
      }
    } catch (error: any) {
      console.error("Error al cargar datos del backend:", error);
      let errorMsg = error.friendlyMessage || error.message || "Error desconocido";
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const details = Object.entries(validationErrors)
          .map(([field, messages]: [string, any]) => `${field}: ${messages.join(', ')}`)
          .join(' | ');
        errorMsg = `Error de validación: ${details}`;
      }
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const kpis = {
    productos: productos.length > 0 ? productos.length.toString() : (summary?.totalProductos?.toString() || "0"),
    clientes: summary?.clientesActivos?.toString() || clientes.length.toString() || "0",
    ventas: summary?.totalVentas ? `$${summary.totalVentas.toLocaleString()}` : "$0",
  };

  const SidebarItem = ({ icon: Icon, label, tab }: { icon: any, label: string, tab: AdminTab }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => { setActiveTab(tab); setSidebarOpen(false); }}
        className={`relative group flex items-center rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-brand-gold/20 to-brand-gold/5 dark:from-brand-gold/20 dark:to-transparent border border-brand-gold/30 text-brand-gold font-semibold shadow-sm scale-[1.02]' 
            : 'font-medium text-slate-600 dark:text-slate-400 hover:text-brand-gold hover:bg-slate-100 dark:hover:bg-[#151D2E] md:hover:translate-x-1'
        } ${isSlim ? 'w-12 h-12 justify-center p-0 mx-auto' : 'w-full px-3 py-2 gap-3 text-xs'}`}
      >
        <Icon className={`flex-shrink-0 transition-transform ${isActive ? 'text-brand-gold' : 'text-slate-400'} ${isSlim ? 'w-5 h-5' : 'w-4 h-4'} ${isSlim && isActive ? 'scale-110' : ''}`} />
        {!isSlim && (
          <span className="truncate whitespace-nowrap overflow-hidden transition-all duration-300 w-auto opacity-100">
            {label}
          </span>
        )}
        
        {/* Tooltip elegante para modo Slim */}
        {isSlim && (
          <div className="absolute left-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-50">
            <div className="bg-[#151D2E] text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap border border-slate-700/50 relative font-bold tracking-wide">
              {label}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-[#151D2E]" />
            </div>
          </div>
        )}
      </button>
    );
  };

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Alerta de Error */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-3 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-800 dark:text-red-300">Error de conexión</h3>
                <p className="text-xs text-red-700 dark:text-red-400 mt-1">{errorMessage}</p>
              </div>
              <button onClick={() => setErrorMessage(null)} className="text-red-500 hover:text-red-700 bg-white/50 dark:bg-black/20 p-1.5 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hero Banner adaptado a la marca Firmeza (Oscuro y Dorado) */}
          <div className="relative rounded-[32px] overflow-hidden min-h-[360px] flex flex-col justify-end p-8 border border-slate-200 dark:border-slate-800/60 shadow-xl shadow-brand-gold/5 dark:shadow-brand-gold/10 group">
            <div className="absolute inset-0 z-0 bg-[#0B111E]">
              {/* Reflejo estilo Firmeza */}
              <div className="absolute -right-32 -top-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] group-hover:bg-brand-gold/20 transition-all duration-1000" />
              <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#04080F]/90 via-[#0B111E]/80 to-transparent backdrop-blur-sm" />
            </div>
            
            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-brand-gold text-xs font-bold tracking-wide shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse ring-4 ring-brand-gold/20" />
                <span>ECOSISTEMA FIRMEZA • PANEL ADMIN</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Centro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Inteligencia</span>
              </h2>
              
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
                Monitorea en tiempo real el catálogo de materiales, registro de clientes corporativos y flujo de transacciones con <strong className="text-white">alta precisión</strong>.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 text-sm text-slate-300">
                  <Activity className="w-4 h-4 text-brand-gold" />
                  <span>Estado del API:</span>
                  <strong className="text-white">En línea</strong>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 text-sm text-slate-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Usuarios activos:</span>
                  <strong className="text-white">{kpis.clientes}</strong>
                </div>
              </div>
            </div>

            {/* Quick Actions overlay */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button onClick={loadData} disabled={isLoading} className="px-5 py-2.5 rounded-full bg-brand-gold/90 hover:bg-brand-gold backdrop-blur-md text-slate-900 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 border border-brand-gold">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                Sincronizar
              </button>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div>
            <div className="flex items-center gap-3 mb-5 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-gold to-yellow-300 text-slate-900 flex items-center justify-center text-sm shadow-lg shadow-brand-gold/20">
                ⚡
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 dark:text-white tracking-tight">Accesos Directos</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { tab: 'productos', title: 'Inventario de Materiales', desc: `Gestiona ${kpis.productos} productos`, icon: Database, color: 'brand' },
                { tab: 'clientes', title: 'Directorio de Clientes', desc: `${kpis.clientes} registrados`, icon: Users, color: 'blue' },
                { tab: 'ventas', title: 'Registro de Ventas', desc: `Total histórico: ${kpis.ventas}`, icon: DollarSign, color: 'emerald' },
                { tab: 'carga', title: 'Importación y Exportación', desc: 'Archivos Excel y PDF', icon: FileUp, color: 'purple' }
              ].map((item, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveTab(item.tab as AdminTab)}
                  className="relative p-6 rounded-[32px] bg-white dark:bg-[#0D1524] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 shadow-inner
                      ${item.color === 'brand' ? 'bg-amber-100/50 dark:bg-amber-500/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-slate-900' : 
                        item.color === 'blue' ? 'bg-blue-100/50 dark:bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white' :
                        item.color === 'emerald' ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' :
                        'bg-purple-100/50 dark:bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white'}`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                  </div>
                  <div className={`flex items-center gap-2 mt-6 text-xs font-bold transition-all duration-300
                    ${item.color === 'brand' ? 'text-brand-gold group-hover:text-yellow-600' : 
                      item.color === 'blue' ? 'text-blue-500 group-hover:text-blue-400' :
                      item.color === 'emerald' ? 'text-emerald-500 group-hover:text-emerald-400' :
                      'text-purple-500 group-hover:text-purple-400'}`}>
                    <span>Gestionar</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      );
    }

    if (activeTab === 'carga') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-[#0D1524] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 border border-slate-100 dark:border-slate-800/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Centro de Datos y Reportes</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Importación masiva de catálogos y generación de reportes operativos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {/* Card Importar Excel */}
              <div className="p-6 rounded-[24px] bg-slate-50 dark:bg-[#151D2E] border border-slate-200 dark:border-slate-700/60 hover:border-brand-gold/50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                  <FileUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Importar Catálogo (Excel)</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Sube un archivo .xlsx para actualizar masivamente los productos, precios y stock en la base de datos.</p>
                <div className="w-full relative group cursor-pointer">
                  <input type="file" accept=".xlsx, .xls" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-100/50 dark:bg-[#091522]/50 group-hover:bg-emerald-500/5 dark:group-hover:bg-emerald-500/5 group-hover:border-emerald-500/50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#151D2E] shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Seleccionar Archivo Excel</span>
                    <span className="text-[10px] text-slate-500 mt-1">Arrastra tu archivo .xlsx aquí</span>
                  </div>
                </div>
              </div>

              {/* Card Exportar PDF / Excel */}
              <div className="p-6 rounded-[24px] bg-slate-50 dark:bg-[#151D2E] border border-slate-200 dark:border-slate-700/60 hover:border-brand-gold/50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Generar Reportes</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Descarga un listado completo del inventario actual, clientes o ventas en el formato que prefieras.</p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all active:scale-95">
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-all active:scale-95">
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Tablas CRUD (Productos, Clientes, Ventas)
    const listData = activeTab === 'productos' ? productos : activeTab === 'clientes' ? clientes : ventas;
    
    return (
      <div className="bg-white dark:bg-[#0D1524] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 border border-slate-100 dark:border-slate-800/60 min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight capitalize">Módulo de {activeTab}</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Gestión y control de registros del sistema</p>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-[#151D2E] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-gold transition-colors shadow-sm font-semibold text-xs whitespace-nowrap">
              <Download className="w-4 h-4" />
              <span className="hidden xl:inline">Exportar CSV</span>
            </button>
            <button onClick={loadData} className="p-2.5 rounded-full bg-slate-100 dark:bg-[#151D2E] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-gold transition-colors shadow-sm flex-shrink-0">
              <Activity className="w-4 h-4" />
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar..." className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#151D2E] border border-slate-200 dark:border-slate-700 rounded-full text-sm w-40 sm:w-64 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all dark:text-white shadow-sm" />
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold hover:bg-yellow-500 text-slate-900 font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all active:scale-95 flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nuevo</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ID / Ref</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Detalles</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="py-16 text-center text-slate-500"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-brand-gold" /><p>Sincronizando con base de datos...</p></td></tr>
              ) : listData.length === 0 ? (
                <tr><td colSpan={4} className="py-16 text-center text-slate-500">No hay registros disponibles en este módulo.</td></tr>
              ) : (
                (listData as any[]).map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-[#151D2E]/50 transition-colors group">
                    <td className="py-4 px-4 font-bold text-sm text-slate-800 dark:text-white">
                      #{item.id || item.codigo || (1000 + idx)}
                    </td>
                    <td className="py-4 px-4 font-semibold text-sm text-slate-600 dark:text-slate-300">
                      {activeTab === 'productos' ? item.nombre : activeTab === 'clientes' ? `${item.nombres || ''} ${item.apellidos || ''}` : `Total: $${item.total}`}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                        ${item.activo !== false ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.activo !== false ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        {item.activo !== false ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#04080F] text-slate-800 dark:text-slate-200 font-sans flex flex-col md:flex-row transition-colors duration-300 pt-20 md:pt-24">
        
        {/* Header Mobile */}
        <div className="md:hidden sticky top-16 z-50 pointer-events-none p-3 flex justify-between items-start transition-all duration-300">
          <div className="pointer-events-auto flex items-center gap-3 drop-shadow-md backdrop-blur-md bg-white/90 dark:bg-[#091522]/90 p-2 pr-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-gold to-yellow-600 rounded-xl flex items-center justify-center text-[#04080F] font-black shadow-md shrink-0">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-wide uppercase text-slate-800 dark:text-white leading-tight">
                FIRMEZA
              </span>
              <span className="text-[8px] font-bold tracking-widest text-brand-gold uppercase">
                Panel Admin
              </span>
            </div>
          </div>
          <div className="pointer-events-auto flex justify-end items-center bg-white/90 dark:bg-[#091522]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full p-1.5 shadow-md transition-all">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 text-slate-500 hover:text-brand-gold transition-colors">
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sidebar Glassmorphism - Estructura de Tarjetas (Firmeza style) */}
        <aside className={`
          fixed md:sticky top-20 md:top-28 left-0 z-40 h-fit w-full md:w-auto 
          md:ml-6 flex flex-col gap-4
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          animate-in fade-in slide-in-from-bottom-8 duration-700 items-center
          ${isSlim ? 'md:w-[72px]' : 'md:w-64 items-stretch'}
          ${isSidebarOpen ? 'translate-x-0 bg-[#04080F]/95 p-4 md:bg-transparent md:p-0 h-full md:h-fit overflow-y-auto md:overflow-visible' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Card 1: Header / Monitoreo */}
          <div className={`group/card bg-white/80 dark:bg-[#091522]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-black/60 flex transition-all duration-500 w-full ${isSlim ? 'flex-col px-2 py-[9px] items-center' : 'p-3.5 items-center justify-between'}`}>
            <div className={`flex items-center ${isSlim ? 'justify-center w-full' : 'gap-3'}`}>
              <div className={`rounded-full bg-brand-gold text-[#04080F] flex items-center justify-center font-black shadow-inner relative flex-shrink-0 transition-all ${isSlim ? 'w-12 h-12 text-xl' : 'w-10 h-10'}`}>
                F
              </div>
              {!isSlim && (
                <div className="overflow-hidden transition-all duration-300 w-auto opacity-100">
                  <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight whitespace-nowrap">FIRMEZA OS</div>
                  <div className="text-[10px] text-brand-gold font-medium whitespace-nowrap">Centro Operativo</div>
                </div>
              )}
            </div>
            
            {/* Contenido modo expandido */}
            {!isSlim && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-gold text-[#04080F] tracking-wide shadow-sm animate-pulse transition-all duration-300">
                  ACTIVO
                </span>
                <button 
                  onClick={() => setIsSlim(true)}
                  className="hidden md:flex text-slate-400 hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#151D2E] flex-shrink-0 justify-center items-center"
                  title="Contraer menú"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Acordeón modo Slim (Hover para expandir) */}
            {isSlim && (
              <div className="grid transition-all duration-300 ease-in-out grid-rows-[0fr] group-hover/card:grid-rows-[1fr] opacity-0 group-hover/card:opacity-100 w-full">
                <div className="overflow-hidden flex justify-center">
                  <button 
                    onClick={() => setIsSlim(false)}
                    className="flex text-slate-400 hover:text-brand-gold transition-colors p-2 mt-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#151D2E] justify-center items-center"
                    title="Expandir menú"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Navegación Principal */}
          <nav className={`bg-white/80 dark:bg-[#091522]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-black/60 flex flex-col transition-all duration-500 flex-1 md:flex-none w-full ${isSlim ? 'p-2 rounded-[36px] gap-6' : 'px-3.5 pb-3.5 pt-6 rounded-[40px] gap-6'}`}>
            <div className={`space-y-4 ${isSlim ? 'flex flex-col items-center' : ''}`}>
              <div className="w-full">
                <SidebarItem icon={Home} label="Resumen Operativo" tab="dashboard" />
              </div>
              
              <div className="w-full">
                {!isSlim ? (
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 transition-all duration-300">
                    MÓDULOS
                  </p>
                ) : (
                  <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 mx-auto mb-3" />
                )}
                <div className={`space-y-1 ${isSlim ? 'flex flex-col items-center' : ''}`}>
                  <SidebarItem icon={Database} label="Catálogo de Productos" tab="productos" />
                  <SidebarItem icon={Users} label="Gestión de Clientes" tab="clientes" />
                  <SidebarItem icon={DollarSign} label="Monitor de Ventas" tab="ventas" />
                </div>
              </div>

              <div className="w-full">
                {!isSlim ? (
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 transition-all duration-300">
                    HERRAMIENTAS
                  </p>
                ) : (
                  <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 mx-auto mb-3" />
                )}
                <div className={`space-y-1 ${isSlim ? 'flex flex-col items-center' : ''}`}>
                  <SidebarItem icon={FileUp} label="Centro de Datos" tab="carga" />
                </div>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className={`mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 w-full ${isSlim ? 'flex flex-col items-center gap-3' : ''}`}>
              {!isSlim && (
                <div className="flex items-center gap-3 px-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#151D2E] flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0">
                    {user?.name ? user.name.slice(0,2).toUpperCase() : 'AD'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user?.name || 'Administrador'}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{user?.role}</p>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => logout()}
                className={`group relative flex items-center justify-center rounded-full text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all ${isSlim ? 'w-12 h-12 p-0' : 'w-full gap-3 px-3 py-2 text-xs font-medium justify-start'}`}
              >
                <LogOut className={`flex-shrink-0 ${isSlim ? 'w-5 h-5' : 'w-4 h-4'}`} />
                {!isSlim && (
                  <span className="overflow-hidden transition-all duration-300 whitespace-nowrap w-auto opacity-100">
                    Cerrar Sesión
                  </span>
                )}
                
                {/* Tooltip elegante de Logout para modo Slim */}
                {isSlim && (
                  <div className="absolute left-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-50">
                    <div className="bg-red-500 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap relative font-bold tracking-wide">
                      Cerrar Sesión
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-red-500" />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Overlay Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 md:px-8 py-6 px-4 max-w-[1600px] mx-auto w-full">
          {/* Top Navbar */}
          <header className="hidden md:flex items-start justify-between mb-8 pointer-events-none animate-in fade-in slide-in-from-top-8 duration-700">
            <div className="pointer-events-auto flex items-center gap-4 bg-white/90 dark:bg-[#091522]/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/50 shadow-md transition-all hover:shadow-lg">
              <span className="text-brand-gold font-bold text-xs uppercase tracking-wider">{activeTab}</span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold text-xs">Comercializadora Firmeza</span>
            </div>
            <div className="pointer-events-auto flex items-center gap-3 bg-white/90 dark:bg-[#091522]/90 backdrop-blur-md pl-2 pr-2 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/50 shadow-md transition-all hover:shadow-lg">
              <button className="p-2 text-slate-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-all">
                <Bell className="w-4 h-4" />
              </button>
              <Link href="/" className="px-4 py-1.5 rounded-full bg-[#151D2E] border border-slate-700/50 hover:border-brand-gold/50 text-white text-xs font-bold shadow-md transition-all">
                Ir al Portal Público
              </Link>
            </div>
          </header>

          <div className="flex-1 w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
