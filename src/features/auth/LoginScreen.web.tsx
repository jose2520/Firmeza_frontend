import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
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
  FileSignature,
  Fingerprint,
  Award,
  Layers,
  FileText,
  Settings,
  AlertCircle,
  LogOut,
  User,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from './hooks/useAuth';

export function LoginScreenWeb() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const { user, isAuthenticated, isLoading, error, login, logout, clearError } = useAuth();

  const [role, setRole] = useState<'empresa' | 'conductor'>('empresa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setSuccessMessage(`¡Bienvenido, ${response.usuario.name || response.usuario.email}!`);
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
    <div className="w-full min-h-full flex-1 bg-[#0B111E] text-slate-100 flex flex-col justify-between selection:bg-[#F59E0B] selection:text-[#0B111E] antialiased">
      {/* Estilos CSS con triple garantía de Modo Claro / Modo Oscuro */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .bg-portal-hero {
            background-image: linear-gradient(180deg, rgba(11, 17, 30, 0.84) 0%, rgba(11, 17, 30, 0.65) 40%, rgba(11, 17, 30, 0.92) 85%, #0B111E 100%),
                              url('/images/landing/hero.jpg');
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
          }
          .badge-icon-border-direct {
            background: radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.02) 70%);
            border: 1.5px solid rgba(245, 158, 11, 0.6);
          }
          .shadow-glow-gold-direct {
            box-shadow: 0 0 25px -4px rgba(245, 158, 11, 0.45);
          }
          .shadow-card-elevated-direct {
            box-shadow: 0 25px 50px -12px rgba(7, 12, 21, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
          }
          .btn-login-cta {
            background-color: #F59E0B;
            color: #020617;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .btn-login-cta:hover {
            background-color: #FBBF24;
            color: #020617;
            transform: translateY(-2px);
            box-shadow: 0 0 25px -4px rgba(245, 158, 11, 0.55);
          }
          .btn-login-cta:active {
            background-color: #B45309 !important;
            color: #FFFFFF !important;
            transform: scale(0.97) translateY(0px) !important;
            box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.45) !important;
          }
          .btn-login-cta:active * {
            color: #FFFFFF !important;
            stroke: #FFFFFF !important;
          }

          /* Reglas CSS directas cuando documentElement o body tienen la clase 'dark' */
          html.dark .card-login-portal,
          body.dark .card-login-portal,
          .dark .card-login-portal {
            background-color: #151D2E !important;
            border-color: rgba(51, 65, 85, 0.8) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
          }
          html.dark .card-login-portal h2,
          body.dark .card-login-portal h2,
          .dark .card-login-portal h2 {
            color: #FFFFFF !important;
          }
          html.dark .desc-login,
          body.dark .desc-login,
          .dark .desc-login {
            color: #94A3B8 !important;
          }
          html.dark .portal-tag-badge,
          body.dark .portal-tag-badge,
          .dark .portal-tag-badge {
            background-color: rgba(120, 53, 15, 0.35) !important;
            border-color: rgba(180, 83, 9, 0.6) !important;
            color: #FCD34D !important;
          }
          html.dark .label-login,
          body.dark .label-login,
          .dark .label-login {
            color: #E2E8F0 !important;
          }
          html.dark .input-login-field,
          body.dark .input-login-field,
          .dark .input-login-field {
            background-color: #0B111E !important;
            border-color: #334155 !important;
            color: #FFFFFF !important;
          }
          html.dark .input-login-field::placeholder,
          body.dark .input-login-field::placeholder,
          .dark .input-login-field::placeholder {
            color: #64748B !important;
          }
          html.dark .role-tabs-container,
          body.dark .role-tabs-container,
          .dark .role-tabs-container {
            background-color: #0B111E !important;
            border-color: #334155 !important;
          }
          html.dark .btn-role-active,
          body.dark .btn-role-active,
          .dark .btn-role-active {
            background-color: #1E293B !important;
            color: #FFFFFF !important;
            border-color: #F59E0B !important;
          }
          html.dark .btn-role-inactive,
          body.dark .btn-role-inactive,
          .dark .btn-role-inactive {
            color: #94A3B8 !important;
          }
          html.dark .sso-btn,
          body.dark .sso-btn,
          .dark .sso-btn {
            background-color: #0B111E !important;
            border-color: #334155 !important;
            color: #E2E8F0 !important;
          }
          html.dark .sso-btn:hover,
          body.dark .sso-btn:hover,
          .dark .sso-btn:hover {
            background-color: #1E293B !important;
          }
          html.dark .sso-divider-line,
          body.dark .sso-divider-line,
          .dark .sso-divider-line {
            border-color: #334155 !important;
          }
          html.dark .sso-divider-text,
          body.dark .sso-divider-text,
          .dark .sso-divider-text {
            background-color: #151D2E !important;
            color: #94A3B8 !important;
          }
          html.dark .login-bottom-strip,
          body.dark .login-bottom-strip,
          .dark .login-bottom-strip {
            background-color: #0B111E !important;
            border-color: #1E293B !important;
            color: #94A3B8 !important;
          }
          html.dark .reg-note-border,
          body.dark .reg-note-border,
          .dark .reg-note-border {
            border-color: #1E293B !important;
          }
        `,
        }}
      />

      {/* 1. SECCIÓN PRINCIPAL: HERO & PORTAL DE LOGIN */}
      <main className="w-full flex items-center justify-center bg-portal-hero relative px-4 pt-28 pb-14 sm:pt-32 sm:pb-16">
        {/* Borde superior dorado luminoso */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-80" />

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* COLUMNA IZQUIERDA: PROPUESTA DE VALOR (Desktop) */}
          <div className="lg:col-span-6 space-y-5 text-left hidden lg:block pr-4">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-[#F59E0B]/40 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                Acceso Seguro Verificado JWT
              </span>
            </div>

            {/* Titular Principal idéntico a codelogi.html */}
            <h1 className="text-3xl xl:text-4xl font-black text-white leading-tight uppercase tracking-tight">
              <span className="text-[#F59E0B] block">FIRMEZA:</span>
              Tu socio confiable en materiales y vehículos de construcción.
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Optimizamos tus proyectos de gran escala con nuestra plataforma líder en gestión de despachos,
              cubicación de áridos, alquiler de maquinaria pesada y facturación electrónica centralizada.
            </p>

            {/* Puntos de Beneficio con Check Dorado */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-xs border border-[#F59E0B]/40 shrink-0 font-bold">
                  ✓
                </span>
                <span>Monitoreo en tiempo real de despacho con telemetría GPS</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-xs border border-[#F59E0B]/40 shrink-0 font-bold">
                  ✓
                </span>
                <span>Descarga instantánea de informes de pesaje y remisiones en PDF/Excel</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] text-xs border border-[#F59E0B]/40 shrink-0 font-bold">
                  ✓
                </span>
                <span>Líneas de crédito empresarial y cotizaciones inmediatas</span>
              </div>
            </div>

            {/* Badge de Seguridad Clean Architecture */}
            <div className="pt-2 flex items-center">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 bg-[#0B111E]/70 px-3.5 py-2 rounded-xl border border-slate-700/60 backdrop-blur-sm">
                <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Cifrado TLS 1.3 con arquitectura Clean Architecture</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: TARJETA ELEVADA DE LOGIN CON ADAPTACIÓN CLARO / OSCURO */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className={`card-login-portal rounded-3xl shadow-card-elevated-direct border overflow-hidden transform transition-all duration-300 ${
              isDark
                ? 'bg-[#151D2E] border-slate-700/80 shadow-2xl shadow-black/50'
                : 'bg-white border-slate-200/90'
            }`}>
              
              {/* Barra superior con gradiente dorado ámbar */}
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

              <div className="p-6 sm:p-7">
                {/* Header de la Tarjeta */}
                <div className="text-left mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`portal-tag-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${
                      isDark
                        ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      <HardHat className="w-3 h-3 text-[#D97706]" />
                      <span>Portal Oficial</span>
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">v2.4.0</span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Portal de Clientes y Contratistas
                  </h2>
                  <p className={`desc-login text-xs mt-1 leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    Ingresa con tus credenciales maestras para gestionar despacho de materiales, cubicación y alquiler de maquinaria.
                  </p>
                </div>

                {/* Si ya está autenticado */}
                {isAuthenticated && user ? (
                  <div className="py-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className={`font-black text-base uppercase mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Sesión Activa
                    </h3>
                    <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Conectado como:</p>
                    <div className={`inline-flex items-center gap-2 mb-5 px-3.5 py-1 rounded-full text-amber-700 dark:text-amber-300 font-bold text-xs ${
                      isDark ? 'bg-slate-800' : 'bg-slate-100'
                    }`}>
                      <User className="w-3.5 h-3.5" />
                      <span>{user.email} {user.role ? `(${user.role})` : ''}</span>
                    </div>

                    {successMessage && (
                      <p className="text-emerald-500 dark:text-emerald-400 text-xs font-semibold mb-3">{successMessage}</p>
                    )}

                    <div className="space-y-2.5">
                      {user.role === 'Admin' && (
                        <Link
                          href="/admin"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 transition-all cursor-pointer">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Ir al Panel de Administración</span>
                        </Link>
                      )}
                      <Link
                        href="/explore"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#F59E0B] hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all cursor-pointer">
                        <span>Ir al Catálogo de Productos</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full border text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          isDark
                            ? 'border-slate-700 hover:bg-red-950/30'
                            : 'border-slate-300 hover:bg-red-50'
                        }`}>
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Selector de Rol interactivo */}
                    <div className={`role-tabs-container grid grid-cols-2 p-1 rounded-xl mb-4 border ${
                      isDark
                        ? 'bg-[#0B111E] border-slate-700/60'
                        : 'bg-slate-100 border-slate-200/80'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setRole('empresa')}
                        aria-pressed={role === 'empresa'}
                        className={`py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                          role === 'empresa'
                            ? `btn-role-active ${
                                isDark
                                  ? 'bg-[#1E293B] text-white shadow-sm border border-amber-400 font-bold'
                                  : 'bg-white text-slate-900 shadow-sm border border-amber-400 font-bold'
                              }`
                            : `btn-role-inactive ${
                                isDark
                                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50 font-semibold'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-semibold'
                              }`
                        }`}>
                        <Building className={`w-3.5 h-3.5 ${role === 'empresa' ? 'text-[#D97706]' : 'text-slate-400'}`} />
                        <span>Empresa / Contratista</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('conductor')}
                        aria-pressed={role === 'conductor'}
                        className={`py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                          role === 'conductor'
                            ? `btn-role-active ${
                                isDark
                                  ? 'bg-[#1E293B] text-white shadow-sm border border-amber-400 font-bold'
                                  : 'bg-white text-slate-900 shadow-sm border border-amber-400 font-bold'
                              }`
                            : `btn-role-inactive ${
                                isDark
                                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50 font-semibold'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-semibold'
                              }`
                        }`}>
                        <Truck className={`w-3.5 h-3.5 ${role === 'conductor' ? 'text-[#D97706]' : 'text-slate-400'}`} />
                        <span>Conductor / Flota</span>
                      </button>
                    </div>

                    {/* Alerta de Error */}
                    {displayedError && (
                      <div className="mb-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-center gap-2 text-left">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                        <span className="text-red-700 dark:text-red-300 text-xs font-medium leading-tight">
                          {displayedError}
                        </span>
                      </div>
                    )}

                    {/* Formulario de Login */}
                    <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                      {/* Correo Electrónico */}
                      <div className="space-y-1">
                        <label
                          className={`label-login block text-[11px] font-bold uppercase tracking-wider ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                          htmlFor="corporate-email">
                          Correo Electrónico Corporativo
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            id="corporate-email"
                            name="email"
                            type="email"
                            required
                            placeholder={role === 'empresa' ? 'nombre@constructora.com' : 'conductor@flotafirmeza.com'}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (validationError) setValidationError(null);
                            }}
                            className={`input-login-field block w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm placeholder-slate-400 transition-all font-medium border focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                              isDark
                                ? 'bg-[#0B111E] border-slate-700 text-white placeholder-slate-500 focus:bg-[#0B111E]'
                                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Contraseña */}
                      <div className="space-y-1">
                        <label
                          className={`label-login block text-[11px] font-bold uppercase tracking-wider ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                          htmlFor="corporate-password">
                          Contraseña de Acceso
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            id="corporate-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (validationError) setValidationError(null);
                            }}
                            className={`input-login-field block w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm placeholder-slate-400 transition-all font-medium border focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                              isDark
                                ? 'bg-[#0B111E] border-slate-700 text-white placeholder-slate-500 focus:bg-[#0B111E]'
                                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Mostrar u ocultar contraseña"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Recordar en este equipo & ¿Olvidaste tu contraseña? */}
                      <div className="flex items-center justify-between pt-0.5 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-3.5 h-3.5 text-amber-500 border-slate-300 rounded focus:ring-amber-400 transition cursor-pointer"
                          />
                          <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Recordar en este equipo
                          </span>
                        </label>
                        <Link
                          href="/explore"
                          className="font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:underline">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>

                      {/* Botón Principal (Píldora Dorada) con cambio de color activo */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn-login-cta w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                          {isLoading ? (
                            <span>Ingresando al Portal...</span>
                          ) : (
                            <>
                              <span>Ingresar al Portal</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Separador SSO */}
                    <div className="relative my-4 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className={`sso-divider-line w-full border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`} />
                      </div>
                      <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
                        <span className={`sso-divider-text px-3 font-bold tracking-wider ${
                          isDark ? 'bg-[#151D2E] text-slate-400' : 'bg-white text-slate-400'
                        }`}>
                          O ingresa con autenticación corporativa
                        </span>
                      </div>
                    </div>

                    {/* Botones SSO */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleFillDemo}
                        title="Iniciar sesión con Microsoft 365"
                        className={`sso-btn flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-semibold text-xs shadow-sm active:scale-95 transition-all focus:outline-none cursor-pointer ${
                          isDark
                            ? 'bg-[#0B111E] border-slate-700 text-slate-200 hover:bg-slate-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100'
                        }`}>
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 23 23">
                          <path d="M1 1h10v10H1z" fill="#f35325" />
                          <path d="M12 1h10v10H12z" fill="#81bc06" />
                          <path d="M1 12h10v10H1z" fill="#05a6f0" />
                          <path d="M12 12h10v10H12z" fill="#ffba08" />
                        </svg>
                        <span>Microsoft 365</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFillDemo}
                        title="Iniciar sesión con Google Workspace"
                        className={`sso-btn flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-semibold text-xs shadow-sm active:scale-95 transition-all focus:outline-none cursor-pointer ${
                          isDark
                            ? 'bg-[#0B111E] border-slate-700 text-slate-200 hover:bg-slate-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100'
                        }`}>
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                          <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4" />
                          <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
                          <path d="M5.28 14.27a7.11 7.11 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15z" fill="#FBBC05" />
                          <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                        </svg>
                        <span>Workspace</span>
                      </button>
                    </div>

                    {/* Nota de Registro */}
                    <div className={`reg-note-border mt-4 pt-3.5 border-t text-center ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <p className={`text-[11px] font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        ¿Aún no tienes una cuenta corporativa de contratista?
                      </p>
                      <Link
                        href="/explore"
                        className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:underline">
                        <FileSignature className="w-3.5 h-3.5" />
                        <span>Solicitar cotización o apertura de línea comercial</span>
                      </Link>
                    </div>

                    {/* Botón Rápido Demo */}
                    <div className={`reg-note-border mt-2.5 pt-2 border-t flex justify-center ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <button
                        type="button"
                        onClick={handleFillDemo}
                        className="text-[11px] font-semibold text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 active:text-amber-700 active:scale-95 transition-all cursor-pointer">
                        ⚡ Demo: <span className="text-amber-600 dark:text-amber-400 font-bold">admin@firmeza.com / Admin123*</span>
                      </button>
                    </div>
                  </>
                )}

              </div>

              {/* Tira Inferior de Seguridad */}
              <div className={`login-bottom-strip px-5 py-2.5 border-t flex items-center justify-between text-[11px] ${
                isDark
                  ? 'bg-[#0B111E] border-slate-800 text-slate-400'
                  : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-[#D97706] dark:text-amber-400" />
                  <span>Token de sesión único</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>SSL 256-bit Certificado</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 2. SECCIÓN: BENEFICIOS FIRMEZA */}
      <section className="bg-[#0B111E] border-t border-slate-800 relative z-20 pt-6 pb-8">
        {/* Etiqueta Central Estilizada BENEFICIOS FIRMEZA */}
        <div className="flex justify-center -mt-9 mb-5">
          <div className="bg-slate-900 border border-[#F59E0B]/50 text-slate-200 uppercase font-black text-xs tracking-widest px-5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Beneficios Firmeza</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Beneficio 1 */}
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full badge-icon-border-direct flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide group-hover:text-[#F59E0B] transition-colors">
                  Seguridad
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
                  Avanzada (JWT)
                </p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full badge-icon-border-direct flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <Layers className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide group-hover:text-[#F59E0B] transition-colors">
                  Catálogo
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
                  Dinámico en Línea
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full badge-icon-border-direct flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <FileText className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide group-hover:text-[#F59E0B] transition-colors">
                  Reportes
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
                  Automatizados (PDF/Excel)
                </p>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full badge-icon-border-direct flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <Settings className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase text-white tracking-wide group-hover:text-[#F59E0B] transition-colors">
                  Gestión Eficiente
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
                  De Pedidos y Maquinaria
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOOTER INFERIOR COMPLETO DE CODELOGI */}
      <footer className="bg-[#070C15] border-t border-slate-800/80 py-6 text-xs text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright Note */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">
              © {new Date().getFullYear()} FIRMEZA S.A. Todos los derechos reservados.
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-white">
            <Link href="/explore" className="text-white hover:text-[#F59E0B] transition-colors">
              <span className="text-white hover:text-[#F59E0B]">Términos de Servicio</span>
            </Link>
            <span className="text-white/70">•</span>
            <Link href="/explore" className="text-white hover:text-[#F59E0B] transition-colors">
              <span className="text-white hover:text-[#F59E0B]">Privacidad y Protección de Datos</span>
            </Link>
            <span className="text-white/70">•</span>
            <Link href="/explore" className="text-white hover:text-[#F59E0B] transition-colors">
              <span className="text-white hover:text-[#F59E0B]">Línea Ética</span>
            </Link>
          </div>

          {/* Social Icons exactos de codelogi.html */}
          <div className="flex items-center gap-3 text-white">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#F59E0B] hover:text-[#0B111E] transition-all flex items-center justify-center cursor-pointer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#F59E0B] hover:text-[#0B111E] transition-all flex items-center justify-center cursor-pointer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#F59E0B] hover:text-[#0B111E] transition-all flex items-center justify-center cursor-pointer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#F59E0B] hover:text-[#0B111E] transition-all flex items-center justify-center cursor-pointer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginScreenWeb;
