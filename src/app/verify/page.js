"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, applyActionCode, isSignInWithEmailLink } from "firebase/auth";
import app from "@/firebase/firebase.config";

const auth = getAuth(app);

const Verify = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const queryParams = window.location.search;
    const mode = new URLSearchParams(queryParams).get("mode");
    const oobCode = new URLSearchParams(queryParams).get("oobCode");
    const continueUrl = new URLSearchParams(queryParams).get("continueUrl");

    if (mode && oobCode) {
      handleVerification(oobCode);
    }
  }, []);

  const handleVerification = async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError("Invalid or expired verification link.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pb-72">
      {success ? (
        <div className="text-green-500">
          Your email has been verified! Redirecting to login...
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
  );
};

export default Verify;
