import React, { useState } from "react";
import api from "../../lib/apiInstance";
import Layout from "../../components/layout/layout";

export default function AddRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cuisine: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle form inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // Preview uploaded image
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("cuisine", formData.cuisine);
    if (formData.image) {
      data.append("image", formData.image);
    }

    // API call
    api
      .post("restaurants/create", formData, {
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
  //
  //     api
  //       .post("restaurants/create", data, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         console.log("Restaurant added successfully:", response.data);
  //         alert("Restaurant added successfully!");
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error adding restaurant:",
  //           error.response?.data || error.message
  //         );
  //         alert("Failed to add restaurant. Please try again.");
  //       });
  //   };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Restaurant
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant Name */}
          <div>
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
          </div>

          {/* Location */}
          <div>
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
          </div>

          {/* Cuisine */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="cuisine"
            >
              Cuisine Type
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
          </div>

          {/* Image Upload */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-gray-500 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all duration-200"
          >
            Add Restaurant
          </button>
        </form>
      </div>
    </Layout>
  );
}
