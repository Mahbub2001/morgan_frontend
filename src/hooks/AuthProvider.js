"use client";

import React, { useState, useEffect, createContext, useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Cookie helpers
  const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, { path: "/", ...options });
  };

  const removeCookie = (name) => {
    Cookies.remove(name, { path: "/" });
  };

  const getCookie = (name) => {
    return Cookies.get(name);
  };

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      if (data.token) {
        setCookie("ny-token", data.token, { expires: 7 });
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  // In your AuthProvider
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const { token, user } = await response.json();

      setCookie("ny-token", token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setUser(user);

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      removeCookie("ny-token");
      removeCookie("user-role");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { token: authToken, user } = await response.json();
      setCookie("ny-token", authToken, { expires: 7 });
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Check auth state on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie("ny-token");
        if (token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            removeCookie("ny-token");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        removeCookie("ny-token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      setLoading,
      register,
      login,
      logout,
      setUser,
      verifyEmail,
      resendVerificationEmail,
      forgotPassword,
      resetPassword,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full animate-spin border-4 border-solid border-cyan-500 border-t-transparent shadow-lg"></div>
            <p className="mt-4 text-lg font-semibold text-cyan-700">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
