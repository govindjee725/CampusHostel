import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // 🔥 FETCH USER ON LOAD
  useEffect(() => {
    if (token) {
      api
        .get("/api/auth/me")
        .then((res) => {
          setUser(res.data);
          setRole(res.data.role);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
