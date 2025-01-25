import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../../lib/apiInstance";
import { useNavigate, useParams } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import useAuthStore from "../../store/auth-store";

export default function BookTable() {
  const [guestCount, setGuestCount] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );
  const [tableId, setTableId] = useState(null);
  const { id } = useParams(); // Access the route parameter
  const { user } = useAuthStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    const reservationData = {
      tableId,
      restaurantId: id,
      date,
      time,
      guestCount,
    };

    createReservation(reservationData);
  };

  const navigate = useNavigate();

  // Fetch tables for the restaurant
  const { data } = useQuery({
    queryFn: () =>
      api.get(`/tables/restaurant/${id}`).then((res) => res.data.data),
    queryKey: ["tables", id],
  });

  const { mutateAsync: createReservation, isPending: creating } = useMutation({
    mutationFn: (reservationData) =>
      api.post("/reservations/create", reservationData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    onSuccess: (data) => {
      console.log("Reservation Created Successfully:", data);
      toast.success("Table booked successfully!");
      navigate("/user/reservations");
    },
    onError: (error) => {
      console.error(
        "Error creating reservation:",
        error.response?.data || error.message,
      );
      toast.error("Failed to book the table. Please try again.");
    },
  });

  const tables = data || [];

  return (
    <>
      <div className="w-3/4 mx-auto relative gap-2 pt-10">
        <h1 className="text-4xl font-bold text-center py-4 text-gray-800">
          Table Availability
        </h1>
        <img
          src="https://i.pinimg.com/736x/3d/5b/a8/3d5ba8dbfc44cb0289960774e742c38e.jpg"
          alt="Table Layout"
          className="max-w-[70vw] mx-auto object-cover rounded-3xl overflow-hidden max-h-[60vh]"
        />
        <div className="grid gap-3 mt-6">
          <div className="grid grid-cols-4 gap-4 p-4">
            {tables.map((table) => (
              <div
                onClick={() => setTableId(table._id)}
                key={table._id}
                className={cn(
                  "flex flex-row items-start justify-start gap-4 cursor-pointer p-4 rounded-xl border shadow-sm",
                  {
                    "border-blue-500": tableId === table._id,
                  },
                )}
              >
                <UtensilsCrossed />
                <div className="flex flex-col">
                  <h1 className="font-bold">Table {table.tableNumber}</h1>
                  <p className="text-sm">Capacity: {table.capacity}</p>
                  <p
                    className={`text-sm font-bold ${
                      table.status === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {table.status.charAt(0).toUpperCase() +
                      table.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="mt-8 w-2/4 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="Guest Count"
              required
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <button
              onClick={handleSubmit}
              disabled={!tableId || !guestCount || !date || !time || creating}
              className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 disabled:opacity-50"
            >
              {creating ? "Booking..." : "Book Table"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
