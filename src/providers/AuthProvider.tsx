import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import type { ReactNode } from "react";

export const AuthContext = createContext(null);

import auth from "../firebase/firebase.init";

const AuthProvider = ({children}: {children: ReactNode}) => {



    // Create User
    interface CreateUserFn {
        (email: string, password: string): Promise<import("firebase/auth").UserCredential>;
    }

    const createUser: CreateUserFn = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };


    
    const authInfo = {
        createUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;