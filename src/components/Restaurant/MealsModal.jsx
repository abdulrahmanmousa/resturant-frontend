import Loading from "../Loading";
import api from "../../lib/apiInstance";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Utensils } from "lucide-react";

export function RestaurantMealsModal({ restaurantId }) {
  const [open, setOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !restaurantId) return;
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/meals/restaurant/${restaurantId}?${searchTerm ? `search=${searchTerm}` : ""}`,
        );
        setMeals(response.data.meals);
      } catch (err) {
        setError("An error occurred while fetching meals");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [restaurantId, open, searchTerm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer hover:bg-gray-100 transition-all  items-center space-x-4 border p-4 rounded-xl shadow-sm">
          <Utensils className="w-6 h-6 rounded-full" />

          <div>
            <h3 className="font-bold text-gray-800">View all meals.</h3>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Restaurant Meals</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading ? (
            <p className="h-[60vh] w-[60vw] text-center">
              <Loading />
            </p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-4 gap-4 max-h-[60vh] w-[60vw] items-start justify-start overflow-y-auto space-y-4">
              {meals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center  h-full max-h-28 w-full space-x-4 border p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={item.image.secure_url || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {meals.length === 0 && (
                <p>No meals found matching your search.</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
