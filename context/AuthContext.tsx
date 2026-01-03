
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  toggleFavorite: (restaurantId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('qb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      id: 'u1',
      email,
      name: email.split('@')[0],
      address: '123 Main St, Food City',
      phone: '555-0123',
      preferences: ['Spicy', 'Vegetarian'],
      favorites: []
    };
    setUser(mockUser);
    localStorage.setItem('qb_user', JSON.stringify(mockUser));
  };

  const signup = async (userData: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email || '',
      name: userData.name || '',
      address: userData.address || '',
      phone: userData.phone || '',
      preferences: [],
      favorites: []
    };
    setUser(newUser);
    localStorage.setItem('qb_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qb_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('qb_user', JSON.stringify(updated));
    }
  };

  const toggleFavorite = (id: string) => {
    if (!user) return;
    const favorites = user.favorites.includes(id) 
      ? user.favorites.filter(f => f !== id) 
      : [...user.favorites, id];
    updateProfile({ favorites });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
