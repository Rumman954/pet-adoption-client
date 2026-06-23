import { createContext, useContext, useEffect, useState } from 'react';
import api, { TOKEN_KEY } from '../api/axios';

const USER_KEY = 'pethome-user';

const AuthContext = createContext(null);

const readTabUser = () => {
  try {
    const cached = sessionStorage.getItem(USER_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const clearLegacyStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const fetchUser = async () => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const cached = readTabUser();
      if (cached) setUser(cached);

      const { data } = await api.get('/api/auth/me');
      if (data.success) {
        setUser(data.user);
        sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
      } else {
        clearSession();
      }
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearLegacyStorage();
    fetchUser();
  }, []);

  const login = (userData, token) => {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      clearSession();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
