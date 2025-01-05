import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../../lib/apiInstance";
import { toast } from "sonner";
import useAuthStore from "../../../store/auth-store";
import { useNavigation } from "react-day-picker";

// Animation variants
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
      staggerChildren: 0.1,
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

export default function CreateRestaurant() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const { setUser, user } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cuisine: "",
    phone: "",
    openingHours: "",
    profileImage: null,
    layoutImage: null,
    galleryImages: [],
  });

  const [preview, setPreview] = useState({
    profileImage: null,
    layoutImage: null,
    galleryImages: [],
  });

  const { mutateAsync: createRestaurantMutation, isPending: creating } =
    useMutation({
      mutationKey: ["createRestaurant"],
      mutationFn: async (data) =>
        api.post("restaurants/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }),
      onSuccess: (response) => {
        console.log("Restaurant added successfully:", response.data);
        toast.success("Restaurant added successfully!");
        setUser({ ...user, restaurant: response.data.restaurant._id });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, restaurant: response.data.restaurant._id }),
        );
        navigate("/");
      },
      onError: (error) => {
        console.error(
          "Error adding restaurant:",
          error.response?.data || error.message,
        );
        toast.error("Failed to add restaurant. Please try again.");
      },
    });

  // Handle form inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (name === "galleryImages") {
      const galleryFiles = Array.from(files);
      setFormData({ ...formData, galleryImages: galleryFiles });
      setPreview({
        ...preview,
        galleryImages: galleryFiles.map((file) => URL.createObjectURL(file)),
      });
    } else {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const errors = {};
    if (!formData.name) errors.name = "Restaurant name is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.cuisine) errors.cuisine = "Cuisine type is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.openingHours)
      errors.openingHours = "Opening hours are required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors = {};
    if (!formData.profileImage)
      errors.profileImage = "Profile image is required";
    if (!formData.layoutImage) errors.layoutImage = "Layout image is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep3()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("address", formData.location);

    data.append("phone", formData.phone);
    data.append("openingHours", formData.openingHours);
    const categories = formData.cuisine.split(",").map((c) => c.trim());
    categories.forEach((category) => {
      data.append("categories", category);
    });
    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }
    if (formData.layoutImage) {
      data.append("layoutImage", formData.layoutImage);
    }
    formData.galleryImages.forEach((image, index) => {
      data.append(`galleryImages`, image);
    });

    createRestaurantMutation(data);
  };

  // Proceed to next step
  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  // Go back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            variants={formVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl font-bold mb-4">Restaurant Details</h2>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter restaurant name"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cuisine"
              >
                Categories
              </label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
                placeholder="e.g., Italian, Chinese, Indian"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.cuisine && (
                <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>
              )}
            </motion.div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={nextStep}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Next
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            variants={formVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="openingHours"
              >
                Opening Hours
              </label>
              <input
                type="text"
                id="openingHours"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleInputChange}
                placeholder="Enter opening hours"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.openingHours && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.openingHours}
                </p>
              )}
            </motion.div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Next
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            variants={formVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-xl font-bold mb-4">Images</h2>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="profileImage"
              >
                Upload Profile Image
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-500 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {preview.profileImage && (
                <div className="mt-4">
                  <img
                    src={preview.profileImage}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                </div>
              )}
              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profileImage}
                </p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="layoutImage"
              >
                Upload Layout Image
              </label>
              <input
                type="file"
                id="layoutImage"
                name="layoutImage"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-500 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {preview.layoutImage && (
                <div className="mt-4">
                  <img
                    src={preview.layoutImage}
                    alt="Layout Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                </div>
              )}
              {errors.layoutImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.layoutImage}
                </p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="galleryImages"
              >
                Upload Gallery Images
              </label>
              <input
                type="file"
                id="galleryImages"
                name="galleryImages"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-gray-500 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {preview.galleryImages.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-4">
                  {preview.galleryImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Gallery Preview ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </motion.div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                disabled={creating}
              >
                {creating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-600 to-red-500">
      <motion.div
        className="w-full max-w-4xl bg-white shadow-md rounded-md p-6"
        variants={formVariants}
        initial="initial"
        animate="animate"
      >
        <span className="flex justify-center text-4xl mb-8 mt-2 items-center space-x-2 text-red-600">
          <span className="font-bold font-OkineSans">Ihjiz</span> <span>|</span>
          <span className="font-bold font-Arab">احجز</span>
        </span>

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to the Restaurant Onboarding
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Let's get started by adding your restaurant details. Follow the steps
          below to complete your profile.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStepContent()}
        </form>
      </motion.div>
    </div>
  );
}
