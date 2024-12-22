import React from "react";
import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgetPassword() {
  return (
    <Layout>
      <motion.div
        className="flex justify-center items-center bg-white"
        initial="initial"
        animate="animate"
      >
        <div className="h-[50vh] flex items-center justify-center ">
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Forgot Password?
            </h2>
            <p className="text-center text-gray-600">
              Enter your email to reset your password
            </p>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <Link
                to="/update_password"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-center block"
              >
                Send Reset Link
              </Link>
            </form>
            <div className="text-center text-gray-600 mt-4">
              <Link to="/login" className="text-red-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
