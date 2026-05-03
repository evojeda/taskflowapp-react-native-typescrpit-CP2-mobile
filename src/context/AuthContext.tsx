import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  username: string;
  role: 'admin' | 'user';
  name: string;
};

type UserData = User & {
  password: string;
};

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const users: UserData[] = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin',
    name: 'Administrador',
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    role: 'user',
    name: 'Usuário',
  },
];

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const stored = await AsyncStorage.getItem('@user');

    if (stored) {
      const storedUser: User = JSON.parse(stored);
      setUser(storedUser);
    }
  }

  async function login(username: string, password: string): Promise<boolean> {
    const found = users.find(
      userItem => userItem.username === username && userItem.password === password
    );

    if (!found) return false;

    const { password: _password, ...userData } = found;

    setUser(userData);
    await AsyncStorage.setItem('@user', JSON.stringify(userData));

    return true;
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem('@user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}