import React from "react";
import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";

export default function SignUP() {
  return (
    <Layout>
      <div className="flex justify-center items-center p-6  bg-white">
        <div className="w-[700px] p-6">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Welcome back!
          </h1>
          {/* name */}
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-4  ">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Frist Name
              </label>
              <input
                type="name"
                id="name"
                placeholder="Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="mb-4  ">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="name"
                id="name"
                placeholder="Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>
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
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          {/* phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              placeholder="(123) 456-7890"
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className=" mt-5 mb-2">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <div className="grid mt-5 gap-3 grid-cols-2">
              <div className="mb-4  ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="name"
                  placeholder="password"
                  className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="mb-4  ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="name"
                  placeholder="Confirm Password"
                  className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          {/* <div className="text-right mb-6">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div> */}

          {/* Log In Button */}
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
            Sign Up
          </button>

          {/* Divider */}
          <div className="text-center my-4 text-sm text-gray-500">
            already have an account?
          </div>

          {/* Create Account Button */}
          <Link to="/login">
            <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 transition">
              Login
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
    </Layout>
  );
}
