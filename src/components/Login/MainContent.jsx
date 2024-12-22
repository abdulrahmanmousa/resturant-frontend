import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import api from "../../lib/apiInstance";
import { Form } from "react-hook-form";
export default function MainContent() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {}, []);
  const onsubmit = () => {
    api
      .post("/users/signin", data)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
      });
    console.log(data);
  };

  // iOS-like smooth animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1], // iOS easing curve
      },
    },
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const handleEmail = (e) => setData({ ...data, email: e.target.value });
  const handlepassword = (e) => setData({ ...data, password: e.target.value });

  return (
    <motion.div
      className="flex justify-center items-center bg-white"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div className="w-[400px] p-6">
        {/* Heading */}
        <motion.h1
          className="text-2xl font-bold mb-6 text-gray-900"
          variants={contentVariants}
        >
          Welcome back!
        </motion.h1>
        {/* Email Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onsubmit();
          }}
        >
          {" "}
          <motion.div className="mb-4" variants={contentVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              onChange={handleEmail}
              id="email"
              placeholder="Email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            />
          </motion.div>
          {/* Password Field */}
          <motion.div className="mb-2" variants={contentVariants}>
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
              onChange={handlepassword}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            />
          </motion.div>
          {/* Forgot Password */}
          <motion.div className="text-right mb-6" variants={contentVariants}>
            <Link
              to="/forgot_password"
              className="text-sm text-gray-500 hover:underline transition-all duration-200"
            >
              Forgot password?
            </Link>
          </motion.div>
          {/* Log In Button */}
          <motion.button
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all duration-200"
            variants={contentVariants}
            onClick={(e) => {
              e.preventDefault(), onsubmit();
            }}
            whileTap={{ scale: 0.98 }}
          >
            Log in
          </motion.button>
        </form>
        {/* Divider */}
        <motion.div
          className="text-center my-4 text-sm text-gray-500"
          variants={contentVariants}
        >
          Don't have an account?
        </motion.div>
        {/* Create Account Button */}
        <Link to="/register">
          <motion.button
            className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 transition-all duration-200"
            variants={contentVariants}
            whileTap={{ scale: 0.98 }}
          >
            Create an account
          </motion.button>
        </Link>
        {/* Continue with Options */}
        <motion.div
          className="text-center mt-6 text-gray-500 text-sm"
          variants={contentVariants}
        >
          Or continue with
        </motion.div>
        <motion.div
          className="flex justify-center mt-4 gap-4"
          variants={contentVariants}
        >
          <motion.button
            className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
            whileTap={{ scale: 0.98 }}
          >
            Google
          </motion.button>
          <motion.button
            className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
            whileTap={{ scale: 0.98 }}
          >
            Apple
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
