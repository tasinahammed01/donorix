import { type ReactNode, useEffect, useState } from "react";
import api from "../api";
import { AuthContext, type RegisterData, type User } from "./AuthContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({ name: res.data.name, role: res.data.role });
  };

  const register = async (data: RegisterData) => {
    await api.post("/register", data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 