import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { user as mockUser } from '@/mocks/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, any email/password combination works
        // In a real app, you would validate credentials with your API
        if (email && password) {
          set({ 
            user: mockUser,
            isAuthenticated: true,
            isLoading: false
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, any valid input works
        if (name && email && password) {
          const newUser = {
            ...mockUser,
            name,
            email
          };
          
          set({ 
            user: newUser,
            isAuthenticated: true,
            isLoading: false
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      
      logout: () => {
        set({ 
          user: null,
          isAuthenticated: false
        });
      },
      
      updateUser: (userData) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...userData }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);