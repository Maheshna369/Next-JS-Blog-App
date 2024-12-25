"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuth, checkAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get("MaphyCookie");

    if (token) {
      checkAuth(true);
      console.log(`Here is the token ${token}`);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
