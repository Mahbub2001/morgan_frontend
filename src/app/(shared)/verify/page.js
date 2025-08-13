"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../login/login.css";

const Verify = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordResetMode, setPasswordResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const queryParams = window.location.search;
    const mode = new URLSearchParams(queryParams).get("mode");
    const token = new URLSearchParams(queryParams).get("token");

    if (!mode || !token) {
      setError("Invalid link.");
      return;
    }

    setToken(token);

    if (mode === "verifyEmail") {
      handleEmailVerification(token);
    } else if (mode === "resetPassword") {
      setPasswordResetMode(true);
    }
  }, []);

  const handleEmailVerification = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle error case properly
        throw new Error(data.message || "Verification failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError("Invalid or expired verification link.");
      setError(error.message || "Verification failed");
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset error:", error);
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
            <div>
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <div>Verifying your email...</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
