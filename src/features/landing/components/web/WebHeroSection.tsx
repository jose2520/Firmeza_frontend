import React from 'react';
import { Link } from 'expo-router';
import { BookOpen, ChevronRight, FileText } from 'lucide-react';

export function WebHeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[640px] lg:min-h-[720px] bg-brand-navy flex items-center overflow-hidden">
      {/* Background Image con maquinaria pesada */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/landing/hero.jpg"
          alt="Construcción con maquinaria pesada, excavadora y camión volquete"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Degradados cinematográficos con Tailwind para que la imagen sea bien visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark/90 via-brand-navy-dark/65 to-brand-navy-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-75" />
      </div>

      {/* Acentos geométricos dorados en la derecha */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none hidden xl:block opacity-40">
        <div className="w-full h-full bg-gradient-to-l from-brand-gold/20 to-transparent" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full pt-16 pb-36 lg:pt-20 lg:pb-44">
        <div className="max-w-2xl text-white">
          
          {/* Tag de Marca Dorado */}
          <span className="inline-block font-heading font-extrabold text-brand-gold text-lg lg:text-xl tracking-wider uppercase mb-1">
            FIRMEZA:
          </span>

          {/* Titular Principal idéntico a code.html */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.12] tracking-tight uppercase mb-5">
            TU SOCIO CONFIABLE EN MATERIALES Y VEHÍCULOS DE CONSTRUCCIÓN.
          </h1>

          {/* Subtítulo Descriptivo */}
          <p className="font-sans text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-xl mb-10 text-balance">
            Optimizamos tus proyectos con nuestra plataforma líder en gestión de inventario,
            alquiler de maquinaria y distribución eficiente. Calidad y puntualidad garantizada.
          </p>

          {/* Botones de Acción (CTA) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* CTA 1: Catálogo */}
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-heading font-black text-sm tracking-wider uppercase shadow-lg shadow-brand-gold/25 transition-all duration-200 transform hover:-translate-y-0.5 group cursor-pointer">
              <BookOpen className="w-4 h-4 text-brand-navy group-hover:scale-110 transition-transform" />
              <span>EXPLORAR CATÁLOGO</span>
              <ChevronRight className="w-4 h-4 text-brand-navy group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* CTA 2: Solicitar Cotización */}
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-sm tracking-wider uppercase backdrop-blur-md border border-white/25 transition-all duration-200 hover:border-white/40 cursor-pointer">
              <FileText className="w-4 h-4 text-slate-200" />
              <span>SOLICITAR COTIZACIÓN</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WebHeroSection;
