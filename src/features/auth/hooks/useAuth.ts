import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { authApi } from '../services/authApi';
import { LoginDto, RegisterDto } from '../types/auth.types';
import { UserSession } from '@/core/storage/tokenStorage';

/**
 * Hook de autenticación.
 * Si se encuentra dentro de AuthProvider, comparte el estado reactivo global de la sesión.
 * Si se ejecuta fuera, cuenta con fallback autónomo para máxima resiliencia.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  }

  // Fallback standalone local state
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    authApi
      .getStoredSession()
      .then(({ user: storedUser, token: storedToken }) => {
        if (isMounted) {
          setUser(storedUser);
          setToken(storedToken);
          setIsInitializing(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsInitializing(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(credentials);
      setUser(response.usuario);
      setToken(response.token);
      return response;
    } catch (err: any) {
      const msg = err.message || 'Error al iniciar sesión';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.register(data);
      setUser(response.usuario);
      setToken(response.token);
      return response;
    } catch (err: any) {
      const msg = err.message || 'Error al registrarse';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      setToken(null);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    isInitializing,
    error,
    login,
    register,
    logout,
    clearError,
  };
}

export default useAuth;
