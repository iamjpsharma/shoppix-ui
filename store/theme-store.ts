import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType } from '@/types';
import { useColorScheme } from 'react-native';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Create a separate hook to determine if dark mode is active
// This properly follows React hooks rules
export const useIsDarkMode = () => {
  const theme = useThemeStore(state => state.theme);
  const colorScheme = useColorScheme();
  
  if (theme === 'system') {
    return colorScheme === 'dark';
  }
  return theme === 'dark';
};