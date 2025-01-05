import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import Layout from "../../components/layout/layout";
import api from "../../lib/apiInstance";
import { toast } from "sonner";
import useAuthStore from "../../store/auth-store";
import { Button } from "../../components/ui/button";
import DeleteAccountButton from "../../components/profile/DeleteAccount";
import PageLoading from "../../components/PageLoading";
import { AnimatePresence } from "framer-motion";

const formVariants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.1, // Add staggerChildren to create a staggered animation effect
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function Profile() {
  const [preview, setPreview] = useState(null); // To store the image preview URL
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const { setUser, user } = useAuthStore();

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.image) {
      formData.append("image", data.image);
    }
    updateProfileMutation(formData);
  };

  const { mutateAsync: updateProfileMutation, isPending: saving } = useMutation(
    {
      mutationFn: (data) =>
        api.put("/users/update", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }),

      onSuccess: (res) => {
        toast.success("Profile updated successfully!");
        refetch();
        const updatedUser = { ...user, ...res.data.user };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      },
      onError: (error) => {
        console.error("Error response:", error.response);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating the profile.",
        );
      },
    },
  );

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData({ ...passwordData, [id]: value });
  };

  const handlePasswordUpdate = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    } else if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError(""); // Clear any existing errors

    // API call to update password
    api
      .patch(
        "/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            token: localStorage.getItem("token"), // Include token in headers
          },
        },
      )
      .then((response) => {
        toast.success("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }); // Clear password fields
      })
      .catch(() => {
        setPasswordError("An error occurred while updating the password.");
      });
  };

  const {
    data: profileData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryFn: () =>
      api
        .get("/users/profile", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => res.data.user), // Fetch user profile
    queryKey: ["userProfile"],
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null, // Image file
  });

  // Populate the form with profile data once it's loaded
  useEffect(() => {
    if (profileData) {
      setData({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        image: profileData.image,
      });
      if (profileData.image) {
        setPreview(profileData.image.secure_url); // Set preview if image exists
      }
    }
  }, [profileData]);

  // Handle input changes
  const handelname = (e) => setData({ ...data, name: e.target.value });
  const handelemail = (e) => setData({ ...data, email: e.target.value });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, image: file });
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  useEffect(() => {
    const responseData = JSON.stringify({
      name: profileData?.name,
      email: profileData?.email,
      phone: profileData?.phone,
      image: profileData?.image,
    });
    const formProfile = JSON.stringify(data);
    console.log(responseData, formProfile);
    if (responseData === formProfile) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  }, [profileData, data]);

  return (
    <Layout>
      {isPending ? (
        <PageLoading />
      ) : (
        <motion.div
          className="flex justify-center items-center p-6 bg-white"
          initial="initial"
          animate="animate"
          variants={formVariants}
        >
          <motion.div className="w-[700px] p-6" variants={itemVariants}>
            {/* Heading */}
            <motion.div
              className="flex items-center mb-6 justify-between"
              variants={itemVariants}
            >
              {/* Save Changes Button */}

              <motion.h1
                className="text-2xl font-bold text-gray-900"
                variants={itemVariants}
              >
                Your Profile
              </motion.h1>

              <AnimatePresence>
                {showSaveButton && (
                  <motion.button
                    className="w-fit px-2  bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                    onClick={handleSaveChanges}
                    whileTap={{ scale: 0.98 }}
                    disabled={saving}
                    variants={itemVariants}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
            {/* Profile Image Upload */}
            <motion.div
              className="mb-6 flex items-center gap-4"
              variants={itemVariants}
            >
              <label
                htmlFor="imageUpload"
                className="w-24 h-24 rounded-full overflow-hidden border shadow-sm cursor-pointer relative"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </motion.div>

            {/* Name Field */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handelname}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                disabled
                value={data.email}
                onChange={handelemail}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </motion.div>

            {/* Phone Field */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </motion.div>
            {/* Password Fields */}
            <motion.div className="mt-5 mb-2" variants={itemVariants}>
              <label className="block text-lg font-medium text-gray-700">
                Update Password
              </label>
              <div className="grid mt-5 gap-3 grid-cols-2">
                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                    className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                  />
                </motion.div>

                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm New Password"
                    className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                  />
                </motion.div>
                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current Password"
                    className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                  />
                </motion.div>
              </div>

              {passwordError && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={itemVariants}
                >
                  {passwordError}
                </motion.p>
              )}

              {passwordData?.newPassword?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between"
                >
                  <Button
                    variant="outline"
                    className="w-1/2 my-5  items-center justify-center  py-2 rounded-md  transition-all duration-200"
                    onClick={handlePasswordUpdate}
                    whileTap={{ scale: 0.98 }}
                  >
                    Update Password
                  </Button>
                </motion.div>
              )}
            </motion.div>
            <DeleteAccountButton />
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
