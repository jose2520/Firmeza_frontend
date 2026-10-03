import { Link, useRouter } from 'expo-router';
import { ArrowLeft, Home } from 'lucide-react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-[#0B111E] flex flex-col items-center justify-center p-4 sm:p-8 overflow-x-hidden select-none">

      {/* Fondo de pantalla interactivo y Premium */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#070B14]">
        {/* Patrón de cuadrícula (Grid) estilo arquitectónico */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Esferas de luz flotantes (Mesh Gradient) */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-brand-navy-light/20 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-amber-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '4s' }}></div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B14]/50 to-[#070B14] backdrop-blur-[1px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Contenedor Principal de Cristal (Premium Glassmorphism) */}
        <div className="w-full bg-white/[0.03] dark:bg-black/30 backdrop-blur-3xl rounded-[3rem] border border-white/10 dark:border-white/5 p-8 sm:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5 flex flex-col items-center text-center relative transition-all duration-700 hover:bg-white/[0.04] dark:hover:bg-black/40">

          {/* Efectos de luz interiores del panel */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

          {/* Logo superior transparente */}
          <div className="inline-flex items-center gap-4 mb-8 sm:mb-10 z-20 group self-start">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-[#151D2E] rounded-full flex items-center justify-center ring-2 ring-amber-500/50 group-hover:ring-amber-400 transition-all shadow-md">
                <span className="font-black text-amber-500 text-xl">F</span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-white uppercase leading-tight drop-shadow-sm">
                Plataforma Web
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-amber-400/80 uppercase">
                Comercializadora Firmeza
              </span>
            </div>
          </div>

          {/* Gran 404 y Mensaje */}
          <div className="relative z-20 flex flex-col items-center justify-center mb-10">
            <div className="relative mb-8 sm:mb-12 inline-block group">
              <h1 className="text-[100px] sm:text-[160px] lg:text-[240px] font-black leading-none tracking-tighter flex items-center justify-center">
                <span className="inline-block wave-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"><span className="animate-wind">4</span></span>
                <span className="inline-flex items-center justify-center wave-2 relative mx-2 lg:mx-4">
                  {/* Cero transformado en un portal/anillo de cristal luminoso (MÁS GRANDE) */}
                  <div className="relative flex items-center justify-center w-[0.9em] h-[0.9em] rounded-full bg-white/5 border-[0.06em] border-amber-500/50 shadow-[inset_0_0_40px_rgba(245,158,11,0.3),0_0_30px_rgba(245,158,11,0.4)] backdrop-blur-md group-hover:border-amber-400 transition-colors duration-500">
                    <div className="absolute inset-0 rounded-full border-[0.015em] border-amber-300/30"></div>

                    {/* Definición de Gradientes Premium 3D para los Engranajes */}
                    <svg width="0" height="0" style={{ position: 'absolute' }}>
                      <defs>
                        <filter id="gear-shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.85" />
                        </filter>

                        {/* Gradiente principal del metal dorado */}
                        <linearGradient id="gold-3d-base" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FDE68A" />
                          <stop offset="40%" stopColor="#F59E0B" />
                          <stop offset="70%" stopColor="#D97706" />
                          <stop offset="100%" stopColor="#92400E" />
                        </linearGradient>

                        {/* Gradiente para el bisel reflectivo (borde brillante) */}
                        <linearGradient id="gold-3d-bevel" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFBEB" />
                          <stop offset="30%" stopColor="#FDE68A" />
                          <stop offset="100%" stopColor="#B45309" />
                        </linearGradient>

                        <path id="gear-path" fillRule="evenodd" d="M57.6,12.3c-1.3-4.7-5.9-7.9-10.8-7.3c-4.9,0.6-8.6,4.6-8.6,9.5v2.7c-2.3,0.8-4.5,1.8-6.5,3.1l-1.9-1.9 c-3.4-3.4-8.9-3.4-12.3,0c-3.4,3.4-3.4,8.9,0,12.3l1.9,1.9c-1.3,2-2.3,4.2-3.1,6.5h-2.7c-4.9,0-8.9,3.7-9.5,8.6 c-0.6,4.9,2.6,9.5,7.3,10.8h2.7c0.8,2.3,1.8,4.5,3.1,6.5l-1.9,1.9c-3.4,3.4-3.4,8.9,0,12.3c3.4,3.4,8.9,3.4,12.3,0l1.9-1.9 c2,1.3,4.2,2.3,6.5,3.1v2.7c0,4.9,3.7,8.9,8.6,9.5c4.9,0.6,9.5-2.6,10.8-7.3v-2.7c2.3-0.8,4.5-1.8,6.5-3.1l1.9,1.9 c3.4,3.4,8.9,3.4,12.3,0c3.4-3.4,3.4-8.9,0-12.3l-1.9-1.9c1.3-2,2.3-4.2,3.1-6.5h2.7c4.9,0,8.9-3.7,9.5-8.6c0.6-4.9-2.6-9.5-7.3-10.8 h-2.7c-0.8-2.3-1.8-4.5-3.1-6.5l1.9-1.9c3.4-3.4,3.4-8.9,0-12.3c-3.4-3.4-8.9-3.4-12.3,0l-1.9,1.9c-2-1.3-4.2-2.3-6.5-3.1V12.3z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15c8.3,0,15,6.7,15,15C65,58.3,58.3,65,50,65z" />
                      </defs>
                    </svg>

                    {/* Engranajes Realistas 3D en Movimiento (TAMAÑOS AUMENTADOS) */}
                    <div className="z-10 relative w-full h-full transition-transform duration-700 group-hover:scale-[1.10]">

                      {/* Engranaje Central (Extra Grande) */}
                      <div className="absolute top-1/2 left-1/2 drop-shadow-2xl" style={{ transform: 'translate(-50%, -50%)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-[0.55em] h-[0.55em] animate-spin" style={{ animationDuration: '14s' }}>
                          <use href="#gear-path" fill="#78350F" transform="translate(0, 5)" filter="url(#gear-shadow)" />
                          <use href="#gear-path" fill="url(#gold-3d-base)" stroke="url(#gold-3d-bevel)" strokeWidth="1.5" />
                          <circle cx="50" cy="50" r="16" fill="none" stroke="#78350F" strokeWidth="3" />
                          <circle cx="50" cy="50" r="14" fill="none" stroke="url(#gold-3d-bevel)" strokeWidth="1.5" />
                        </svg>
                      </div>

                      {/* Engranaje Superior Derecho (Mediano/Grande) */}
                      <div className="absolute top-1/2 left-1/2 drop-shadow-2xl" style={{ transform: 'translate(calc(-50% + 0.30em), calc(-50% - 0.30em))' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-[0.32em] h-[0.32em] animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }}>
                          <use href="#gear-path" fill="#78350F" transform="translate(0, 4)" filter="url(#gear-shadow)" />
                          <use href="#gear-path" fill="url(#gold-3d-base)" stroke="url(#gold-3d-bevel)" strokeWidth="2" />
                          <circle cx="50" cy="50" r="16" fill="none" stroke="#78350F" strokeWidth="4" />
                          <circle cx="50" cy="50" r="14" fill="none" stroke="url(#gold-3d-bevel)" strokeWidth="2" />
                        </svg>
                      </div>

                      {/* Engranaje Inferior Izquierdo (Pequeño/Mediano) */}
                      <div className="absolute top-1/2 left-1/2 drop-shadow-2xl" style={{ transform: 'translate(calc(-50% - 0.35em), calc(-50% + 0.20em))' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-[0.28em] h-[0.28em] animate-spin" style={{ animationDuration: '7.5s', animationDirection: 'reverse' }}>
                          <use href="#gear-path" fill="#78350F" transform="translate(0, 3)" filter="url(#gear-shadow)" />
                          <use href="#gear-path" fill="url(#gold-3d-base)" stroke="url(#gold-3d-bevel)" strokeWidth="2" />
                          <circle cx="50" cy="50" r="16" fill="none" stroke="#78350F" strokeWidth="4" />
                          <circle cx="50" cy="50" r="14" fill="none" stroke="url(#gold-3d-bevel)" strokeWidth="2" />
                        </svg>
                      </div>

                    </div>
                  </div>
                </span>
                <span className="inline-block wave-3 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"><span className="animate-wind-delayed">4</span></span>
              </h1>

              {/* Etiqueta manuscrita flotante */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-12 transform rotate-6 z-30 pointer-events-none">
                <span className="font-heading text-2xl sm:text-5xl text-amber-400 font-bold block drop-shadow-sm whitespace-nowrap">
                  Área fuera de plano
                </span>
                <svg className="w-24 sm:w-48 h-2 sm:h-4 text-amber-500/80 mx-auto mt-1" fill="none" viewBox="0 0 120 12">
                  <path d="M3 8.5C35 2 85 2 117 8" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
              ¡Ups! Te has salido de la obra.
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-sm">
              El material que buscas no existe o ha sido reubicado en nuestro almacén. Regresa al inicio para continuar con tu proyecto.
            </p>
          </div>

          {/* Botones de Acción Centrados */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-20 w-full max-w-lg mx-auto">
            <Link href="/" className="w-full sm:w-1/2">
              <div className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-[0_8px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.4)] flex flex-row items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
                <span className="relative z-10">Ir al Inicio</span>
              </div>
            </Link>

            <button onClick={() => router.back()} className="w-full sm:w-1/2 group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl backdrop-blur-md shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex flex-row items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition-colors" />
              <span>Regresar</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
