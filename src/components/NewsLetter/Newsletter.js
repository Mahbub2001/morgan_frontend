"use client";

import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Email Registered: ${email}`);
  // };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-end container mx-auto">
        <div className="mt-5 flex items-center space-x-4 text-sm text-gray-600">
          <span className="hover:text-blue-600 cursor-pointer">UK</span>
          <span>|</span>
          <span className="hover:text-blue-600 cursor-pointer">INT</span>
          <span>|</span>
          <span className="hover:text-blue-600 cursor-pointer">SEE</span>
        </div>
      </div>
      <div className="container mx-auto flex flex-col items-center p-8">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Join Our Newsletter
        </h3>
        <p className="text-sm font-thin text-gray-600 mb-6">
          Sign up and receive a{" "}
          <span className="font-thin text-blue-600">10% discount</span> on your
          first order!
        </p>
        <form
          // onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center w-full max-w-md border-b-[1px] border-black"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full md:w-3/4 p-2 bg-transparent focus:outline-0 placeholder-black text-sm"
          />
          <button type="submit" className="text-sm transition duration-300">
            Subscribe
          </button>
        </form>
      </div>
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default Newsletter;
