import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthState {
  tokens: AuthTokens | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<any>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  re_password: string;
  first_name?: string;
  last_name?: string;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      tokens: null,
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(`${API_URL}/auth/jwt/create/`, {
            email,
            password,
          });

          const { access, refresh } = response.data;
          set({ tokens: { access, refresh }, isAuthenticated: true });

          // Fetch user data
          const userResponse = await axios.get(`${API_URL}/auth/users/me/`, {
            headers: { Authorization: `JWT ${access}` },
          });
          set({ user: userResponse.data });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      logout: () => {
        set({ tokens: null, user: null, isAuthenticated: false });
      },

      register: async (userData: RegisterData) => {
        try {
          await axios.post(`${API_URL}/auth/users/`, userData);
          // Login after successful registration
          await get().login(userData.email, userData.password);
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      refreshToken: async () => {
        const { tokens } = get();
        if (!tokens?.refresh) return;

        try {
          const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
            refresh: tokens.refresh,
          });
          set({ tokens: { ...tokens, access: response.data.access } });
        } catch (error) {
          console.error('Token refresh error:', error);
          // If refresh fails, log out
          get().logout();
        }
      },

      updateUser: async (userData: Partial<any>) => {
        const { tokens, user } = get();
        if (!tokens?.access || !user) throw new Error('Not authenticated');

        try {
          const response = await axios.patch(
            `${API_URL}/auth/users/me/`,
            userData,
            {
              headers: { Authorization: `JWT ${tokens.access}` },
            }
          );
          set({ user: { ...user, ...response.data } });
        } catch (error) {
          console.error('Update user error:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);