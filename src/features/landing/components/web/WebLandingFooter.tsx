import React from 'react';
import { Link } from 'expo-router';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  User,
  Truck,
  ArrowUpRight,
} from 'lucide-react';

export function WebLandingFooter() {
  return (
    <footer id="contacto" className="bg-[#050C14] text-white border-t border-slate-900 w-full transition-colors">
      {/* 1. SECCIÓN PRINCIPAL MULTI-COLUMNA */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Columna 1: Brand, Isotipo y Propuesta de Valor (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3.5 group cursor-pointer">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg
                  className="w-full h-full fill-current"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100">
                  <path
                    d="M12 28 C 30 18, 70 12, 90 32 C 65 30, 35 38, 26 52 C 20 42, 15 34, 12 28 Z"
                    className="fill-[#D99B26]"
                  />
                  <path
                    d="M26 48 C 36 38, 62 34, 76 42 C 55 46, 38 60, 36 82 C 30 82, 26 70, 26 48 Z"
                    className="fill-white"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-tight text-white leading-none">
                  FIRMEZA
                </span>
                <span className="text-[9.5px] font-bold tracking-[0.2em] text-brand-gold uppercase mt-1">
                  TU SOCIO EN CONSTRUCCIÓN
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm mt-1">
              Plataforma tecnológica especializada en la comercialización de materiales y arrendamiento de maquinaria pesada. Impulsamos las obras civiles más ambiciosas del país con solvencia y puntualidad.
            </p>

            {/* Badges de Certificación / Seguridad */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-semibold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-white">Autenticación JWT</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white">API Activa</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Portafolio de Soluciones (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2.5">
              Portafolio de Soluciones
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-white">
              <li>
                <Link href="/explore" className="text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform shrink-0" />
                  <span className="text-white group-hover:text-brand-gold transition-colors">Suministro de Cemento y Arenas</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform shrink-0" />
                  <span className="text-white group-hover:text-brand-gold transition-colors">Alquiler de Volquetas y Excavadoras</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform shrink-0" />
                  <span className="text-white group-hover:text-brand-gold transition-colors">Acero Estructural y Perfiles</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform shrink-0" />
                  <span className="text-white group-hover:text-brand-gold transition-colors">Ladrillería y Prefabricados</span>
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform shrink-0" />
                  <span className="text-white group-hover:text-brand-gold transition-colors">Transporte de Maquinaria Pesada</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Portales y Accesos Directos (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2.5">
              Accesos
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-semibold text-white hover:text-brand-gold hover:border-brand-gold/60 transition-all group">
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-white group-hover:text-brand-gold">Portal Clientes</span>
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-semibold text-white hover:text-brand-gold hover:border-brand-gold/60 transition-all group">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-white group-hover:text-brand-gold">Acceso Admin</span>
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-semibold text-white hover:text-brand-gold hover:border-brand-gold/60 transition-all group">
                <span className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-white group-hover:text-brand-gold">Módulo Flota</span>
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Columna 4: Canales de Atención Directa (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2.5">
              Canales de Atención
            </h4>
            <div className="flex flex-col gap-3.5 text-xs sm:text-sm font-sans text-white">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">Líneas de Atención:</p>
                  <p className="text-white font-medium">PBX: +57 (601) 745-9000</p>
                  <p className="text-white/90 text-xs">Ventas Cel / WhatsApp: +57 310 890 1234</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">Correo Corporativo:</p>
                  <a href="mailto:ventas@firmeza.com.co" className="text-white hover:text-brand-gold font-medium transition-colors">
                    ventas@firmeza.com.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">Sede Principal & Patio:</p>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Calle 17 # 68-40, Zona Industrial Montevideo, Bogotá D.C., Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. SUB-FOOTER: LEGALES & DERECHOS */}
      <div className="border-t border-slate-900 bg-[#03080E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
          <div>
            <p className="text-white">
              © {new Date().getFullYear()} <strong className="text-white font-heading font-black">FIRMEZA S.A.</strong> · NIT: 901.452.883-7. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white">
            <Link href="/explore" className="text-white hover:text-brand-gold transition-colors">
              <span className="text-white hover:text-brand-gold">Términos de Servicio</span>
            </Link>
            <span className="text-white/80">·</span>
            <Link href="/explore" className="text-white hover:text-brand-gold transition-colors">
              <span className="text-white hover:text-brand-gold">Política de Privacidad (Habeas Data)</span>
            </Link>
            <span className="text-white/80">·</span>
            <Link href="/explore" className="text-white hover:text-brand-gold transition-colors">
              <span className="text-white hover:text-brand-gold">Facturación DIAN</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default WebLandingFooter;
