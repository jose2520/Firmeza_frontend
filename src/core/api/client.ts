import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

import { tokenStorage } from '../storage/tokenStorage';

/**
 * Determina la URL base de la API según la plataforma y variables de entorno.
 *
 * Puedes definir EXPO_PUBLIC_API_URL en un archivo .env si deseas sobrescribirla.
 */
export const getApiBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // Web se conecta directamente a localhost
  if (Platform.OS === 'web') {
    return 'http://localhost:5125/api';
  }

  // En Android con túnel USB (adb reverse tcp:5125 tcp:5125), localhost funciona directamente.
  // En emulador de Android Studio clásico por defecto: 10.0.2.2.
  return 'http://10.0.2.2:5125/api';
};

/**
 * Instancia centralizada de Axios para la plataforma Firmeza.
 */
export const httpClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Interceptor de Petición:
 * Inyecta el Token JWT en el encabezado Authorization de forma automática si existe sesión activa.
 */
httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Respuesta:
 * Manejo centralizado de códigos de estado HTTP (401 sesión expirada, 403, 500).
 */
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Sesión expirada o no autorizada (401). Limpiando credenciales locales...');
      await tokenStorage.clearSession();
      // Opcional: emitir evento de redirección a login o evento global
    }

    // Extraer mensaje amigable del backend si viene en formato JSON
    const backendMessage =
      (error.response?.data as { message?: string; title?: string })?.message ||
      (error.response?.data as { title?: string })?.title ||
      error.message;

    (error as any).friendlyMessage = backendMessage;
    return Promise.reject(error);
  }
);

export default httpClient;
