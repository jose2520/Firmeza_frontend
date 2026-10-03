import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'firmeza_auth_token';
const USER_KEY = 'firmeza_user_data';

export interface UserSession {
  id: string | number;
  email: string;
  name?: string;
  role?: string;
}

export const tokenStorage = {
  /**
   * Obtiene el token JWT almacenado.
   */
  async getToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
      }
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.warn('Error reading token from SecureStore:', error);
      return null;
    }
  },

  /**
   * Guarda el token JWT de forma segura.
   */
  async setToken(token: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
        return;
      }
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token to SecureStore:', error);
    }
  },

  /**
   * Elimina el token JWT (cierre de sesión).
   */
  async removeToken(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
        return;
      }
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token from SecureStore:', error);
    }
  },

  /**
   * Guarda los datos del usuario en sesión.
   */
  async setUser(user: UserSession): Promise<void> {
    try {
      const data = JSON.stringify(user);
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') localStorage.setItem(USER_KEY, data);
        return;
      }
      await SecureStore.setItemAsync(USER_KEY, data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  /**
   * Obtiene los datos del usuario en sesión.
   */
  async getUser(): Promise<UserSession | null> {
    try {
      const data =
        Platform.OS === 'web'
          ? typeof window !== 'undefined'
            ? localStorage.getItem(USER_KEY)
            : null
          : await SecureStore.getItemAsync(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Error reading user data:', error);
      return null;
    }
  },

  /**
   * Limpia toda la sesión (token y usuario).
   */
  async clearSession(): Promise<void> {
    await Promise.all([this.removeToken(), this.removeUser()]);
  },

  async removeUser(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') localStorage.removeItem(USER_KEY);
        return;
      }
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  },
};
