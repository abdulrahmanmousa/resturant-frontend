import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import api from "../../lib/apiInstance";
import { useParams } from "react-router-dom";

export default function BookTable() {
  const [guestCount, setGuestCount] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { id } = useParams(); // Access the route parameter

  const handleSubmit = (event) => {
    event.preventDefault();

    const reservationData = {
      tableId: "676329211b8c53a1b06d4117",
      restaurantId: id,
      date,
      time,
      guestCount,
    };

    api
      .post("/reservations/create", reservationData)
      .then((response) => {
        console.log("Reservation Created Successfully:", response.data);
        alert("Table booked successfully!");
      })
      .catch((error) => {
        console.error(
          "Error creating reservation:",
          error.response?.data || error.message
        );
        alert("Failed to book the table. Please try again.");
      });
  };

  return (
    <div>
      <div className="mt-8 w-2/4 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <Select onValueChange={(value) => setGuestCount(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose guest count" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <SelectItem key={count} value={count}>
                  {count}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
          >
            Find a Table
          </button>
        </form>
      </div>
    </div>
  );
}
