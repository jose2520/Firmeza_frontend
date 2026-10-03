const fs = require('fs');

let content = fs.readFileSync('src/navigation/AppNavigation.web.tsx', 'utf8');

const replacement = `const NavbarHeader = forwardRef<View, TabListProps>(function NavbarHeader(
  { children, style, ...props },
  ref
) {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const homeTrigger = childrenArray[0];
  const exploreTrigger = childrenArray[1];
  const portalTrigger = childrenArray[2];
  const adminTrigger = childrenArray[3];

  const isPortalRoute = pathname === '/login' || pathname.startsWith('/login');
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Error during logout:', e);
    }
  };

  return (
    <View
      ref={ref}
      role="banner"
      className="w-full flex flex-col items-stretch transition-colors duration-300 z-50"
      {...props}>
      {isAuthenticated ? (
        <header className="w-full fixed top-0 left-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-12 py-3.5 flex items-start justify-between transition-all duration-300">
          {/* Logo - Izquierda */}
          <div className="pointer-events-auto flex items-center gap-3.5 hover:scale-105 transition-all duration-300 drop-shadow-lg backdrop-blur-md bg-white/90 dark:bg-[#0D1524]/90 p-2 sm:p-2.5 pr-4 sm:pr-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Link href="/login" className="flex flex-row items-center gap-3 group cursor-pointer">
              <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                <BrandLogoSvg />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl lg:text-2xl tracking-tight text-brand-navy dark:text-white leading-none">
                  FIRMEZA
                </span>
                <span className="text-[8.5px] lg:text-[9.5px] font-bold tracking-[0.2em] text-brand-navy/80 dark:text-amber-400 uppercase mt-1">
                  PORTAL GESTIÓN
                </span>
              </div>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-sm ml-2">
              <HardHat className="w-3.5 h-3.5 text-amber-500" />
              <span>{user?.role === 'conductor' ? 'Conductor / Flota' : 'Empresa / Contratista'}</span>
            </span>
          </div>

          {/* Nav Central - Autenticado (Solo Desktop) */}
          <div className="hidden lg:flex pointer-events-auto absolute left-1/2 -translate-x-1/2 items-center bg-white/90 dark:bg-[#0D1524]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-6 py-2 shadow-lg">
            <nav className="flex items-center space-x-6 text-sm font-semibold text-brand-slate dark:text-gray-200">
              {user?.role === 'Admin' && (
                <Link href="/admin" className={\`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors \${isAdminRoute ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10' : 'hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800'}\`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Panel Admin</span>
                </Link>
              )}
              <Link href="/login" className={\`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors \${isPortalRoute && !isAdminRoute ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10' : 'hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'}\`}>
                <LayoutDashboard className="w-4 h-4 text-amber-500" />
                <span>Panel de Control</span>
              </Link>
              <Link href="/explore" className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Package className="w-4 h-4 text-slate-400" />
                <span>Catálogo de Materiales</span>
              </Link>
              <Link href="/" className="py-1.5 px-3 rounded-lg hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span>Sitio Web Público</span>
              </Link>
            </nav>
          </div>

          {/* Right Utilities */}
          <div className="pointer-events-auto flex flex-col items-end gap-2">
            <div className="flex justify-end items-center bg-white/90 dark:bg-[#0D1524]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1.5 shadow-lg transition-all hover:bg-white dark:hover:bg-[#151D2E]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>JWT Activa</span>
                </div>
                <ThemeToggle />
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs uppercase shadow-sm">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-900 dark:text-white leading-tight max-w-[100px] truncate">
                      {user?.name || user?.email?.split('@')[0]}
                    </span>
                  </div>
                </div>
                <button onClick={handleLogout} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer">
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 rounded-lg text-brand-navy dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Menú Desplegable Móvil Autenticado */}
            {mobileMenuOpen && (
              <div className="w-full min-w-[250px] bg-white dark:bg-[#0D1524] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-xl animate-in fade-in">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {user?.name || user?.email}
                    </span>
                    <span className="text-[10px] text-amber-500 font-semibold uppercase">
                      {user?.role === 'conductor' ? 'Conductor' : 'Empresa'}
                    </span>
                  </div>
                </div>
                {user?.role === 'Admin' && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Panel Administración</span>
                  </Link>
                )}
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-amber-500" />
                  <span>Panel de Control</span>
                </Link>
                <Link href="/explore" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-slate-400" />
                  <span>Catálogo de Materiales</span>
                </Link>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-sm font-semibold text-slate-800 dark:text-white">
                  <span>Sitio Web Público</span>
                </Link>
              </div>
            )}
          </div>
        </header>
      ) : isPortalRoute ? (
        <header className="w-full fixed top-0 left-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-12 py-3.5 flex items-start justify-between transition-all duration-300">
          <div className="pointer-events-auto flex items-center gap-3.5 hover:scale-105 transition-all duration-300 drop-shadow-lg backdrop-blur-md bg-white/90 dark:bg-[#0B111E]/90 p-2 sm:p-2.5 pr-4 sm:pr-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Link href="/" className="flex flex-row items-center gap-3.5 group cursor-pointer focus:outline-none">
              <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                <BrandLogoSvg />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl lg:text-2xl tracking-tight text-slate-900 dark:text-white leading-none">
                  FIRMEZA
                </span>
                <span className="text-[8.5px] lg:text-[9px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase mt-1">
                  Portal Clientes
                </span>
              </div>
            </Link>
          </div>

          <div className="pointer-events-auto flex justify-end items-center bg-white/90 dark:bg-[#0B111E]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1.5 shadow-lg transition-all">
            <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 mr-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>En Línea</span>
            </div>
            <nav className="flex items-center gap-3 sm:gap-4">
              <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 dark:text-slate-200 dark:hover:text-brand-gold transition-colors">
                <ArrowLeft className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">Volver</span>
              </Link>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
              <button onClick={() => setSupportModalOpen(true)} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold bg-slate-900 dark:bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-800 dark:hover:bg-slate-700 px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer">
                <Headset className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Soporte 24/7</span>
              </button>
              <ThemeToggle />
            </nav>
          </div>
        </header>
      ) : (
        <header className="w-full fixed top-0 left-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-12 py-3.5 flex items-start justify-between transition-all duration-300">
          <div className="pointer-events-auto flex items-center gap-3.5 hover:scale-105 transition-all duration-300 drop-shadow-lg backdrop-blur-md bg-white/90 dark:bg-brand-navy/90 p-2 sm:p-2.5 pr-4 sm:pr-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Link href="/" className="flex flex-row items-center gap-3.5 group cursor-pointer">
              <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                <BrandLogoSvg />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl lg:text-2xl tracking-tight text-brand-navy dark:text-white leading-none">
                  FIRMEZA
                </span>
                <span className="text-[8.5px] lg:text-[9.5px] font-bold tracking-[0.2em] text-brand-navy/80 dark:text-gray-300 uppercase mt-1">
                  SOCIO EN CONSTRUCCIÓN
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex pointer-events-auto absolute left-1/2 -translate-x-1/2 items-center bg-white/90 dark:bg-brand-navy/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-6 py-2 shadow-lg">
            <nav className="flex items-center space-x-6 text-sm font-semibold text-brand-slate dark:text-gray-200">
              {homeTrigger}
              {exploreTrigger}
              <a href="#soluciones" className="hover:text-brand-gold transition-colors duration-200 py-1.5">Soluciones</a>
              <a href="#vehiculos" className="hover:text-brand-gold transition-colors duration-200 py-1.5">Vehículos</a>
              <a href="#materiales" className="hover:text-brand-gold transition-colors duration-200 py-1.5">Materiales</a>
              <a href="#nosotros" className="hover:text-brand-gold transition-colors duration-200 py-1.5">Nosotros</a>
              <a href="#contacto" className="hover:text-brand-gold transition-colors duration-200 py-1.5">Contacto</a>
            </nav>
          </div>

          <div className="pointer-events-auto flex flex-col items-end gap-2">
            <div className="flex items-center bg-white/90 dark:bg-brand-navy/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1.5 shadow-lg">
              <div className="hidden lg:flex items-center gap-3 mr-3">
                <Link href="/login" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-slate hover:text-brand-gold dark:text-gray-300 dark:hover:text-brand-gold rounded-full border border-slate-200 dark:border-slate-700/80 hover:border-brand-gold transition-colors duration-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>Acceso Empleados</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="hidden lg:block">{portalTrigger}</div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Abrir Menú" className="lg:hidden p-1.5 rounded-lg text-brand-navy dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden w-full min-w-[250px] bg-white dark:bg-brand-navy border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-4 flex flex-col gap-3 shadow-xl animate-in fade-in">
                <div className="flex flex-col gap-2">
                  <div onClick={() => setMobileMenuOpen(false)}>{homeTrigger}</div>
                  <div onClick={() => setMobileMenuOpen(false)}>{exploreTrigger}</div>
                  <a href="#soluciones" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-slate dark:text-gray-200 hover:text-brand-gold transition-colors">Nuestras Soluciones</a>
                  <a href="#vehiculos" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-slate dark:text-gray-200 hover:text-brand-gold transition-colors">Vehículos</a>
                  <a href="#materiales" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-slate dark:text-gray-200 hover:text-brand-gold transition-colors">Materiales</a>
                  <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-slate dark:text-gray-200 hover:text-brand-gold transition-colors">Nosotros</a>
                  <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-slate dark:text-gray-200 hover:text-brand-gold transition-colors">Contacto</a>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                  {portalTrigger}
                  <Link href="/login" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-brand-slate dark:text-gray-300 hover:text-brand-gold bg-slate-50 dark:bg-slate-800/40">
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    <span>Acceso Empleados / Administrador</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Triggers invisibles de respaldo */}
      <div className="sr-only hidden" aria-hidden="true">
        {homeTrigger}
        {exploreTrigger}
        {portalTrigger}
        {adminTrigger}
      </div>

      {/* Modal Interactivo de Soporte 24/7 */}
      {supportModalOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 pointer-events-auto">
          <div className="w-full max-w-md bg-white dark:bg-[#151D2E] rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-2xl p-6 relative">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-t-3xl" />
            <div className="flex items-center justify-between mb-4 mt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
                <Headset className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-300 tracking-wider">Mesa de Ayuda 24/7</span>
              </div>
              <button type="button" onClick={() => setSupportModalOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Soporte Técnico y Operaciones</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Atención prioritaria para contratistas, transportistas y clientes en despachos y cubicación de obras.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+576018003476" className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#0B111E] border border-slate-200 dark:border-slate-700/70 hover:border-amber-500 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Línea Nacional Gratuita</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">01 8000 94 3476 (FIRMEZA)</span>
                </div>
              </a>
              <a href="https://wa.me/573001234567" target="_blank" rel="noreferrer" className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#0B111E] border border-slate-200 dark:border-slate-700/70 hover:border-emerald-500 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp Despachos y Obra</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">+57 300 123 4567</span>
                </div>
              </a>
              <a href="mailto:soporte@firmeza.com" className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#0B111E] border border-slate-200 dark:border-slate-700/70 hover:border-amber-500 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Correo Centralizado</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">soporte@firmeza.com</span>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Disponibilidad 24 horas continuas para proyectos activos.</span>
            </div>
            <button type="button" onClick={() => setSupportModalOpen(false)} className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </View>
  );
});`;

const re = /const NavbarHeader = forwardRef<View, TabListProps>\(function NavbarHeader\([\s\S]*?\n\}\);\n/m;
content = content.replace(re, replacement + '\n');

fs.writeFileSync('src/navigation/AppNavigation.web.tsx', content);
