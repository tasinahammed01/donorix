import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Define user interface
interface User {
  uid: string;
  email: string;
  role: "donor" | "recipient" | "admin";
  name: string;
  totalDonated?: number;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  createUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOutUser: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

import auth from "../firebase/firebase.init";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from backend
  const fetchUserDetails = async (firebaseUser: any) => {
    try {
      const response = await fetch(`http://localhost:5000/users?email=${firebaseUser?.email}`);
      if (response.ok) {
        const users = await response.json();
        const userData = users.find((u: any) => u.email === firebaseUser.email);
        if (userData) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData.role,
            name: userData.name,
            totalDonated: userData.totalDonated
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Create User
  interface CreateUserFn {
    (email: string, password: string): Promise<
      import("firebase/auth").UserCredential
    >;
  }

  const createUser: CreateUserFn = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In
  const signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("User logged in");
        await fetchUserDetails(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // SignOut
  const signOutUser = async () => {
    setUser(null);
    return signOut(auth);
  };

  const authInfo: AuthContextType = {
    createUser,
    signInUser,
    user,
    signOutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
