import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserType } from "../types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: UserType = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || null,
        };
        setUser(userData);
        updateUserData(firebaseUser.uid);
        router.replace("/(tabs)");
        // updateUserData(firebaseUser.uid);
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg === "(auth/invalid-email)") {
        msg = "Wrong email";
      }
      if (msg === "(auth/invalid-credential)") {
        msg = "Wrong credential";
      }
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
        createdAt: new Date(),
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg === "(auth/email-already-in-use)") {
        msg = "This Email already in use";
      }
      return { success: false, msg };
    }
  };

  const updateUserData = async (uuid: string) => {
    try {
      const docRef = doc(db, "users", uuid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data.uid,
          name: data.name || null,
          email: data.email || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      console.log("Error updating user:", msg);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
