import React, { useEffect, useState } from "react";
import api from "../../../lib/apiInstance";
import moment from "moment";
import Layout from "../../../components/layout/layout";
import PageLoading from "../../../components/PageLoading";

export default function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user reservations
  useEffect(() => {
    api
      .get("/reservations/user", {
        headers: {
          token: localStorage.getItem("token"), // Include token in headers
        },
      }) // API endpoint to get user reservations

      .then((response) => {
        setReservations(response.data.reservations); // Assuming the API returns reservations in this format
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching reservations:",
          error.response?.data || error.message,
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <PageLoading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Reservations</h1>
        {reservations.length === 0 ? (
          <div className="text-center text-gray-500">
            No reservations found.
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Table</th>
                <th className="border border-gray-300 px-4 py-2">Meals</th>
                <th className="border border-gray-300 px-4 py-2">
                  Date & Time
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation._id} className="text-center">
                  {/* Serial Number */}
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
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
                    {reservation.mealId.map((meal) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
