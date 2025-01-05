import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../lib/apiInstance";
import { use } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState(""); // Simplified email state
  const [isSending, setIsSending] = useState(false); // State for loading button text
  const [error, setError] = useState(null); // State for handling errors

  const handleEmailChange = (e) => setEmail(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsSending(true);
    setError(null);

    api
      .post("users/forgot-password", { email })
      .then((response) => {
        console.log("Success:", response.data);
        setIsSending(false);
      })
      .catch((error) => {
        setError(
          error.response?.data?.message || "An unexpected error occurred."
        );
        setIsSending(false);
      });
  };

  return (
    <Layout>
      <motion.div
        className="flex justify-center items-center bg-white"
        initial="initial"
        animate="animate"
      >
        <div className="h-[50vh] flex items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Forgot Password?
            </h2>
            <p className="text-center text-gray-600">
              Enter your email to reset your password
            </p>
            <form className="space-y-4" onSubmit={onSubmit}>
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
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <motion.button
                className="w-full my-6 bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                type="submit"
                whileTap={{ scale: 0.98 }}
                disabled={isSending}
              >
                {isSending ? "Email Sending..." : "Send Email"}
              </motion.button>
            </form>
            {error && (
              <div className="text-center text-red-500 mt-2">{error}</div>
            )}
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
