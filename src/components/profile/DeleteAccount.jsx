import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/apiInstance";
import { toast } from "sonner";

export default function DeleteAccountButton() {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = () => {
    // Confirm before deleting
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleting(true);

    // API call to delete account
    api
      .delete("/users/delete-account", {
        headers: {
          token: localStorage.getItem("token"), // Pass token for authentication
        },
      })
      .then((response) => {
        toast.success(
          response.data.message || "Account deleted successfully.",
          {
            position: "top-right",
          }
        );
        setDeleting(false);

        // Optionally, redirect to the homepage or login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Give some time for the user to see the notification
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while deleting the account.",
          {
            position: "top-right",
          }
        );
        setDeleting(false);
      });
  };
  return (
    <motion.button
      className="w-full my-6 bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all duration-200"
      onClick={handleDeleteAccount}
      whileTap={{ scale: 0.98 }}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete Account"}
    </motion.button>
  );
}
