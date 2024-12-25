import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import Layout from "../../components/layout/layout";
import api from "../../lib/apiInstance";
import { toast } from "sonner";
import useAuthStore from "../../store/auth-store";
import Loading from "../../components/Loading";
import { Button } from "../../components/ui/button";

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

export default function Profile() {
  const [preview, setPreview] = useState(null); // To store the image preview URL
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
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
            "An error occurred while updating the profile."
        );
      },
    }
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
        }
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
  React.useEffect(() => {
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

  return (
    <Layout>
      {isPending ? (
        <Loading />
      ) : (
        <motion.div
          className="flex justify-center items-center p-6 bg-white"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <div className="w-[700px] p-6">
            {/* Heading */}
            <motion.h1 className="text-2xl font-bold mb-6 text-gray-900">
              Your Profile
            </motion.h1>

            {/* Profile Image Upload */}
            <div className="mb-6 flex items-center gap-4">
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
            </div>

            {/* Name Field */}
            <div className="mb-4">
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
                name="email"
                disabled
                value={data.email}
                onChange={handelemail}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Phone Field */}
            <div className="mb-4">
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
            </div>
            {/* Password Fields */}
            <motion.div className="mt-5 mb-2">
              <label className="block text-lg font-medium text-gray-700">
                Update Password
              </label>
              <div className="grid mt-5 gap-3 grid-cols-2">
                <div className="mb-4">
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
                </div>

                <div className="mb-4">
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
                </div>
                <div className="mb-4">
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
                </div>
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

              <Button
                variant="secondary"
                className="w-1/2 my-5  items-center justify-center  py-2 rounded-md  transition-all duration-200"
                onClick={handlePasswordUpdate}
                whileTap={{ scale: 0.98 }}
              >
                Update Password
              </Button>
            </motion.div>
            {/* Save Changes Button */}
            <motion.button
              className="w-full my-6 bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all duration-200"
              onClick={handleSaveChanges}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </Layout>
  );
}
