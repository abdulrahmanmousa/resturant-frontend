import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import api from "../../lib/apiInstance";

export default function TableAvailability() {
  const { id: restaurantId } = useParams();

  // Fetch tables for the restaurant
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      api
        .get(`/tables/restaurant/${restaurantId}`)
        .then((res) => res.data.data),
    queryKey: ["tables", restaurantId],
  });

  if (isLoading) {
    return <p className="text-center">Loading table availability...</p>;
  }

  if (error || !data) {
    return <p className="text-center text-red-500">Error fetching tables.</p>;
  }

  const tables = data;

  return (
    <div className="w-3/4 mx-auto relative gap-2">
      <h1 className="text-4xl font-bold text-center text-gray-800">
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
              key={table._id}
              className="flex flex-row items-start justify-start gap-4 p-4 rounded-xl border shadow-sm"
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
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
