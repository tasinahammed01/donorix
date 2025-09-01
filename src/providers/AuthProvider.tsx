import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import auth from "../firebase/firebase.init";

// ----- Interfaces -----
interface User {
  uid: string;
  email: string;
  role: "donor" | "recipient" | "admin";
  name: string;
  totalDonated?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// ----- AuthProvider -----
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from backend
  const fetchUserDetails = async (firebaseUser: FirebaseUser) => {
    try {
      const response = await fetch(
        `https://donorix-backend-1.onrender.com/users?email=${firebaseUser.email}`
      );
      if (response.ok) {
        const users = await response.json();
        const userData = users.find((u: any) => u.email === firebaseUser.email);
        if (userData) {
          const formattedUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            role: userData.role,
            name: userData.name,
            totalDonated: userData.totalDonated,
          };
          setUser(formattedUser);
          // Optional: persist in localStorage
          localStorage.setItem("user", JSON.stringify(formattedUser));
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Create User
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In
  const signInUser = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    // Firebase observer will handle setUser
    return credential;
  };

  // Sign Out
  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  // Firebase auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserDetails(firebaseUser);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ----- Context Value -----
  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
