"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../login/login.css";
import {
  getAuth,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import app from "@/firebase/firebase.config";

const auth = getAuth(app);

const Verify = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordResetMode, setPasswordResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const queryParams = window.location.search;
    const mode = new URLSearchParams(queryParams).get("mode");
    const oobCode = new URLSearchParams(queryParams).get("oobCode");

    if (!mode || !oobCode) {
      setError("Invalid link.");
      return;
    }

    setOobCode(oobCode);

    if (mode === "verifyEmail") {
      handleEmailVerification(oobCode);
    } else if (mode === "resetPassword") {
      setPasswordResetMode(true);
      verifyPasswordReset(oobCode);
    }
  }, []);

  const handleEmailVerification = async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setTimeout(() => {
        // router.push("/login");
        router.push("/");
      }, 3000);
    } catch (error) {
      setError("Invalid or expired verification link.");
    }
  };

  const verifyPasswordReset = async (oobCode) => {
    try {
      await verifyPasswordResetCode(auth, oobCode);
    } catch (error) {
      setError("Invalid or expired password reset link.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        setError("Please enter both password fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pb-72">
      {success ? (
        <div className="text-green-500">
          {passwordResetMode
            ? "Your password has been reset successfully! Redirecting to login..."
            : "Your email has been verified! Redirecting to login..."}
        </div>
      ) : (
        <div>
          {passwordResetMode ? (
            <div className="flex flex-col items-center">
              <p className="mb-4">Enter your new password:</p>
              <div className="inputBox mb-4">
                <input
                  className={`input border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                    error ? "focus:ring-red-500" : "focus:ring-gray-950"
                  }`}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder=" "
                />
                <span className="text-gray-500">Password</span>
              </div>
              <div className="inputBox mb-4">
                <input
                  className={`input border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                    error ? "focus:ring-red-500" : "focus:ring-gray-950"
                  }`}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=" "
                />
                <span className="text-gray-500">Confirm Password</span>
                {error && <div className="text-red-700 text-xs">{error}</div>}
              </div>
              <div>
                <div onClick={handlePasswordReset} className="wrapper">
                  <button type="submit">
                    <span className="tracking-widest px-5">RESET PASSWORD</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Verifying your email...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
