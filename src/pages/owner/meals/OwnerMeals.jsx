import React, { useState, useEffect } from "react";
import api from "../../../lib/apiInstance"; // Your API instance
import Layout from "../../../components/layout/layout";

export default function OwnerMeals() {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: "",
    desc: "",
    price: "",
    restaurantId: "67769fff29bc3a6e219576c2", // Replace with dynamic value if needed
    image: null,
  });
  const [editMeal, setEditMeal] = useState(null); // Meal to edit
  const [loading, setLoading] = useState(true);

  // Fetch Meals for the Restaurant
  useEffect(() => {
    const restaurantId = newMeal.restaurantId;
    api
      .get(`/meals/restaurant/${restaurantId}`, {
        headers: {
          token: localStorage.getItem("token"), // Include token in headers
        },
      })
      .then((response) => {
        setMeals(response.data.meals); // Assuming `meals` is the key in the response
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching meals:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
  }, []);

  // Handle Input Changes for New Meal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({ ...newMeal, [name]: value });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    setNewMeal({ ...newMeal, image: e.target.files[0] });
  };

  // Add a New Meal
  const handleAddMeal = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newMeal.name);
    formData.append("desc", newMeal.desc);
    formData.append("price", newMeal.price);
    formData.append("restaurantId", newMeal.restaurantId);
    if (newMeal.image) {
      formData.append("image", newMeal.image);
    }

    api
      .post("/meals/create", formData, {
        headers: {
          token: localStorage.getItem("token"), // Include token in headers

          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMeals([...meals, response.data.meal]); // Add the new meal to the list
        setNewMeal({
          name: "",
          desc: "",
          price: "",
          restaurantId: newMeal.restaurantId,
          image: null,
        }); // Reset the form
        alert("Meal added successfully!");
      })
      .catch((error) => {
        console.error(
          "Error adding meal:",
          error.response?.data || error.message
        );
        alert("Failed to add meal. Please try again.");
      });
  };

  // Update Meal
  const handleUpdateMeal = (mealId) => {
    const formData = new FormData();
    formData.append("name", editMeal.name);
    formData.append("desc", editMeal.desc);
    formData.append("price", editMeal.price);
    if (editMeal.image) {
      formData.append("image", editMeal.image);
    }

    api
      .put(`/meals/update/${mealId}`, formData, {
        headers: {
          token: localStorage.getItem("token"), // Include token in headers

          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal._id === mealId ? { ...meal, ...response.data.meal } : meal
          )
        );
        setEditMeal(null); // Clear edit state
        alert("Meal updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating meal:",
          error.response?.data || error.message
        );
        alert("Failed to update meal. Please try again.");
      });
  };

  // Delete Meal
  const handleDeleteMeal = (mealId) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;

    api
      .delete(`/meals/delete/${mealId}`, {
        headers: {
          token: localStorage.getItem("token"), // Include token in headers
        },
      })
      .then(() => {
        setMeals((prevMeals) =>
          prevMeals.filter((meal) => meal._id !== mealId)
        );
        alert("Meal deleted successfully!");
      })
      .catch((error) => {
        console.error(
          "Error deleting meal:",
          error.response?.data || error.message
        );
        alert("Failed to delete meal. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading meals...</div>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Owner Meals</h1>

        {/* Meal List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Existing Meals</h2>
          {meals.length === 0 ? (
            <p>No meals found for this restaurant.</p>
          ) : (
            <ul className="space-y-4">
              {meals.map((meal) => (
                <li key={meal._id} className="p-4 border rounded shadow">
                  <h3 className="font-bold text-lg">{meal.name}</h3>
                  <p>{meal.desc}</p>
                  <p className="text-gray-600">Price: ${meal.price}</p>
                  <button
                    onClick={() => setEditMeal(meal)}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMeal(meal._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  {editMeal?._id === meal._id && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateMeal(meal._id);
                      }}
                      className="mt-4"
                    >
                      <input
                        type="text"
                        name="name"
                        value={editMeal.name}
                        onChange={(e) =>
                          setEditMeal({ ...editMeal, name: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                        placeholder="Edit meal name"
                      />
                      <input
                        type="text"
                        name="desc"
                        value={editMeal.desc}
                        onChange={(e) =>
                          setEditMeal({ ...editMeal, desc: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                        placeholder="Edit meal description"
                      />
                      <input
                        type="text"
                        name="price"
                        value={editMeal.price}
                        onChange={(e) =>
                          setEditMeal({ ...editMeal, price: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                        placeholder="Edit meal price"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add New Meal Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Add a New Meal</h2>
          <form onSubmit={handleAddMeal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Meal Name</label>
              <input
                type="text"
                name="name"
                value={newMeal.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="desc"
                value={newMeal.desc}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={newMeal.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Meal
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
