import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/layout";
import api from "../../../lib/apiInstance";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const restaurantId = user?.restaurant;

  const [newTable, setNewTable] = useState({
    restaurantId: restaurantId,
    tableNumber: "",
    capacity: "",
  });
  const [editTable, setEditTable] = useState(null); // For editing tables
  const [loading, setLoading] = useState(true);

  // Fetch all tables for the restaurant
  useEffect(() => {
    if (!restaurantId) {
      console.error("Restaurant ID is missing.");
      setLoading(false);
      return;
    }
    const handleDeleteTable = (tableId) => {
      if (!window.confirm("Are you sure you want to delete this table?"))
        return;

      api
        .delete(`/tables/delete/${tableId}`, {
          headers: {
            token: localStorage.getItem("token"), // Ensure token is sent correctly
          },
        })
        .then(() => {
          setTables((prevTables) =>
            prevTables.filter((table) => table._id !== tableId)
          );
          alert("Table deleted successfully!");
        })
        .catch((error) => {
          console.error(
            "Error deleting table:",
            error.response?.data || error.message
          );
          alert("Failed to delete table. Please try again.");
        });
    };
    api
      .get(`/tables/restaurant/${restaurantId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setTables(response.data.data); // Use `data` key in response
        } else {
          console.error("No data found in API response.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching tables:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
  }, [restaurantId]);

  // Handle Input Changes for New Table
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTable({ ...newTable, [name]: value });
  };

  // Add a New Table
  const handleAddTable = (e) => {
    e.preventDefault();

    api
      .post("/tables/create", newTable, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setTables([...tables, response.data.data]); // Add the new table to the list
        }
        setNewTable({
          restaurantId: newTable.restaurantId,
          tableNumber: "",
          capacity: "",
        }); // Reset the form
        alert("Table added successfully!");
      })
      .catch((error) => {
        console.error(
          "Error adding table:",
          error.response?.data || error.message
        );
        alert("Failed to add table. Please try again.");
      });
  };

  // Update a Table
  const handleUpdateTable = (tableId) => {
    const updatedData = {
      tableNumber: editTable.tableNumber,
      capacity: editTable.capacity,
    };

    api
      .put(`/tables/update/${tableId}`, updatedData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data && response.data.table) {
          setTables((prevTables) =>
            prevTables.map((table) =>
              table._id === tableId
                ? { ...table, ...response.data.table }
                : table
            )
          );
        }
        setEditTable(null); // Clear edit state
        alert("Table updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating table:",
          error.response?.data || error.message
        );
        alert("Failed to update table. Please try again.");
      });
  };

  // Delete a Table
  const handleDeleteTable = (tableId) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;

    api
      .delete(`/tables/delete/${tableId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(() => {
        setTables((prevTables) =>
          prevTables.filter((table) => table._id !== tableId)
        );
        alert("Table deleted successfully!");
      })
      .catch((error) => {
        console.error(
          "Error deleting table:",
          error.response?.data || error.message
        );
        alert("Failed to delete table. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading tables...</div>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Tables</h1>
        {/* Add New Table Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a New Table</h2>
          <form onSubmit={handleAddTable} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Table Number</label>
              <input
                type="text"
                name="tableNumber"
                value={newTable.tableNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={newTable.capacity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Table
            </button>
          </form>
        </div>
        {/* Table List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Tables</h2>
          {!tables || tables.length === 0 ? (
            <p>No tables found for this restaurant.</p>
          ) : (
            <ul className="space-y-4">
              {tables.map((table) => (
                <li key={table._id} className="p-4 border rounded shadow">
                  <h3 className="font-bold text-lg">
                    Table Number: {table.tableNumber}
                  </h3>
                  <p className="text-gray-600">Capacity: {table.capacity}</p>
                  <button
                    onClick={() => setEditTable(table)}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTable(table._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  {editTable?._id === table._id && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateTable(table._id);
                      }}
                      className="mt-4"
                    >
                      <input
                        type="text"
                        name="tableNumber"
                        value={editTable.tableNumber}
                        onChange={(e) =>
                          setEditTable({
                            ...editTable,
                            tableNumber: e.target.value,
                          })
                        }
                        className="border p-2 mb-2 w-full"
                        placeholder="Edit table number"
                        required
                      />
                      <input
                        type="text"
                        name="capacity"
                        value={editTable.capacity}
                        onChange={(e) =>
                          setEditTable({
                            ...editTable,
                            capacity: e.target.value,
                          })
                        }
                        className="border p-2 mb-2 w-full"
                        placeholder="Edit table capacity"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded"
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
      </div>
    </Layout>
  );
}
