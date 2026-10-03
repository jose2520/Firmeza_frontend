import React from 'react';
import { Shield, Database, FileCheck2, Settings } from 'lucide-react';

export function WebBenefitsSection() {
  return (
    <section id="nosotros" className="mt-14 relative w-full">
      {/* Badge Central tipo Píldora */}
      <div className="relative z-20 flex justify-center -mb-4">
        <div className="bg-white dark:bg-brand-navy-dark border-2 border-slate-200 dark:border-slate-700 text-brand-navy dark:text-brand-gold font-heading font-extrabold text-xs sm:text-sm tracking-wider uppercase px-8 py-2 rounded-full shadow-md">
          BENEFICIOS FIRMEZA
        </div>
      </div>

      {/* Franja Azul Marina con Degradado */}
      <div className="relative bg-gradient-to-r from-brand-navy-dark via-brand-navy to-brand-navy-dark text-white pt-12 pb-10 border-t border-slate-800 w-full overflow-hidden">
        {/* Cintas Doradas Laterales Decorativas */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-brand-gold/15 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-brand-gold/15 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
            
            {/* Beneficio 1 */}
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-brand-gold/80 flex items-center justify-center shrink-0 bg-brand-navy-dark/60 group-hover:bg-brand-gold/10 group-hover:border-brand-gold transition-colors">
                <Shield className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs sm:text-sm tracking-wide text-white leading-tight uppercase">
                  SEGURIDAD<br />AVANZADA (JWT)
                </p>
                <p className="font-sans text-xs text-slate-300 mt-0.5">
                  Protección de cuentas y sesiones
                </p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-brand-gold/80 flex items-center justify-center shrink-0 bg-brand-navy-dark/60 group-hover:bg-brand-gold/10 group-hover:border-brand-gold transition-colors">
                <Database className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs sm:text-sm tracking-wide text-white leading-tight uppercase">
                  CATÁLOGO<br />DINÁMICO
                </p>
                <p className="font-sans text-xs text-slate-300 mt-0.5">
                  Stock sincronizado en tiempo real
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-brand-gold/80 flex items-center justify-center shrink-0 bg-brand-navy-dark/60 group-hover:bg-brand-gold/10 group-hover:border-brand-gold transition-colors">
                <FileCheck2 className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs sm:text-sm tracking-wide text-white leading-tight uppercase">
                  REPORTES<br />PDF & EXCEL
                </p>
                <p className="font-sans text-xs text-slate-300 mt-0.5">
                  Facturación oficial y extractos
                </p>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-brand-gold/80 flex items-center justify-center shrink-0 bg-brand-navy-dark/60 group-hover:bg-brand-gold/10 group-hover:border-brand-gold transition-colors">
                <Settings className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="font-heading font-bold text-xs sm:text-sm tracking-wide text-white leading-tight uppercase">
                  GESTIÓN<br />DE PEDIDOS
                </p>
                <p className="font-sans text-xs text-slate-300 mt-0.5">
                  Trazabilidad de despacho a obra
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default WebBenefitsSection;
