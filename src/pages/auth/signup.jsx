import React from "react";
import Layout from "../../components/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import api from "../../lib/apiInstance";
import { toast } from "sonner";

export default function SignUp() {
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    image: null,
  });

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{11}$/;
    return regex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(data.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!data.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setData({ ...data, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onsubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("phone", data.phone);
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const response = await api.post("users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsSubmitting(false);
    }
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
        ease: [0.23, 1, 0.32, 1],
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
          <motion.h1
            className="text-2xl font-bold mb-6 text-gray-900"
            variants={formVariants}
          >
            Create an Account
          </motion.h1>

          {/* Profile Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
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
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Upload
                  </div>
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
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
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div className="mb-4" variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </motion.div>

          {/* Phone Field */}
          <motion.div className="mb-4" variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </motion.div>

          {/* Password Fields */}
          <motion.div
            className="grid gap-3 grid-cols-2"
            variants={formVariants}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className={`mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
                className={`mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </motion.div>

          {/* Role Selection */}
          <motion.div className="mb-6" variants={formVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="restaurantOwner"
                  checked={data.role === "restaurantOwner"}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  className="form-radio text-red-600"
                />
                <span>Restaurant Owner</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  checked={data.role === "user"}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  className="form-radio text-red-600"
                />
                <span>User</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            className={`w-full bg-red-500 text-white py-2 rounded-md transition-all duration-200 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-600"
            }`}
            variants={formVariants}
            onClick={onsubmit}
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </motion.button>

          {/* Login Link */}
          <motion.div
            className="text-center mt-4 text-sm text-gray-600"
            variants={formVariants}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-600">
              Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
