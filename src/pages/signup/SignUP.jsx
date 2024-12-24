import React from "react";
import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { use } from "react";
import { useState, useEffect } from "react";
import api from "../../lib/apiInstance";

export default function SignUp() {
  const [preview, setPreview] = useState(null); // To store the image preview URL

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: null, // Image file
  });

  // Handle input changes
  const handelname = (e) => setData({ ...data, name: e.target.value });
  const handelemail = (e) => setData({ ...data, email: e.target.value });
  const handelpassword = (e) => setData({ ...data, password: e.target.value });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, image: file });
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Handle form submission
  const onsubmit = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.image) {
      formData.append("image", data.image); // Append image file
    }

    // API call
    api
      .post("users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
      });
  };

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
        ease: [0.23, 1, 0.32, 1], // iOS-like easing
      },
    },
  };

  const formVariants = {
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

  return (
    <Layout>
      <motion.div
        className="flex justify-center items-center p-6 bg-white"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <div className="w-[700px] p-6">
          {/* Heading */}
          <motion.h1
            className="text-2xl font-bold mb-6 text-gray-900"
            variants={formVariants}
          >
            Welcome back!
          </motion.h1>

          <div className="w-[700px] p-6">
            {/* Profile Image Upload */}
            <div className="mb-6 flex items-center gap-4">
              {/* Hidden Input and Image Button */}
              <label
                htmlFor="imageUpload"
                className="w-24 h-24 rounded-full overflow-hidden border shadow-sm cursor-pointer relative"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full px-5 bg-gray-200 flex items-center justify-center text-gray-500">
                    Upload Image
                  </div>
                )}
                {/* Hidden Input */}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Name Fields */}
          <motion.div
            className="grid gap-3 grid-cols-2"
            variants={formVariants}
          >
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                onChange={handelname}
                placeholder="Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div className="mb-4" variants={formVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              onChange={handelemail}
              id="email"
              placeholder="Email"
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            />
          </motion.div>

          {/* Phone */}
          <motion.div className="mb-4" variants={formVariants}>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="(123) 456-7890"
              className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            />
          </motion.div>

          {/* Password Fields */}
          <motion.div className="mt-5 mb-2" variants={formVariants}>
            <label className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <div className="grid mt-5 gap-3 grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={handelpassword}
                  id="password"
                  placeholder="Password"
                  className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                />
              </div>
            </div>
          </motion.div>

          {/* Sign Up Button */}
          <motion.button
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all duration-200"
            variants={formVariants}
            onClick={onsubmit}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>

          {/* Login Link */}
          <motion.div
            className="text-center my-4 text-sm text-gray-500"
            variants={formVariants}
          >
            Already have an account?
          </motion.div>

          <Link to="/login">
            <motion.button
              className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 transition-all duration-200"
              variants={formVariants}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </Link>

          {/* Social Login Options */}
          <motion.div
            variants={formVariants}
            className="text-center mt-6 text-gray-500 text-sm"
          >
            Or continue with
          </motion.div>
          <motion.div
            variants={formVariants}
            className="flex justify-center mt-4 gap-4"
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
    </Layout>
  );
}
