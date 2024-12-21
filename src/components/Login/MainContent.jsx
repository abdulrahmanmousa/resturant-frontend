import React from "react";
import { Link } from "react-router-dom";

export default function MainContent() {
  return (
    <div className="flex justify-center items-center  bg-white">
      <div className="w-[400px] p-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Welcome back!</h1>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Password Field */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <Link to="/forgot_password">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
          </Link>
        </div>

        {/* Log In Button */}
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
          Log in
        </button>

        {/* Divider */}
        <div className="text-center my-4 text-sm text-gray-500">
          Don't have an account?
        </div>

        {/* Create Account Button */}
        <Link to="/register">
          <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 transition">
            Create an account
          </button>
        </Link>

        {/* Continue with Options */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          Or continue with
        </div>
        <div className="flex justify-center mt-4 gap-4">
          <button className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            Google
          </button>
          <button className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}
