import { createContext } from "react";

export interface User {
  name: string;
  role: "donor" | "recipient";
  _id?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "donor" | "recipient";
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});
