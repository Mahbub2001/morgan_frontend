"use client";
import Link from "next/link";
import React, { useContext } from "react";
import "../login/login.css";
import { AuthContext } from "@/hooks/AuthProvider";
import { useForm } from "react-hook-form";
import { setAuthToken, setAuthToken1 } from "@/api/auth";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

function Register() {
   const { register: registerUser, setLoading } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { firstName, lastName, email, password } = data;

    try {
      const result = await registerUser({
        email,
        password,
        firstName,
        lastName
      });

      if (result) {
        router.push("/login");
        alert("Registration successful! Please check your email to verify your account.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen pb-72">
      <form
        className="flex flex-col gap-4 justify-center items-center bg-white p-6 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-sans text-2xl tracking-widest">SIGN UP</h3>
        <p className="font-sans text-sm text-gray-600">
          Enter your details to create an account
        </p>

        <div className="inputBox">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder=" "
          />
          <span className="text-gray-500">First Name</span>
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName.message}</p>
          )}
        </div>

        <div className="inputBox">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder=" "
          />
          <span className="text-gray-500">Last Name</span>
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
          )}
        </div>

        <div className="inputBox">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
            placeholder=" "
          />
          <span className="text-gray-500">Email</span>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="inputBox relative">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder=" "
          />
          <span className="text-gray-500">Password</span>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full">
          <div className="wrapper">
            <button type="submit">
              <span className="tracking-wider ff px-5">CREATE ACCOUNT</span>
            </button>
          </div>
        </div>

        <p className="font-thin text-xs text-gray-400">
          Already have an account?{" "}
          <Link className="hover:text-gray-800" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
