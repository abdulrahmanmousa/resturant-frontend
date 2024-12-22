import React from "react";
import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";
export default function UpdatePassword() {
  return (
    <div>
      <Layout>
        <div className="min-h-screen flex items-center justify-center ">
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Change Password
            </h2>

            <form className="space-y-4">
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

              <Link
                to="/update_password"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-center block"
              >
                submit
              </Link>
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
