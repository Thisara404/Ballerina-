import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Load authentication state from localStorage on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedUserDetails = localStorage.getItem("userDetails");
    
    if (userId && storedUserDetails) {
      setIsAuthenticated(true);
      setUserInfo(JSON.parse(storedUserDetails));
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserInfo(userData);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);