import React from "react";
import Layout from "../../components/layout/layout";
import { motion } from "framer-motion";
import api from "../../lib/apiInstance";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
export default function UpdatePassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
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

  // create update password takes token and newPassowrd with api.patch '/users/reset-password'

  const navigate = useNavigate();

  const updatePassword = (token, newPassword) => {
    api
      .post("/users/reset-password", { resetToken: token, newPassword })
      .then((response) => {
        console.log("Success:", response.data);
        toast.success("Password updated successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    updatePassword(token, newPassword);
  };
  return (
    <div>
      <Layout>
        <div className="h-[50vh] flex items-center justify-center ">
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Change Password
            </h2>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your new password"
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Confirm your new password"
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <motion.button
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-md  transition-all duration-200"
                variants={contentVariants}
                whileTap={{ scale: 0.98 }}
              >
                Submit
              </motion.button>
            </form>
            <div className="text-center text-gray-600 mt-4">
              <Link to="/login" className="text-red-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
