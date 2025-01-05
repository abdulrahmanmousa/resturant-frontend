import React, { useEffect, useState } from "react";
import api from "../../lib/apiInstance";
import moment from "moment";
import Layout from "../../components/layout/layout";
import { useParams } from "react-router-dom";

export default function AdminReservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const restaurantId = useParams()
  const restaurantId = JSON.parse(localStorage.getItem("user")).restaurant;
  // Fetch reservations from the API
  useEffect(() => {
    api
      .get(`/reservations/restaurant/${restaurantId}`, {
        headers: {
          restaurantId: JSON.parse(localStorage.getItem("user")).restaurant, // Parse user object to access the restaurant ID
          token: localStorage.getItem("token"), // Include token in headers
        },
      }) // Using the relative path with api instance
      .then((response) => {
        setReservations(response.data.reservations); // Assuming reservations key in the response
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching reservations:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
  }, []);

  // Handle status updates
  const updateStatus = (reservationId, newStatus) => {
    api
      .patch(`/reservations/${reservationId}`, { status: newStatus })
      .then((response) => {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === reservationId
              ? { ...reservation, status: newStatus }
              : reservation
          )
        );
        alert("Status updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating status:",
          error.response?.data || error.message
        );
        alert("Failed to update status. Please try again.");
      });
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-10">Loading your reservations...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          Admin Reservation Management
        </h1>
        {reservations.length === 0 ? (
          <div className="text-center text-gray-500">
            No reservations found.
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">User</th>
                <th className="border border-gray-300 px-4 py-2">Table</th>
                <th className="border border-gray-300 px-4 py-2">Meals</th>
                <th className="border border-gray-300 px-4 py-2">
                  Date & Time
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation._id} className="text-center">
                  {/* Serial Number */}
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>

                  {/* User Details */}
                  <td className="border border-gray-300 px-4 py-2">
                    <div>
                      <p className="font-medium">{reservation.userId.name}</p>
                      <p className="text-sm text-gray-500">
                        {reservation.userId.email}
                      </p>
                    </div>
                  </td>

                  {/* Table Details */}
                  <td className="border border-gray-300 px-4 py-2">
                    <p>Table #{reservation.tableId.tableNumber}</p>
                    <p className="text-sm text-gray-500">
                      Capacity: {reservation.tableId.capacity}
                    </p>
                  </td>

                  {/* Meals */}
                  <td className="border border-gray-300 px-4 py-2">
                    {reservation.mealId.map((meal, idx) => (
                      <div key={meal._id}>
                        <p>
                          Meal ID: {meal.meal}, Quantity: {meal.quantity}
                        </p>
                      </div>
                    ))}
                  </td>

                  {/* Date & Time */}
                  <td className="border border-gray-300 px-4 py-2">
                    <p>{moment(reservation.date).format("MMMM Do, YYYY")}</p>
                    <p className="text-sm text-gray-500">{reservation.time}</p>
                  </td>

                  {/* Status */}
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        reservation.status === "reserved"
                          ? "bg-green-200 text-green-800"
                          : reservation.status === "cancelled"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2">
                    {reservation.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          updateStatus(reservation._id, "cancelled")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                    {reservation.status === "cancelled" && (
                      <button
                        onClick={() =>
                          updateStatus(reservation._id, "reserved")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
