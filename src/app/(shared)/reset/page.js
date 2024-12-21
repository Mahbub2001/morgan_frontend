"use client";

import React, { useContext } from "react";
import "../login/login.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/hooks/AuthProvider";
import { setAuthToken } from "@/api/auth";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const { resetPassword, setLoading } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await resetPassword(data.email);
      alert("Password reset email sent. Check your inbox.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pb-72">
      <div className="flex flex-col gap-4 justify-center items-center bg-white p-6 rounded-lg">
        <h3 className="font-sans text-2xl tracking-widest">
          FORGET YOUR PASSWORD
        </h3>
        <p className="font-sans text-sm text-gray-600">Enter your email</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="inputBox mb-4">
            <input
              className={`input border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-gray-950"
              }`}
              type="email"
              placeholder=" "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
            <span className="text-gray-500">Email</span>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <div className="wrapper">
              <button type="submit">
                <span className="tracking-widest px-5">SUBMIT</span>
              </button>
            </div>
          </div>
        </form>
        <p className="font-thin text-xs text-gray-400">
          Don't have an account?{" "}
          <Link className="hover:text-gray-800" href="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
