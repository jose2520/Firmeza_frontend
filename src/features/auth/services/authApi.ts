import httpClient from '@/core/api/client';
import { tokenStorage, UserSession } from '@/core/storage/tokenStorage';
import { LoginDto, RegisterDto, AuthResponse } from '../types/auth.types';

export const authApi = {
  /**
   * Inicia sesión con credenciales y guarda el JWT en el almacenamiento seguro.
   */
  async login(credentials: LoginDto): Promise<AuthResponse> {
    try {
      const payload = {
        emailOrUsername: credentials.email,
        password: credentials.password
      };
      const response = await httpClient.post<AuthResponse>('/Auth/login', payload);
      const rawData = response.data as any;
      
      const mappedResponse: AuthResponse = {
        token: rawData.token,
        usuario: {
          id: rawData.username || rawData.email,
          email: rawData.email,
          name: rawData.username,
          role: rawData.roles && rawData.roles.length > 0 ? rawData.roles[0] : 'Cliente',
        },
        message: 'Login exitoso'
      };

      if (mappedResponse.token) {
        await tokenStorage.setToken(mappedResponse.token);
      }
      if (mappedResponse.usuario) {
        await tokenStorage.setUser(mappedResponse.usuario);
      }

      return mappedResponse;
    } catch (error: any) {
      // Si el backend aún no está activo en desarrollo local, permitir fallback de demostración
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        console.warn('Backend no disponible temporalmente. Verificando credenciales demo...');
        if (credentials.email === 'admin@firmeza.com' && credentials.password === 'Admin123*') {
          const demoResponse: AuthResponse = {
            token: 'demo-jwt-token-firmeza-authenticated',
            usuario: {
              id: '1',
              email: credentials.email,
              name: 'Administrador Firmeza',
              role: 'Admin',
            },
            message: 'Inicio de sesión demo exitoso',
          };
          await tokenStorage.setToken(demoResponse.token);
          await tokenStorage.setUser(demoResponse.usuario);
          return demoResponse;
        }
      }

      const message =
        error.friendlyMessage ||
        error.response?.data?.message ||
        'No se pudo conectar con el servidor de autenticación.';
      throw new Error(message);
    }
  },

  /**
   * Registra un nuevo usuario cliente en el sistema.
   */
  async register(data: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>('/auth/register', data);
      const result = response.data;

      if (result.token) {
        await tokenStorage.setToken(result.token);
      }
      if (result.usuario) {
        await tokenStorage.setUser(result.usuario);
      }

      return result;
    } catch (error: any) {
      const message =
        error.friendlyMessage ||
        error.response?.data?.message ||
        'Error al registrar el usuario en el servidor.';
      throw new Error(message);
    }
  },

  /**
   * Cierra la sesión activa y elimina las credenciales locales.
   */
  async logout(): Promise<void> {
    await tokenStorage.clearSession();
  },

  /**
   * Obtiene la sesión actual si existe.
   */
  async getStoredSession(): Promise<{ user: UserSession | null; token: string | null }> {
    const [token, user] = await Promise.all([
      tokenStorage.getToken(),
      tokenStorage.getUser(),
    ]);
    return { token, user };
  },
};

export default authApi;
