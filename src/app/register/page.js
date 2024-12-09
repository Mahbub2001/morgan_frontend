import Link from "next/link";
import React from "react";
import '../login/login.css'

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen pb-72">
      <div className="flex flex-col gap-4 justify-center items-center bg-white p-6 rounded-lg">
        <h3 className="font-sans text-2xl tracking-widest">SIGN UP</h3>
        <p className="font-sans text-sm text-gray-600">
          Enter your email and password to login
        </p>
        <div className="inputBox">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="text"
            required="required"
            name="firstName"
            placeholder=" "
          />
          <span className="text-gray-500">First Name</span>
        </div>
        <div className="inputBox ">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="text"
            required="required"
            name="lastName"
            placeholder=" "
          />
          <span className="text-gray-500">Last Name</span>
        </div>
        <div className="inputBox ">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="email"
            required="required"
            name="email"
            placeholder=" "
          />
          <span className="text-gray-500">Email</span>
        </div>
        <div className="inputBox relative">
          <input
            className="input border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-950"
            type="password"
            required="required"
            name="password"
            placeholder=" "
          />
          <span className="text-gray-500">Password</span>
          <a
            href="#"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-thin text-gray-500 hover:text-gray-700"
          >
            Forgot your password?
          </a>
        </div>
        <div>
          <div className="wrapper">
            <button>
              <span className="tracking-wider ff px-5">CREATE ACCOUNT</span>
            </button>
          </div>
        </div>
        <p className="font-thin text-xs text-gray-400">
          Already have an account?{" "}
          <Link className="hover:text-gray-800" href="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Register;
