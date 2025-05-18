import React, { createContext, useContext, useState, useEffect } from 'react';
import { CitizenAuthResponse, AuthResponse, UserAuth } from '../types';
import { getCitizenProfile } from '../services/api';

interface AuthContextType {
  user: UserAuth | null;
  setUser: (user: UserAuth | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSetUser = (newUser: UserAuth | null) => {
    setUser(newUser);
    setIsAuthenticated(!!newUser);
    
    // Save user to localStorage for persistence
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
    
    console.log('Auth state updated:', { user: newUser, isAuthenticated: !!newUser });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token) {
      if (savedUser) {
        try {
          // Try to restore user from localStorage first
          const parsedUser = JSON.parse(savedUser);
          handleSetUser(parsedUser);
        } catch (e) {
          console.error('Failed to parse saved user:', e);
          // If parsing fails, try to get profile from API
          fetchUserProfile();
        }
      } else {
        // If no saved user, try to get profile from API
        fetchUserProfile();
      }
    }
  }, []);

  const fetchUserProfile = () => {
    // Try to get user profile
    getCitizenProfile()
      .then((profile) => {
        handleSetUser(profile);
      })
      .catch(() => {
        // If getting profile fails, clear auth state
        logout();
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 