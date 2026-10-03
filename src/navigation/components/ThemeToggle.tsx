import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Sincronizar clase 'dark' en el elemento raíz del navegador
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    }
  }, [isDark]);

  const handleToggle = () => {
    const nextScheme = isDark ? 'light' : 'dark';
    setColorScheme(nextScheme);
    if (typeof document !== 'undefined') {
      if (nextScheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    }
  };

  return (
    <Pressable
      onPress={handleToggle}
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center group ${
        isDark
          ? 'bg-brand-navy-light border-slate-700 hover:bg-slate-800 text-brand-gold shadow-sm'
          : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-brand-slate shadow-sm'
      } ${className}`}>
      {isDark ? (
        <Sun className="w-4 h-4 text-brand-gold transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-brand-navy transition-transform group-hover:-rotate-12" />
      )}
    </Pressable>
  );
}

export default ThemeToggle;
