import React from "react";
import "./login.css";
import Link from "next/link";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen pb-72">
      <div className="flex flex-col gap-4 justify-center items-center bg-white p-6 rounded-lg">
        <h3 className="font-sans text-2xl tracking-widest">LOGIN</h3>
        <p className="font-sans text-sm text-gray-600">
          Enter your email and password to login
        </p>
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
          <Link
            href="#"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-thin text-gray-500 hover:text-gray-700"
          >
            Forgot your password?
          </Link>
        </div>
        <div>
          <div className="wrapper">
            <button>
              <span className="tracking-widest px-5">LOGIN</span>
            </button>
          </div>
        </div>
        <p className="font-thin text-xs text-gray-400">Don't have an account? <Link className="hover:text-gray-800" href="/register">Sign up</Link> </p>
      </div>
    </div>
  );
}

export default Login;
