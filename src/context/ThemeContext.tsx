import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    primary: string;
  };
}

const lightTheme = {
  background: '#F8F5F2',
  card: '#FFFFFF',
  text: '#1F1F1F',
  primary: '#FF8A8A',
};

const darkTheme = {
  background: '#1F1F1F',
  card: '#2C2C2C',
  text: '#F5F5F5',
  primary: '#FF8A8A',
};

const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const storedTheme = await AsyncStorage.getItem('@theme');

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    }
  }

  async function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    await AsyncStorage.setItem('@theme', newTheme);
  }

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}