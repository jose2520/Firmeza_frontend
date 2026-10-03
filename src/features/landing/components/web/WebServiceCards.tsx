import React from 'react';
import { Link } from 'expo-router';
import { Layers, Truck, Layout, Building2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export function WebServiceCards() {
  return (
    <section
      id="soluciones"
      className="relative z-20 -mt-24 sm:-mt-28 lg:-mt-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tarjeta 1: Venta de Materiales */}
        <div className="bg-white dark:bg-brand-navy rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
          <div>
            <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-brand-navy-dark relative">
              <img
                src="/images/landing/materials.jpg"
                alt="Sacos de cemento y grava de construcción"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-5 sm:p-6 pb-2">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Layers className="w-5 h-5 text-brand-navy dark:text-brand-gold" />
                <h3 className="font-heading font-black text-sm uppercase tracking-tight text-brand-navy dark:text-white">
                  VENTA DE MATERIALES
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Agregado de arena / cemento, materiales, agregas rendimiento y asistencia eficiente.
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-6 pt-0 flex justify-end">
            <Link
              href="/explore"
              aria-label="Ver Venta de Materiales"
              className="w-9 h-9 rounded-full bg-brand-gold hover:bg-brand-gold-hover flex items-center justify-center text-brand-navy shadow-md transition-transform group-hover:scale-110 cursor-pointer">
              <ArrowRight className="w-4 h-4 text-brand-navy stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Tarjeta 2: Alquiler de Vehículos */}
        <div id="vehiculos" className="bg-white dark:bg-brand-navy rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
          <div>
            <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-brand-navy-dark relative">
              <img
                src="/images/landing/vehicles.jpg"
                alt="Camión volquete amarillo en obra de construcción"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-5 sm:p-6 pb-2">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Truck className="w-5 h-5 text-brand-navy dark:text-brand-gold" />
                <h3 className="font-heading font-black text-sm uppercase tracking-tight text-brand-navy dark:text-white">
                  ALQUILER DE VEHÍCULOS
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Alquileres heavy duty, flotas de vehículos, amplia gama de maquinaria para construcción y proyectos viales.
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-6 pt-0 flex justify-end">
            <Link
              href="/explore"
              aria-label="Ver Alquiler de Vehículos"
              className="w-9 h-9 rounded-full bg-brand-navy dark:bg-slate-800 hover:bg-brand-gold dark:hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-all group-hover:scale-110 shadow-md cursor-pointer">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Tarjeta 3: Plataforma Digital Moderna */}
        <div id="materiales" className="bg-white dark:bg-brand-navy rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
          <div>
            {/* Visual Header con foto real del Dashboard y Badges Flotantes */}
            <div className="h-44 w-full bg-brand-navy-dark overflow-hidden relative group-hover:brightness-105 transition-all">
              <img
                src="/images/landing/digital.jpg"
                alt="Pantalla de gestión digital y dashboard administrativo"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-navy-dark/40 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy border-2 border-brand-gold flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="bg-white/95 dark:bg-slate-800 rounded px-2.5 py-1 shadow border border-transparent dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white">
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  <span>PDF & Excel</span>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6 pb-2">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Layout className="w-5 h-5 text-brand-navy dark:text-brand-gold" />
                <h3 className="font-heading font-black text-sm uppercase tracking-tight text-brand-navy dark:text-white">
                  PLATAFORMA DIGITAL MODERNA
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Clean Architecture, acceso seguro JWT, reportes automáticos en PDF y Excel para un control milimétrico.
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-6 pt-0 flex justify-end">
            <Link
              href="/explore"
              aria-label="Ver Plataforma Digital"
              className="w-9 h-9 rounded-full bg-brand-navy dark:bg-slate-800 hover:bg-brand-gold dark:hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-all group-hover:scale-110 shadow-md cursor-pointer">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Tarjeta 4: Soluciones Integrales */}
        <div className="bg-white dark:bg-brand-navy rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
          <div>
            <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-brand-navy-dark relative">
              <img
                src="/images/landing/solutions.jpg"
                alt="Arquitectos e ingenieros revisando planos en obra"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-5 sm:p-6 pb-2">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Building2 className="w-5 h-5 text-brand-navy dark:text-brand-gold" />
                <h3 className="font-heading font-black text-sm uppercase tracking-tight text-brand-navy dark:text-white">
                  SOLUCIONES INTEGRALES
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Te acompañamos en cada etapa de tu proyecto con servicio, tecnología y el respaldo de nuestra sólida experiencia.
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-6 pt-0 flex justify-end">
            <Link
              href="/explore"
              aria-label="Ver Soluciones Integrales"
              className="w-9 h-9 rounded-full bg-brand-navy dark:bg-slate-800 hover:bg-brand-gold dark:hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-all group-hover:scale-110 shadow-md cursor-pointer">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WebServiceCards;
