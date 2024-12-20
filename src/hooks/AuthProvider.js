"use client";

import React, { useState, useEffect, createContext, useMemo } from "react";
import Cookies from "js-cookie";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, { path: "/", ...options });
  };

  const removeCookie = (name) => {
    Cookies.remove(name, { path: "/" });
  };

  const getCookie = (name) => {
    return Cookies.get(name);
  };

  // Create User
  const createUser = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email Verification

  // const verifyEmail = async () => {
  //   try {
  //     if (!auth.currentUser) {
  //       throw new Error("No user is currently signed in.");
  //     }
  //     await sendEmailVerification(auth.currentUser);
  //     console.log("Verification email sent.");
  //   } catch (error) {
  //     console.error("Error sending verification email:", error);
  //     throw error;
  //   }
  // };
  // Email Verification
const verifyEmail = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in.");
    }
    const actionCodeSettings = {
      url: `${window.location.origin}/verify`,
      handleCodeInApp: true,
    };
    await sendEmailVerification(auth.currentUser, actionCodeSettings);
    console.log("Verification email sent.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

  
  // Update User Profile
  const updateUserProfile = async (name, photo) => {
    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      setCookie("ny-token", token, { expires: 7 });
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      removeCookie("ny-token");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Password
  // const signin = async (email, password) => {
  //   try {
  //     setLoading(true);
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     if (!user.emailVerified) {
  //       await signOut(auth);
  //       alert("Email not verified. Please check your inbox.");
  //     }
  //     const token = await userCredential.user.getIdToken();
  //     setCookie("ny-token", token, { expires: 7 });
  //     return userCredential;
  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const signin = async (email, password) => {
    try {
      setLoading(true);
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user || !user.emailVerified) {
        await signOut(auth); 
        removeCookie("ny-token");
        alert("Email not verified. Please check your inbox to verify your email.");
        // throw new Error("Email not verified");
      }
      const token = await user.getIdToken();
      setCookie("ny-token", token, { expires: 7 });
  
      return userCredential; 
    } catch (error) {
      console.error("Error signing in:", error);
      throw error; 
    } finally {
      setLoading(false); 
    }
  };
  

  // Reset Password
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Observe Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        const token = await currentUser.getIdToken();
        setCookie("ny-token", token, { expires: 7 });
        setUser(currentUser);
      } else {
        removeCookie("ny-token");
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
  const authInfo = useMemo(
    () => ({
      user,
      loading,
      setLoading,
      createUser,
      verifyEmail,
      updateUserProfile,
      signInWithGoogle,
      logout,
      signin,
      resetPassword,
      auth,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
