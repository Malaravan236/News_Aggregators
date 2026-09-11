// src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  // Load user details from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');

    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Login
  const login = (name, email) => {
    setUserName(name);
    setUserEmail(email);

    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
  };

  // Logout
  const logout = () => {
    setUserName(null);
    setUserEmail(null);

    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        userEmail,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};